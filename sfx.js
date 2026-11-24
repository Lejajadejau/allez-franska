// Ljudeffekter för Allez ! – syntetiserade i Web Audio, inga ljudfiler.
// Varje effekt tar (ctx, t) där t är starttiden i ctx.currentTime-skala.
// Allt går genom en gemensam kedja: reverb (en svag rumsklang) och en kompressor
// som gör ljuden fylligare och jämnare i volym.

const BUS = new WeakMap();

function bus(ctx) {
  let b = BUS.get(ctx);
  if (b) return b;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -16; comp.knee.value = 10; comp.ratio.value = 4; comp.attack.value = 0.003; comp.release.value = 0.18;
  const master = ctx.createGain(); master.gain.value = 0.9;
  master.connect(comp).connect(ctx.destination);
  // Rumsklang: kort, ljus efterklang byggd av brus
  const verb = ctx.createConvolver();
  const len = Math.floor(ctx.sampleRate * 1.3), ir = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
  }
  verb.buffer = ir;
  const wet = ctx.createGain(); wet.gain.value = 0.22;
  verb.connect(wet).connect(master);
  b = { dry: master, verb };
  BUS.set(ctx, b);
  return b;
}

// Skickar en ljudkälla till kedjan, med lite rumsklang
let LVL = 1; // volym för effekten som spelas just nu
function out(ctx, node, send = 0.5) {
  const b = bus(ctx);
  const d = ctx.createGain(); d.gain.value = LVL; node.connect(d).connect(b.dry);
  if (send > 0) { const s = ctx.createGain(); s.gain.value = send * LVL; node.connect(s).connect(b.verb); }
}
// Ger en effekt sin egen volym, avvägd mot de inspelade rösterna (cirka −20 dBFS)
const lv = (level, fn) => (ctx, t, ...a) => { const prev = LVL; LVL = level; try { fn(ctx, t, ...a); } finally { LVL = prev; } };

const semi = (f, n) => f * Math.pow(2, n / 12);

function env(ctx, g, t, { a = 0.005, peak = 0.3, d = 0.5, sus = 0, s = 0, r = 0.05 }) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + a);
  if (sus > 0) {
    g.gain.exponentialRampToValueAtTime(Math.max(sus, 0.0001), t + a + d);
    g.gain.setValueAtTime(Math.max(sus, 0.0001), t + a + d + s);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d + s + r);
    return t + a + d + s + r;
  }
  g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  return t + a + d;
}

// Klocka/klockspel: flera deltoner som klingar av olika snabbt
function bell(ctx, t, f, { vol = 0.22, dur = 1.1, send = 0.5, bright = 1 } = {}) {
  const parts = [[1, 1, 1], [2, 0.42 * bright, 0.55], [3.01, 0.2 * bright, 0.35], [4.17, 0.1 * bright, 0.22], [5.43, 0.05 * bright, 0.15]];
  const sum = ctx.createGain(); sum.gain.value = 1; out(ctx, sum, send);
  for (const [m, amp, dl] of parts) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = f * m;
    const end = env(ctx, g, t, { a: 0.004, peak: vol * amp, d: dur * dl });
    o.connect(g).connect(sum); o.start(t); o.stop(end + 0.05);
  }
}

// Mjukt trä-ljud (marimba)
function wood(ctx, t, f, { vol = 0.18, dur = 0.35, send = 0.25 } = {}) {
  const sum = ctx.createGain(); out(ctx, sum, send);
  [[1, 1, 1], [3.9, 0.35, 0.25], [9.2, 0.08, 0.08]].forEach(([m, amp, dl]) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = f * m;
    const end = env(ctx, g, t, { a: 0.003, peak: vol * amp, d: dur * dl });
    o.connect(g).connect(sum); o.start(t); o.stop(end + 0.05);
  });
}

// Mässing: två lätt förstämda sågtandsvågor genom ett filter som öppnar sig
function brass(ctx, t, f, { vol = 0.12, dur = 0.5, send = 0.45 } = {}) {
  const flt = ctx.createBiquadFilter(), g = ctx.createGain();
  flt.type = 'lowpass'; flt.Q.value = 1.2;
  flt.frequency.setValueAtTime(500, t);
  flt.frequency.exponentialRampToValueAtTime(Math.min(f * 7, 6000), t + 0.06);
  flt.frequency.exponentialRampToValueAtTime(Math.min(f * 3, 3500), t + dur);
  [-7, 7].forEach(cents => {
    const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = cents;
    o.connect(flt); o.start(t); o.stop(t + dur + 0.4);
  });
  const end = env(ctx, g, t, { a: 0.03, peak: vol, d: 0.12, sus: vol * 0.7, s: Math.max(0, dur - 0.15), r: 0.25 });
  flt.connect(g); out(ctx, g, send);
  return end;
}

// Dunk: en kort trumträff som ger tyngd
function thump(ctx, t, { vol = 0.5, f0 = 140, f1 = 48, dur = 0.22 } = {}) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur * 0.8);
  env(ctx, g, t, { a: 0.003, peak: vol, d: dur });
  o.connect(g); out(ctx, g, 0.05);
  o.start(t); o.stop(t + dur + 0.05);
}

let NOISE = new WeakMap();
function noiseBuf(ctx) {
  let b = NOISE.get(ctx);
  if (b) return b;
  b = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  NOISE.set(ctx, b);
  return b;
}

// Brus genom ett filter – svisch, gnistor och cymbal
function noise(ctx, t, { dur = 0.4, vol = 0.15, type = 'bandpass', f0 = 800, f1 = 6000, q = 0.8, a = 0.02, send = 0.4 } = {}) {
  const src = ctx.createBufferSource(); src.buffer = noiseBuf(ctx);
  const flt = ctx.createBiquadFilter(), g = ctx.createGain();
  flt.type = type; flt.Q.value = q;
  flt.frequency.setValueAtTime(f0, t); flt.frequency.exponentialRampToValueAtTime(f1, t + dur);
  env(ctx, g, t, { a, peak: vol, d: dur });
  src.connect(flt).connect(g); out(ctx, g, send);
  src.start(t, Math.random()); src.stop(t + dur + 0.05);
}

// Glitter: snabba höga klockor i pentaton
function sparkle(ctx, t, { n = 7, vol = 0.06, span = 0.45, base = 2093 } = {}) {
  const steps = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24];
  for (let i = 0; i < n; i++) bell(ctx, t + (span * i) / n, semi(base, steps[(i * 3) % steps.length]), { vol, dur: 0.5, send: 0.7, bright: 0.6 });
}

// ===== Effekterna =====
export const SFX = {
  // Rätt svar. Tonen stiger ett halvt tonsteg per rätt i rad (upp till 9).
  correct: lv(0.56, (ctx, t, combo = 1) => {
    const k = Math.min(Math.max(0, combo - 1), 9);
    noise(ctx, t, { dur: 0.05, vol: 0.12, type: 'highpass', f0: 3000, f1: 6000, a: 0.002, send: 0 });
    bell(ctx, t, semi(659.25, k), { vol: 0.2, dur: 0.6 });
    bell(ctx, t + 0.09, semi(987.77, k), { vol: 0.24, dur: 0.9 });
    bell(ctx, t + 0.09, semi(1975.5, k), { vol: 0.05, dur: 0.7, send: 0.8 });
  }),
  // Fel svar: ett mjukt "bonk", tydligt men inte elakt
  wrong: lv(0.84, (ctx, t) => {
    const o = ctx.createOscillator(), flt = ctx.createBiquadFilter(), g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(247, t); o.frequency.exponentialRampToValueAtTime(155, t + 0.28);
    flt.type = 'lowpass'; flt.frequency.value = 900;
    env(ctx, g, t, { a: 0.006, peak: 0.32, d: 0.36 });
    o.connect(flt).connect(g); out(ctx, g, 0.25); o.start(t); o.stop(t + 0.45);
    const o2 = ctx.createOscillator(), g2 = ctx.createGain();
    o2.type = 'triangle';
    o2.frequency.setValueAtTime(185, t + 0.13); o2.frequency.exponentialRampToValueAtTime(116, t + 0.42);
    env(ctx, g2, t + 0.13, { a: 0.006, peak: 0.26, d: 0.36 });
    const flt2 = ctx.createBiquadFilter(); flt2.type = 'lowpass'; flt2.frequency.value = 800;
    o2.connect(flt2).connect(g2); out(ctx, g2, 0.25); o2.start(t + 0.13); o2.stop(t + 0.6);
    thump(ctx, t, { vol: 0.28, f0: 110, f1: 55, dur: 0.18 });
  }),
  // Var femte rätt i rad
  combo: lv(0.63, (ctx, t) => {
    thump(ctx, t, { vol: 0.35 });
    [783.99, 987.77, 1174.66, 1567.98].forEach((f, i) => bell(ctx, t + i * 0.07, f, { vol: 0.17, dur: 0.7 }));
    noise(ctx, t + 0.05, { dur: 0.6, vol: 0.05, f0: 4000, f1: 9000, q: 1.5, send: 0.8 });
    sparkle(ctx, t + 0.3, { n: 5, vol: 0.045 });
  }),
  // Lektion klar: mässingsfanfar med trumma och cymbal
  fanfare: lv(0.71, (ctx, t) => {
    const n = [523.25, 659.25, 783.99];
    n.forEach((f, i) => { brass(ctx, t + i * 0.13, f, { vol: 0.09, dur: 0.12 }); bell(ctx, t + i * 0.13, f * 2, { vol: 0.06, dur: 0.4 }); });
    const c = t + 0.42;
    thump(ctx, c, { vol: 0.55, dur: 0.3 });
    noise(ctx, c, { dur: 1.0, vol: 0.05, type: 'highpass', f0: 6000, f1: 8000, q: 0.5, a: 0.004, send: 0.6 });
    [523.25, 659.25, 783.99, 1046.5].forEach(f => brass(ctx, c, f, { vol: 0.075, dur: 1.0 }));
    brass(ctx, c, 261.63, { vol: 0.08, dur: 1.0 });
    bell(ctx, c, 2093, { vol: 0.08, dur: 1.4, send: 0.8 });
    sparkle(ctx, c + 0.35, { n: 8, vol: 0.04, span: 0.8 });
  }),
  // Lektion utan fel
  perfect: lv(0.71, (ctx, t) => {
    [1046.5, 1318.5, 1568, 2093].forEach((f, i) => bell(ctx, t + i * 0.06, f, { vol: 0.12, dur: 1.0, send: 0.8 }));
    noise(ctx, t, { dur: 0.7, vol: 0.04, f0: 5000, f1: 10000, q: 2, send: 0.9 });
  }),
  // Svitskärmen: svisch uppåt, sedan ackord
  streak: lv(0.8, (ctx, t, big = false) => {
    noise(ctx, t, { dur: 0.55, vol: 0.14, f0: 300, f1: 5000, q: 1.2, a: 0.4, send: 0.5 });
    const h = t + 0.55;
    thump(ctx, h, { vol: 0.5, dur: 0.28 });
    const chord = big ? [392, 523.25, 659.25, 783.99, 1046.5] : [440, 554.37, 659.25, 880];
    chord.forEach(f => brass(ctx, h, f, { vol: big ? 0.065 : 0.075, dur: big ? 1.3 : 0.8 }));
    chord.forEach((f, i) => bell(ctx, h + i * 0.05, f * 2, { vol: 0.07, dur: 1.0 }));
    if (big) { noise(ctx, h, { dur: 1.1, vol: 0.045, type: 'highpass', f0: 6000, f1: 8000, a: 0.004, send: 0.6 }); sparkle(ctx, h + 0.4, { n: 10, vol: 0.04, span: 1.0 }); }
  }),
  // Krona eller klarad lektion på kartan
  crown: lv(0.75, (ctx, t) => {
    bell(ctx, t, 1567.98, { vol: 0.13, dur: 0.8 });
    bell(ctx, t + 0.08, 2093, { vol: 0.15, dur: 1.1 });
    sparkle(ctx, t + 0.15, { n: 4, vol: 0.035, span: 0.3, base: 2637 });
  }),
  // Räkneverk när XP räknas upp
  tick: lv(1, (ctx, t) => { wood(ctx, t, 1318.5, { vol: 0.06, dur: 0.12, send: 0.1 }); }),
};
