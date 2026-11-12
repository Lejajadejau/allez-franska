import { COURSE, FUTURE } from './content.js';
import { CONFIG } from './config.js';
import * as ART from './art.js';

// ================= Hjälpfunktioner =================
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const app = document.getElementById('app');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pickN = (a, n) => shuffle(a).slice(0, n);
const rnd = a => a[Math.floor(Math.random() * a.length)];
const first = s => s.split('|')[0];
const variants = s => s.split('|');
const pad = n => String(n).padStart(2, '0');
const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const daysBetween = (a, b) => Math.round((new Date(b + 'T12:00') - new Date(a + 'T12:00')) / 864e5);
function weekKey(d = new Date()) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - day);
  const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return `${t.getUTCFullYear()}-V${Math.ceil(((t - y0) / 864e5 + 1) / 7)}`;
}
function norm(s, keepAccents = true) {
  let t = String(s).toLowerCase().replace(/[’`´]/g, "'").replace(/[.,!?;:«»"()–—\-]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!keepAccents) t = t.normalize('NFD').replace(/[̀-ͯ]/g, '');
  return t;
}
function lev(a, b) {
  const m = a.length, n = b.length; const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}
const PROPER = new Set(['Poireau', 'Brioche']);
function tokens(s) {
  return s.replace(/[.,!?;:«»"]/g, ' ').split(/\s+/).filter(Boolean)
    .map(w => PROPER.has(w) ? w : w.toLowerCase());
}
// Bedömer ett skrivet svar mot godtagbara varianter
function grade(input, answers) {
  const a = norm(input); if (!a) return { ok: false };
  for (const v of answers) if (norm(v) === a) return { ok: true };
  for (const v of answers) if (norm(v, false) === norm(a, false)) return { ok: true, note: `Tänk på accenterna: ${v}` };
  for (const v of answers) { const n = norm(v, false); if (n.length > 8 && lev(n, norm(a, false)) <= 1) return { ok: true, note: `Litet stavfel – rätt är: ${v}` }; }
  return { ok: false };
}

// ================= Ljud och tal =================
let actx;
function chime(ok) {
  if (!S?.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = ok ? [659, 988] : [196, 165];
    notes.forEach((f, i) => {
      const o = actx.createOscillator(), g = actx.createGain(), t0 = actx.currentTime + i * 0.11;
      o.type = ok ? 'triangle' : 'sawtooth'; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(ok ? 0.18 : 0.05, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.28);
      o.connect(g).connect(actx.destination); o.start(t0); o.stop(t0 + 0.3);
    });
  } catch { }
}
let frVoice = null;
function loadVoices() {
  if (!('speechSynthesis' in window)) return;
  const vs = speechSynthesis.getVoices();
  const fr = vs.filter(v => /^fr/i.test(v.lang));
  frVoice = fr.find(v => /fr[-_]FR/i.test(v.lang) && /google|amélie|amelie|thomas|audrey|marie|premium|enhanced/i.test(v.name))
    || fr.find(v => /fr[-_]FR/i.test(v.lang)) || fr[0] || null;
}
if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function say(text, slow = false) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/\|/g, ' '));
  u.lang = 'fr-FR'; if (frVoice) u.voice = frVoice; u.rate = slow ? 0.55 : 0.9;
  speechSynthesis.speak(u);
}
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const canSpeak = () => !!SR && S.speak && !S.speakBroken && Date.now() > (S.speakPausedUntil || 0);
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

// ================= Tillstånd =================
const HEART_MAX = 5, HEART_MS = 30 * 60 * 1000;
const DEFAULT = {
  name: '', avatar: '🦊', xp: 0, weekKey: '', weekXp: 0, dayKey: '', dayXp: 0, dailyGoal: 20,
  streak: 0, lastActive: null, freezes: 0, hearts: HEART_MAX, heartsTs: Date.now(), ecus: 30,
  crowns: {}, sound: true, speak: true, speakPausedUntil: 0, goalBonusDay: '', cheersSent: {},
  lessonsDone: 0, perfect: 0, updatedAt: 0, welcomed: false,
};
let S = null, userId = 'local', sb = null, offline = false;
const storeKey = () => 'psc_state_' + userId;

function load() {
  try { S = { ...DEFAULT, ...JSON.parse(localStorage.getItem(storeKey()) || '{}') }; } catch { S = { ...DEFAULT }; }
  tick();
}
let pushTimer;
function save(sync = true) {
  S.updatedAt = Date.now();
  try { localStorage.setItem(storeKey(), JSON.stringify(S)); } catch { }
  if (sync && sb && userId !== 'local') { clearTimeout(pushTimer); pushTimer = setTimeout(pushRemote, 600); }
}
function tick() {
  const now = Date.now();
  if (S.hearts < HEART_MAX) {
    const n = Math.floor((now - S.heartsTs) / HEART_MS);
    if (n > 0) { S.hearts = Math.min(HEART_MAX, S.hearts + n); S.heartsTs = S.hearts >= HEART_MAX ? now : S.heartsTs + n * HEART_MS; }
  } else S.heartsTs = now;
  const wk = weekKey(); if (S.weekKey !== wk) { S.weekKey = wk; S.weekXp = 0; }
  const dk = dayKey(); if (S.dayKey !== dk) { S.dayKey = dk; S.dayXp = 0; }
}
function streakOf(st) {
  if (!st.lastActive) return 0;
  const gap = daysBetween(st.lastActive, dayKey());
  if (gap <= 1) return st.streak || 0;
  return (gap - 1) <= (st.freezes || 0) ? st.streak || 0 : 0;
}
const doneToday = st => st.lastActive === dayKey();
function loseHeart() { if (S.hearts >= HEART_MAX) S.heartsTs = Date.now(); S.hearts = Math.max(0, S.hearts - 1); }
function nextHeartIn() { const ms = HEART_MS - (Date.now() - S.heartsTs); return Math.max(1, Math.ceil(ms / 60000)); }
function addXp(n) { S.xp += n; S.weekXp += n; S.dayXp += n; }
function registerActivity() {
  const today = dayKey(), before = streakOf(S);
  if (S.lastActive === today) return { extended: false, streak: S.streak, usedFreeze: 0 };
  let used = 0;
  if (!S.lastActive) S.streak = 1;
  else {
    const missed = daysBetween(S.lastActive, today) - 1;
    if (missed <= 0) S.streak += 1;
    else if (missed <= S.freezes) { S.freezes -= missed; used = missed; S.streak += 1; }
    else S.streak = 1;
  }
  S.lastActive = today;
  let gotFreeze = false;
  if (S.streak % 7 === 0 && S.freezes < 2) { S.freezes++; gotFreeze = true; }
  return { extended: true, streak: S.streak, before, usedFreeze: used, gotFreeze };
}

// Kursstruktur
const lessonAt = (u, l) => COURSE[u].lessons[l];
const crownsOf = id => S.crowns[id] || 0;
const unitDone = u => COURSE[u].lessons.every(l => crownsOf(l.id) >= 1);
const unitUnlocked = u => u === 0 || unitDone(u - 1);
const lessonUnlocked = (u, l) => unitUnlocked(u) && (l === 0 || crownsOf(lessonAt(u, l - 1).id) >= 1);
function currentNode() {
  for (let u = 0; u < COURSE.length; u++) for (let l = 0; l < COURSE[u].lessons.length; l++)
    if (lessonUnlocked(u, l) && crownsOf(lessonAt(u, l).id) === 0) return [u, l];
  return null;
}
const doneLessons = () => COURSE.flatMap((un, u) => un.lessons.map((le, l) => ({ u, l, le }))).filter(x => crownsOf(x.le.id) >= 1);
const wordsLearned = () => new Set(doneLessons().flatMap(x => x.le.words.map(w => w.fr))).size;
const totalCrowns = () => Object.values(S.crowns).reduce((a, b) => a + b, 0);

// ================= Supabase =================
async function initRemote() {
  if (!CONFIG.SUPABASE_URL || !CONFIG.SUPABASE_ANON_KEY) return false;
  try {
    const m = await import('https://esm.sh/@supabase/supabase-js@2');
    sb = m.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true } });
    const { data } = await sb.auth.getSession();
    if (data.session) { userId = data.session.user.id; localStorage.setItem('psc_last_user', userId); }
    else userId = null;
  } catch (e) {
    console.warn('Supabase kunde inte laddas', e);
    offline = true; sb = null;
    userId = localStorage.getItem('psc_last_user') || 'local';
  }
  return true;
}
async function pullRemote() {
  if (!sb || !userId || userId === 'local') return;
  const { data, error } = await sb.from('profiles').select('*').eq('id', userId).maybeSingle();
  if (error) { console.warn(error); return; }
  if (data && data.state && (data.state.updatedAt || 0) > (S.updatedAt || 0)) {
    S = { ...DEFAULT, ...data.state }; tick(); save(false);
  }
  if (data && !S.name) { S.name = data.name; S.avatar = data.avatar; }
}
async function pushRemote() {
  if (!sb || !userId || userId === 'local' || !S.name) return;
  const row = {
    id: userId, name: S.name, avatar: S.avatar, xp: S.xp, week_key: S.weekKey, week_xp: S.weekXp,
    streak: streakOf(S), last_active: S.lastActive, state: S, updated_at: new Date().toISOString(),
  };
  const { error } = await sb.from('profiles').upsert(row);
  if (error) console.warn('Kunde inte spara', error);
}
async function fetchPlayers() {
  if (!sb || userId === 'local') return [{ id: userId, me: true, name: S.name, avatar: S.avatar, week_xp: S.weekXp, streak: streakOf(S), today: doneToday(S), xp: S.xp }];
  const { data, error } = await sb.from('profiles').select('id,name,avatar,xp,week_key,week_xp,state');
  if (error || !data) return [];
  const wk = weekKey();
  return data.map(p => p.id === userId
    ? { id: p.id, me: true, name: S.name, avatar: S.avatar, week_xp: S.weekXp, streak: streakOf(S), today: doneToday(S), xp: S.xp }
    : { id: p.id, name: p.name, avatar: p.avatar, xp: p.xp, week_xp: p.week_key === wk ? p.week_xp : 0, streak: streakOf(p.state || {}), today: doneToday(p.state || {}) });
}
async function fetchCheers(unseenOnly = true) {
  if (!sb || userId === 'local') return [];
  let q = sb.from('cheers').select('*').eq('to_id', userId).order('created_at', { ascending: false }).limit(20);
  if (unseenOnly) q = q.eq('seen', false);
  const { data } = await q; return data || [];
}

// ================= Ramverk för vyer =================
let view = 'home';
function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2600);
}
function sheet(html, onMount) {
  const wrap = document.createElement('div'); wrap.className = 'sheet-wrap';
  wrap.innerHTML = `<div class="sheet">${html}</div>`;
  document.body.appendChild(wrap);
  requestAnimationFrame(() => wrap.classList.add('show'));
  const close = () => { wrap.classList.remove('show'); setTimeout(() => wrap.remove(), 250); };
  wrap.addEventListener('click', e => { if (e.target === wrap || e.target.closest('[data-close]')) close(); });
  onMount?.(wrap, close);
  return close;
}
function statsBar() {
  const st = streakOf(S);
  return `<div class="stats">
    <button class="stat ${doneToday(S) ? 'lit' : ''}" data-stat="streak">🔥<b>${st}</b></button>
    <button class="stat" data-stat="ecus">🪙<b>${S.ecus}</b></button>
    <button class="stat hearts" data-stat="hearts">❤️<b>${S.hearts}</b></button>
  </div>`;
}
function nav() {
  const b = (v, icon, label) => `<button class="nav-b ${view === v ? 'on' : ''}" data-nav="${v}"><span>${icon}</span>${label}</button>`;
  return `<nav class="nav">${b('home', '🗺️', 'Staden')}${b('league', '🏆', 'Ligan')}${b('profile', S.avatar, 'Profil')}</nav>`;
}
function shell(inner) {
  app.innerHTML = `<div class="shell"><header class="top"><div class="brand">Allez&nbsp;!</div>${statsBar()}</header><main class="main">${inner}</main>${nav()}</div>`;
  $$('[data-nav]').forEach(b => b.onclick = () => go(b.dataset.nav));
  $$('[data-stat]').forEach(b => b.onclick = () => statInfo(b.dataset.stat));
}
function go(v) { view = v; tick(); ({ home: renderHome, league: renderLeague, profile: renderProfile })[v](); window.scrollTo(0, 0); }

function statInfo(kind) {
  if (kind === 'streak') {
    const st = streakOf(S);
    sheet(`<div class="big-emoji">🔥</div><h2>${st} ${st === 1 ? 'dag' : 'dagar'} i rad</h2>
      <p>${doneToday(S) ? 'Du har redan övat i dag. Bra jobbat!' : 'Gör en lektion i dag för att hålla igång sviten.'}</p>
      <p class="muted">Sviktfrysningar: ${'🧊'.repeat(S.freezes) || 'inga'} (skyddar sviten en dag du missar). Du får en gratis var sjunde dag, eller köper i profilen.</p>
      <button class="btn primary" data-close>OK</button>`);
  } else if (kind === 'ecus') {
    sheet(`<div class="big-emoji">🪙</div><h2>${S.ecus} écus</h2><p>Du tjänar écus på lektioner och när du når dagens mål. Använd dem i butiken under Profil.</p><button class="btn primary" data-close>OK</button>`);
  } else {
    sheet(`<div class="big-emoji">❤️</div><h2>${S.hearts} av ${HEART_MAX} hjärtan</h2>
      <p>Du förlorar ett hjärta för varje fel i en lektion. ${S.hearts < HEART_MAX ? `Nästa hjärta kommer om ${nextHeartIn()} min.` : 'Du har fullt!'}</p>
      ${S.hearts < HEART_MAX ? `<button class="btn" id="hp">🏋️ Öva och få tillbaka ett hjärta</button>` : ''}
      <button class="btn primary" data-close>OK</button>`, (w, close) => {
      const b = $('#hp', w); if (b) b.onclick = () => { close(); startPractice(); };
    });
  }
}

// ================= Startsida: staden =================
const OFFS = [0, 52, 78, 52, 0, -52, -78, -52];
function renderHome() {
  const cur = currentNode();
  let html = `<section class="banner">${ART.skyline()}<div class="banner-t"><h1>Port-Saint-Clément</h1><p>Franska för familj och vänner</p></div></section>`;
  const pct = Math.min(100, Math.round(S.dayXp / S.dailyGoal * 100));
  html += `<div class="goal card"><div><b>Dagens mål</b><span class="muted"> ${S.dayXp}/${S.dailyGoal} XP</span></div><div class="pbar"><i style="width:${pct}%"></i></div>${pct >= 100 ? '<span class="goal-ok">✓</span>' : ''}</div>`;
  if (doneLessons().length && S.hearts < HEART_MAX) html += `<button class="practice-chip" id="practice">🏋️ Öva och få tillbaka ❤️</button>`;
  else if (doneLessons().length) html += `<button class="practice-chip" id="practice">🏋️ Snabbövning (+5 XP)</button>`;

  COURSE.forEach((un, u) => {
    const unlocked = unitUnlocked(u);
    html += `<section class="unit ${unlocked ? '' : 'locked'}" style="--uc:${un.color};--ud:${un.dark}">
      <div class="unit-head"><div><small>Kvarter ${u + 1} · ${un.level}</small><h2>${un.fr}</h2><p>${un.sv} – ${un.desc}</p></div>
      <button class="guide-b" data-guide="${u}" aria-label="Guidebok">📖</button></div>
      <div class="scene">${ART.scene(un.id)}${!unlocked ? `<div class="lock-over"><span>🔒</span><button class="btn small" data-jump="${u}">Hoppa hit?</button></div>` : ''}</div>
      <div class="path">`;
    un.lessons.forEach((le, l) => {
      const c = crownsOf(le.id), open = lessonUnlocked(u, l), isCur = cur && cur[0] === u && cur[1] === l;
      const off = OFFS[l % OFFS.length];
      const icon = !open ? '🔒' : c >= 3 ? '👑' : c >= 1 ? '★' : (le.story ? '💬' : '★');
      html += `<div class="node-row" style="transform:translateX(${off}px)">
        ${isCur ? `<div class="start-tip">Börja!</div>` : ''}
        <button class="node ${open ? 'open' : ''} ${c >= 1 ? 'done' : ''} ${c >= 3 ? 'gold' : ''} ${isCur ? 'cur' : ''}" data-u="${u}" data-l="${l}">${icon}</button>
        ${c ? `<div class="crowns">${'♛'.repeat(c)}</div>` : ''}
      </div>`;
      if (l === 1) html += `<div class="char-side ${off > 0 ? 'left' : 'right'}">${ART.character(un.character)}<span>${un.charName}</span></div>`;
    });
    html += `</div></section>${ART.tramDivider()}`;
  });
  FUTURE.forEach((f, i) => {
    html += `<section class="unit future"><div class="unit-head"><div><small>Kvarter ${COURSE.length + i + 1} · ${f.level}</small><h2>${f.fr}</h2><p>${f.sv} – ${f.desc}</p></div></div>
      <div class="scene">${ART.scene(f.id)}<div class="lock-over"><span class="soon">Byggs snart</span></div></div></section>`;
  });
  shell(html);

  $$('.node').forEach(n => n.onclick = () => nodeSheet(+n.dataset.u, +n.dataset.l));
  $$('[data-guide]').forEach(b => b.onclick = () => guide(+b.dataset.guide));
  $$('[data-jump]').forEach(b => b.onclick = () => jumpSheet(+b.dataset.jump));
  const p = $('#practice'); if (p) p.onclick = startPractice;
  const curEl = $('.node.cur'); if (curEl && !renderHome.scrolled) { renderHome.scrolled = true; setTimeout(() => curEl.scrollIntoView({ block: 'center', behavior: 'smooth' }), 150); }

  if (!S.welcomed) welcome();
  else checkCheers();
  installHint();
}

function welcome() {
  S.welcomed = true; save();
  const un = COURSE[0];
  sheet(`<div class="welcome">${ART.character(un.character)}<div class="bubble fr" data-say="${esc(un.welcome)}">🔊 ${esc(un.welcome)}</div></div>
    <h2>Välkommen till Port-Saint-Clément!</h2>
    <p>Det här är en liten stad vid havet. Varje kvarter är en del av kursen – börja hos Madame Brioche på bageriet.</p>
    <p class="muted">Tryck på 🔊 för att höra franskan. Gör en lektion om dagen för att bygga din svit 🔥 och peppa varandra i Ligan 🏆.</p>
    <button class="btn primary" data-close>Allons-y !</button>`, w => {
    $('[data-say]', w).onclick = e => say(e.currentTarget.dataset.say);
    setTimeout(() => say(un.welcome), 400);
  });
}

function nodeSheet(u, l) {
  const un = COURSE[u], le = lessonAt(u, l), c = crownsOf(le.id), open = lessonUnlocked(u, l);
  if (!open) { toast('Klara lektionen före först 🔒'); return; }
  const lvlTxt = c >= 3 ? 'Mästrad 👑' : `Nivå ${c + 1} av 3`;
  sheet(`<div class="ns-head" style="--uc:${un.color}"><small>${un.fr} · Lektion ${l + 1}</small><h2>${esc(le.title)}</h2><p>${esc(le.sv)}</p></div>
    <div class="chips">${le.words.slice(0, 8).map(w => `<span class="chip" data-say="${esc(w.fr)}">${w.e} ${esc(w.fr)}</span>`).join('')}</div>
    <p class="muted">${lvlTxt}${c >= 1 && c < 3 ? ' – högre nivåer har mer skrivande och lyssnande.' : ''}</p>
    ${S.hearts === 0 ? `<p class="warn">Du har inga hjärtan kvar. Öva för att få tillbaka ett, eller vänta ${nextHeartIn()} min.</p><button class="btn" id="hp">🏋️ Öva</button>` :
      `<button class="btn primary" id="go">${c === 0 ? 'Starta +10 XP' : c >= 3 ? 'Repetera +10 XP' : 'Nästa nivå +10 XP'}</button>`}
    <button class="btn ghost" data-close>Stäng</button>`, (w, close) => {
    $$('[data-say]', w).forEach(x => x.onclick = () => say(x.dataset.say));
    const g = $('#go', w); if (g) g.onclick = () => { close(); startLesson(u, l); };
    const h = $('#hp', w); if (h) h.onclick = () => { close(); startPractice(); };
  });
}

function guide(u) {
  const un = COURSE[u];
  sheet(`<div class="ns-head" style="--uc:${un.color}"><small>Guidebok</small><h2>${un.fr}</h2></div>
    <div class="tips">${un.tips.map(t => `<div class="tip"><button class="say-b" data-say="${esc(t.fr)}">🔊</button><div><b>${esc(t.fr)}</b><div class="muted">${esc(t.sv)}</div><p>${esc(t.note)}</p></div></div>`).join('')}</div>
    <button class="btn primary" data-close>Tack!</button>`, w => $$('[data-say]', w).forEach(x => x.onclick = () => say(x.dataset.say)));
}

function jumpSheet(u) {
  sheet(`<div class="big-emoji">🚋</div><h2>Hoppa till ${COURSE[u].fr}?</h2>
    <p>Klara ett test på det du behöver kunna från tidigare kvarter. Du får göra högst 3 fel.</p>
    <button class="btn primary" id="go">Starta testet</button><button class="btn ghost" data-close>Inte nu</button>`,
    (w, close) => $('#go', w).onclick = () => { close(); startTest(u); });
}

async function checkCheers() {
  const list = await fetchCheers(true);
  if (!list.length) return;
  const players = await fetchPlayers(); const byId = Object.fromEntries(players.map(p => [p.id, p]));
  sheet(`<h2>Du har fått pepp! 🎉</h2><div class="cheer-list">${list.map(c => {
    const f = byId[c.from_id] || { name: 'Någon', avatar: '🙂' };
    return `<div class="cheer"><span class="av">${esc(f.avatar)}</span><div><b>${esc(f.name)}</b> skickade ${esc(c.emoji)}<div>${esc(c.message)}</div></div></div>`;
  }).join('')}</div><button class="btn primary" data-close>Merci !</button>`);
  await sb.from('cheers').update({ seen: true }).in('id', list.map(c => c.id));
}

let deferredInstall = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstall = e; });
function installHint() {
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if (standalone || localStorage.getItem('psc_install_hidden')) return;
  if ($('.install')) return;
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const el = document.createElement('div'); el.className = 'install card';
  el.innerHTML = `<span>📲</span><div>${ios ? 'Lägg Allez! på hemskärmen: tryck på <b>Dela</b> <span class="ios-share">⬆︎</span> och sedan <b>Lägg till på hemskärmen</b>.' :
    deferredInstall ? 'Installera Allez! som app på telefonen.' : 'Lägg Allez! på hemskärmen via webbläsarens meny (⋮ → <b>Lägg till på startskärmen</b>).'}</div>
    ${deferredInstall && !ios ? '<button class="btn small primary" id="inst">Installera</button>' : ''}<button class="x" aria-label="Stäng">✕</button>`;
  $('.main').prepend(el);
  $('.x', el).onclick = () => { localStorage.setItem('psc_install_hidden', '1'); el.remove(); };
  const ib = $('#inst', el); if (ib) ib.onclick = async () => { deferredInstall.prompt(); await deferredInstall.userChoice; el.remove(); };
}

// ================= Ligan =================
const CHEERS = [
  { e: '🥐', m: 'En croissant till dig – bra jobbat!' },
  { e: '🔥', m: 'Allez, allez ! Håll sviten vid liv!' },
  { e: '👏', m: 'Bravo ! Imponerande!' },
  { e: '🚋', m: 'Spårvagnen väntar – dags för en lektion!' },
  { e: '🥖', m: 'Ooh là là, quelle baguette ! Du är grym.' },
];
async function renderLeague() {
  shell(`<div class="loading">Hämtar ligan…</div>`);
  const players = (await fetchPlayers()).sort((a, b) => b.week_xp - a.week_xp || b.xp - a.xp);
  if (view !== 'league') return;
  const now = new Date(), daysLeft = 7 - ((now.getDay() + 6) % 7) - 1;
  let html = `<section class="league-head card"><div class="trophy">🏆</div><div><h2>Veckans liga</h2><p class="muted">${daysLeft === 0 ? 'Sista dagen!' : `${daysLeft} dagar kvar`} · nollställs måndag</p></div></section>`;
  if (!sb || userId === 'local') html += `<div class="card note">Du spelar i ensamläge. När Supabase är kopplat ser ni varandra här och kan peppa varandra.</div>`;
  html += `<ol class="board">${players.map((p, i) => `<li class="${p.me ? 'me' : ''}">
    <span class="rank ${i < 3 ? 'r' + (i + 1) : ''}">${i + 1}</span><span class="av">${esc(p.avatar)}</span>
    <div class="who"><b>${esc(p.name)}${p.me ? ' (du)' : ''}</b><span class="muted">🔥 ${p.streak}${!p.today && p.streak > 0 ? ' · <span class="risk">svit i fara</span>' : p.today ? ' · ✓ i dag' : ''}</span></div>
    <span class="wxp">${p.week_xp} XP</span>
    ${p.me ? '' : `<button class="cheer-b" data-id="${p.id}" data-name="${esc(p.name)}" aria-label="Peppa">📣</button>`}
  </li>`).join('')}</ol>`;
  if (sb && userId !== 'local') {
    const got = await fetchCheers(false);
    if (got.length) {
      const byId = Object.fromEntries(players.map(p => [p.id, p]));
      html += `<h3 class="sub">Pepp till dig</h3><div class="cheer-list">${got.slice(0, 8).map(c => { const f = byId[c.from_id] || { name: 'Någon', avatar: '🙂' }; return `<div class="cheer"><span class="av">${esc(f.avatar)}</span><div><b>${esc(f.name)}</b> ${esc(c.emoji)}<div class="muted">${esc(c.message)}</div></div></div>`; }).join('')}</div>`;
    }
  }
  if (view !== 'league') return;
  shell(html);
  $$('.cheer-b').forEach(b => b.onclick = () => cheerSheet(b.dataset.id, b.dataset.name));
}
function cheerSheet(id, name) {
  const today = dayKey();
  if (S.cheersSent[id] === today) { toast(`Du har redan peppat ${name} i dag 💛`); return; }
  sheet(`<h2>Peppa ${esc(name)}</h2><div class="cheer-opts">${CHEERS.map((c, i) => `<button class="opt" data-i="${i}"><span>${c.e}</span>${esc(c.m)}</button>`).join('')}</div><button class="btn ghost" data-close>Avbryt</button>`,
    (w, close) => $$('[data-i]', w).forEach(b => b.onclick = async () => {
      const c = CHEERS[+b.dataset.i];
      const { error } = await sb.from('cheers').insert({ from_id: userId, to_id: id, emoji: c.e, message: c.m });
      close();
      if (error) { toast('Kunde inte skicka 😕'); return; }
      S.cheersSent[id] = today; save(); toast(`${c.e} skickat till ${name}!`);
    }));
}

// ================= Profil =================
const AVATARS = ['🦊', '🐸', '🦉', '🐻', '🐰', '🦔', '🐱', '🐶', '🐼', '🦁', '🐧', '🐙', '🧑‍🍳', '👮', '🧑‍🎨', '🧜'];
function renderProfile() {
  const html = `<section class="prof card"><div class="prof-av">${S.avatar}</div><h2>${esc(S.name)}</h2>
    <p class="muted">${userId === 'local' ? 'Ensamläge' : 'Inloggad'}${offline ? ' · offline' : ''}</p></section>
    <div class="grid">
      <div class="card stat-c"><b>🔥 ${streakOf(S)}</b><span>dagar i rad</span></div>
      <div class="card stat-c"><b>⚡ ${S.xp}</b><span>XP totalt</span></div>
      <div class="card stat-c"><b>♛ ${totalCrowns()}</b><span>kronor</span></div>
      <div class="card stat-c"><b>📚 ${wordsLearned()}</b><span>ord</span></div>
    </div>
    <h3 class="sub">Dagens mål</h3>
    <div class="seg">${[10, 20, 30, 50].map(g => `<button data-goal="${g}" class="${S.dailyGoal === g ? 'on' : ''}">${g} XP<small>${({ 10: 'Lugnt', 20: 'Vanligt', 30: 'Seriöst', 50: 'Intensivt' })[g]}</small></button>`).join('')}</div>
    <h3 class="sub">Butiken</h3>
    <div class="shop">
      <div class="card shop-i"><span>🧊</span><div><b>Svitfrysning</b><div class="muted">Skyddar sviten en dag. Du har ${S.freezes}/2.</div></div><button class="btn small" id="buyF" ${S.freezes >= 2 || S.ecus < 50 ? 'disabled' : ''}>50 🪙</button></div>
      <div class="card shop-i"><span>❤️</span><div><b>Fyll på hjärtan</b><div class="muted">Från ${S.hearts} till ${HEART_MAX}.</div></div><button class="btn small" id="buyH" ${S.hearts >= HEART_MAX || S.ecus < 80 ? 'disabled' : ''}>80 🪙</button></div>
    </div>
    <h3 class="sub">Inställningar</h3>
    <div class="card settings">
      <label><span>Ljudeffekter</span><input type="checkbox" id="setSound" ${S.sound ? 'checked' : ''}></label>
      <label><span>Taluppgifter (mikrofon)${SR ? '' : ' – stöds inte här'}</span><input type="checkbox" id="setSpeak" ${S.speak && !S.speakBroken ? 'checked' : ''} ${SR ? '' : 'disabled'}></label>
      <button class="row-b" id="words">📚 Mina ord (${wordsLearned()})</button>
      <button class="row-b" id="editP">✏️ Byt namn och figur</button>
      <button class="row-b" id="testVoice">🔊 Testa den franska rösten</button>
      ${sb && userId !== 'local' ? '<button class="row-b danger" id="logout">Logga ut</button>' : ''}
    </div>
    <p class="muted center small">Allez ! · Port-Saint-Clément</p>`;
  shell(html);
  $$('[data-goal]').forEach(b => b.onclick = () => { S.dailyGoal = +b.dataset.goal; save(); renderProfile(); });
  $('#buyF').onclick = () => { S.ecus -= 50; S.freezes++; save(); toast('🧊 Svitfrysning köpt'); renderProfile(); };
  $('#buyH').onclick = () => { S.ecus -= 80; S.hearts = HEART_MAX; save(); toast('❤️ Fullt med hjärtan'); renderProfile(); };
  $('#setSound').onchange = e => { S.sound = e.target.checked; save(); };
  $('#setSpeak').onchange = e => { S.speak = e.target.checked; S.speakPausedUntil = 0; S.speakBroken = false; save(); };
  $('#editP').onclick = () => renderOnboard(true);
  $('#words').onclick = wordList;
  $('#testVoice').onclick = () => say('Bonjour ! Je voudrais un croissant, s\'il vous plaît.');
  const lo = $('#logout'); if (lo) lo.onclick = async () => { await sb.auth.signOut(); localStorage.removeItem('psc_last_user'); location.reload(); };
}

function wordList() {
  const groups = COURSE.map(un => {
    const seen = new Set();
    const ws = un.lessons.filter(le => crownsOf(le.id) >= 1).flatMap(le => le.words).filter(w => !seen.has(w.fr) && seen.add(w.fr));
    return { un, ws };
  }).filter(g => g.ws.length);
  sheet(`<h2>Mina ord</h2>${groups.length ? groups.map(g => `<h3 class="sub">${esc(g.un.fr)}</h3>
    <div class="wl">${g.ws.map(w => `<button class="wl-r" data-say="${esc(w.fr)}"><span>${w.e}</span><b>${esc(w.fr)}</b><span class="muted">${esc(first(w.sv))}</span><i>🔊</i></button>`).join('')}</div>`).join('')
    : '<p class="muted">Klara din första lektion så samlas orden här.</p>'}
    <button class="btn primary" data-close>Stäng</button>`, w => $$('[data-say]', w).forEach(b => b.onclick = () => say(b.dataset.say)));
}

// ================= Inloggning och start =================
function renderAuth() {
  let mode = 'login';
  const draw = () => {
    app.innerHTML = `<div class="auth">${ART.skyline()}<div class="auth-box card">
      <h1>Allez !</h1><p class="muted">Franska i Port-Saint-Clément – för familj och vänner.</p>
      <div class="seg two"><button data-m="login" class="${mode === 'login' ? 'on' : ''}">Logga in</button><button data-m="signup" class="${mode === 'signup' ? 'on' : ''}">Skapa konto</button></div>
      <form id="af">
        <label>E-post<input type="email" id="em" required autocomplete="email"></label>
        <label>Lösenord<input type="password" id="pw" required minlength="6" autocomplete="${mode === 'login' ? 'current-password' : 'new-password'}"></label>
        <button class="btn primary" type="submit">${mode === 'login' ? 'Logga in' : 'Skapa konto'}</button>
        <p class="err" id="err"></p>
      </form></div></div>`;
    $$('[data-m]').forEach(b => b.onclick = () => { mode = b.dataset.m; draw(); });
    $('#af').onsubmit = async e => {
      e.preventDefault();
      const email = $('#em').value.trim(), password = $('#pw').value; $('#err').textContent = '';
      const btn = $('#af .btn'); btn.disabled = true; btn.textContent = 'Vänta…';
      const res = mode === 'login' ? await sb.auth.signInWithPassword({ email, password }) : await sb.auth.signUp({ email, password });
      if (res.error) {
        $('#err').textContent = /invalid login/i.test(res.error.message) ? 'Fel e-post eller lösenord.' : /registered/i.test(res.error.message) ? 'Det finns redan ett konto med den e-posten – logga in i stället.' : res.error.message;
        btn.disabled = false; btn.textContent = mode === 'login' ? 'Logga in' : 'Skapa konto'; return;
      }
      if (!res.data.session) { $('#err').textContent = 'Kolla din e-post och klicka på bekräftelselänken, logga sedan in här.'; btn.disabled = false; btn.textContent = 'Logga in'; mode = 'login'; return; }
      userId = res.data.session.user.id; localStorage.setItem('psc_last_user', userId);
      await afterLogin();
    };
  };
  draw();
}
async function afterLogin() {
  load(); await pullRemote();
  if (!S.name) renderOnboard(); else { save(); go('home'); }
}
function renderOnboard(edit = false) {
  let av = S.avatar || '🦊';
  app.innerHTML = `<div class="auth">${ART.skyline()}<div class="auth-box card">
    <h2>${edit ? 'Ändra profil' : 'Vem är du?'}</h2>
    <label>Ditt namn<input id="nm" maxlength="20" value="${esc(S.name)}" placeholder="t.ex. Johan"></label>
    <p class="lab">Välj en figur</p>
    <div class="avs">${AVATARS.map(a => `<button class="av-b ${a === av ? 'on' : ''}" data-a="${a}">${a}</button>`).join('')}</div>
    ${edit ? '' : `<p class="lab">Dagligt mål</p><div class="seg">${[10, 20, 30].map(g => `<button data-goal="${g}" class="${S.dailyGoal === g ? 'on' : ''}">${g} XP</button>`).join('')}</div>`}
    <button class="btn primary" id="ok">${edit ? 'Spara' : 'Kom igång'}</button></div></div>`;
  $$('[data-a]').forEach(b => b.onclick = () => { av = b.dataset.a; $$('.av-b').forEach(x => x.classList.toggle('on', x === b)); });
  $$('[data-goal]').forEach(b => b.onclick = () => { S.dailyGoal = +b.dataset.goal; $$('[data-goal]').forEach(x => x.classList.toggle('on', x === b)); });
  $('#ok').onclick = () => {
    const n = $('#nm').value.trim(); if (!n) { $('#nm').focus(); return; }
    S.name = n; S.avatar = av; save(); pushRemote(); go(edit ? 'profile' : 'home');
  };
}

// ================= Övningsgenerator =================
function wordPool(units) { return units.flatMap(u => COURSE[u].lessons.flatMap(l => l.words)); }
function sentencePool(units) { return units.flatMap(u => COURSE[u].lessons.flatMap(l => l.sentences)); }
function distractTokens(answerToks, pool, lang, n) {
  const have = new Set(answerToks.map(t => t.toLowerCase()));
  const cands = [...new Set(pool.flatMap(s => tokens(lang === 'fr' ? s.fr : first(s.sv))))].filter(t => !have.has(t.toLowerCase()));
  return pickN(cands, n);
}
function mkPick(w, pool) {
  const others = pickN(pool.filter(x => x.fr !== w.fr && x.e !== w.e && !variants(x.sv).some(v => variants(w.sv).includes(v))), 3);
  const uniq = []; const seen = new Set([w.e]); for (const o of others) if (!seen.has(o.e)) { seen.add(o.e); uniq.push(o); }
  return { type: 'pick', w, options: shuffle([w, ...uniq]) };
}
function mkMC(w, pool, reverse = false) {
  const others = pickN(pool.filter(x => x.fr !== w.fr && first(x.sv) !== first(w.sv)), 3);
  return { type: 'mc', w, reverse, options: shuffle([w, ...others]) };
}
function mkMatch(words) {
  const ws = []; const seenFr = new Set(), seenSv = new Set();
  for (const w of words) { if (!seenFr.has(w.fr) && !seenSv.has(first(w.sv))) { ws.push(w); seenFr.add(w.fr); seenSv.add(first(w.sv)); } }
  return { type: 'match', words: ws.slice(0, 5) };
}
function mkTiles(s, to, pool, u) {
  const ans = tokens(to === 'fr' ? s.fr : first(s.sv));
  return { type: 'tiles', s, to, u, tiles: shuffle([...ans, ...distractTokens(ans, pool, to, Math.min(4, Math.max(2, 8 - ans.length)))]) };
}
const mkListenTiles = (s, pool, u) => ({ ...mkTiles(s, 'fr', pool, u), listen: true });
const mkListenType = (s, u) => ({ type: 'listenType', s, u });
const mkType = (s, to, u) => ({ type: 'type', s, to, u });
const mkSpeak = (s, pool, u) => canSpeak() ? { type: 'speak', s, u } : mkListenTiles(s, pool, u);

function lessonExercises(u, l) {
  const un = COURSE[u], le = un.lessons[l], lvl = crownsOf(le.id);
  const seen = COURSE[u].lessons.slice(0, l + 1);
  const wpool = [...wordPool([...Array(u).keys()]), ...seen.flatMap(x => x.words)];
  const spool = seen.flatMap(x => x.sentences);
  const W = le.words, Ss = shuffle(le.sentences);
  const head = [], body = [], tail = [];
  if (lvl === 0) pickN(W, Math.min(4, W.length)).forEach(w => head.push(mkPick(w, wpool)));
  else pickN(W, 2).forEach((w, i) => body.push(mkMC(w, wpool, i === 1)));
  head.push(mkMatch(shuffle(W)));
  Ss.slice(0, 3).forEach((s, i) => body.push(lvl >= 2 && i === 0 ? mkType(s, 'fr', u) : lvl >= 1 && i === 1 ? mkType(s, 'sv', u) : mkTiles(s, i % 2 ? 'sv' : 'fr', spool, u)));
  Ss.slice(3, 5).forEach(s => body.push(lvl >= 1 ? mkListenType(s, u) : mkListenTiles(s, spool, u)));
  if (Ss[5]) body.push(mkTiles(Ss[5], lvl % 2 ? 'fr' : 'sv', spool, u));
  body.push(mkSpeak(rnd(le.sentences), spool, u));
  body.push(mkMC(rnd(W), wpool, true));
  if (le.story) le.story.questions.forEach((q, qi) => tail.push({ type: 'dialogue', story: le.story, q, u, showAll: qi > 0 }));
  return [...head, ...shuffle(body), ...tail];
}
function mixedExercises(units, n) {
  const les = units.flatMap(u => COURSE[u].lessons.map(le => ({ u, le })));
  const wpool = wordPool(units), out = [];
  for (let i = 0; i < n; i++) {
    const { u, le } = rnd(les); const s = rnd(le.sentences); const spool = sentencePool([u]);
    const k = i % 5;
    out.push(k === 0 ? mkMC(rnd(le.words), wpool, Math.random() < 0.5) : k === 1 ? mkTiles(s, 'fr', spool, u) : k === 2 ? mkTiles(s, 'sv', spool, u) : k === 3 ? (Math.random() < 0.5 ? mkListenTiles(s, spool, u) : mkListenType(s, u)) : mkType(s, Math.random() < 0.5 ? 'fr' : 'sv', u));
  }
  return shuffle(out);
}

// ================= Lektionsspelare =================
let L = null;
function startLesson(u, l) {
  if (S.hearts <= 0) { toast('Inga hjärtan kvar ❤️'); return; }
  startSession({ kind: 'lesson', u, l, queue: lessonExercises(u, l) });
}
function startPractice() {
  const units = [...new Set(doneLessons().map(x => x.u))];
  if (!units.length) { toast('Gör din första lektion först!'); return; }
  startSession({ kind: 'practice', queue: mixedExercises(units, 8) });
}
function startTest(u) {
  startSession({ kind: 'test', u, queue: mixedExercises([...Array(u).keys()], 12), lives: 3 });
}
function startSession(o) {
  L = { ...o, i: 0, done: 0, total: o.queue.length, mistakes: 0, combo: 0, maxCombo: 0, start: Date.now(), requeued: new Set(), checked: false };
  renderEx();
}
function quitLesson() {
  sheet(`<div class="welcome">${ART.character('brioche', 'sad')}</div><h2>Vill du verkligen sluta?</h2><p>Du förlorar framstegen i den här lektionen.</p>
    <button class="btn primary" data-close>Fortsätt lära</button><button class="btn ghost" id="q">Avsluta</button>`,
    (w, close) => $('#q', w).onclick = () => { close(); speechSynthesis?.cancel(); L = null; save(); go('home'); });
}
function livesHtml() {
  if (L.kind === 'test') return `<div class="lh">${'💛'.repeat(Math.max(0, L.lives))}${'🤍'.repeat(3 - Math.max(0, L.lives))}</div>`;
  if (L.kind === 'practice') return `<div class="lh">🏋️</div>`;
  return `<div class="lh">❤️ ${S.hearts}</div>`;
}
let cur = null; // aktuell övning: {ready, check()}
function renderEx() {
  const ex = L.queue[L.i];
  L.checked = false;
  const pct = Math.round(L.done / L.total * 100);
  app.innerHTML = `<div class="lesson">
    <div class="ltop"><button class="x" id="quit" aria-label="Avsluta">✕</button><div class="pbar big"><i style="width:${pct}%"></i></div>${livesHtml()}</div>
    ${L.combo >= 3 ? `<div class="combo">🔥 ${L.combo} i rad!</div>` : ''}
    <div class="lbody" id="lbody"></div>
    <div class="lfoot" id="lfoot"><div class="fb" id="fb"></div><button class="btn primary wide" id="check" disabled>Kontrollera</button></div>
  </div>`;
  $('#quit').onclick = quitLesson;
  cur = { ready: false, check: () => ({ ok: false }) };
  EX[ex.type](ex, $('#lbody'));
  $('#check').onclick = onCheck;
}
function setReady(r) { cur.ready = r; const b = $('#check'); if (b && !L.checked) b.disabled = !r; }
const PRAISE = ['Très bien !', 'Parfait !', 'Bravo !', 'Super !', 'Excellent !', 'Magnifique !'];
function onCheck() {
  if (!L || L.over) return;
  if (L.checked) { next(); return; }
  if (!cur.ready) return;
  const r = cur.check();
  showFeedback(r);
}
function showFeedback(r) {
  L.checked = true;
  const ex = L.queue[L.i];
  chime(r.ok);
  if (r.ok) { L.done++; L.combo++; L.maxCombo = Math.max(L.maxCombo, L.combo); }
  else {
    L.mistakes++; L.combo = 0;
    if (L.kind === 'lesson') loseHeart();
    if (L.kind === 'test') L.lives--;
    if (L.kind !== 'test' && !L.requeued.has(L.i)) { L.requeued.add(L.queue.length); L.queue.push(ex); }
    else if (L.kind !== 'test') L.done++; // räkna ändå fram efter andra försöket
    if (L.kind === 'test') L.done++;
  }
  const fb = $('#fb'), foot = $('#lfoot');
  foot.classList.add(r.ok ? 'ok' : 'bad');
  const ansFr = r.say || (ex.s ? ex.s.fr : null);
  fb.innerHTML = r.ok
    ? `<div class="fb-t">✓ ${rnd(PRAISE)}</div>${r.note ? `<div class="fb-n">${esc(r.note)}</div>` : ''}${r.meaning ? `<div class="fb-n">Betydelse: ${esc(r.meaning)}</div>` : ''}`
    : `<div class="fb-t">✗ Rätt svar:</div><div class="fb-a">${esc(r.answer || '')}</div>${r.meaning ? `<div class="fb-n">Betydelse: ${esc(r.meaning)}</div>` : ''}`;
  if (ansFr && ex.type !== 'match' && ex.type !== 'dialogue') { const b = document.createElement('button'); b.className = 'say-b sm'; b.textContent = '🔊'; b.onclick = () => say(ansFr); fb.querySelector('.fb-t').append(b); }
  const btn = $('#check'); btn.disabled = false; btn.textContent = 'Fortsätt'; btn.focus();
  $('.ltop .lh').outerHTML = livesHtml();
  $('.ltop .pbar i').style.width = Math.round(L.done / L.total * 100) + '%';
  save(false);
  if (L.kind === 'lesson' && S.hearts <= 0 && !r.ok) { L.over = true; btn.disabled = true; setTimeout(outOfHearts, 700); return; }
  if (L.kind === 'test' && L.lives < 0) { L.over = true; btn.disabled = true; setTimeout(() => finish(false), 700); return; }
}
function next() {
  speechSynthesis?.cancel();
  L.i++;
  if (L.i >= L.queue.length) { finish(true); return; }
  renderEx();
}
function outOfHearts() {
  save();
  sheet(`<div class="big-emoji">💔</div><h2>Slut på hjärtan</h2><p>Lektionen avbryts. Öva lite för att få tillbaka ett hjärta, eller vänta ${nextHeartIn()} min.</p>
    ${S.ecus >= 80 ? `<button class="btn" id="buy">Fyll på för 80 🪙</button>` : ''}
    <button class="btn primary" id="pr">🏋️ Öva</button><button class="btn ghost" id="home">Till staden</button>`,
    (w, close) => {
      $('#pr', w).onclick = () => { close(); L = null; startPractice(); };
      $('#home', w).onclick = () => { close(); L = null; go('home'); };
      const b = $('#buy', w); if (b) b.onclick = () => { S.ecus -= 80; S.hearts = HEART_MAX; save(); close(); const { u, l } = L; L = null; startLesson(u, l); };
    });
}

function finish(completed) {
  const secs = Math.round((Date.now() - L.start) / 1000);
  const acc = Math.round(100 * Math.max(0, L.total - L.mistakes) / L.total);
  let xp = 0, ecus = 0, title = '', extra = '', mood = 'happy', char = 'brioche';
  if (L.kind === 'lesson') {
    const le = lessonAt(L.u, L.l); char = COURSE[L.u].character;
    S.crowns[le.id] = Math.min(3, crownsOf(le.id) + 1);
    xp = 10 + (L.mistakes === 0 ? 5 : 0); ecus = 5 + (L.mistakes === 0 ? 5 : 0);
    S.lessonsDone++; if (L.mistakes === 0) S.perfect++;
    title = 'Leçon terminée !';
    if (L.l === COURSE[L.u].lessons.length - 1 && S.crowns[le.id] === 1) extra = `<p class="unlock">🚋 Nytt kvarter upplåst!</p>`;
  } else if (L.kind === 'practice') {
    xp = 5; ecus = 2; if (S.hearts < HEART_MAX) { S.hearts++; extra = '<p class="unlock">❤️ Du fick tillbaka ett hjärta!</p>'; }
    title = 'Bien joué !';
  } else if (L.kind === 'test') {
    if (completed && L.lives >= 0) {
      for (let u = 0; u < L.u; u++) COURSE[u].lessons.forEach(le => { if (!crownsOf(le.id)) S.crowns[le.id] = 1; });
      xp = 20; ecus = 10; title = 'Test godkänt !'; extra = `<p class="unlock">🚋 Välkommen till ${COURSE[L.u].fr}!</p>`;
      char = COURSE[L.u].character;
    } else { title = 'Pas encore…'; mood = 'sad'; extra = '<p>Testet gick inte den här gången. Försök igen när du vill!</p>'; }
  }
  let streakInfo = null;
  if (xp > 0) {
    addXp(xp); S.ecus += ecus;
    streakInfo = registerActivity();
    if (S.dayXp >= S.dailyGoal && S.goalBonusDay !== S.dayKey) { S.goalBonusDay = S.dayKey; S.ecus += 10; extra += '<p class="unlock">🎯 Dagens mål klart! +10 🪙</p>'; }
  }
  save();
  const mm = Math.floor(secs / 60), ss = pad(secs % 60);
  app.innerHTML = `<div class="result">
    <div class="res-char">${ART.character(char, mood)}</div>
    <h1>${title}</h1>${extra}
    ${xp ? `<div class="res-grid">
      <div class="res-c y"><small>XP</small><b>+${xp}</b></div>
      <div class="res-c g"><small>Träffsäkerhet</small><b>${acc}%</b></div>
      <div class="res-c b"><small>Tid</small><b>${mm}:${ss}</b></div></div>` : ''}
    ${L.maxCombo >= 5 ? `<p class="muted">Bästa serie: ${L.maxCombo} rätt i rad 🔥</p>` : ''}
    <button class="btn primary wide" id="cont">Fortsätt</button></div>`;
  if (xp) confetti();
  $('#cont').onclick = () => {
    if (streakInfo && streakInfo.extended) showStreak(streakInfo); else { L = null; go('home'); }
  };
}
function showStreak(si) {
  const days = ['M', 'T', 'O', 'T', 'F', 'L', 'S'], today = (new Date().getDay() + 6) % 7;
  app.innerHTML = `<div class="result streak-s">
    <div class="flame">🔥</div><h1 class="big-n">${si.streak}</h1><h2>${si.streak === 1 ? 'dag i rad – din svit har börjat!' : 'dagar i rad!'}</h2>
    <div class="week">${days.map((d, i) => `<div class="wd ${i === today ? 'now' : i < today && i > today - si.streak ? 'lit' : ''}"><span>${d}</span><i>${i <= today && i > today - si.streak ? '✓' : ''}</i></div>`).join('')}</div>
    ${si.usedFreeze ? `<p class="muted">🧊 En svitfrysning räddade din svit.</p>` : ''}
    ${si.gotFreeze ? `<p class="unlock">🧊 Du fick en gratis svitfrysning!</p>` : ''}
    <p class="muted">${si.streak === 1 ? 'Kom tillbaka i morgon för att bygga vidare!' : 'Fantastiskt – fortsätt så i morgon också!'}</p>
    <button class="btn primary wide" id="cont">Fortsätt</button></div>`;
  $('#cont').onclick = () => { L = null; go('home'); };
}
function confetti() {
  const c = document.createElement('div'); c.className = 'confetti';
  const cols = ['#c8553d', '#f2c46d', '#6f9a5b', '#3f5a74', '#d97f8f'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('i');
    p.style.left = Math.random() * 100 + '%'; p.style.background = rnd(cols);
    p.style.animationDelay = Math.random() * 0.5 + 's'; p.style.transform = `rotate(${Math.random() * 360}deg)`;
    c.appendChild(p);
  }
  document.body.appendChild(c); setTimeout(() => c.remove(), 3000);
}

// Pratbubbla med figur
function npc(u, inner) {
  return `<div class="npc"><div class="npc-c">${ART.character(COURSE[u ?? 0].character)}</div><div class="bubble">${inner}</div></div>`;
}
const speakerBtns = text => `<button class="say-b" data-say="${esc(text)}" aria-label="Lyssna">🔊</button><button class="say-b slow" data-slow="${esc(text)}" aria-label="Långsamt">🐢</button>`;
function bindSay(root) {
  $$('[data-say]', root).forEach(b => b.onclick = e => { e.stopPropagation(); say(b.dataset.say); });
  $$('[data-slow]', root).forEach(b => b.onclick = e => { e.stopPropagation(); say(b.dataset.slow, true); });
}

// Mikrofonen fungerar inte: byt till lyssningsövning och förklara varför
function micBroken(ex, err) {
  S.speakBroken = true; save(false);
  L.queue[L.i] = mkListenTiles(ex.s, sentencePool([ex.u ?? 0]), ex.u);
  renderEx();
  const help = isIOS
    ? `På iPhone behövs tre saker: <b>Aktivera diktering</b> och ett <b>franskt tangentbord</b> (Inställningar → Allmänt → Tangentbord) samt att Safari får använda <b>mikrofonen</b>.`
    : `Tillåt mikrofonen för den här sidan i webbläsaren (låsikonen i adressfältet).`;
  sheet(`<div class="big-emoji">🎙️</div><h2>Mikrofonen fungerar inte just nu</h2>
    <p>Uttalsövningarna byts mot lyssningsövningar så länge. ${help}</p>
    <p class="muted small">När du har ändrat inställningen: slå på <b>Taluppgifter</b> igen under Profil.${err && err !== 'not-allowed' ? ` (Felkod: ${esc(err)})` : ''}</p>
    <button class="btn primary" data-close>OK</button>`);
}

// ================= Övningstyper =================
const EX = {
  pick(ex, root) {
    root.innerHTML = `<p class="kind">Nytt ord</p><h2 class="q">Vilken är ”${esc(first(ex.w.sv))}”?</h2>
      <div class="cards">${ex.options.map((o, i) => `<button class="pcard" data-i="${i}"><span class="emo">${o.e}</span><span>${esc(o.fr)}</span></button>`).join('')}</div>`;
    let sel = null;
    $$('.pcard', root).forEach(b => b.onclick = () => {
      if (L.checked) return;
      sel = ex.options[+b.dataset.i]; say(sel.fr);
      $$('.pcard', root).forEach(x => x.classList.toggle('sel', x === b)); setReady(true);
    });
    cur.check = () => ({ ok: sel.fr === ex.w.fr, answer: `${ex.w.e} ${ex.w.fr}`, say: ex.w.fr });
  },
  mc(ex, root) {
    const q = ex.reverse ? `Vad betyder ”${esc(ex.w.fr)}”?` : `Hur säger man ”${esc(first(ex.w.sv))}”?`;
    root.innerHTML = `<p class="kind">Välj rätt svar</p><h2 class="q">${q} ${ex.reverse ? `<button class="say-b sm" data-say="${esc(ex.w.fr)}">🔊</button>` : ''}</h2>
      <div class="opts">${ex.options.map((o, i) => `<button class="opt" data-i="${i}"><span class="num">${i + 1}</span>${esc(ex.reverse ? first(o.sv) : o.fr)}</button>`).join('')}</div>`;
    bindSay(root);
    if (ex.reverse) setTimeout(() => say(ex.w.fr), 300);
    let sel = null;
    $$('.opt', root).forEach(b => b.onclick = () => {
      if (L.checked) return;
      sel = ex.options[+b.dataset.i]; if (!ex.reverse) say(sel.fr);
      $$('.opt', root).forEach(x => x.classList.toggle('sel', x === b)); setReady(true);
    });
    cur.check = () => ({ ok: sel.fr === ex.w.fr, answer: ex.reverse ? first(ex.w.sv) : ex.w.fr, say: ex.w.fr });
  },
  match(ex, root) {
    const left = shuffle(ex.words), right = shuffle(ex.words);
    root.innerHTML = `<p class="kind">Para ihop</p><h2 class="q">Tryck på paren som hör ihop</h2>
      <div class="match"><div class="col">${left.map(w => `<button class="mt" data-k="${esc(w.fr)}" data-side="fr">${esc(w.fr)}</button>`).join('')}</div>
      <div class="col">${right.map(w => `<button class="mt" data-k="${esc(w.fr)}" data-side="sv">${esc(first(w.sv))}</button>`).join('')}</div></div>`;
    let a = null, matched = 0, errs = 0;
    $$('.mt', root).forEach(b => b.onclick = () => {
      if (b.classList.contains('gone')) return;
      if (b.dataset.side === 'fr') say(b.dataset.k);
      if (!a) { a = b; b.classList.add('sel'); return; }
      if (a === b) { a.classList.remove('sel'); a = null; return; }
      if (a.dataset.side === b.dataset.side) { a.classList.remove('sel'); a = b; b.classList.add('sel'); return; }
      if (a.dataset.k === b.dataset.k) {
        [a, b].forEach(x => { x.classList.remove('sel'); x.classList.add('good'); setTimeout(() => x.classList.add('gone'), 250); });
        matched++; a = null;
        if (matched === ex.words.length) { setReady(true); setTimeout(() => showFeedback({ ok: true, note: errs ? `${errs} felpar på vägen – men nu sitter de!` : '' }), 350); }
      } else {
        errs++; const pa = a; [pa, b].forEach(x => x.classList.add('wrong'));
        setTimeout(() => [pa, b].forEach(x => x.classList.remove('wrong', 'sel')), 450); a = null;
      }
    });
    cur.check = () => ({ ok: true });
  },
  tiles(ex, root) {
    const src = ex.listen ? null : ex.to === 'fr' ? first(ex.s.sv) : ex.s.fr;
    const answers = ex.to === 'fr' ? [ex.s.fr, ...(ex.s.alt || [])] : variants(ex.s.sv);
    if (ex.listen) {
      root.innerHTML = `<p class="kind">Lyssna</p><h2 class="q">Bygg det du hör</h2>
        <div class="listen-big"><button class="say-big" data-say="${esc(ex.s.fr)}">🔊</button><button class="say-big slow" data-slow="${esc(ex.s.fr)}">🐢</button></div>`;
      setTimeout(() => say(ex.s.fr), 300);
    } else {
      root.innerHTML = `<p class="kind">Översätt</p><h2 class="q">${ex.to === 'fr' ? 'Skriv på franska' : 'Vad betyder det?'}</h2>
        ${npc(ex.u, ex.to === 'sv' ? `${speakerBtns(ex.s.fr)}<span class="fr-t">${esc(src)}</span>` : `<span>${esc(src)}</span>`)}`;
      if (ex.to === 'sv') setTimeout(() => say(ex.s.fr), 300);
    }
    root.insertAdjacentHTML('beforeend', `<div class="ansline" id="ans"></div><div class="bank" id="bank">${ex.tiles.map((t, i) => `<button class="tile" data-i="${i}">${esc(t)}</button>`).join('')}</div>`);
    bindSay(root);
    const chosen = [];
    const draw = () => {
      $('#ans', root).innerHTML = chosen.map(i => `<button class="tile" data-i="${i}">${esc(ex.tiles[i])}</button>`).join('');
      $$('#bank .tile', root).forEach(b => b.classList.toggle('used', chosen.includes(+b.dataset.i)));
      $$('#ans .tile', root).forEach(b => b.onclick = () => { if (L.checked) return; chosen.splice(chosen.indexOf(+b.dataset.i), 1); draw(); });
      setReady(chosen.length > 0);
    };
    $$('#bank .tile', root).forEach(b => b.onclick = () => {
      if (L.checked || b.classList.contains('used')) return;
      chosen.push(+b.dataset.i); if (ex.to === 'fr') say(ex.tiles[+b.dataset.i]); draw();
    });
    cur.check = () => {
      const text = chosen.map(i => ex.tiles[i]).join(' ');
      const ok = answers.some(a => norm(a) === norm(text));
      return { ok, answer: answers[0], say: ex.s.fr, meaning: ex.listen ? first(ex.s.sv) : null };
    };
  },
  type(ex, root) {
    const toFr = ex.to === 'fr';
    root.innerHTML = `<p class="kind">Skriv</p><h2 class="q">${toFr ? 'Skriv på franska' : 'Skriv på svenska'}</h2>
      ${npc(ex.u, toFr ? `<span>${esc(first(ex.s.sv))}</span>` : `${speakerBtns(ex.s.fr)}<span class="fr-t">${esc(ex.s.fr)}</span>`)}
      <textarea id="inp" rows="3" placeholder="${toFr ? 'Skriv på franska…' : 'Skriv på svenska…'}" autocapitalize="off" autocomplete="off" spellcheck="false"></textarea>
      ${toFr ? accentBar() : ''}`;
    bindSay(root); bindAccents(root);
    if (!toFr) setTimeout(() => say(ex.s.fr), 300);
    const inp = $('#inp', root); inp.oninput = () => setReady(inp.value.trim().length > 0);
    inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); onCheck(); } };
    const answers = toFr ? [ex.s.fr, ...(ex.s.alt || [])] : variants(ex.s.sv);
    cur.check = () => { const g = grade(inp.value, answers); inp.disabled = true; return { ...g, answer: answers[0], say: ex.s.fr }; };
  },
  listenType(ex, root) {
    root.innerHTML = `<p class="kind">Lyssna</p><h2 class="q">Skriv det du hör</h2>
      <div class="listen-big"><button class="say-big" data-say="${esc(ex.s.fr)}">🔊</button><button class="say-big slow" data-slow="${esc(ex.s.fr)}">🐢</button></div>
      <textarea id="inp" rows="2" placeholder="Skriv på franska…" autocapitalize="off" autocomplete="off" spellcheck="false"></textarea>${accentBar()}`;
    bindSay(root); bindAccents(root); setTimeout(() => say(ex.s.fr), 300);
    const inp = $('#inp', root); inp.oninput = () => setReady(inp.value.trim().length > 0);
    inp.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); onCheck(); } };
    cur.check = () => { const g = grade(inp.value, [ex.s.fr, ...(ex.s.alt || [])]); inp.disabled = true; return { ...g, answer: ex.s.fr, say: ex.s.fr, meaning: first(ex.s.sv) }; };
  },
  speak(ex, root) {
    root.innerHTML = `<p class="kind">Uttal</p><h2 class="q">Säg meningen högt</h2>
      ${npc(ex.u, `${speakerBtns(ex.s.fr)}<span class="fr-t">${esc(ex.s.fr)}</span>`)}
      <button class="mic" id="mic">🎙️<span>Tryck och prata</span></button><p class="heard muted" id="heard"></p>
      <button class="link" id="skip">Jag kan inte prata just nu</button>`;
    bindSay(root);
    const target = norm(ex.s.fr, false).split(' ');
    let rec = null;
    $('#mic', root).onclick = () => {
      if (L.checked) return;
      try {
        rec = new SR(); rec.lang = 'fr-FR'; rec.interimResults = false; rec.maxAlternatives = 3;
        $('#mic', root).classList.add('rec'); $('#mic span', root).textContent = 'Lyssnar…';
        rec.onresult = e => {
          const alts = [...e.results[0]].map(a => a.transcript);
          let best = 0, bestT = alts[0];
          for (const t of alts) { const said = new Set(norm(t, false).split(' ')); const hit = target.filter(w => said.has(w)).length / target.length; if (hit > best) { best = hit; bestT = t; } }
          $('#heard', root).textContent = `Jag hörde: ”${bestT}”`;
          setReady(true);
          cur.check = () => ({ ok: best >= 0.6, answer: ex.s.fr, say: ex.s.fr, note: best >= 0.6 && best < 1 ? 'Nästan perfekt uttal!' : '' });
          setTimeout(onCheck, 400);
        };
        rec.onerror = e => {
          if (['not-allowed', 'service-not-allowed', 'language-not-supported', 'audio-capture'].includes(e.error)) { micBroken(ex, e.error); return; }
          $('#heard', root).textContent = e.error === 'network' ? 'Taligenkänningen behöver internet – försök igen.' : 'Jag hörde inget – försök igen.';
        };
        rec.onend = () => { $('#mic', root)?.classList.remove('rec'); const s = $('#mic span', root); if (s) s.textContent = 'Tryck och prata'; };
        rec.start();
      } catch { micBroken(ex, 'start'); }
    };
    $('#skip', root).onclick = () => {
      S.speakPausedUntil = Date.now() + 15 * 60 * 1000; save(false);
      rec?.abort?.();
      L.done++; L.checked = true; next();
    };
    cur.check = () => ({ ok: false, answer: ex.s.fr });
  },
  dialogue(ex, root) {
    const st = ex.story, un = COURSE[ex.u];
    root.innerHTML = `<p class="kind">Berättelse · ${esc(st.title)}</p>
      <div class="dlg">${st.lines.map((ln, i) => `<div class="dl ${ln.who}" data-i="${i}">
        ${ln.who === 'npc' ? `<div class="dl-av">${ART.character(un.character)}</div>` : ''}
        <button class="dl-b" data-say="${esc(ln.fr)}"><span class="fr-t">${esc(ln.fr)}</span><span class="dl-sv">${esc(ln.sv)}</span></button></div>`).join('')}</div>
      <p class="muted small center">Tryck på en replik för att höra den. Håll inne för översättning.</p>
      <h2 class="q">${esc(ex.q.q)}</h2>
      <div class="opts">${ex.q.options.map((o, i) => `<button class="opt" data-o="${i}"><span class="num">${i + 1}</span>${esc(o)}</button>`).join('')}</div>`;
    $$('.dl-b', root).forEach(b => {
      b.onclick = () => say(b.dataset.say);
      let t; const show = () => b.classList.add('tr'), hide = () => { clearTimeout(t); b.classList.remove('tr'); };
      b.addEventListener('pointerdown', () => { t = setTimeout(show, 350); }); b.addEventListener('pointerup', hide); b.addEventListener('pointerleave', hide);
      b.addEventListener('contextmenu', e => e.preventDefault());
    });
    let sel = null;
    $$('[data-o]', root).forEach(b => b.onclick = () => {
      if (L.checked) return; sel = +b.dataset.o;
      $$('[data-o]', root).forEach(x => x.classList.toggle('sel', x === b)); setReady(true);
    });
    cur.check = () => ({ ok: sel === ex.q.a, answer: ex.q.options[ex.q.a] });
  },
};
function accentBar() { return `<div class="accents">${['é', 'è', 'ê', 'à', 'â', 'ç', 'î', 'ô', 'û', 'ù', 'ë', 'œ'].map(a => `<button data-acc="${a}">${a}</button>`).join('')}</div>`; }
function bindAccents(root) {
  $$('[data-acc]', root).forEach(b => b.onclick = e => {
    e.preventDefault(); const inp = $('#inp', root); if (inp.disabled) return;
    const s = inp.selectionStart ?? inp.value.length, en = inp.selectionEnd ?? s;
    inp.value = inp.value.slice(0, s) + b.dataset.acc + inp.value.slice(en);
    inp.focus(); inp.setSelectionRange(s + 1, s + 1); inp.dispatchEvent(new Event('input'));
  });
}
document.addEventListener('keydown', e => {
  if (!L || !$('.lesson')) return;
  if (e.key === 'Enter' && document.activeElement?.tagName !== 'TEXTAREA') { e.preventDefault(); onCheck(); }
  if (/^[1-4]$/.test(e.key) && document.activeElement?.tagName !== 'TEXTAREA') { const o = $$('.opt, .pcard')[+e.key - 1]; o?.click(); }
});

// ================= Start =================
async function boot() {
  app.innerHTML = `<div class="splash"><h1>Allez !</h1><p>Port-Saint-Clément</p></div>`;
  const remote = await initRemote();
  if (remote && sb && !userId) { renderAuth(); return; }
  if (!remote) userId = 'local';
  load();
  if (sb) await pullRemote();
  if (!S.name) { renderOnboard(); return; }
  save(); go('home');
  setInterval(() => { if (!L) { const h = S.hearts; tick(); if (h !== S.hearts && view) { const el = $('.stat.hearts b'); if (el) el.textContent = S.hearts; save(false); } } }, 60000);
}
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { }));
boot();

// För test
window.__psc = { get S() { return S; }, get L() { return L; }, COURSE, renderEx: () => renderEx() };
