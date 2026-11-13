// Service worker: gör att appen startar snabbt och fungerar offline.
const CACHE = 'allez-v22';
const AUDIO_CACHE = 'allez-audio'; // sparat ljud överlever appuppdateringar
const SHELL = ['./', 'index.html', 'styles.css', 'app.js', 'content.js', 'art.js', 'stories.js', 'stories2.js', 'serial.js', 'serial2.js', 'svmap.js', 'verbs.js', 'units2.js', 'units3.js', 'stories3.js', 'units4.js', 'stories4.js', 'audiomap.js', 'config.js', 'manifest.webmanifest', 'icons/icon-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== AUDIO_CACHE).map(k => caches.delete(k))))
  // Gammalt sparat ljud (före nivåjusteringen) tas bort
  .then(() => caches.open(AUDIO_CACHE)).then(c => c.keys().then(rs => Promise.all(rs.filter(r => !r.url.includes('/audio/v2/')).map(r => c.delete(r)))))
  .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.hostname.endsWith('supabase.co')) {
    if (url.pathname.includes('/storage/v1/object/public/audio/')) e.respondWith(audio(e.request));
    return; // databasen ska alltid gå direkt
  }
  const same = url.origin === location.origin;
  if (same) {
    // Nätverket först, så att uppdateringar kommer fram – cache som reserv offline
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(ca => ca.put(e.request, c)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
  } else if (/fonts\.(googleapis|gstatic)\.com|esm\.sh/.test(url.hostname)) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const c = res.clone(); caches.open(CACHE).then(ca => ca.put(e.request, c)); return res; })));
  }
});

// Inspelat ljud: sparat ljud först (med stöd för Range, som Safari kräver), annars nätet
async function audio(req) {
  const c = await caches.open(AUDIO_CACHE);
  const hit = await c.match(req.url);
  if (!hit) return fetch(req);
  const range = req.headers.get('range');
  if (!range) return hit;
  const buf = await hit.arrayBuffer();
  const m = /bytes=(\d*)-(\d*)/.exec(range) || [];
  const start = m[1] ? +m[1] : 0, end = m[2] ? Math.min(+m[2], buf.byteLength - 1) : buf.byteLength - 1;
  return new Response(buf.slice(start, end + 1), { status: 206, headers: {
    'Content-Type': 'audio/mpeg', 'Content-Range': `bytes ${start}-${end}/${buf.byteLength}`, 'Content-Length': String(end - start + 1), 'Accept-Ranges': 'bytes' } });
}

// Pushnotiser: påminnelser och pepp
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch { d = { body: e.data && e.data.text() }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Allez !', {
    body: d.body || '', icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', data: { url: d.url || './' }, tag: 'allez',
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) if ('focus' in c) return c.focus();
    return clients.openWindow(e.notification.data?.url || './');
  }));
});
