import { COURSE, FUTURE } from './content.js';
import { CONFIG } from './config.js';
import * as ART from './art.js';
import { STORIES } from './stories.js';
import { PH } from './audiomap.js';
import { SERIAL } from './serial.js';
import { SV } from './svmap.js';

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
const PROPER = new Set(['Poireau', 'Brioche', 'Gaspard', 'Marie', 'Rémi', 'Lefèvre', 'Paul', 'Paris', 'Lucas', 'France', 'Port-Saint-Clément', 'Olivier', 'Dubois']);
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
  frVoices = [frVoice, ...fr.filter(v => v !== frVoice)].filter(Boolean);
}
let frVoices = [];
if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
// Inspelade röster: fraser i audio/ph, samtal i audio/stories. Talsyntes som reserv.
const AUDIO_ROOT = CONFIG.SUPABASE_URL ? CONFIG.SUPABASE_URL + '/storage/v1/object/public/audio/' : '';
let phraseAudio = null;
function stopAudio() { try { phraseAudio?.pause(); storyAudio?.pause(); } catch {} }
function say(text, slow = false, opt = {}) {
  const key = String(text).replace(/\|/g, ' ').trim();
  const id = AUDIO_ROOT && PH[key];
  if (id && !opt.noRec) {
    stopAudio(); if ('speechSynthesis' in window) speechSynthesis.cancel();
    if (!phraseAudio) phraseAudio = new Audio();
    const a = phraseAudio; let done = false;
    const fin = () => { if (!done) { done = true; opt.onend?.(); } };
    const fallback = () => { if (!done) { done = true; say(text, slow, { ...opt, noRec: true }); } };
    a.onended = fin; a.onerror = fallback;
    a.src = `${AUDIO_ROOT}ph/p${id}.mp3`;
    a.preservesPitch = true; a.webkitPreservesPitch = true;
    a.playbackRate = slow ? 0.7 : 1;
    const p = a.play(); if (p && p.catch) p.catch(fallback);
    return;
  }
  if (!('speechSynthesis' in window)) { opt.onend?.(); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/\|/g, ' '));
  u.lang = 'fr-FR'; const v = opt.voice || frVoice; if (v) u.voice = v;
  u.rate = slow ? 0.55 : (opt.rate || 0.9); u.pitch = opt.pitch || 1;
  if (opt.onend) { let done = false; const f = () => { if (!done) { done = true; opt.onend(); } }; u.onend = f; u.onerror = f; setTimeout(f, 1500 + text.length * 90); }
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
  q: null, questsDone: 0, chestDay: '', ach: {}, practiceDone: 0,
  serial: { done: {}, lastNewDay: '' }, amb: true,
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


// ================= Dagens uppdrag och utmärkelser =================
const QUEST_POOL = [
  { id: 'xp', n: [20, 30, 40], t: n => `Samla ${n} XP`, e: '⚡' },
  { id: 'lessons', n: [2, 3], t: n => `Gör ${n} lektioner`, e: '📘' },
  { id: 'perfect', n: [1], t: () => 'Gör en lektion utan fel', e: '🎯' },
  { id: 'story', n: [1, 2], t: n => n === 1 ? 'Lyssna på ett samtal' : `Lyssna på ${n} samtal`, e: '🎧' },
  { id: 'practice', n: [1], t: () => 'Gör en repetition', e: '🏋️' },
  { id: 'combo', n: [8, 12], t: n => `Svara rätt ${n} gånger i rad`, e: '🔥' },
];
function hashStr(str) { let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function quests() {
  const dk = dayKey();
  if (!S.q || S.q.day !== dk) {
    let h = hashStr(dk + (S.name || '')); const pool = [...QUEST_POOL]; const list = [];
    if (!doneLessons().length) pool.splice(pool.findIndex(q => q.id === 'practice'), 1);
    for (let i = 0; i < 3; i++) { const q = pool.splice(h % pool.length, 1)[0]; h = Math.imul(h ^ (h >>> 13), 2654435761) >>> 0; list.push({ id: q.id, n: q.n[h % q.n.length], p: 0, done: false }); }
    S.q = { day: dk, list };
  }
  return S.q.list;
}
const questDef = id => QUEST_POOL.find(q => q.id === id);
// Uppdaterar uppdragen efter en avslutad aktivitet. Returnerar html med nya belöningar.
function progressQuests(ev) {
  let html = '';
  quests().forEach(q => {
    if (q.done) return;
    if (q.id === 'xp') q.p = S.dayXp;
    else if (q.id === 'lessons' && ev.kind === 'lesson') q.p++;
    else if (q.id === 'perfect' && ev.kind === 'lesson' && ev.perfect) q.p++;
    else if (q.id === 'story' && ev.kind === 'story') q.p++;
    else if (q.id === 'practice' && ev.kind === 'practice') q.p++;
    else if (q.id === 'combo') q.p = Math.max(q.p, ev.combo || 0);
    if (q.p >= q.n) { q.done = true; q.p = q.n; S.ecus += 10; S.questsDone++; html += `<p class="unlock">${questDef(q.id).e} Uppdrag klart: ${questDef(q.id).t(q.n)}! +10 🪙</p>`; }
  });
  if (quests().every(q => q.done) && S.chestDay !== S.q.day) { S.chestDay = S.q.day; S.ecus += 25; html += `<p class="unlock">🎁 Alla dagens uppdrag klara! Skattkistan gav +25 🪙</p>`; }
  return html;
}
function questCard() {
  const list = quests(), all = list.every(q => q.done);
  return `<div class="card quests"><div class="q-head"><b>Dagens uppdrag</b><span class="chest ${all ? 'open' : ''}">${all ? '🎁' : '🧰'}</span></div>
    ${list.map(q => { const d = questDef(q.id), pct = Math.round(Math.min(q.p, q.n) / q.n * 100);
      return `<div class="q-row ${q.done ? 'done' : ''}"><span class="q-e">${q.done ? '✅' : d.e}</span><div class="q-b"><div class="q-t">${d.t(q.n)}</div><div class="pbar"><i style="width:${pct}%"></i></div></div><small>${Math.min(q.p, q.n)}/${q.n}</small></div>`; }).join('')}
    <p class="muted small">10 🪙 per uppdrag – klara alla tre för en skattkista.</p></div>`;
}

const unitsDone = () => COURSE.filter((_, u) => unitDone(u)).length;
const storiesDone = () => Object.keys(S.stories || {}).length;
const totalStories = () => Object.values(STORIES).reduce((n, a) => n + a.length, 0);
const ACH = [
  { id: 'streak', e: '🔥', name: 'Ihärdig', d: n => `${n} dagar i rad`, lv: [3, 7, 30, 100], v: () => Math.max(S.streak || 0, streakOf(S)) },
  { id: 'xp', e: '⚡', name: 'Flitig', d: n => `${n} XP totalt`, lv: [100, 500, 2000, 5000], v: () => S.xp },
  { id: 'lessons', e: '📘', name: 'Lärling', d: n => `${n} lektioner`, lv: [10, 50, 150, 300], v: () => S.lessonsDone },
  { id: 'perfect', e: '🎯', name: 'Perfektionist', d: n => `${n} lektioner utan fel`, lv: [5, 25, 75], v: () => S.perfect },
  { id: 'stories', e: '🎧', name: 'Lyssnare', d: n => `${n} samtal`, lv: [3, 15, 45], v: storiesDone },
  { id: 'units', e: '🗺️', name: 'Upptäckare', d: n => `${n} kvarter klara`, lv: [1, 5, 10, 15], v: unitsDone },
  { id: 'words', e: '📚', name: 'Ordförråd', d: n => `${n} ord`, lv: [50, 200, 500], v: () => wordsLearned() },
  { id: 'quests', e: '🧰', name: 'Uppdragstagare', d: n => `${n} uppdrag`, lv: [10, 50, 150], v: () => S.questsDone },
];
const achLevel = a => a.lv.filter(n => a.v() >= n).length;
function checkAchievements() {
  let html = '';
  S.ach = S.ach || {};
  ACH.forEach(a => {
    const lv = achLevel(a), had = S.ach[a.id] || 0;
    if (lv > had) { S.ach[a.id] = lv; S.ecus += 20 * (lv - had); html += `<p class="unlock">🏅 Ny utmärkelse: ${a.e} ${a.name} – ${a.d(a.lv[lv - 1])}! +${20 * (lv - had)} 🪙</p>`; }
  });
  return html;
}
function achGrid() {
  return `<div class="ach-grid">${ACH.map(a => { const lv = achLevel(a), max = a.lv.length, nextN = a.lv[Math.min(lv, max - 1)], val = a.v();
    return `<div class="card ach ${lv ? 'got' : ''}"><div class="ach-e">${a.e}<span class="ach-lv">${lv}/${max}</span></div><b>${a.name}</b><small>${lv >= max ? 'Max nivå! ' + a.d(a.lv[max - 1]) : a.d(nextN)}</small>
      ${lv < max ? `<div class="pbar"><i style="width:${Math.min(100, Math.round(val / nextN * 100))}%"></i></div>` : ''}</div>`; }).join('')}</div>`;
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

// ================= Smart repetition =================
// Varje ord och mening får en "låda" 0–5. Rätt svar flyttar upp och skjuter fram nästa repetition,
// fel svar flyttar tillbaka till låda 0 så att den kommer tillbaka direkt.
const SRS_DAYS = [0, 1, 3, 7, 14, 30];
function bumpItem(k, ok) {
  S.srs = S.srs || {};
  const it = S.srs[k] || { b: 0, w: 0 };
  if (ok) it.b = Math.min(5, it.b + 1); else { it.b = 0; it.w = (it.w || 0) + 1; }
  const d = new Date(); d.setDate(d.getDate() + SRS_DAYS[it.b]); it.due = dayKey(d);
  S.srs[k] = it;
}
function trackAnswer(ex, ok) {
  if (ex.type === 'match') { ex.words.forEach(w => bumpItem('w:' + w.fr, true)); return; }
  if (ex.s) bumpItem('s:' + ex.s.fr, ok);
  else if (ex.w) bumpItem('w:' + ex.w.fr, ok);
}
const isWeak = it => it && it.w > 0 && it.b < 3;
function practicePool() {
  const out = [];
  doneLessons().forEach(({ u, le }) => {
    le.words.forEach(w => out.push({ k: 'w:' + w.fr, u, w }));
    le.sentences.forEach(s => out.push({ k: 's:' + s.fr, u, s }));
  });
  return out;
}
function weakCount() {
  const today = dayKey(); const srs = S.srs || {};
  return new Set(practicePool().filter(p => isWeak(srs[p.k]) && (srs[p.k].due || today) <= today).map(p => p.k)).size;
}
function practiceExercises(n) {
  const today = dayKey(), srs = S.srs || {};
  const prio = p => { const it = srs[p.k]; if (!it) return 3 + Math.random(); const due = (it.due || today) <= today; return (due ? 0 : 6) + it.b - (isWeak(it) ? 1 : 0) + Math.random() * 0.9; };
  const seen = new Set();
  const picked = practicePool().map(p => ({ ...p, pr: prio(p) })).sort((a, b) => a.pr - b.pr).filter(p => !seen.has(p.k) && seen.add(p.k)).slice(0, n);
  const units = [...new Set(doneLessons().map(x => x.u))], wpool = wordPool(units);
  return shuffle(picked.map((p, i) => {
    if (p.w) return mkMC(p.w, wpool, i % 2 === 1);
    const spool = sentencePool([p.u]), k = i % 4;
    return k === 0 ? mkTiles(p.s, 'fr', spool, p.u) : k === 1 ? mkListenType(p.s, p.u) : k === 2 ? mkType(p.s, 'sv', p.u) : mkType(p.s, 'fr', p.u);
  }));
}

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
function timeOfDay() { const h = new Date().getHours(); return h >= 21 || h < 6 ? 'night' : h < 9 ? 'morning' : h >= 17 ? 'evening' : 'day'; }
function go(v) { view = v; tick(); if (v !== 'home') setAmbience(null); document.body.dataset.tod = timeOfDay(); ({ home: renderHome, league: renderLeague, profile: renderProfile })[v](); window.scrollTo(0, 0); }

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
  html += questCard();
  html += serialCard();
  const curU = cur ? cur[0] : -1;
  html += `<details class="card mapcard" ${S.mapOpen ? 'open' : ''}><summary><b>🗺️ Stadskartan</b><span class="muted small"> ${COURSE.filter((_, u) => unitDone(u)).length} av ${COURSE.length} kvarter klara</span></summary>
    ${ART.townMap(COURSE.map((un, u) => ({ fr: un.fr, color: un.color, state: unitDone(u) ? 'done' : u === curU ? 'cur' : unitUnlocked(u) ? 'open' : 'locked' })))}
    <p class="muted small">Tryck på ett hus för att gå till kvarteret.</p></details>`;
  if (doneLessons().length) {
    const weak = weakCount();
    const label = S.hearts < HEART_MAX ? '🏋️ Öva och få tillbaka ❤️' : weak ? `🏋️ Repetera ${weak} ${weak === 1 ? 'svårt ord eller mening' : 'svåra ord och meningar'}` : '🏋️ Snabbövning (+5 XP)';
    html += `<div class="chip-row"><button class="practice-chip" id="practice">${label}</button><button class="practice-chip listen-chip" id="listenB">🎧 Lyssna fritt</button></div>`;
  }

  COURSE.forEach((un, u) => {
    const unlocked = unitUnlocked(u);
    html += `<section class="unit ${unlocked ? '' : 'locked'}" style="--uc:${un.color};--ud:${un.dark}">
      <div class="unit-head"><div><small>Kvarter ${u + 1} · ${un.level}</small><h2>${un.fr}</h2><p>${un.sv} – ${un.desc}</p></div>
      <button class="guide-b" data-guide="${u}" aria-label="Guidebok">📖</button></div>
      <div class="scene" data-scene="${un.id}">${ART.scene(un.id)}${!unlocked ? `<div class="lock-over"><span>🔒</span><button class="btn small" data-jump="${u}">Hoppa hit?</button></div>` : ''}</div>
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
      (STORIES[un.id] || []).forEach((st, si) => {
        if (st.after !== l) return;
        const sOpen = unitUnlocked(u) && crownsOf(le.id) >= 1, sDone = (S.stories || {})[st.id];
        html += `<div class="node-row story-row" style="transform:translateX(${-off / 2}px)">
          <button class="node story ${sOpen ? 'open' : ''} ${sDone ? 'done' : ''}" data-story="${u}:${si}" aria-label="Lyssna: ${esc(st.title)}">${!sOpen ? '🔒' : sDone ? '🎧' : '🎧'}</button>
          <div class="story-lbl">${sDone ? '✓ ' : ''}Lyssna</div></div>`;
      });
    });
    html += `</div></section>${ART.tramDivider()}`;
  });
  if (!FUTURE.length) html += `<section class="card fin"><div class="big-emoji">🎉</div><h2>Fin du voyage… pour l'instant !</h2><p class="muted">Du har sett hela Port-Saint-Clément. Fortsätt repetera för att få kronor på alla lektioner – fler kvarter kan byggas.</p></section>`;
  FUTURE.forEach((f, i) => {
    html += `<section class="unit future"><div class="unit-head"><div><small>Kvarter ${COURSE.length + i + 1} · ${f.level}</small><h2>${f.fr}</h2><p>${f.sv} – ${f.desc}</p></div></div>
      <div class="scene">${ART.scene(f.id)}<div class="lock-over"><span class="soon">Byggs snart</span></div></div></section>`;
  });
  shell(html);

  $$('.node:not(.story)').forEach(n => n.onclick = () => nodeSheet(+n.dataset.u, +n.dataset.l));
  $$('.node.story').forEach(n => n.onclick = () => { const [u, si] = n.dataset.story.split(':').map(Number); storySheet(u, si); });
  $$('[data-guide]').forEach(b => b.onclick = () => guide(+b.dataset.guide));
  const mc = $('.mapcard'); if (mc) mc.ontoggle = () => { S.mapOpen = mc.open; save(false); };
  $$('.map-pin').forEach(p => p.addEventListener('click', () => { const sec = $$('.unit')[+p.dataset.unit]; if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); }));
  $$('[data-jump]').forEach(b => b.onclick = () => jumpSheet(+b.dataset.jump));
  const p = $('#practice'); if (p) p.onclick = startPractice;
  const lb = $('#listenB'); if (lb) lb.onclick = () => startListen();
  const sc = $('#serialB'); if (sc) sc.onclick = serialSheet;
  watchAmbience();
  const curEl = $('.node.cur'); if (curEl && !renderHome.scrolled) { renderHome.scrolled = true; setTimeout(() => curEl.scrollIntoView({ block: 'center', behavior: 'smooth' }), 150); }

  if (!S.welcomed) welcome();
  else checkCheers();
  installHint();
  pushCard();
}

function welcome() {
  S.welcomed = true; save();
  const un = COURSE[0];
  sheet(`<div class="welcome">${ART.character(un.character, 'wave')}<div class="bubble fr" data-say="${esc(un.welcome)}">🔊 ${esc(un.welcome)}</div></div>
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
  sheet(`<div class="ns-char">${ART.character(un.character, 'wave')}</div><div class="ns-head" style="--uc:${un.color}"><small>${un.fr} · Lektion ${l + 1}</small><h2>${esc(le.title)}</h2><p>${esc(le.sv)}</p></div>
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

// ================= Pushnotiser =================
const pushSupported = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
function b64ToBytes(b64) {
  const pad = '='.repeat((4 - b64.length % 4) % 4);
  const raw = atob((b64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(raw, c => c.charCodeAt(0));
}
let vapidKey = null;
async function getVapid() {
  if (vapidKey) return vapidKey;
  const { data, error } = await sb.functions.invoke('push', { body: { type: 'key' } });
  if (error || !data?.key) throw error || new Error('ingen nyckel');
  return (vapidKey = data.key);
}
async function storeSub(sub) {
  const j = sub.toJSON();
  const { error } = await sb.from('push_subs').upsert({ user_id: userId, endpoint: j.endpoint, p256dh: j.keys.p256dh, auth: j.keys.auth }, { onConflict: 'endpoint' });
  if (error) console.warn('push_subs', error);
  return !error;
}
async function enablePush() {
  if (!sb || userId === 'local') { toast('Påminnelser kräver inloggning'); return false; }
  if (/iphone|ipad|ipod/i.test(navigator.userAgent) && !isStandalone()) {
    sheet(`<div class="big-emoji">📲</div><h2>Lägg appen på hemskärmen först</h2>
      <p>På iPhone fungerar påminnelser bara när Allez! är tillagd på hemskärmen. Tryck på <b>Dela</b> ⬆︎ → <b>Lägg till på hemskärmen</b>, öppna appen därifrån och slå på påminnelserna under Profil.</p>
      <button class="btn primary" data-close>OK</button>`);
    return false;
  }
  if (!pushSupported()) { toast('Den här webbläsaren kan inte ta emot påminnelser'); return false; }
  const perm = await Notification.requestPermission();
  if (perm !== 'granted') { toast('Påminnelser är avstängda för appen i telefonens inställningar'); return false; }
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription() || await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToBytes(await getVapid()) });
    if (!(await storeSub(sub))) { toast('Kunde inte spara – försök igen'); return false; }
    S.push = true; save(); toast('🔔 Påminnelser påslagna');
    return true;
  } catch (e) { console.warn(e); toast('Kunde inte slå på påminnelser'); return false; }
}
async function disablePush() {
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) { await sb?.from('push_subs').delete().eq('endpoint', sub.endpoint); await sub.unsubscribe(); }
  } catch { }
  S.push = false; save(); toast('Påminnelser avstängda');
}
async function refreshPush() {
  // Ser till att telefonens prenumeration finns kvar i databasen (den kan bytas ut av webbläsaren)
  if (!S.push || !sb || userId === 'local' || !pushSupported() || Notification.permission !== 'granted') return;
  try {
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToBytes(await getVapid()) });
    await storeSub(sub);
  } catch (e) { console.warn(e); }
}
function pushCard() {
  if (!sb || userId === 'local' || S.push || S.pushDismissed || !doneLessons().length || $('.push-card')) return;
  if (!pushSupported() && !/iphone|ipad|ipod/i.test(navigator.userAgent)) return;
  const el = document.createElement('div'); el.className = 'install card push-card';
  el.innerHTML = `<span>🔔</span><div>Vill du få en påminnelse kl. 19 när du inte har övat – och se pepp direkt?</div>
    <button class="btn small primary" id="pOn">Slå på</button><button class="x" aria-label="Stäng">✕</button>`;
  const goal = $('.goal'); goal ? goal.after(el) : $('.main').prepend(el);
  $('.x', el).onclick = () => { S.pushDismissed = true; save(); el.remove(); };
  $('#pOn', el).onclick = async () => { if (await enablePush()) el.remove(); };
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
      sb.functions.invoke('push', { body: { type: 'cheer', to: id } }).catch(() => { });
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
    <h3 class="sub">Utmärkelser</h3>
    ${achGrid()}
    <h3 class="sub">Dagens mål</h3>
    <div class="seg">${[10, 20, 30, 50].map(g => `<button data-goal="${g}" class="${S.dailyGoal === g ? 'on' : ''}">${g} XP<small>${({ 10: 'Lugnt', 20: 'Vanligt', 30: 'Seriöst', 50: 'Intensivt' })[g]}</small></button>`).join('')}</div>
    <h3 class="sub">Butiken</h3>
    <div class="shop">
      <div class="card shop-i"><span>🧊</span><div><b>Svitfrysning</b><div class="muted">Skyddar sviten en dag. Du har ${S.freezes}/2.</div></div><button class="btn small" id="buyF" ${S.freezes >= 2 || S.ecus < 50 ? 'disabled' : ''}>50 🪙</button></div>
      <div class="card shop-i"><span>❤️</span><div><b>Fyll på hjärtan</b><div class="muted">Från ${S.hearts} till ${HEART_MAX}.</div></div><button class="btn small" id="buyH" ${S.hearts >= HEART_MAX || S.ecus < 80 ? 'disabled' : ''}>80 🪙</button></div>
    </div>
    <h3 class="sub">Inställningar</h3>
    <div class="card settings">
      ${sb && userId !== 'local' ? `<label><span>Påminnelser kl. 19 och pepp</span><input type="checkbox" id="setPush" ${S.push ? 'checked' : ''}></label>` : ''}
      <label><span>Ljudeffekter</span><input type="checkbox" id="setSound" ${S.sound ? 'checked' : ''}></label>
      ${AUDIO_ROOT ? `<label><span>Bakgrundsljud i kvarteren</span><input type="checkbox" id="setAmb" ${S.amb !== false ? 'checked' : ''}></label>` : ''}
      <label><span>Taluppgifter (mikrofon)${SR ? '' : ' – stöds inte här'}</span><input type="checkbox" id="setSpeak" ${S.speak && !S.speakBroken ? 'checked' : ''} ${SR ? '' : 'disabled'}></label>
      ${AUDIO_ROOT && 'caches' in window ? `<button class="row-b" id="offAudio">⬇️ Ljud offline <small class="muted" id="offInfo"></small></button>` : ''}
      ${doneLessons().length ? '<button class="row-b" id="listenP">🎧 Lyssna fritt (handsfree)</button>' : ''}
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
  const sa = $('#setAmb'); if (sa) sa.onchange = e => { S.amb = e.target.checked; save(); if (!S.amb) setAmbience(null); };
  const sp = $('#setPush'); if (sp) sp.onchange = async e => { if (e.target.checked) { if (!(await enablePush())) e.target.checked = false; } else disablePush(); };
  $('#setSpeak').onchange = e => { S.speak = e.target.checked; S.speakPausedUntil = 0; S.speakBroken = false; save(); };
  $('#editP').onclick = () => renderOnboard(true);
  $('#words').onclick = wordList;
  const lp = $('#listenP'); if (lp) lp.onclick = () => startListen();
  const oa = $('#offAudio'); if (oa) { offlineInfo().then(t => { const i = $('#offInfo'); if (i) i.textContent = t; }); oa.onclick = offlineSheet; }
  $('#testVoice').onclick = () => say('Bonjour ! Je voudrais un croissant, s\'il vous plaît.');
  const lo = $('#logout'); if (lo) lo.onclick = async () => { await sb.auth.signOut(); localStorage.removeItem('psc_last_user'); location.reload(); };
}


// ================= Ljud offline =================
const AUDIO_CACHE = 'allez-audio';
function allAudioUrls(units) {
  const urls = new Set();
  const addTxt = t => { const id = PH[String(t).replace(/\|/g, ' ').trim()]; if (id) urls.add(`${AUDIO_ROOT}ph/p${id}.mp3`); };
  units.forEach(u => {
    const un = COURSE[u]; addTxt(un.welcome); un.tips.forEach(t => addTxt(t.fr));
    un.lessons.forEach(l => { l.words.forEach(w => addTxt(w.fr)); l.sentences.forEach(x => addTxt(x.fr)); l.story?.lines.forEach(x => addTxt(x.fr)); });
    (STORIES[un.id] || []).forEach(st => st.lines.forEach((_, i) => urls.add(lineUrl(st, i))));
    SERIAL.eps.filter(ep => ep.u === u).forEach(st => st.lines.forEach((_, i) => urls.add(lineUrl(st, i))));
    urls.add(ambUrl(un.id));
    un.lessons.forEach(l => [...l.words, ...l.sentences].forEach(x => { const u2 = svUrl(String(x.sv).split('|')[0]); if (u2) urls.add(u2); }));
  });
  return [...urls];
}
async function offlineInfo() {
  try { const c = await caches.open(AUDIO_CACHE); const n = (await c.keys()).length; return n ? `${n} filer sparade` : ''; } catch { return ''; }
}
function offlineSheet() {
  const reach = COURSE.map((_, u) => u).filter(u => unitUnlocked(u));
  const mine = allAudioUrls(reach), all = allAudioUrls(COURSE.map((_, u) => u));
  sheet(`<div class="big-emoji">⬇️</div><h2>Ljud offline</h2>
    <p>Spara de inspelade rösterna i telefonen, så hörs de även utan nät – på tåget eller utomlands.</p>
    <div id="offProg" class="muted"></div>
    <button class="btn primary" id="dlMine">Mina kvarter (${mine.length} ljud, ca ${Math.round(mine.length * 0.025)} MB)</button>
    <button class="btn" id="dlAll">Hela staden (${all.length} ljud, ca ${Math.round(all.length * 0.025)} MB)</button>
    <button class="btn" id="dlClear">Ta bort sparat ljud</button>
    <button class="btn" data-close>Stäng</button>`, (w) => {
    const prog = $('#offProg', w);
    const run = async urls => {
      $$('.btn', w).forEach(b => b.disabled = true);
      const c = await caches.open(AUDIO_CACHE); const have = new Set((await c.keys()).map(r => r.url));
      const todo = urls.filter(u => !have.has(u)); let done = 0, fail = 0;
      const step = async () => { while (todo.length) { const u = todo.pop(); try { const r = await fetch(u); if (r.ok) await c.put(u, r); else fail++; } catch { fail++; } done++; prog.textContent = `Sparar… ${done} av ${done + todo.length}`; } };
      prog.textContent = todo.length ? 'Sparar…' : 'Allt var redan sparat.';
      await Promise.all([step(), step(), step(), step()]);
      try { await navigator.storage?.persist?.(); } catch { }
      prog.textContent = fail ? `Klart, men ${fail} ljud gick inte att hämta. Försök igen senare.` : '✓ Klart! Ljudet fungerar nu även utan nät.';
      $$('.btn', w).forEach(b => b.disabled = false);
    };
    $('#dlMine', w).onclick = () => run(mine);
    $('#dlAll', w).onclick = () => run(all);
    $('#dlClear', w).onclick = async () => { await caches.delete(AUDIO_CACHE); prog.textContent = 'Sparat ljud borttaget.'; };
  });
}

function wordList() {
  const groups = COURSE.map(un => {
    const seen = new Set();
    const ws = un.lessons.filter(le => crownsOf(le.id) >= 1).flatMap(le => le.words).filter(w => !seen.has(w.fr) && seen.add(w.fr));
    return { un, ws };
  }).filter(g => g.ws.length);
  sheet(`<h2>Mina ord</h2>${groups.length ? groups.map(g => `<h3 class="sub">${esc(g.un.fr)}</h3>
    <div class="wl">${g.ws.map(w => `<button class="wl-r" data-say="${esc(w.fr)}"><span>${w.e}</span><b>${esc(w.fr)}${isWeak((S.srs || {})['w:' + w.fr]) ? ' <small class="weak">svår</small>' : ''}</b><span class="muted">${esc(first(w.sv))}</span><i>🔊</i></button>`).join('')}</div>`).join('')
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
  startSession({ kind: 'practice', queue: practiceExercises(8) });
}
function startTest(u) {
  startSession({ kind: 'test', u, queue: mixedExercises([...Array(u).keys()], 12), lives: 3 });
}
function startSession(o) {
  setAmbience(o.u != null ? COURSE[o.u].id : null);
  L = { ...o, i: 0, done: 0, total: o.queue.length, mistakes: 0, combo: 0, maxCombo: 0, start: Date.now(), requeued: new Set(), checked: false };
  renderEx();
}
function quitLesson() {
  sheet(`<div class="welcome">${ART.character('brioche', 'sad')}</div><h2>Vill du verkligen sluta?</h2><p>Du förlorar framstegen i den här lektionen.</p>
    <button class="btn primary" data-close>Fortsätt lära</button><button class="btn ghost" id="q">Avsluta</button>`,
    (w, close) => $('#q', w).onclick = () => { close(); speechSynthesis?.cancel(); storyAudio?.pause(); setAmbience(null); L = null; save(); go('home'); });
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
  if (!L || L.over || L.kind === 'story') return;
  if (L.checked) { next(); return; }
  if (!cur.ready) return;
  const r = cur.check();
  showFeedback(r);
}
function showFeedback(r) {
  L.checked = true;
  const ex = L.queue[L.i];
  chime(r.ok);
  trackAnswer(ex, r.ok);
  if (r.ok) { L.done++; L.combo++; L.maxCombo = Math.max(L.maxCombo, L.combo); }
  else {
    L.mistakes++; L.combo = 0;
    if (L.kind === 'lesson') loseHeart();
    if (L.kind === 'test') L.lives--;
    if (L.kind !== 'test' && !L.requeued.has(L.i)) { L.requeued.add(L.queue.length); L.queue.push(ex); }
    else if (L.kind !== 'test') L.done++; // räkna ändå fram efter andra försöket
    if (L.kind === 'test') L.done++;
  }
  const nc = $('.npc-c'); if (nc) { nc.innerHTML = ART.character(COURSE[ex.u ?? 0].character, r.ok ? 'happy' : 'think'); nc.classList.remove('hop'); void nc.offsetWidth; if (r.ok) nc.classList.add('hop'); }
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
  setAmbience(null);
  const secs = Math.round((Date.now() - L.start) / 1000);
  const acc = Math.round(100 * Math.max(0, L.total - L.mistakes) / L.total);
  let xp = 0, ecus = 0, title = '', extra = '', mood = 'happy', char = 'brioche';
  if (L.kind === 'lesson') {
    const le = lessonAt(L.u, L.l); char = COURSE[L.u].character;
    S.crowns[le.id] = Math.min(3, crownsOf(le.id) + 1);
    xp = 10 + (L.mistakes === 0 ? 5 : 0); ecus = 5 + (L.mistakes === 0 ? 5 : 0);
    S.lessonsDone++; if (L.mistakes === 0) S.perfect++;
    title = 'Leçon terminée !';
    if (L.l === COURSE[L.u].lessons.length - 1 && S.crowns[le.id] === 1 && L.u < COURSE.length - 1) extra = `<p class="unlock">🚋 Nytt kvarter upplåst!</p>`;
  } else if (L.kind === 'story' && L.serial) {
    char = COURSE[L.u].character;
    const sr = ser(), first = !sr.done[L.st.id]; sr.done[L.st.id] = true; if (first) sr.lastNewDay = dayKey();
    xp = 10 + (L.mistakes === 0 ? 5 : 0); ecus = first ? 15 : 3;
    title = 'Épisode terminé !';
    const ni = SERIAL.eps.indexOf(L.st) + 1;
    extra = first ? (ni < SERIAL.eps.length ? `<p class="unlock">🗝️ Nästa avsnitt kommer i morgon${unitUnlocked(SERIAL.eps[ni].u) ? '' : ` – när du har kommit till ${esc(COURSE[SERIAL.eps[ni].u].fr)}`}.</p>` : '<p class="unlock">🗼 Mysteriet är löst! Fyren lyser igen.</p>') : '';
  } else if (L.kind === 'story') {
    char = COURSE[L.u].character;
    S.stories = S.stories || {}; const first = !S.stories[L.st.id]; S.stories[L.st.id] = true;
    xp = 10 + (L.mistakes === 0 ? 5 : 0); ecus = first ? 10 : 3;
    title = 'Histoire terminée !';
    if (L.mistakes === 0 && L.total) extra = '<p class="unlock">🎧 Du förstod allt!</p>';
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
    if (L.kind === 'practice') S.practiceDone = (S.practiceDone || 0) + 1;
    extra += progressQuests({ kind: L.kind, perfect: L.mistakes === 0, combo: L.maxCombo });
    extra += checkAchievements();
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

// ================= Lyssningssamtal =================
function storySheet(u, si) {
  const un = COURSE[u], st = STORIES[un.id][si], le = un.lessons[st.after];
  if (!(unitUnlocked(u) && crownsOf(le.id) >= 1)) { toast(`Klara lektionen "${le.title}" först 🔒`); return; }
  const done = (S.stories || {})[st.id];
  sheet(`<div class="ns-head" style="--uc:${un.color}"><small>${un.fr} · Lyssna</small><h2>${esc(st.title)}</h2><p>${esc(st.sv)}</p></div>
    <p>Lyssna på samtalet mellan <b>${esc(st.cast.a.name)}</b> och <b>${esc(st.cast.b.name)}</b> och svara på frågorna under tiden.</p>
    <p class="muted small">Tips: lyssna först – visa texten bara om du behöver. ${un.level === 'A1' ? 'Texten dyker upp när repliken är uppläst.' : 'Tryck på en replik för att se texten.'}</p>
    <button class="btn primary" id="go">${done ? 'Lyssna igen +10 XP' : 'Starta +10 XP'}</button><button class="btn ghost" data-close>Stäng</button>`,
    (w, close) => $('#go', w).onclick = () => { close(); startStory(u, si); });
}
// Inspelade röster (ElevenLabs) – TTS som reserv
const AUDIO_BASE = AUDIO_ROOT ? AUDIO_ROOT + 'stories/' : '';
const lineUrl = (st, idx) => AUDIO_BASE ? `${AUDIO_BASE}${st.id}-${idx}.mp3` : '';
let storyAudio = null;
const audioCache = {};
function preloadLine(st, idx) {
  const url = lineUrl(st, idx);
  if (!url || idx >= st.lines.length || audioCache[url]) return;
  const a = new Audio(); a.preload = 'auto'; a.src = url; audioCache[url] = a;
}
function playLine(st, idx, onend) {
  const ln = st.lines[idx], url = lineUrl(st, idx);
  let done = false; const fin = () => { if (!done) { done = true; onend?.(); } };
  const tts = () => say(ln.fr, false, { ...storyVoice(st, ln.w), onend: fin });
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (!url) return tts();
  try { phraseAudio?.pause(); } catch {}
  if (!storyAudio) storyAudio = new Audio();
  const a = storyAudio;
  a.pause(); a.onended = fin; a.onerror = () => { if (!done) tts(); };
  a.src = url;
  const p = a.play();
  if (p && p.catch) p.catch(() => { if (!done) tts(); });
}
function storyVoice(st, who) {
  const keys = Object.keys(st.cast), k = Math.max(0, keys.indexOf(who)), c = st.cast[who];
  const voice = frVoices.length ? frVoices[k % frVoices.length] : null;
  const pitch = (c.g === 'f' ? 1.15 : 0.85) * (frVoices.length > k ? 1 : [1, 1.1, 0.9, 1.05][k % 4]);
  return { voice, pitch, rate: k === 0 ? 0.88 : 0.95 };
}
function startStory(u, si) { startStoryObj(STORIES[COURSE[u].id][si], u, false); }
function castHtml(st) {
  const ps = Object.values(st.cast).filter(c => !c.narr).map(c => `<div class="cast-p">${c.char ? `<div class="dl-av">${ART.character(c.char)}</div>` : `<div class="b-av ${c.g}">${esc(c.name[0].toUpperCase())}</div>`}<span>${esc(c.name)}</span></div>`);
  return ps.length === 2 ? ps.join('<span class="cast-and">&</span>') : ps.join('');
}
function startStoryObj(st, u, serial) {
  setAmbience(COURSE[u].id);
  L = { kind: 'story', serial, u, st, i: 0, q: null, total: st.qs.length, mistakes: 0, combo: 0, maxCombo: 0, start: Date.now(), spoke: false, showAll: !!S.storyText };
  const un = COURSE[u];
  app.innerHTML = `<div class="lesson story-player">
    <div class="ltop"><button class="x" id="quit" aria-label="Avsluta">✕</button><div class="pbar big"><i style="width:0%"></i></div>
      <button class="txt-t ${L.showAll ? 'on' : ''}" id="txtT" aria-label="Visa all text">Aa</button></div>
    <div class="lbody">
      <p class="kind">${serial ? `Följetong · Avsnitt ${SERIAL.eps.indexOf(st) + 1}` : `Lyssna · ${esc(un.fr)}`}</p><h2 class="q">${esc(st.title)}</h2>
      <div class="cast">${castHtml(st)}</div>
      <div class="sdlg" id="sdlg"></div><div id="sq"></div>
    </div>
    <div class="lfoot" id="lfoot"><button class="btn primary wide" id="snext">▶ ${serial ? 'Starta avsnittet' : 'Starta samtalet'}</button></div></div>`;
  $('#quit').onclick = quitLesson;
  $('#snext').onclick = storyNext;
  preloadLine(st, 0);
  $('#txtT').onclick = () => { L.showAll = !L.showAll; S.storyText = L.showAll; save(false); $('#txtT').classList.toggle('on', L.showAll); $$('.sline .fr-t').forEach(t => t.classList.toggle('masked', !L.showAll && !t.dataset.rev)); };
}
function storyNext() {
  const st = L.st;
  if (L.q) return;
  $('#sq').innerHTML = '';
  if (L.i < st.lines.length) {
    const idx = L.i++, ln = st.lines[idx], un = COURSE[L.u];
    const c = st.cast[ln.w], isA = !!c.char, nar = !!c.narr;
    const row = document.createElement('div'); row.className = `dl ${nar ? 'narr' : isA ? 'npc' : 'you'} in`;
    row.innerHTML = `${isA ? `<div class="dl-av">${ART.character(c.char)}</div>` : ''}
      <button class="dl-b sline">${nar ? '' : `<span class="spk">${esc(c.name)}</span>`}<span class="fr-t ${L.showAll ? '' : 'masked'}">${esc(ln.fr)}</span><span class="dl-sv">${esc(ln.sv)}</span></button>
      ${isA || nar ? '' : `<div class="b-av ${c.g}">${esc(c.name[0].toUpperCase())}</div>`}`;
    $('#sdlg').appendChild(row);
    row.scrollIntoView({ block: 'end', behavior: 'smooth' });
    const btn = row.querySelector('.sline'), txt = row.querySelector('.fr-t');
    const reveal = () => { txt.dataset.rev = '1'; txt.classList.remove('masked'); };
    let t;
    btn.onclick = () => { if (txt.classList.contains('masked')) reveal(); playLine(st, idx); };
    btn.addEventListener('pointerdown', () => { t = setTimeout(() => btn.classList.add('tr'), 400); });
    ['pointerup', 'pointerleave'].forEach(e => btn.addEventListener(e, () => { clearTimeout(t); btn.classList.remove('tr'); }));
    btn.addEventListener('contextmenu', e => e.preventDefault());
    const nb = $('#snext'); nb.disabled = true; nb.textContent = '🔊 …';
    playLine(st, idx, () => {
      if (L?.st !== st) return;
      if (un.level === 'A1') reveal();
      const q = st.qs.find(q => q.at === idx);
      if (q) storyQuestion(q); else { nb.disabled = false; nb.textContent = L.i < st.lines.length ? 'Fortsätt ▶' : 'Klart ▶'; }
    });
    preloadLine(st, idx + 1);
    $('.ltop .pbar i').style.width = Math.round(L.i / st.lines.length * 100) + '%';
    return;
  }
  if (!L.spoke && st.speak != null && canSpeak()) { L.spoke = true; storySpeak(st.lines[st.speak]); return; }
  finish(true);
}
function storyQuestion(q) {
  L.q = q;
  const nb = $('#snext'); nb.disabled = true; nb.textContent = 'Svara på frågan';
  const box = $('#sq');
  box.innerHTML = `<div class="sq card"><p class="kind">Fråga</p><h3>${esc(q.q)}</h3><div class="opts">${q.o.map((o, i) => `<button class="opt" data-i="${i}"><span class="num">${i + 1}</span>${esc(o)}</button>`).join('')}</div><div class="sq-fb"></div></div>`;
  box.scrollIntoView({ block: 'end', behavior: 'smooth' });
  $$('.opt', box).forEach(b => b.onclick = () => {
    if (!L.q) return;
    const ok = +b.dataset.i === q.a;
    chime(ok);
    b.classList.add(ok ? 'right' : 'wrongo');
    if (!ok) { L.mistakes++; $$('.opt', box)[q.a].classList.add('right'); L.combo = 0; } else { L.combo++; L.maxCombo = Math.max(L.maxCombo, L.combo); }
    $('.sq-fb', box).innerHTML = ok ? `<b class="okc">✓ ${rnd(PRAISE)}</b>` : `<b class="badc">✗ Rätt svar: ${esc(q.o[q.a])}</b> <span class="muted small">– tryck på replikerna för att lyssna igen.</span>`;
    L.q = null; nb.disabled = false; nb.textContent = L.i < L.st.lines.length ? 'Fortsätt ▶' : 'Klart ▶';
  });
}
function storySpeak(ln) {
  const nb = $('#snext'); nb.disabled = true; nb.textContent = 'Säg repliken';
  const box = $('#sq');
  box.innerHTML = `<div class="sq card"><p class="kind">Din tur</p><h3>Säg repliken högt</h3>
    <div class="bubble"><button class="say-b" id="sayRec">🔊</button><span class="fr-t">${esc(ln.fr)}</span></div>
    <button class="mic" id="mic">🎙️<span>Tryck och prata</span></button><p class="heard muted" id="heard"></p>
    <button class="link" id="skip">Hoppa över</button></div>`;
  $('#sayRec', box).onclick = () => playLine(L.st, L.st.lines.indexOf(ln));
  box.scrollIntoView({ block: 'end', behavior: 'smooth' });
  const done = () => { nb.disabled = false; nb.textContent = 'Klart ▶'; };
  $('#skip', box).onclick = () => { done(); finish(true); };
  const target = norm(ln.fr, false).split(' ');
  $('#mic', box).onclick = () => {
    try {
      const rec = new SR(); rec.lang = 'fr-FR'; rec.maxAlternatives = 3;
      $('#mic', box).classList.add('rec');
      rec.onresult = e => {
        const alts = [...e.results[0]].map(a => a.transcript);
        const best = Math.max(...alts.map(t => { const s = new Set(norm(t, false).split(' ')); return target.filter(w => s.has(w)).length / target.length; }));
        chime(best >= 0.6);
        $('#heard', box).innerHTML = best >= 0.6 ? `<b class="okc">✓ ${rnd(PRAISE)}</b> Jag hörde: ”${esc(alts[0])}”` : `Nästan! Jag hörde: ”${esc(alts[0])}” – prova igen eller fortsätt.`;
        done();
      };
      rec.onerror = e => { if (['not-allowed', 'service-not-allowed', 'language-not-supported'].includes(e.error)) { S.speakBroken = true; save(false); } $('#heard', box).textContent = 'Mikrofonen fungerade inte – tryck på Klart.'; done(); };
      rec.onend = () => $('#mic', box)?.classList.remove('rec');
      rec.start();
    } catch { done(); }
  };
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
  if (!L || !$('.lesson') || L.kind === 'story') return;
  if (e.key === 'Enter' && document.activeElement?.tagName !== 'TEXTAREA') { e.preventDefault(); onCheck(); }
  if (/^[1-4]$/.test(e.key) && document.activeElement?.tagName !== 'TEXTAREA') { const o = $$('.opt, .pcard')[+e.key - 1]; o?.click(); }
});

// ================= Följetong =================
const ser = () => (S.serial = S.serial || { done: {}, lastNewDay: '' });
function epState(i) {
  const ep = SERIAL.eps[i], s = ser();
  if (s.done[ep.id]) return 'done';
  if (i > 0 && !s.done[SERIAL.eps[i - 1].id]) return 'later';
  if (!unitUnlocked(ep.u)) return 'unit';
  if (s.lastNewDay === dayKey()) return 'tomorrow';
  return 'open';
}
const nextEp = () => SERIAL.eps.findIndex((_, i) => epState(i) !== 'done');
function serialCard() {
  const s = ser(), n = SERIAL.eps.filter(e => s.done[e.id]).length, i = nextEp();
  let txt, hot = false;
  if (i < 0) txt = 'Alla avsnitt klara – mysteriet är löst! 🗼';
  else {
    const st = epState(i), ep = SERIAL.eps[i];
    if (st === 'open') { txt = `${n ? 'Nytt avsnitt' : 'Första avsnittet'}: <i>${esc(ep.title)}</i>`; hot = true; }
    else if (st === 'tomorrow') txt = 'Nästa avsnitt kommer i morgon 🌙';
    else txt = `Nästa avsnitt utspelar sig i ${esc(COURSE[ep.u].fr)} – ta dig dit först`;
  }
  return `<button class="card serialcard ${hot ? 'hot' : ''}" id="serialB"><span class="sc-ic">🗝️</span>
    <span class="sc-t"><small>Följetong · ${n}/${SERIAL.eps.length}</small><b>${esc(SERIAL.title)}</b><span class="muted small">${txt}</span></span>${hot ? '<span class="sc-new">NY</span>' : ''}</button>`;
}
function serialSheet() {
  const s = ser(), n = SERIAL.eps.filter(e => s.done[e.id]).length;
  sheet(`<div class="ns-head" style="--uc:#3f5a74"><small>Följetong · ${n} av ${SERIAL.eps.length} avsnitt</small><h2>${esc(SERIAL.title)}</h2><p>${esc(SERIAL.sv)}</p></div>
    <p class="muted small">${esc(SERIAL.intro)} Ett nytt avsnitt per dag.</p>
    <div class="ep-list">${SERIAL.eps.map((ep, i) => {
      const st = epState(i), on = st === 'done' || st === 'open';
      const why = { later: '', unit: ' · öppnas när du når kvarteret', tomorrow: ' · i morgon' }[st] || '';
      return `<button class="ep ${st}" data-ep="${i}" ${on ? '' : 'disabled'}><span class="ep-n">${st === 'done' ? '✓' : st === 'open' ? '▶' : '🔒'}</span>
        <span class="ep-t"><b>${i + 1}. ${on ? esc(ep.title) : '· · ·'}</b><small>${on ? esc(ep.sv) + ' · ' : ''}${esc(COURSE[ep.u].fr)}${why}</small></span></button>`;
    }).join('')}</div>
    <button class="btn ghost" data-close>Stäng</button>`,
    (w, close) => $$('[data-ep]', w).forEach(b => b.onclick = () => { close(); const ep = SERIAL.eps[+b.dataset.ep]; startStoryObj(ep, ep.u, true); }));
}

// ================= Bakgrundsljud =================
const ambUrl = id => AUDIO_ROOT ? `${AUDIO_ROOT}amb/${id}.mp3` : '';
const AMB_VOL = 0.2, AMB_DUCK = 0.05;
const ambBufs = {};
let ambCur = null, ambWant = null, ambLast = -1;
function getCtx() { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); } catch { } return actx; }
function ambBuffer(id) {
  if (!ambBufs[id]) ambBufs[id] = fetch(ambUrl(id)).then(r => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
    .then(ab => new Promise((res, rej) => getCtx().decodeAudioData(ab, res, rej))).catch(e => { delete ambBufs[id]; throw e; });
  return ambBufs[id];
}
const speakingNow = () => (phraseAudio && !phraseAudio.paused) || (storyAudio && !storyAudio.paused) || ('speechSynthesis' in window && speechSynthesis.speaking);
const ambTarget = () => speakingNow() ? AMB_DUCK : AMB_VOL;
async function setAmbience(id) {
  if (!S || S.amb === false || !AUDIO_ROOT || document.hidden) id = null;
  ambWant = id;
  if (ambCur?.id === id) return;
  const old = ambCur; ambCur = null;
  if (old) { const t = actx.currentTime; old.gain.gain.cancelScheduledValues(t); old.gain.gain.setTargetAtTime(0, t, 0.35); setTimeout(() => { try { old.src.stop(); } catch { } }, 2000); }
  if (!id) return;
  const ctx = getCtx(); if (!ctx) return;
  let buf; try { buf = await ambBuffer(id); } catch { return; }
  if (ambWant !== id || ambCur) return;
  const src = ctx.createBufferSource(), gain = ctx.createGain();
  src.buffer = buf; src.loop = true; src.loopStart = 0.06; src.loopEnd = Math.max(0.5, buf.duration - 0.06);
  gain.gain.value = 0; src.connect(gain).connect(ctx.destination); src.start(0, 0.06);
  ambLast = ambTarget(); gain.gain.setTargetAtTime(ambLast, ctx.currentTime, 0.7);
  ambCur = { id, src, gain };
  if (ctx.state === 'suspended') ctx.resume().catch(() => { });
}
setInterval(() => {
  if (!ambCur) return; const t = ambTarget();
  if (t !== ambLast) { ambLast = t; ambCur.gain.gain.setTargetAtTime(t, actx.currentTime, t < AMB_VOL ? 0.08 : 0.5); }
}, 150);
document.addEventListener('pointerdown', () => { const c = actx; if (c && c.state === 'suspended') c.resume().catch(() => { }); }, { passive: true });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { const w = ambWant; setAmbience(null); ambWant = w; }
  else if (ambWant && !LM) { const w = ambWant; ambWant = null; setAmbience(w); }
  if (!document.hidden && LM?.playing) lockWake(true);
});
let ambIO = null;
function watchAmbience() {
  ambIO?.disconnect();
  if (!('IntersectionObserver' in window)) return;
  const vis = new Map(); let tmr;
  ambIO = new IntersectionObserver(es => {
    es.forEach(e => vis.set(e.target, e.intersectionRatio));
    clearTimeout(tmr);
    tmr = setTimeout(() => {
      if (view !== 'home' || L || LM) return;
      let best = null, br = 0.5;
      vis.forEach((r, el) => { if (r > br && el.isConnected) { br = r; best = el; } });
      setAmbience(best ? best.dataset.scene : null);
    }, 450);
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
  $$('.unit:not(.locked):not(.future) .scene[data-scene]').forEach(el => ambIO.observe(el));
}

// ================= Lyssna fritt (handsfree) =================
let LM = null, wakeLock = null;
function listenItems(units) {
  const seen = new Set(), out = [];
  doneLessons().filter(x => !units || units.includes(x.u)).forEach(({ u, le }) => {
    [...le.words, ...le.sentences].forEach(it => {
      const fr = String(it.fr).replace(/\|/g, ' ').trim();
      if (seen.has(fr) || (AUDIO_ROOT && !PH[fr])) return;
      seen.add(fr); out.push({ u, fr, sv: String(it.sv).split('|')[0], e: it.e || '' });
    });
  });
  return out;
}
function svVoice() { try { return speechSynthesis.getVoices().find(v => /^sv/i.test(v.lang)) || null; } catch { return null; } }
const svUrl = text => { const n = AUDIO_ROOT && SV[String(text).trim()]; return n != null && n !== '' ? `${AUDIO_ROOT}sv/s${String(n).padStart(3, '0')}.mp3` : ''; };
function saySv(text, onend) {
  const url = svUrl(text);
  if (url) {
    stopAudio(); if ('speechSynthesis' in window) speechSynthesis.cancel();
    if (!phraseAudio) phraseAudio = new Audio();
    const a = phraseAudio; let done = false;
    const fin = () => { if (!done) { done = true; onend(); } };
    a.onended = fin; a.onerror = () => { if (!done) { done = true; saySvTts(text, onend); } };
    a.src = url; a.playbackRate = 1;
    const p = a.play(); if (p && p.catch) p.catch(() => { if (!done) { done = true; saySvTts(text, onend); } });
    return;
  }
  saySvTts(text, onend);
}
function saySvTts(text, onend) {
  if (!('speechSynthesis' in window)) { setTimeout(onend, 1800); return; }
  const vs = speechSynthesis.getVoices(), v = svVoice();
  if (vs.length && !v) { setTimeout(onend, 1800); return; } // ingen svensk röst: visa bara texten
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); u.lang = 'sv-SE'; if (v) u.voice = v; u.rate = 0.95;
  let done = false; const f = () => { if (!done) { done = true; onend(); } };
  u.onend = f; u.onerror = f; setTimeout(f, 2500 + text.length * 110);
  speechSynthesis.speak(u);
}
async function lockWake(on) {
  try {
    if (on && 'wakeLock' in navigator && !wakeLock) { wakeLock = await navigator.wakeLock.request('screen'); wakeLock.addEventListener('release', () => { wakeLock = null; }); }
    else if (!on && wakeLock) { const w = wakeLock; wakeLock = null; await w.release(); }
  } catch { }
}
function startListen() {
  setAmbience(null);
  if (!listenItems(null).length) { toast('Gör en lektion först!'); return; }
  LM = { units: null, items: [], i: 0, playing: false, tok: 0, slow: !!S.listenSlow, heard: 0 };
  LM.items = shuffle(listenItems(null));
  renderListen();
  if ('mediaSession' in navigator) {
    const ms = navigator.mediaSession, h = (a, f) => { try { ms.setActionHandler(a, f); } catch { } };
    h('play', () => lmPlay(true)); h('pause', () => lmPlay(false));
    h('nexttrack', () => lmJump(1)); h('previoustrack', () => lmJump(-1));
  }
}
function renderListen() {
  const us = [...new Set(listenItems(null).map(x => x.u))];
  app.innerHTML = `<div class="lesson listen">
    <div class="ltop"><button class="x" id="lquit" aria-label="Stäng">✕</button><div class="pbar big"><i id="lpb" style="width:0%"></i></div><div class="lh">🎧</div></div>
    <div class="lbody">
      <p class="kind">Lyssna fritt</p>
      <div class="chips lchips"><button class="chip ${!LM.units ? 'on' : ''}" data-lu="all">Alla kvarter</button>${us.map(u => `<button class="chip ${LM.units?.[0] === u ? 'on' : ''}" data-lu="${u}">${esc(COURSE[u].fr)}</button>`).join('')}</div>
      <div class="lcard card"><div class="l-e" id="le">🎧</div><div class="l-fr" id="lfr">Tryck på ▶ för att börja</div><div class="l-sv" id="lsv"></div><div class="l-step" id="lstep"></div></div>
      <p class="muted small center">Franska – paus för att tänka – svenska – franska igen. ${LM.items.length} ord och meningar från dina lektioner.</p>
      ${isIOS ? '<p class="muted small center">På iPhone kan ljudet stanna om skärmen låses. Appen försöker hålla skärmen tänd medan den spelar.</p>' : ''}
    </div>
    <div class="lfoot lctrl">
      <button class="lc" id="lprev" aria-label="Föregående">⏮</button>
      <button class="lc play" id="lplay" aria-label="Spela">${LM.playing ? '⏸' : '▶'}</button>
      <button class="lc" id="lnext" aria-label="Nästa">⏭</button>
      <button class="lc tempo" id="ltempo">${LM.slow ? '🐢 Lugnt' : '🚶 Normalt'}</button>
    </div></div>`;
  $('#lquit').onclick = quitListen;
  $('#lplay').onclick = () => lmPlay(!LM.playing);
  $('#lnext').onclick = () => lmJump(1);
  $('#lprev').onclick = () => lmJump(-1);
  $('#ltempo').onclick = () => { LM.slow = !LM.slow; S.listenSlow = LM.slow; save(false); $('#ltempo').textContent = LM.slow ? '🐢 Lugnt' : '🚶 Normalt'; };
  $$('[data-lu]').forEach(b => b.onclick = () => {
    LM.units = b.dataset.lu === 'all' ? null : [+b.dataset.lu];
    LM.items = shuffle(listenItems(LM.units)); LM.i = 0;
    $$('[data-lu]').forEach(x => x.classList.toggle('on', x === b));
    if (LM.playing) { lmStop(); listenLoop(); } else showListen(LM.items[0], 'idle');
  });
}
function showListen(it, ph) {
  if (!it || !$('#lfr')) return;
  $('#le').textContent = it.e || '💬';
  $('#lfr').textContent = it.fr;
  $('#lsv').textContent = ph === 'sv' || ph === 'fr2' ? it.sv : '';
  $('#lstep').textContent = { idle: '', fr: '🔊 Franska', think: '🤔 Vad betyder det?', sv: '🇸🇪 Svenska', fr2: '🔁 Franska igen' }[ph] || '';
  $('#lpb').style.width = Math.round(LM.i / Math.max(1, LM.items.length) * 100) + '%';
  if (ph === 'fr' && 'mediaSession' in navigator) {
    try { navigator.mediaSession.metadata = new MediaMetadata({ title: it.fr, artist: it.sv, album: 'Allez ! – Lyssna fritt' }); } catch { }
  }
}
function lmStop() { LM.tok++; try { phraseAudio?.pause(); } catch { } if ('speechSynthesis' in window) speechSynthesis.cancel(); }
function lmPlay(on) {
  if (!LM) return;
  LM.playing = on; const b = $('#lplay'); if (b) b.textContent = on ? '⏸' : '▶';
  try { navigator.mediaSession.playbackState = on ? 'playing' : 'paused'; } catch { }
  lockWake(on);
  lmStop();
  if (on) listenLoop();
}
function lmJump(d) {
  if (!LM) return;
  LM.i = Math.max(0, Math.min(LM.items.length - 1, LM.i + d));
  lmStop();
  if (LM.playing) listenLoop(); else showListen(LM.items[LM.i], 'idle');
}
const lmWait = (ms, tok) => new Promise(r => setTimeout(() => r(LM && LM.tok === tok), ms));
const lmDo = (fn, tok) => new Promise(r => { let d = false; const f = () => { if (!d) { d = true; r(LM && LM.tok === tok); } }; fn(f); setTimeout(f, 15000); });
async function listenLoop() {
  const tok = ++LM.tok;
  while (LM && LM.tok === tok && LM.playing) {
    if (LM.i >= LM.items.length) { LM.items = shuffle(listenItems(LM.units)); LM.i = 0; }
    const it = LM.items[LM.i], P = LM.slow ? 1.7 : 1;
    showListen(it, 'fr');
    if (!await lmDo(cb => say(it.fr, false, { onend: cb }), tok)) return;
    showListen(it, 'think');
    if (!await lmWait(2000 * P, tok)) return;
    showListen(it, 'sv');
    if (!await lmDo(cb => saySv(it.sv, cb), tok)) return;
    if (!await lmWait(700 * P, tok)) return;
    showListen(it, 'fr2');
    if (!await lmDo(cb => say(it.fr, LM.slow, { onend: cb }), tok)) return;
    if (!await lmWait(1600 * P, tok)) return;
    LM.i++; LM.heard++;
  }
}
function quitListen() {
  if (!LM) return;
  const heard = LM.heard; lmStop(); LM.playing = false; LM = null; lockWake(false);
  if ('mediaSession' in navigator) ['play', 'pause', 'nexttrack', 'previoustrack'].forEach(a => { try { navigator.mediaSession.setActionHandler(a, null); } catch { } });
  if (heard >= 10) { const xp = Math.min(10, Math.floor(heard / 10) * 2); addXp(xp); registerActivity(); save(); toast(`🎧 ${heard} fraser lyssnade · +${xp} XP`); }
  go('home');
}

// ================= Start =================
async function boot() {
  app.innerHTML = `<div class="splash"><h1>Allez !</h1><p>Port-Saint-Clément</p></div>`;
  const remote = await initRemote();
  if (remote && sb && !userId) { renderAuth(); return; }
  if (!remote) userId = 'local';
  load();
  if (sb) await pullRemote();
  if (!S.name) { renderOnboard(); return; }
  save(); go('home'); refreshPush();
  setInterval(() => { if (!L) { const h = S.hearts; tick(); if (h !== S.hearts && view) { const el = $('.stat.hearts b'); if (el) el.textContent = S.hearts; save(false); } } }, 60000);
}
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { }));
boot();

// För test
window.__psc = { get S() { return S; }, get L() { return L; }, get amb() { return ambCur?.id || null; }, get LM() { return LM; }, COURSE, STORIES, renderEx: () => renderEx() };
