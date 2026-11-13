// Handritade SVG-miljöer i barnboksstil för Port-Saint-Clément
const INK = '#3d2c29';

// Korsvirkeshus (normandisk colombage)
const PLASTERS = ['#f6e2c4', '#f3d2bf', '#e8dcc0', '#f7e7cf', '#eed6c4', '#e4e3cc'];
const ROOFS = ['#5d6f8c', '#7c5f55', '#56677e', '#8a5a4a', '#4f6478'];
const SHUTTERS = ['#4f8a8b', '#c8553d', '#3f6a9a', '#6f9a5b', '#b0703f'];
const pick = (arr, n) => arr[Math.abs(Math.round(n)) % arr.length];
function house(x, y, w, h, opt = {}) {
  const k = Math.round(x * 7 + y * 3 + w);
  const plaster = opt.plaster || pick(PLASTERS, k);
  const roof = opt.roof || pick(ROOFS, k >> 1);
  const shut = opt.shutter || pick(SHUTTERS, k >> 2);
  const beam = opt.beam || '#7a5240';
  const rh = opt.roofH || h * 0.55;
  let s = `<g>`;
  s += `<rect x="${x + w * 0.68}" y="${y - rh * 0.85}" width="${w * 0.12}" height="${rh * 0.6}" fill="#9a6b55" stroke="${INK}" stroke-width="1.5"/>`;
  s += `<polygon points="${x - 4},${y} ${x + w / 2},${y - rh} ${x + w + 4},${y}" fill="${roof}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${plaster}" stroke="${INK}" stroke-width="2"/>`;
  // bjälkar
  s += `<g stroke="${beam}" stroke-width="3" stroke-linecap="round">`;
  s += `<line x1="${x}" y1="${y + h * 0.45}" x2="${x + w}" y2="${y + h * 0.45}"/>`;
  s += `<line x1="${x + w * 0.5}" y1="${y}" x2="${x + w * 0.5}" y2="${y + h * 0.45}"/>`;
  s += `<line x1="${x + 3}" y1="${y + 3}" x2="${x + w * 0.5}" y2="${y + h * 0.43}"/>`;
  s += `<line x1="${x + w - 3}" y1="${y + 3}" x2="${x + w * 0.5}" y2="${y + h * 0.43}"/>`;
  s += `<line x1="${x + w * 0.25}" y1="${y + h * 0.45}" x2="${x + w * 0.25}" y2="${y + h}"/>`;
  s += `<line x1="${x + w * 0.75}" y1="${y + h * 0.45}" x2="${x + w * 0.75}" y2="${y + h}"/>`;
  s += `</g>`;
  // fönster
  const ww = w * 0.16;
  [[0.12, 0.58], [0.84 - 0.16, 0.58]].forEach(([fx, fy]) => {
    s += `<rect x="${x + w * fx - ww * 0.42}" y="${y + h * fy}" width="${ww * 0.38}" height="${h * 0.2}" fill="${shut}" stroke="${INK}" stroke-width="1"/><rect x="${x + w * fx + ww * 1.04}" y="${y + h * fy}" width="${ww * 0.38}" height="${h * 0.2}" fill="${shut}" stroke="${INK}" stroke-width="1"/>`;
    s += `<rect x="${x + w * fx}" y="${y + h * fy}" width="${ww}" height="${h * 0.2}" rx="2" class="win" fill="#a9d3e6" stroke="${INK}" stroke-width="1.5"/><line x1="${x + w * fx + ww / 2}" y1="${y + h * fy}" x2="${x + w * fx + ww / 2}" y2="${y + h * fy + h * 0.2}" stroke="${INK}" stroke-width="1"/>`;
    s += `<rect x="${x + w * fx - 2}" y="${y + h * fy + h * 0.2}" width="${ww + 4}" height="4" fill="#c8553d" stroke="${INK}" stroke-width="1"/>`;
  });
  s += `</g>`;
  return s;
}

function sky(w, h, top = '#a8d2ea', bottom = '#f3efdc') {
  const id = 'sky' + Math.random().toString(36).slice(2, 7);
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#${id})"/>`;
}

function cloud(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff" opacity=".9">
    <ellipse cx="0" cy="0" rx="22" ry="11"/><ellipse cx="16" cy="-6" rx="14" ry="11"/><ellipse cx="-14" cy="-3" rx="11" ry="8"/></g>`;
}

function gull(x, y) {
  return `<path d="M${x - 7} ${y} q3.5 -4 7 0 q3.5 -4 7 0" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`;
}

function cobbles(y, w, h) {
  let s = `<rect x="0" y="${y}" width="${w}" height="${h}" fill="#e2d2b4"/>`;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 18; c++) {
      const cx = c * 22 + (r % 2) * 11 + 6;
      const cy = y + 8 + r * 9;
      if (cy < y + h) s += `<ellipse cx="${cx}" cy="${cy}" rx="8" ry="3.2" fill="#d2bf9c"/>`;
    }
  }
  return s;
}

function lamp(x, y) {
  return `<g stroke="${INK}" stroke-width="1.5"><line x1="${x}" y1="${y}" x2="${x}" y2="${y - 60}" stroke-width="3"/>
  <circle class="lamp-glow" cx="${x}" cy="${y - 66}" r="16" fill="#ffe08a" stroke="none"/><path d="M${x - 8} ${y - 60} h16 l-3 -14 h-10 z" fill="#f6d47a"/><path d="M${x - 9} ${y - 74} h18 l-9 -6 z" fill="${INK}"/></g>`;
}

function flowers(x, y) {
  let s = `<rect x="${x}" y="${y}" width="34" height="9" rx="2" fill="#8a5a44" stroke="${INK}" stroke-width="1.3"/>`;
  ['#e07a8b', '#f2c46d', '#e07a8b', '#b48ad6'].forEach((c, i) => {
    s += `<circle cx="${x + 5 + i * 8}" cy="${y - 3}" r="4" fill="${c}" stroke="${INK}" stroke-width="1"/>`;
  });
  return s;
}


// ---------- Liv i staden: människor, djur, detaljer och rörelse ----------
const SKIN = ['#f4cba6', '#e2a87e', '#c68a62', '#8d5a3c', '#f1d2b6'];
const CLOTH = ['#c8553d', '#3f6a9a', '#6f9a5b', '#e3a33b', '#8a5aa8', '#2f4766', '#d06a8e', '#4f8a8b'];
// En liten människa. x = mitten, y = fötterna. s = skala (barn ≈ 0.75)
function person(x, y, o = {}) {
  const s = o.s || 1, k = Math.round(x * 3 + y);
  const skin = o.skin || pick(SKIN, k), top = o.top || pick(CLOTH, k), legs = o.legs || pick(['#2f3b52', '#5a4636', '#3d4f6b', '#6b6b6b'], k >> 1);
  const hair = o.hair || pick(['#3d2c29', '#8a5a44', '#d9a441', '#1f1a17', '#b8b2a8'], k >> 2);
  let g = `<g transform="translate(${x} ${y})"><g class="${o.cls || 'a-sway'}"><g transform="scale(${s})">`;
  g += `<ellipse cx="0" cy="0" rx="7" ry="1.6" fill="#000" opacity=".12"/>`;
  g += `<rect x="-4" y="-13" width="3.2" height="13" rx="1.4" fill="${legs}"/><rect x="0.8" y="-13" width="3.2" height="13" rx="1.4" fill="${legs}"/>`;
  g += o.dress ? `<path d="M-6 -11 L-4 -26 h8 L6 -11z" fill="${top}" stroke="${INK}" stroke-width=".8"/>` : `<rect x="-5" y="-26" width="10" height="14" rx="3.5" fill="${top}" stroke="${INK}" stroke-width=".8"/>`;
  g += `<circle cx="0" cy="-31" r="5" fill="${skin}" stroke="${INK}" stroke-width=".8"/>`;
  g += o.hat ? `<path d="M-6 -33 h12 M-4 -33 q4 -6 8 0" fill="${o.hat}" stroke="${o.hat}" stroke-width="2.2" stroke-linecap="round"/>` : `<path d="M-5 -32 q0 -6 5 -6 q5 0 5 6 q-2 -3 -5 -3 q-3 0 -5 3z" fill="${hair}"/>`;
  if (o.item === 'bag') g += `<rect x="4" y="-18" width="6" height="7" rx="1" fill="#e3c38b" stroke="${INK}" stroke-width=".7"/>`;
  if (o.item === 'baguette') g += `<rect x="3" y="-30" width="3" height="16" rx="1.5" fill="#e3a865" stroke="${INK}" stroke-width=".6" transform="rotate(20 4 -22)"/>`;
  if (o.item === 'suitcase') g += `<rect x="5" y="-12" width="9" height="11" rx="1.5" fill="#8a5a44" stroke="${INK}" stroke-width=".7"/><path d="M7.5 -12 v-2 h4 v2" fill="none" stroke="${INK}" stroke-width=".7"/>`;
  if (o.item === 'balloon') g += `<line x1="5" y1="-20" x2="9" y2="-44" stroke="${INK}" stroke-width=".5"/><ellipse cx="9" cy="-48" rx="4.5" ry="5.5" fill="${pick(CLOTH, k + 3)}" stroke="${INK}" stroke-width=".6"/>`;
  if (o.item === 'arms') g += `<path d="M-5 -24 l-5 -8 M5 -24 l5 -8" stroke="${top}" stroke-width="3" stroke-linecap="round"/>`;
  return g + `</g></g></g>`;
}
// Sittande person (kafé, bänk)
function sitter(x, y, o = {}) {
  const k = Math.round(x * 5 + y), skin = o.skin || pick(SKIN, k), top = o.top || pick(CLOTH, k + 1);
  return `<g transform="translate(${x} ${y})"><rect x="-5" y="-20" width="10" height="12" rx="3.5" fill="${top}" stroke="${INK}" stroke-width=".8"/><rect x="-4" y="-9" width="10" height="3.5" rx="1.5" fill="#2f3b52"/><rect x="3" y="-9" width="3" height="9" rx="1.4" fill="#2f3b52"/><circle cx="0" cy="-25" r="5" fill="${skin}" stroke="${INK}" stroke-width=".8"/><path d="M-5 -26 q0 -6 5 -6 q5 0 5 6 q-2 -3 -5 -3 q-3 0 -5 3z" fill="${pick(['#3d2c29', '#8a5a44', '#d9a441', '#b8b2a8'], k)}"/></g>`;
}
function cat(x, y, c = '#e09a4f') {
  return `<g class="a-tail" transform="translate(${x} ${y})"><ellipse cx="0" cy="-4" rx="7" ry="4.5" fill="${c}" stroke="${INK}" stroke-width=".8"/><circle cx="7" cy="-8" r="3.6" fill="${c}" stroke="${INK}" stroke-width=".8"/><path d="M5 -11 l1 -3 l2 2 M8 -11 l2 -3 l1 3" fill="${c}" stroke="${INK}" stroke-width=".7"/><path d="M-7 -4 q-6 -2 -5 -9" fill="none" stroke="${c}" stroke-width="2.2" stroke-linecap="round"/></g>`;
}
function dog(x, y, c = '#a8784f') {
  return `<g class="a-sway" transform="translate(${x} ${y})"><rect x="-8" y="-11" width="15" height="7" rx="3.5" fill="${c}" stroke="${INK}" stroke-width=".8"/><rect x="-7" y="-5" width="2.4" height="5" fill="${c}"/><rect x="3" y="-5" width="2.4" height="5" fill="${c}"/><circle cx="8" cy="-13" r="4" fill="${c}" stroke="${INK}" stroke-width=".8"/><path d="M6 -16 q-2 4 1 6" fill="#6b4a3a"/><path d="M-8 -9 q-4 -4 -3 -8" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"/></g>`;
}
function bike(x, y, c = '#c8553d') {
  return `<g transform="translate(${x} ${y})"><circle cx="-8" cy="-6" r="6" fill="none" stroke="${INK}" stroke-width="1.4"/><circle cx="9" cy="-6" r="6" fill="none" stroke="${INK}" stroke-width="1.4"/><path d="M-8 -6 l6 -9 h9 l2 9 M-2 -15 l-3 -3 h-3 M7 -15 l-1 -4 h4" fill="none" stroke="${c}" stroke-width="1.8"/><rect x="-11" y="-20" width="7" height="5" fill="#e3a33b" stroke="${INK}" stroke-width=".6"/></g>`;
}
function tree(x, y, s = 1, c = '#6f9a5b') {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-2.5" y="-22" width="5" height="22" fill="#8a5a44"/><g class="a-leaves"><circle cx="0" cy="-30" r="13" fill="${c}" stroke="${INK}" stroke-width="1.2"/><circle cx="-9" cy="-24" r="8" fill="${c}" stroke="${INK}" stroke-width="1"/><circle cx="9" cy="-24" r="8" fill="${c}" stroke="${INK}" stroke-width="1"/></g></g>`;
}
function bush(x, y, c = '#7fae5e') {
  return `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="-5" rx="11" ry="7" fill="${c}" stroke="${INK}" stroke-width="1"/><circle cx="-4" cy="-8" r="1.6" fill="#e07a8b"/><circle cx="4" cy="-6" r="1.6" fill="#f2c46d"/></g>`;
}
function bench(x, y) {
  return `<g transform="translate(${x} ${y})"><rect x="-14" y="-10" width="28" height="3" fill="#8a5a44" stroke="${INK}" stroke-width=".7"/><rect x="-14" y="-16" width="28" height="3" fill="#8a5a44" stroke="${INK}" stroke-width=".7"/><path d="M-11 -7 v7 M11 -7 v7" stroke="${INK}" stroke-width="1.6"/></g>`;
}
function laundry(x1, y1, x2, y2) {
  let g = `<path d="M${x1} ${y1} Q${(x1 + x2) / 2} ${y1 + 8} ${x2} ${y2}" fill="none" stroke="${INK}" stroke-width=".8"/>`;
  const cols = ['#f2c46d', '#fbf7ee', '#c8553d', '#7aa3c8'];
  for (let i = 1; i < 5; i++) { const t = i / 5, px = x1 + (x2 - x1) * t, py = y1 + (y2 - y1) * t + 8 * 4 * t * (1 - t) * 0.5; g += `<rect class="a-flap" x="${px - 3}" y="${py}" width="6" height="${i % 2 ? 8 : 6}" fill="${cols[i % 4]}" stroke="${INK}" stroke-width=".5"/>`; }
  return g;
}
function smoke(x, y) {
  return `<g class="a-smoke" opacity=".7"><circle cx="${x}" cy="${y}" r="3" fill="#fff"/><circle cx="${x + 3}" cy="${y - 7}" r="4" fill="#fff"/><circle cx="${x + 1}" cy="${y - 15}" r="5" fill="#fff"/></g>`;
}
function flyingGulls() {
  return `<g class="a-gull">${gull(0, 34)}${gull(16, 26)}</g><g class="a-gull slow">${gull(0, 52)}</g>`;
}
// Bakgrund: kullar, kyrktorn och glimt av havet
function backdrop(hue = '#b9d3a8', sea = false) {
  let g = `<path d="M0 118 Q60 92 130 112 T260 104 T360 110 V200 H0z" fill="${hue}" opacity=".75"/>`;
  g += `<path d="M0 128 Q90 110 180 124 T360 120 V200 H0z" fill="${hue}" opacity=".9"/>`;
  if (sea) g += `<rect x="0" y="122" width="360" height="12" fill="#7fb4d0" opacity=".8"/>`;
  g += `<g opacity=".55"><rect x="318" y="78" width="10" height="40" fill="#cfc6b6"/><polygon points="316,78 323,58 330,78" fill="#7d8aa0"/></g>`;
  return g;
}
const EXTRA = {
  boulangerie: { back: backdrop(), front: () => person(70, 196, { item: 'baguette' }) + person(274, 197, { item: 'bag', dress: 1 }) + person(290, 199, { s: .72 }) + cat(330, 199) + smoke(270, 50) + flyingGulls() },
  marche: { back: '', front: () => person(140, 198, { item: 'bag', dress: 1 }) + person(214, 197, { hat: '#8a6d52' }) + person(226, 199, { s: .72, item: 'balloon' }) + person(30, 199) + dog(330, 198) + flyingGulls() },
  tram: { back: backdrop(), front: () => person(30, 190, { item: 'bag' }) + person(318, 191, { dress: 1 }) + person(334, 192, { s: .72 }) + tree(52, 172, .8) + flyingGulls() },
  police: { back: backdrop('#b5cfa0'), front: () => person(250, 196, { top: '#1f2f44', hat: '#1f2f44' }) + bike(320, 198, '#3f6a9a') + person(60, 197, { item: 'bag', dress: 1 }) + tree(345, 178, .8) + bush(96, 182) + dog(80, 198) + smoke(64, 58) + flyingGulls() },
  ecole: { back: backdrop(), front: () => person(110, 196, { s: .7, item: 'bag' }) + person(126, 197, { s: .7, dress: 1 }) + person(232, 196, { s: .7, item: 'arms' }) + person(250, 197, { s: .72 }) + person(270, 196, { dress: 1, item: 'bag' }) + tree(20, 180, .9) + `<g class="a-flag">${''}</g>` + flyingGulls() },
  cafe: { back: backdrop(), front: () => sitter(108, 184) + sitter(132, 184, { top: '#d06a8e' }) + sitter(242, 184) + person(296, 198, { item: 'baguette' }) + cat(170, 198, '#3d3d3d') + bike(334, 197, '#4f8a8b') + laundry(4, 84, 66, 90) + smoke(270, 46) + flyingGulls() },
  gare: { back: '', front: () => person(110, 170, { item: 'suitcase' }) + person(180, 171, { dress: 1, item: 'bag' }) + person(196, 172, { s: .72 }) + person(250, 170, { hat: '#355864', top: '#355864' }) + bench(60, 170) + flyingGulls() },
  medecin: { back: backdrop(), front: () => person(150, 196, { dress: 1, item: 'bag' }) + person(225, 197, { hat: '#6b4a3a' }) + tree(80, 180, .7) + cat(290, 198, '#b8b2a8') + flyingGulls() },
  hotel: { back: '', front: () => person(110, 197, { item: 'suitcase' }) + person(125, 198, { dress: 1 }) + person(265, 197, { top: '#a8744f', hat: '#7c5236' }) + bush(60, 184) + bush(300, 184, '#6f9a5b') + flyingGulls() },
  poste: { back: backdrop(), front: () => person(205, 197, { item: 'bag', top: '#d4a637', hat: '#3f5a74' }) + person(120, 198, { dress: 1 }) + dog(150, 198) + laundry(296, 96, 356, 100) + flyingGulls() },
  plage: { back: '', front: () => person(180, 186, { s: .75, item: 'arms', top: '#e3a33b' }) + person(110, 160, { s: .55, top: '#3e8fb8' }) + `<g class="a-bob"><path d="M130 124 h40 l-6 8 h-28z" fill="#fbf3e4" stroke="${INK}" stroke-width="1.2"/><line x1="150" y1="124" x2="150" y2="100" stroke="${INK}" stroke-width="1.2"/><path d="M151 102 l14 18 h-14z" fill="#d06a8e" stroke="${INK}" stroke-width="1"/></g>` + person(320, 190, { dress: 1, top: '#d64933' }) + `<g class="a-flag"></g>` + flyingGulls() },
  anniversaire: { back: '', front: () => person(70, 196, { item: 'balloon', s: 1.5 }) + person(112, 198, { dress: 1, s: 1.45, hair: '#e8e6e2', top: '#b48ad6' }) + person(250, 198, { s: 1.5, item: 'arms', cls: 'a-dance' }) + person(288, 197, { dress: 1, s: 1.45 }) + person(322, 199, { s: 1.05, item: 'arms', cls: 'a-dance' }) + cat(200, 198) },
  mairie: { back: '', front: () => person(130, 198, { hat: '#3f4f80' }) + person(146, 199, { dress: 1, item: 'bag' }) + person(230, 198, { item: 'arms' }) + person(250, 199, { s: .72 }) + bench(300, 198) + tree(40, 185, .8) + dog(330, 199) + flyingGulls() },
  festival: { back: '', front: () => '' },
  vignoble: { back: '', front: () => person(96, 196, { item: 'bag', top: '#6f9a5b' }) + person(250, 194, { s: .8, item: 'arms', top: '#e3a33b' }) + person(300, 196, { dress: 1, top: '#7a3e6b' }) + dog(330, 197, '#c49a6c') + flyingGulls() },
  tribunal: { back: '', front: () => person(70, 198, { top: '#22252f', item: 'bag' }) + person(96, 199, { dress: 1, top: '#4a4f63' }) + person(268, 198, { hat: '#1f2f44', top: '#1f2f44' }) + person(294, 199, { item: 'arms' }) + bench(330, 198) + tree(20, 184, .8) },
  noel: { back: '', front: () => '' },
  maison: { back: '', front: () => person(40, 198, { item: 'bag', top: '#5f7fa0' }) + person(318, 197, { s: .8, item: 'arms', top: '#e3a33b' }) + dog(340, 198, '#8a5a44') + tree(352, 186, .8) },
  magasin: { back: '', front: () => person(36, 198, { item: 'bag', top: '#c8553d' }) + person(62, 199, { dress: 1, top: '#7a3e6b', item: 'bag' }) + person(300, 198, { hat: '#2a3d52', top: '#3f6f8f' }) + person(326, 199, { s: .8, item: 'balloon' }) + flyingGulls() },
};

// ---------- Scener ----------

function boulangerie() {
  const W = 360, H = 210;
  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bageriet">`;
  s += sky(W, H);
  s += cloud(60, 34, 1) + cloud(290, 26, 0.8) + gull(150, 30) + gull(168, 22);
  s += house(4, 92, 78, 88, { roof: '#7d8a9b' });
  s += house(282, 88, 74, 92, { plaster: '#f1dcc4', roof: '#5f6d7e' });
  // bageriet
  const x = 96, y = 66, w = 170, h = 114;
  s += `<polygon points="${x - 6},${y} ${x + w / 2},${y - 44} ${x + w + 6},${y}" fill="#8b6f62" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f7ead2" stroke="${INK}" stroke-width="2"/>`;
  s += `<rect x="${x + 22}" y="${y + 8}" width="${w - 44}" height="22" rx="4" fill="#3f5a74" stroke="${INK}" stroke-width="1.8"/>`;
  s += `<text x="${x + w / 2}" y="${y + 24}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="13" fill="#f6e3b4" letter-spacing="1.5">BOULANGERIE</text>`;
  // markis
  const ay = y + 38;
  for (let i = 0; i < 10; i++) {
    s += `<rect x="${x + 4 + i * 16.2}" y="${ay}" width="16.2" height="18" fill="${i % 2 ? '#fbf3e4' : '#c8553d'}"/>`;
  }
  for (let i = 0; i < 10; i++) {
    s += `<circle cx="${x + 12.1 + i * 16.2}" cy="${ay + 18}" r="8.1" fill="${i % 2 ? '#fbf3e4' : '#c8553d'}" stroke="${INK}" stroke-width="1.3"/>`;
  }
  s += `<rect x="${x + 4}" y="${ay}" width="${w - 8}" height="18" fill="none" stroke="${INK}" stroke-width="1.6"/>`;
  // skyltfönster
  s += `<rect x="${x + 12}" y="${y + 70}" width="78" height="40" rx="3" fill="#cfe4ec" stroke="${INK}" stroke-width="1.8"/>`;
  s += `<rect x="${x + 16}" y="${y + 96}" width="70" height="4" fill="#a37a5f"/>`;
  s += `<ellipse cx="${x + 34}" cy="${y + 90}" rx="16" ry="4.5" transform="rotate(-18 ${x + 34} ${y + 90})" fill="#e3a865" stroke="${INK}" stroke-width="1.3"/>`;
  s += `<path d="M${x + 52} ${y + 94} q8 -14 18 0 q-9 -4 -18 0z" fill="#e8b06a" stroke="${INK}" stroke-width="1.3"/>`;
  s += `<circle cx="${x + 78}" cy="${y + 90}" r="6" fill="#c76b4f" stroke="${INK}" stroke-width="1.2"/>`;
  // dörr
  s += `<rect x="${x + 108}" y="${y + 66}" width="40" height="48" rx="3" fill="#5d7c64" stroke="${INK}" stroke-width="1.8"/>`;
  s += `<rect x="${x + 114}" y="${y + 72}" width="28" height="18" rx="2" fill="#cfe4ec" stroke="${INK}" stroke-width="1.2"/>`;
  s += `<circle cx="${x + 141}" cy="${y + 96}" r="2.2" fill="#f2c46d"/>`;
  s += flowers(x + 34, y + 62);
  s += cobbles(180, W, 30);
  s += lamp(88, 182);
  // skylt med kringla
  s += `<line x1="${x + w}" y1="${y + 46}" x2="${x + w + 18}" y2="${y + 46}" stroke="${INK}" stroke-width="2"/>`;
  s += `<path d="M${x + w + 14} ${y + 50} c-10 0 -10 16 0 14 c10 2 10 -14 0 -14z" fill="#e3a865" stroke="${INK}" stroke-width="1.4"/>`;
  s += `</svg>`;
  return s;
}

function marche() {
  const W = 360, H = 210;
  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Torget">`;
  s += sky(W, H, '#c4dde3', '#eef3e6');
  s += cloud(80, 30, 0.9) + cloud(250, 40, 1.1) + gull(300, 18);
  // kyrktorn
  s += `<rect x="168" y="44" width="30" height="80" fill="#e6dccb" stroke="${INK}" stroke-width="2"/>`;
  s += `<polygon points="164,44 183,2 202,44" fill="#6d7b8c" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
  s += `<circle cx="183" cy="66" r="8" fill="#fbf3e4" stroke="${INK}" stroke-width="1.5"/><path d="M183 66 v-5 M183 66 h4" stroke="${INK}" stroke-width="1.4"/>`;
  s += house(0, 96, 70, 84, { plaster: '#f4e2c8' });
  s += house(70, 104, 64, 76, { plaster: '#efe1cf', roof: '#7f6a5f' });
  s += house(230, 100, 64, 80, { roof: '#5f6d7e' });
  s += house(294, 92, 66, 88, { plaster: '#f1dcc4' });
  // vimplar
  s += `<path d="M0 72 Q90 98 180 76 T360 74" fill="none" stroke="${INK}" stroke-width="1.2"/>`;
  const cols = ['#c8553d', '#f2c46d', '#6f9a5b', '#3f5a74'];
  for (let i = 0; i < 16; i++) {
    const t = i / 15, px = t * 360;
    const py = t < 0.5 ? 72 + Math.sin(t * Math.PI * 2) * 18 : 76 + Math.sin((t - 0.5) * Math.PI * 2) * -4;
    s += `<polygon points="${px - 6},${py} ${px + 6},${py} ${px},${py + 12}" fill="${cols[i % 4]}" stroke="${INK}" stroke-width="1"/>`;
  }
  s += cobbles(178, W, 32);
  // stånd
  function stall(x, color, fruits) {
    let t = `<g>`;
    t += `<line x1="${x + 4}" y1="122" x2="${x + 4}" y2="184" stroke="${INK}" stroke-width="3"/><line x1="${x + 96}" y1="122" x2="${x + 96}" y2="184" stroke="${INK}" stroke-width="3"/>`;
    t += `<path d="M${x - 6} 128 L${x + 10} 108 H${x + 90} L${x + 106} 128 Z" fill="${color}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
    for (let i = 0; i < 6; i++) t += `<path d="M${x - 6 + i * 18.7} 128 q9.3 9 18.7 0" fill="${i % 2 ? '#fbf3e4' : color}" stroke="${INK}" stroke-width="1.3"/>`;
    t += `<rect x="${x}" y="160" width="100" height="24" fill="#b07d5a" stroke="${INK}" stroke-width="2"/>`;
    t += `<line x1="${x}" y1="172" x2="${x + 100}" y2="172" stroke="#8a5a44" stroke-width="1.5"/>`;
    fruits.forEach((f, j) => {
      for (let k = 0; k < 4; k++) t += `<circle cx="${x + 12 + j * 32 + (k % 2) * 9}" cy="${156 - Math.floor(k / 2) * 7}" r="6" fill="${f}" stroke="${INK}" stroke-width="1.1"/>`;
    });
    t += `</g>`;
    return t;
  }
  s += stall(28, '#6f9a5b', ['#d64933', '#f2c46d', '#7fb24f']);
  s += stall(232, '#c8553d', ['#e98a3b', '#d64933', '#e9d36b']);
  s += `<path d="M150 184 l6 -18 h44 l6 18z" fill="#c9a27a" stroke="${INK}" stroke-width="1.6"/>`;
  s += `<path d="M162 166 l-4 -18 M172 166 l0 -20 M184 166 l4 -18" stroke="#6f9a5b" stroke-width="4" stroke-linecap="round"/>`;
  s += `<path d="M162 166 l-1.5 -6 M172 166 v-6 M184 166 l1.5 -6" stroke="#f3ecd8" stroke-width="4" stroke-linecap="round"/>`;
  s += `</svg>`;
  return s;
}

function tramScene(grey = false) {
  const W = 360, H = 200;
  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`;
  s += sky(W, H, '#c9dfe8', '#f0efe4');
  s += cloud(70, 34) + cloud(280, 28, 0.8);
  s += house(10, 96, 70, 80) + house(270, 92, 80, 84, { plaster: '#f1dcc4' });
  s += cobbles(170, W, 30);
  s += tramBody(70, 92);
  s += `<g><rect x="300" y="110" width="4" height="62" fill="${INK}"/><circle cx="302" cy="104" r="13" fill="#3f5a74" stroke="${INK}" stroke-width="2"/><text x="302" y="108" font-size="9" text-anchor="middle" fill="#fff" font-family="Nunito,sans-serif" font-weight="800">TRAM</text></g>`;
  s += `</svg>`;
  return s;
}

function tramBody(x, y) {
  let s = `<line x1="0" y1="${y - 26}" x2="360" y2="${y - 26}" stroke="${INK}" stroke-width="1.4"/>`;
  s += `<path d="M${x + 70} ${y} l14 -26 l14 26" fill="none" stroke="${INK}" stroke-width="2"/>`;
  s += `<rect x="${x}" y="${y}" width="160" height="66" rx="16" fill="#f3ead4" stroke="${INK}" stroke-width="2.2"/>`;
  s += `<rect x="${x}" y="${y + 42}" width="160" height="24" rx="10" fill="#4f7a63" stroke="${INK}" stroke-width="2"/>`;
  for (let i = 0; i < 4; i++) s += `<rect x="${x + 12 + i * 36}" y="${y + 10}" width="28" height="24" rx="5" fill="#bcd8e2" stroke="${INK}" stroke-width="1.6"/>`;
  s += `<rect x="${x + 4}" y="${y + 2}" width="152" height="5" rx="2" fill="#c8553d"/>`;
  s += `<text x="${x + 80}" y="${y + 58}" font-size="10" text-anchor="middle" fill="#f3ead4" font-family="Fraunces,Georgia,serif" font-weight="700">PORT · GARE · MARCHÉ</text>`;
  s += `<circle cx="${x + 32}" cy="${y + 70}" r="7" fill="${INK}"/><circle cx="${x + 128}" cy="${y + 70}" r="7" fill="${INK}"/>`;
  s += `<line x1="0" y1="${y + 78}" x2="360" y2="${y + 78}" stroke="#8b8b8b" stroke-width="3"/>`;
  return s;
}

// Avdelare mellan kvarteren: spårvagnen åker förbi
export function tramDivider() {
  return `<svg viewBox="0 0 360 120" xmlns="http://www.w3.org/2000/svg" class="tram-div" aria-hidden="true">
  <rect y="96" width="360" height="24" fill="#e2d2b4"/>
  <g class="tram-move">${tramBody(100, 24)}</g></svg>`;
}

function police() {
  const W = 360, H = 200;
  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">` + sky(W, H);
  s += house(0, 92, 80, 84);
  s += `<rect x="100" y="60" width="170" height="116" fill="#b5654f" stroke="${INK}" stroke-width="2"/>`;
  for (let r = 0; r < 10; r++) s += `<line x1="100" y1="${70 + r * 11}" x2="270" y2="${70 + r * 11}" stroke="#9b5442" stroke-width="1"/>`;
  s += `<rect x="96" y="52" width="178" height="12" fill="#6d7b8c" stroke="${INK}" stroke-width="2"/>`;
  s += `<rect x="146" y="72" width="78" height="20" rx="3" fill="#2f4766" stroke="${INK}" stroke-width="1.6"/><text x="185" y="87" text-anchor="middle" font-size="13" fill="#fff" font-family="Fraunces,Georgia,serif" font-weight="700">POLICE</text>`;
  s += `<rect x="166" y="116" width="38" height="60" rx="3" fill="#2f4766" stroke="${INK}" stroke-width="2"/>`;
  s += `<rect x="178" y="98" width="14" height="14" fill="#9cc3e6" stroke="${INK}" stroke-width="1.5"/>`;
  s += `<rect x="114" y="104" width="34" height="30" fill="#cfe4ec" stroke="${INK}" stroke-width="1.6"/><rect x="222" y="104" width="34" height="30" fill="#cfe4ec" stroke="${INK}" stroke-width="1.6"/>`;
  s += cobbles(176, W, 24) + lamp(300, 178);
  s += `</svg>`;
  return s;
}

function port() {
  const W = 360, H = 200;
  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">` + sky(W, H, '#9fcde8', '#eef3ea') + cloud(220, 34) + cloud(70, 24, .8);
  // husrad längs kajen
  s += house(0, 92, 54, 50, { roofH: 26 }) + house(54, 86, 50, 56, { roofH: 28 }) + house(104, 94, 46, 48, { roofH: 24 }) + house(150, 88, 52, 54, { roofH: 28 });
  s += `<rect x="0" y="140" width="210" height="12" fill="#d8c7a6" stroke="${INK}" stroke-width="1.2"/>`;
  for (let i = 0; i < 6; i++) s += `<circle cx="${18 + i * 34}" cy="146" r="2.5" fill="#6b5a4a"/>`;
  // fyr på piren
  s += `<path d="M230 150 h130 v8 h-130z" fill="#b8ab95" stroke="${INK}" stroke-width="1.2"/>`;
  s += `<rect x="300" y="62" width="24" height="88" fill="#fbf3e4" stroke="${INK}" stroke-width="2"/>`;
  for (let i = 0; i < 3; i++) s += `<rect x="300" y="${74 + i * 26}" width="24" height="12" fill="#c8553d"/>`;
  s += `<rect x="296" y="50" width="32" height="14" fill="#f2c46d" stroke="${INK}" stroke-width="2"/><polygon points="294,50 312,36 330,50" fill="#c8553d" stroke="${INK}" stroke-width="2"/>`;
  s += `<circle class="a-blink" cx="312" cy="57" r="9" fill="#fff6b0" opacity=".8"/>`;
  // havet
  s += `<rect x="0" y="152" width="360" height="48" fill="#4f93bb"/><rect x="230" y="158" width="130" height="42" fill="#5a9ec4"/>`;
  for (let i = 0; i < 9; i++) s += `<path class="a-wave" d="M${i * 42} ${166 + (i % 2) * 14} q10 -5 20 0 t20 0" fill="none" stroke="#e8f3f6" stroke-width="2"/>`;
  // båtar
  s += `<g class="a-bob"><path d="M40 160 h70 l-10 14 h-50z" fill="#c8553d" stroke="${INK}" stroke-width="1.6"/><line x1="72" y1="160" x2="72" y2="112" stroke="${INK}" stroke-width="2"/><path d="M74 114 l26 40 h-26z" fill="#fbf3e4" stroke="${INK}" stroke-width="1.4"/>${person(56, 160, { s: .7, top: '#f2c94c', hat: '#f2c94c' })}</g>`;
  s += `<g class="a-bob slow"><path d="M150 168 h56 l-8 12 h-40z" fill="#3f6a9a" stroke="${INK}" stroke-width="1.6"/><rect x="164" y="156" width="20" height="12" fill="#fbf3e4" stroke="${INK}" stroke-width="1.2"/></g>`;
  s += `<g class="a-bob"><path d="M250 176 h36 l-6 9 h-24z" fill="#6f9a5b" stroke="${INK}" stroke-width="1.4"/><line x1="268" y1="176" x2="268" y2="150" stroke="${INK}" stroke-width="1.5"/><path d="M269 152 l14 22 h-14z" fill="#f2c46d" stroke="${INK}" stroke-width="1"/></g>`;
  // folk och fisk på kajen
  s += person(120, 142, { hat: '#2f4766', item: 'bag' }) + person(190, 142, { dress: 1 }) + cat(30, 142, '#3d3d3d');
  s += `<rect x="140" y="132" width="16" height="10" fill="#8a5a44" stroke="${INK}" stroke-width=".8"/><path d="M142 133 q4 -4 8 0 q-4 4 -8 0z M146 131 q4 -4 8 0 q-4 4 -8 0z" fill="#9cc3d5" stroke="${INK}" stroke-width=".5"/>`;
  s += smoke(40, 66) + flyingGulls();
  s += `</svg>`;
  return s;
}

function ecole() {
  const W = 360, H = 200;
  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">` + sky(W, H) + cloud(70, 30) + cloud(290, 36, 0.8);
  s += house(0, 96, 64, 80) + house(296, 92, 64, 84, { plaster: '#f1dcc4' });
  s += `<rect x="80" y="70" width="200" height="106" fill="#e9d8bb" stroke="${INK}" stroke-width="2"/><polygon points="72,70 180,30 288,70" fill="#8b6f62" stroke="${INK}" stroke-width="2"/>`;
  s += `<circle cx="180" cy="54" r="11" fill="#fbf3e4" stroke="${INK}" stroke-width="1.6"/><path d="M180 54 v-7 M180 54 h5" stroke="${INK}" stroke-width="1.5"/>`;
  s += `<rect x="128" y="76" width="104" height="18" rx="3" fill="#3f5a74" stroke="${INK}" stroke-width="1.6"/><text x="180" y="89" text-anchor="middle" font-size="11" fill="#f6e3b4" font-family="Fraunces,Georgia,serif" font-weight="700" letter-spacing="1.5">ÉCOLE</text>`;
  for (let i = 0; i < 4; i++) s += `<rect x="${94 + i * 48}" y="104" width="28" height="26" fill="#cfe4ec" stroke="${INK}" stroke-width="1.5"/>`;
  s += `<rect x="164" y="138" width="32" height="38" fill="#c8553d" stroke="${INK}" stroke-width="1.8"/>`;
  s += `<line x1="270" y1="70" x2="270" y2="40" stroke="${INK}" stroke-width="2"/><rect x="270" y="40" width="9" height="14" fill="#3f5a74"/><rect x="279" y="40" width="9" height="14" fill="#fbf3e4"/><rect x="288" y="40" width="9" height="14" fill="#c8553d"/>`;
  s += cobbles(176, W, 24) + `</svg>`;
  return s;
}

function cafe() {
  const W = 360, H = 200;
  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">` + sky(W, H, '#c7dde6', '#f3ecdc') + cloud(60, 28) + gull(250, 26);
  s += house(0, 90, 70, 86, { plaster: '#f4e2c8' }) + house(290, 94, 70, 82);
  s += `<rect x="86" y="58" width="190" height="118" fill="#f3e6cf" stroke="${INK}" stroke-width="2"/><polygon points="80,58 181,24 282,58" fill="#5f6d7e" stroke="${INK}" stroke-width="2"/>`;
  s += `<rect x="126" y="64" width="110" height="20" rx="4" fill="#6f9a5b" stroke="${INK}" stroke-width="1.6"/><text x="181" y="79" text-anchor="middle" font-size="12" fill="#fbf3e4" font-family="Fraunces,Georgia,serif" font-weight="700" letter-spacing="2">CAFÉ</text>`;
  for (let i = 0; i < 11; i++) s += `<rect x="${90 + i * 16.5}" y="92" width="16.5" height="16" fill="${i % 2 ? '#fbf3e4' : '#6f9a5b'}"/>`;
  s += `<rect x="90" y="92" width="182" height="16" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
  s += `<rect x="104" y="116" width="70" height="40" fill="#cfe4ec" stroke="${INK}" stroke-width="1.6"/><rect x="196" y="116" width="34" height="60" fill="#8a5a44" stroke="${INK}" stroke-width="1.6"/>`;
  function table(x) { return `<ellipse cx="${x}" cy="166" rx="16" ry="4" fill="#fbf3e4" stroke="${INK}" stroke-width="1.4"/><line x1="${x}" y1="168" x2="${x}" y2="188" stroke="${INK}" stroke-width="2"/><rect x="${x - 4}" y="158" width="7" height="8" rx="1" fill="#fff" stroke="${INK}" stroke-width="1"/>`; }
  s += cobbles(176, W, 24) + table(120) + table(254) + `</svg>`;
  return s;
}


function sign(x, y, w, txt, bg = '#3f5a74', fg = '#f6e3b4', fs = 12) {
  return `<rect x="${x}" y="${y}" width="${w}" height="20" rx="3" fill="${bg}" stroke="${INK}" stroke-width="1.6"/><text x="${x + w / 2}" y="${y + 14.5}" text-anchor="middle" font-size="${fs}" fill="${fg}" font-family="Fraunces,Georgia,serif" font-weight="700" letter-spacing="1.5">${txt}</text>`;
}
function svgOpen(top, bottom) { return `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg">` + sky(360, 200, top, bottom); }

function gare() {
  let s = svgOpen('#c3dbe4', '#efeee2') + cloud(60, 30) + cloud(300, 24, 0.8);
  s += `<rect x="40" y="62" width="280" height="96" fill="#e9dcc4" stroke="${INK}" stroke-width="2"/>`;
  s += `<path d="M30 62 q150 -50 300 0z" fill="#6d7b8c" stroke="${INK}" stroke-width="2"/>`;
  s += `<circle cx="180" cy="46" r="13" fill="#fbf3e4" stroke="${INK}" stroke-width="2"/><path d="M180 46 v-8 M180 46 l6 3" stroke="${INK}" stroke-width="1.6"/>`;
  s += sign(130, 68, 100, 'GARE');
  for (let i = 0; i < 5; i++) s += `<path d="M${56 + i * 54} 154 v-40 q12 -16 24 0 v40z" fill="#cfe4ec" stroke="${INK}" stroke-width="1.6"/>`;
  s += `<rect x="0" y="158" width="360" height="14" fill="#cfc2a8" stroke="${INK}" stroke-width="1.2"/>`;
  s += `<rect x="0" y="172" width="360" height="28" fill="#b9a98c"/>`;
  for (let i = 0; i < 20; i++) s += `<rect x="${i * 19}" y="180" width="10" height="5" fill="#7a6a55"/>`;
  s += `<line x1="0" y1="178" x2="360" y2="178" stroke="#6b6b6b" stroke-width="2.5"/><line x1="0" y1="190" x2="360" y2="190" stroke="#6b6b6b" stroke-width="2.5"/>`;
  s += `<rect x="300" y="108" width="40" height="22" rx="2" fill="#1f2f44" stroke="${INK}" stroke-width="1.5"/><text x="320" y="123" text-anchor="middle" font-size="9" fill="#f2c46d" font-family="monospace">09:15</text><line x1="320" y1="130" x2="320" y2="158" stroke="${INK}" stroke-width="2"/>`;
  return s + `</svg>`;
}

function medecin() {
  let s = svgOpen('#c9e1e2', '#f1f2e8') + cloud(80, 28) + cloud(280, 34, 0.9);
  s += house(0, 94, 70, 82, { plaster: '#f1dcc4' }) + house(290, 90, 70, 86);
  s += `<rect x="90" y="64" width="180" height="112" fill="#f6f1e6" stroke="${INK}" stroke-width="2"/><polygon points="84,64 180,28 276,64" fill="#5f7d7a" stroke="${INK}" stroke-width="2"/>`;
  s += sign(120, 72, 120, 'CABINET', '#5a9e8f', '#fbf3e4');
  s += `<rect x="168" y="98" width="24" height="24" fill="#fff" stroke="${INK}" stroke-width="1.5"/><path d="M180 102 v16 M172 110 h16" stroke="#3aa26b" stroke-width="5"/>`;
  s += `<rect x="104" y="104" width="44" height="34" fill="#cfe4ec" stroke="${INK}" stroke-width="1.6"/><rect x="212" y="104" width="44" height="34" fill="#cfe4ec" stroke="${INK}" stroke-width="1.6"/>`;
  s += `<rect x="164" y="132" width="32" height="44" rx="3" fill="#5a9e8f" stroke="${INK}" stroke-width="1.8"/><circle cx="190" cy="156" r="2" fill="#f2c46d"/>`;
  s += flowers(108, 140) + flowers(218, 140) + cobbles(176, 360, 24);
  return s + `</svg>`;
}

function hotel() {
  let s = svgOpen('#b9d6e6', '#f1ebdc') + gull(60, 30) + gull(76, 22) + cloud(300, 30, 0.8);
  s += `<rect x="0" y="150" width="70" height="26" fill="#6f9fb8"/>`;
  s += `<rect x="80" y="40" width="200" height="136" fill="#efe0c6" stroke="${INK}" stroke-width="2"/><rect x="74" y="32" width="212" height="12" fill="#a8744f" stroke="${INK}" stroke-width="2"/>`;
  s += sign(120, 50, 120, 'HÔTEL DU PHARE', '#a8744f', '#fbf3e4', 10);
  for (let r = 0; r < 2; r++) for (let c = 0; c < 5; c++) {
    const x = 96 + c * 36, y = 80 + r * 34;
    s += `<rect x="${x}" y="${y}" width="22" height="24" fill="#cfe4ec" stroke="${INK}" stroke-width="1.4"/><rect x="${x - 3}" y="${y + 22}" width="28" height="4" fill="#c8553d" stroke="${INK}" stroke-width="1"/>`;
  }
  s += `<path d="M150 176 v-30 q30 -20 60 0 v30z" fill="#7c5236" stroke="${INK}" stroke-width="1.8"/><path d="M140 146 h80 l-8 -10 h-64z" fill="#c8553d" stroke="${INK}" stroke-width="1.6"/>`;
  for (let i = 0; i < 3; i++) s += `<circle cx="${110 + i * 140 / 2}" cy="${166}" r="0" />`;
  s += `<rect x="300" y="110" width="44" height="66" fill="#f1dcc4" stroke="${INK}" stroke-width="1.6"/><polygon points="296,110 322,90 348,110" fill="#5f6d7e" stroke="${INK}" stroke-width="1.6"/>`;
  s += cobbles(176, 360, 24) + lamp(130, 178) + lamp(232, 178);
  return s + `</svg>`;
}

function poste() {
  let s = svgOpen('#c5dde6', '#f3ecda') + cloud(70, 26) + cloud(260, 34);
  s += house(0, 92, 74, 84) + house(286, 96, 74, 80, { plaster: '#f4e2c8' });
  s += `<rect x="92" y="60" width="176" height="116" fill="#f3e2b8" stroke="${INK}" stroke-width="2"/><rect x="86" y="52" width="188" height="12" fill="#6d7b8c" stroke="${INK}" stroke-width="2"/>`;
  s += sign(124, 70, 112, 'LA POSTE', '#d4a637', '#3d2c29');
  s += `<rect x="108" y="102" width="50" height="40" fill="#cfe4ec" stroke="${INK}" stroke-width="1.6"/><rect x="200" y="102" width="50" height="40" fill="#cfe4ec" stroke="${INK}" stroke-width="1.6"/>`;
  s += `<path d="M114 110 h20 v14 h-20z M114 110 l10 8 l10 -8" fill="#fbf7ee" stroke="${INK}" stroke-width="1.2"/>`;
  s += `<rect x="164" y="120" width="32" height="56" rx="3" fill="#3f5a74" stroke="${INK}" stroke-width="1.8"/>`;
  s += `<rect x="64" y="140" width="22" height="34" rx="6" fill="#f2c94c" stroke="${INK}" stroke-width="1.8"/><rect x="68" y="148" width="14" height="3" fill="${INK}"/><line x1="75" y1="174" x2="75" y2="180" stroke="${INK}" stroke-width="3"/>`;
  s += `<g transform="translate(280 150)"><circle cx="0" cy="18" r="9" fill="none" stroke="${INK}" stroke-width="2"/><circle cx="30" cy="18" r="9" fill="none" stroke="${INK}" stroke-width="2"/><path d="M0 18 l10 -16 h14 l6 16 M10 2 l-3 -6" fill="none" stroke="#d4a637" stroke-width="2.5"/><rect x="14" y="-6" width="16" height="10" fill="#d4a637" stroke="${INK}" stroke-width="1.2"/></g>`;
  s += cobbles(176, 360, 24);
  return s + `</svg>`;
}

function plage() {
  let s = svgOpen('#a9d3ea', '#eaf4f4');
  s += `<circle cx="300" cy="40" r="20" fill="#f6d47a"/>` + cloud(90, 34) + gull(190, 30) + gull(206, 22);
  s += `<rect x="0" y="100" width="360" height="60" fill="#5e9fc2"/>`;
  for (let i = 0; i < 9; i++) s += `<path d="M${i * 44} ${116 + (i % 2) * 14} q11 -6 22 0 t22 0" fill="none" stroke="#e8f3f6" stroke-width="2"/>`;
  s += `<path d="M0 150 q90 -12 180 -2 t180 0 v52 h-360z" fill="#ecd7a6"/>`;
  s += `<line x1="60" y1="176" x2="72" y2="120" stroke="${INK}" stroke-width="2.5"/><path d="M26 130 q46 -40 92 -2z" fill="#c8553d" stroke="${INK}" stroke-width="2"/><path d="M48 124 q24 -30 48 0" fill="#fbf3e4" stroke="${INK}" stroke-width="1.4"/>`;
  s += `<rect x="232" y="104" width="44" height="34" fill="#fbf3e4" stroke="${INK}" stroke-width="2"/><polygon points="226,104 254,88 282,104" fill="#3e8fb8" stroke="${INK}" stroke-width="2"/>`;
  s += `<line x1="240" y1="138" x2="240" y2="176" stroke="${INK}" stroke-width="3"/><line x1="268" y1="138" x2="268" y2="176" stroke="${INK}" stroke-width="3"/>`;
  s += `<line x1="300" y1="176" x2="300" y2="96" stroke="${INK}" stroke-width="2"/><path d="M300 96 h26 l-6 8 l6 8 h-26z" fill="#d64933" stroke="${INK}" stroke-width="1.5"/>`;
  s += `<path d="M150 182 h24 l-4 -16 h-16z" fill="#e3a865" stroke="${INK}" stroke-width="1.5"/><path d="M152 166 l6 -10 l6 10 M160 166 l6 -12 l6 12" fill="#e3a865" stroke="${INK}" stroke-width="1.3"/>`;
  s += `<rect x="120" y="180" width="30" height="8" rx="2" fill="#f2c46d" stroke="${INK}" stroke-width="1.2"/>`;
  return s + `</svg>`;
}

function anniversaire() {
  let s = svgOpen('#f3d9e2', '#fbf1e6');
  s += `<rect x="0" y="150" width="360" height="50" fill="#d9b48f"/>`;
  s += `<path d="M0 30 Q90 60 180 34 T360 32" fill="none" stroke="${INK}" stroke-width="1.2"/>`;
  const cols = ['#d06a8e', '#f2c46d', '#6f9a5b', '#3e8fb8'];
  for (let i = 0; i < 14; i++) { const px = 10 + i * 26, py = 34 + Math.sin(i / 13 * Math.PI) * 16; s += `<polygon points="${px - 6},${py} ${px + 6},${py} ${px},${py + 12}" fill="${cols[i % 4]}" stroke="${INK}" stroke-width="1"/>`; }
  [[50, 80, '#d06a8e'], [80, 70, '#3e8fb8'], [300, 76, '#f2c46d'], [326, 86, '#6f9a5b']].forEach(([x, y, c]) => {
    s += `<ellipse cx="${x}" cy="${y}" rx="13" ry="16" fill="${c}" stroke="${INK}" stroke-width="1.6"/><path d="M${x} ${y + 16} q-4 20 2 40" fill="none" stroke="${INK}" stroke-width="1"/>`;
  });
  s += `<rect x="90" y="140" width="180" height="10" fill="#fbf7ee" stroke="${INK}" stroke-width="1.6"/><path d="M90 150 h180 v6 q-90 10 -180 0z" fill="#f3e2e8" stroke="${INK}" stroke-width="1.4"/>`;
  s += `<rect x="130" y="104" width="100" height="36" rx="4" fill="#7a4a3a" stroke="${INK}" stroke-width="2"/><rect x="146" y="82" width="68" height="24" rx="4" fill="#8a5a44" stroke="${INK}" stroke-width="2"/>`;
  s += `<path d="M130 112 q12 8 25 0 t25 0 t25 0 t25 0" fill="none" stroke="#fbf3e4" stroke-width="3"/>`;
  for (let i = 0; i < 5; i++) { const x = 154 + i * 13; s += `<rect x="${x}" y="68" width="4" height="14" fill="${cols[i % 4]}" stroke="${INK}" stroke-width="0.8"/><path d="M${x + 2} 66 q-3 -5 0 -9 q3 4 0 9z" fill="#f6b14a"/>`; }
  s += `<rect x="40" y="118" width="30" height="22" fill="#3e8fb8" stroke="${INK}" stroke-width="1.6"/><path d="M55 118 v22 M40 128 h30" stroke="#f2c46d" stroke-width="3"/><path d="M55 118 q-8 -10 -12 -2 q4 4 12 2 q8 -10 12 -2 q-4 4 -12 2" fill="#f2c46d" stroke="${INK}" stroke-width="1"/>`;
  s += `<rect x="292" y="122" width="26" height="18" fill="#d06a8e" stroke="${INK}" stroke-width="1.6"/><path d="M305 122 v18" stroke="#fbf3e4" stroke-width="3"/>`;
  return s + `</svg>`;
}

function mairie() {
  let s = svgOpen('#c1d6e6', '#efeee6') + cloud(50, 30) + cloud(310, 26, 0.8);
  s += house(0, 100, 58, 76) + house(302, 100, 58, 76, { plaster: '#f1dcc4' });
  s += `<rect x="70" y="70" width="220" height="106" fill="#efe6d6" stroke="${INK}" stroke-width="2"/><polygon points="62,70 180,26 298,70" fill="#5c6fa8" stroke="${INK}" stroke-width="2"/>`;
  s += `<circle cx="180" cy="52" r="10" fill="#fbf3e4" stroke="${INK}" stroke-width="1.6"/><path d="M180 52 v-6 M180 52 h5" stroke="${INK}" stroke-width="1.4"/>`;
  s += sign(130, 76, 100, 'MAIRIE', '#5c6fa8', '#fbf3e4');
  for (let i = 0; i < 6; i++) s += `<rect x="${84 + i * 34}" y="102" width="12" height="74" fill="#f8f2e6" stroke="${INK}" stroke-width="1.2"/>`;
  s += `<path d="M162 176 v-34 q18 -14 36 0 v34z" fill="#3f4f80" stroke="${INK}" stroke-width="1.8"/>`;
  s += `<line x1="180" y1="26" x2="180" y2="4" stroke="${INK}" stroke-width="2"/><rect x="180" y="4" width="8" height="12" fill="#3f5a74"/><rect x="188" y="4" width="8" height="12" fill="#fbf3e4"/><rect x="196" y="4" width="8" height="12" fill="#c8553d"/>`;
  s += `<rect x="60" y="176" width="240" height="8" fill="#d8ccb6" stroke="${INK}" stroke-width="1"/>` + cobbles(184, 360, 16);
  return s + `</svg>`;
}

function festival() {
  let s = svgOpen('#2c3567', '#c46a5a');
  for (let i = 0; i < 18; i++) s += `<circle cx="${(i * 73) % 360}" cy="${(i * 37) % 70 + 6}" r="1.4" fill="#fbf3e4" opacity=".8"/>`;
  [[70, 40, '#f2c46d'], [290, 34, '#d06a8e'], [190, 22, '#7fd0e8']].forEach(([x, y, c]) => {
    for (let a = 0; a < 12; a++) { const r = a * Math.PI / 6; s += `<line x1="${x + Math.cos(r) * 5}" y1="${y + Math.sin(r) * 5}" x2="${x + Math.cos(r) * 18}" y2="${y + Math.sin(r) * 18}" stroke="${c}" stroke-width="2" stroke-linecap="round"/>`; }
  });
  s += `<rect x="70" y="96" width="220" height="60" fill="#3d2c29" stroke="${INK}" stroke-width="2"/><path d="M60 96 h240 l-14 -24 h-212z" fill="#c4532f" stroke="${INK}" stroke-width="2"/>`;
  for (let i = 0; i < 8; i++) s += `<path d="M${60 + i * 30} 96 q15 12 30 0" fill="${i % 2 ? '#f2c46d' : '#c4532f'}" stroke="${INK}" stroke-width="1.2"/>`;
  s += `<path d="M110 156 l40 -60 h60 l40 60z" fill="#f6d47a" opacity=".25"/>`;
  s += `<rect x="168" y="118" width="24" height="38" rx="4" fill="#3e8fb8"/><circle cx="180" cy="112" r="8" fill="#f4cba6"/><path d="M164 134 l30 -8" stroke="#8a5a44" stroke-width="6" stroke-linecap="round"/>`;
  // girlanger med lampor
  s += `<path d="M0 66 Q90 90 180 70 T360 68" fill="none" stroke="#1a1530" stroke-width="1"/>`;
  for (let i = 0; i < 18; i++) { const t = i / 17, x = t * 360, y = 66 + Math.sin(t * Math.PI * 2) * 10 + 4; s += `<circle class="a-blink" style="animation-delay:${-(i % 4) * .6}s" cx="${x}" cy="${y}" r="2.6" fill="${['#f2c46d', '#d06a8e', '#7fd0e8', '#9be08a'][i % 4]}"/>`; }
  // crêpestånd och ballonger
  s += `<g transform="translate(300 156)"><rect x="-26" y="-34" width="52" height="34" fill="#f3e2b8" stroke="${INK}" stroke-width="1.5"/><path d="M-30 -34 h60 l-6 -10 h-48z" fill="#c4532f" stroke="${INK}" stroke-width="1.3"/><text x="0" y="-15" text-anchor="middle" font-size="9" font-family="Fraunces,Georgia,serif" font-weight="700" fill="#7a3a1a">CRÊPES</text><circle cx="-10" cy="-6" r="4" fill="#e3a865"/><circle cx="10" cy="-6" r="4" fill="#e3a865"/></g>`;
  s += `<g transform="translate(40 156)"><rect x="-22" y="-28" width="44" height="28" fill="#dfe8f0" stroke="${INK}" stroke-width="1.5"/><path d="M-26 -28 h52 l-6 -9 h-40z" fill="#3e8fb8" stroke="${INK}" stroke-width="1.3"/><text x="0" y="-11" text-anchor="middle" font-size="8" font-family="Nunito,sans-serif" font-weight="900" fill="#2a6a8c">CIDRE</text></g>`;
  s += `<rect x="0" y="156" width="360" height="44" fill="#4a3a3a"/>`;
  // publiken: riktiga människor i färg, några dansar och vinkar
  for (let i = 0; i < 13; i++) { const x = 14 + i * 27 + (i % 2) * 6, y = 200 - (i % 3) * 3; s += person(x, y, { s: 1.05 - (i % 3) * .06, item: i % 3 === 1 ? 'arms' : i === 6 ? 'balloon' : '', dress: i % 4 === 2, cls: i % 2 ? 'a-dance' : 'a-sway' }); }
  s += person(180, 205, { s: .8, item: 'arms', cls: 'a-dance' }) + dog(250, 204, '#c49a6c');
  return s + `</svg>`;
}

function vignoble() {
  let s = svgOpen('#bcd7e8', '#f3e9cf') + cloud(70, 26) + cloud(290, 34, 0.8);
  s += `<path d="M0 104 Q90 64 180 92 T360 80 V200 H0z" fill="#c9d79a" stroke="${INK}" stroke-width="1.6"/>`;
  s += `<path d="M0 132 Q120 102 240 124 T360 116 V200 H0z" fill="#b6c983" stroke="${INK}" stroke-width="1.4"/>`;
  // gården
  s += `<rect x="232" y="64" width="84" height="46" fill="#f1dcc4" stroke="${INK}" stroke-width="2"/><polygon points="226,64 274,40 322,64" fill="#a8603f" stroke="${INK}" stroke-width="2"/>`;
  s += `<path d="M262 110 v-22 q12 -10 24 0 v22z" fill="#7a3e6b" stroke="${INK}" stroke-width="1.6"/><rect x="244" y="74" width="12" height="12" fill="#cfe4ec" stroke="${INK}" stroke-width="1.4"/><rect x="294" y="74" width="12" height="12" fill="#cfe4ec" stroke="${INK}" stroke-width="1.4"/>`;
  s += sign(230, 112, 92, 'DOMAINE VIDAL', '#7a3e6b', '#f6e3b4', 7.5);
  // vinrader i perspektiv
  for (let r = 0; r < 5; r++) {
    const y = 140 + r * 13, sc = .6 + r * .12;
    for (let i = 0; i < 12; i++) {
      const x = -6 + i * 32 + (r % 2) * 14;
      s += `<line x1="${x}" y1="${y + 6}" x2="${x}" y2="${y - 6 * sc}" stroke="#7a5240" stroke-width="${1.4 * sc}"/>`;
      s += `<ellipse cx="${x}" cy="${y - 6 * sc}" rx="${12 * sc}" ry="${6 * sc}" fill="${['#6f9a5b', '#7fae5e', '#5f8a4b'][(i + r) % 3]}" stroke="${INK}" stroke-width=".8"/>`;
      if ((i + r) % 2) s += `<circle cx="${x + 4 * sc}" cy="${y - 2 * sc}" r="${2.6 * sc}" fill="#7a3e6b"/><circle cx="${x + 7 * sc}" cy="${y}" r="${2.6 * sc}" fill="#7a3e6b"/>`;
    }
  }
  s += `<g transform="translate(170 192)"><path d="M-16 -16 h32 l-4 16 h-24z" fill="#c9a26a" stroke="${INK}" stroke-width="1.4"/>${[-8, 0, 8, -4, 4].map((x, k) => `<circle cx="${x}" cy="${-18 - (k > 2 ? 5 : 0)}" r="4" fill="#7a3e6b" stroke="${INK}" stroke-width=".8"/>`).join('')}</g>`;
  s += `<g transform="translate(40 108)"><rect x="-14" y="-10" width="28" height="12" rx="3" fill="#c8553d" stroke="${INK}" stroke-width="1.3"/><rect x="2" y="-20" width="12" height="10" fill="#cfe4ec" stroke="${INK}" stroke-width="1.2"/><circle cx="-8" cy="4" r="6" fill="#3d2c29"/><circle cx="10" cy="5" r="4" fill="#3d2c29"/></g>`;
  return s + `</svg>`;
}

function tribunal() {
  let s = svgOpen('#c4d3e0', '#ecebe4') + cloud(50, 30, 0.9) + cloud(300, 24, 0.7);
  s += house(0, 100, 56, 76, { plaster: '#e8dcc0' }) + house(304, 104, 56, 72);
  s += `<rect x="64" y="160" width="232" height="16" fill="#ddd6c6" stroke="${INK}" stroke-width="1.6"/><rect x="74" y="150" width="212" height="10" fill="#e6e0d2" stroke="${INK}" stroke-width="1.4"/>`;
  s += `<rect x="84" y="78" width="192" height="72" fill="#efeae0" stroke="${INK}" stroke-width="2"/>`;
  s += `<polygon points="74,78 180,36 286,78" fill="#e6e0d2" stroke="${INK}" stroke-width="2"/><polygon points="98,72 180,44 262,72" fill="none" stroke="${INK}" stroke-width="1"/>`;
  for (let i = 0; i < 6; i++) { const x = 96 + i * 34; s += `<rect x="${x}" y="84" width="14" height="66" fill="#f8f4ec" stroke="${INK}" stroke-width="1.3"/><rect x="${x - 3}" y="80" width="20" height="5" fill="#ddd6c6" stroke="${INK}" stroke-width="1"/>`; }
  s += `<rect x="96" y="66" width="168" height="12" fill="#4a4f63" stroke="${INK}" stroke-width="1.4"/><text x="180" y="75.5" text-anchor="middle" font-size="8.5" font-family="Fraunces,Georgia,serif" font-weight="700" fill="#f6e3b4" letter-spacing="1.5">PALAIS DE JUSTICE</text>`;
  // våg
  s += `<g transform="translate(180 58)"><line x1="0" y1="-10" x2="0" y2="4" stroke="#c9a26a" stroke-width="1.6"/><line x1="-12" y1="-8" x2="12" y2="-8" stroke="#c9a26a" stroke-width="1.6"/><path d="M-16 -2 q4 4 8 0 l-4 -6z M8 -2 q4 4 8 0 l-4 -6z" fill="#e3c38b" stroke="${INK}" stroke-width=".8"/></g>`;
  s += `<path d="M168 150 v-30 q12 -10 24 0 v30z" fill="#30344a" stroke="${INK}" stroke-width="1.6"/>`;
  s += `<line x1="70" y1="160" x2="70" y2="110" stroke="${INK}" stroke-width="1.6"/><rect x="70" y="110" width="14" height="10" fill="#3f5a74"/><rect x="84" y="110" width="0" height="10"/>`;
  s += cobbles(176, 360, 24);
  return s + `</svg>`;
}

function noel() {
  let s = svgOpen('#1d2b4a', '#4a5a7a');
  for (let i = 0; i < 22; i++) s += `<circle cx="${(i * 67) % 360}" cy="${(i * 29) % 60 + 6}" r="1.2" fill="#fbf3e4" opacity=".8"/>`;
  s += `<rect x="0" y="150" width="360" height="50" fill="#e9eef3"/>`;
  s += house(0, 82, 60, 70, { plaster: '#e8dcc0' }) + house(300, 86, 60, 66, { plaster: '#f1dcc4' });
  // granen
  s += `<g transform="translate(180 152)"><rect x="-6" y="-8" width="12" height="10" fill="#7a5240" stroke="${INK}" stroke-width="1.4"/>`;
  [[-8, 46, -60], [-38, 36, -86], [-66, 26, -110]].forEach(([y, w, top]) => { s += `<polygon points="${-w},${y} 0,${top} ${w},${y}" fill="#2f6b4f" stroke="${INK}" stroke-width="1.6"/>`; });
  for (let i = 0; i < 14; i++) { const a = i * 2.4, y = -20 - (i * 7) % 84, x = Math.sin(a) * (40 - (-y) * .38); s += `<circle class="a-blink" style="animation-delay:${-(i % 4) * .5}s" cx="${x}" cy="${y}" r="2.6" fill="${['#f2c46d', '#c8553d', '#7fd0e8', '#fbf3e4'][i % 4]}"/>`; }
  s += `<path d="M0 -122 l4 9 l10 1 l-8 6 l3 10 l-9 -6 l-9 6 l3 -10 l-8 -6 l10 -1z" fill="#f2c46d" stroke="${INK}" stroke-width="1.2"/><circle class="a-blink" cx="0" cy="-114" r="14" fill="#fff6b0" opacity=".35"/></g>`;
  // stånd
  const chalet = (x, label, c) => `<g transform="translate(${x} 156)"><rect x="-30" y="-36" width="60" height="36" fill="#a8744f" stroke="${INK}" stroke-width="1.5"/><path d="M-36 -36 l36 -20 l36 20z" fill="#fbfbf7" stroke="${INK}" stroke-width="1.5"/><rect x="-24" y="-28" width="48" height="16" fill="#f6e3b4" stroke="${INK}" stroke-width="1.2"/><text x="0" y="-16.5" text-anchor="middle" font-size="7.5" font-family="Nunito,sans-serif" font-weight="900" fill="${c}">${label}</text><path d="M-30 -36 q10 6 20 0 q10 6 20 0 q10 6 20 0" fill="none" stroke="#f2c46d" stroke-width="1.4" stroke-dasharray="1 3"/></g>`;
  s += chalet(76, 'MARRONS', '#7a3a1a') + chalet(284, 'CADEAUX', '#2f6b4f');
  // girlang över torget
  s += `<path d="M60 84 Q180 116 300 86" fill="none" stroke="#1a1530" stroke-width="1"/>`;
  for (let i = 0; i < 14; i++) { const t = i / 13, x = 60 + t * 240, y = 84 + Math.sin(t * Math.PI) * 26 + 3; s += `<circle class="a-blink" style="animation-delay:${-(i % 3) * .7}s" cx="${x}" cy="${y}" r="2.2" fill="${['#f2c46d', '#c8553d', '#9be08a'][i % 3]}"/>`; }
  // snöflingor
  for (let i = 0; i < 26; i++) s += `<circle class="a-snow" style="animation-delay:${-(i * .37) % 6}s" cx="${(i * 41) % 360}" cy="${(i * 53) % 150}" r="${1.2 + (i % 3) * .6}" fill="#fff" opacity=".9"/>`;
  for (let i = 0; i < 9; i++) s += person(24 + i * 40 + (i % 2) * 6, 198 - (i % 2) * 2, { s: 1, item: i === 3 ? 'bag' : i === 6 ? 'balloon' : '', dress: i % 3 === 1, hat: i % 4 === 0 ? '#c8553d' : '', top: CLOTH[(i * 3) % CLOTH.length], skin: SKIN[i % SKIN.length], cls: 'a-sway' });
  return s + `</svg>`;
}

function maison() {
  let s = svgOpen('#bcd7e8', '#f3e9cf') + cloud(60, 28) + cloud(300, 22, 0.8);
  s += house(0, 96, 60, 80) + house(300, 100, 60, 76);
  s += `<rect x="0" y="176" width="360" height="24" fill="#c9d79a" stroke="${INK}" stroke-width="1.4"/>`;
  // huset från 1927
  s += `<rect x="96" y="82" width="168" height="94" fill="#f1dcc4" stroke="${INK}" stroke-width="2"/>`;
  s += `<polygon points="88,82 180,30 272,82" fill="#a8603f" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
  s += `<rect x="168" y="44" width="24" height="20" fill="#cfe4ec" stroke="${INK}" stroke-width="1.6"/><path d="M180 44 v20 M168 54 h24" stroke="${INK}" stroke-width="1"/>`;
  [[112, 96], [150, 96], [212, 96], [112, 134], [212, 134]].forEach(([x, y]) => s += `<rect x="${x}" y="${y}" width="28" height="26" fill="#cfe4ec" stroke="${INK}" stroke-width="1.6"/><rect x="${x - 6}" y="${y}" width="6" height="26" fill="#6f9a5b" stroke="${INK}" stroke-width="1"/><rect x="${x + 28}" y="${y}" width="6" height="26" fill="#6f9a5b" stroke="${INK}" stroke-width="1"/>`);
  s += `<path d="M162 176 v-34 q14 -10 28 0 v34z" fill="#b5653a" stroke="${INK}" stroke-width="1.6"/><circle cx="184" cy="160" r="1.8" fill="${INK}"/>`;
  s += `<text x="180" y="138" text-anchor="middle" font-size="8" font-family="Fraunces,Georgia,serif" font-weight="700" fill="#7a5240">1927</text>`;
  // byggnadsställning och stege
  s += `<g stroke="#7a7f88" stroke-width="2.2" fill="none"><path d="M240 176 V70 M268 176 V70 M236 126 H272 M236 90 H272"/></g><rect x="236" y="86" width="36" height="5" fill="#c9a26a" stroke="${INK}" stroke-width="1"/><rect x="236" y="122" width="36" height="5" fill="#c9a26a" stroke="${INK}" stroke-width="1"/>`;
  s += `<g stroke="#a8744f" stroke-width="2.4"><path d="M78 176 L98 92 M90 176 L110 92"/>${[0, 1, 2, 3, 4, 5].map(k => `<path d="M${80 + k * 3.4} ${166 - k * 14} h12"/>`).join('')}</g>`;
  s += `<g transform="translate(128 176)"><rect x="-8" y="-12" width="16" height="12" rx="2" fill="#f6e3b4" stroke="${INK}" stroke-width="1.3"/><path d="M-8 -9 h16" stroke="#e3a33b" stroke-width="3"/></g>`;
  s += `<g transform="translate(150 176)"><rect x="-7" y="-10" width="14" height="10" rx="2" fill="#fbfbf7" stroke="${INK}" stroke-width="1.3"/><path d="M-7 -7 h14" stroke="#5f7fa0" stroke-width="3"/></g>`;
  s += `<g transform="translate(206 176)"><rect x="-12" y="-16" width="24" height="16" fill="#c9a26a" stroke="${INK}" stroke-width="1.3"/><path d="M-12 -10 h24" stroke="${INK}" stroke-width=".8"/></g>`;
  return s + `</svg>`;
}

function magasin() {
  let s = svgOpen('#c4d9ea', '#ece7dc') + cloud(70, 24, 0.9);
  s += `<rect x="20" y="40" width="320" height="136" fill="#efe6d4" stroke="${INK}" stroke-width="2"/>`;
  s += `<rect x="14" y="30" width="332" height="14" fill="#3f6f8f" stroke="${INK}" stroke-width="2"/>`;
  s += `<rect x="96" y="50" width="168" height="22" rx="3" fill="#2a5068" stroke="${INK}" stroke-width="1.6"/><text x="180" y="65.5" text-anchor="middle" font-size="11" font-family="Fraunces,Georgia,serif" font-weight="700" fill="#f6e3b4" letter-spacing="1.5">GALERIES DU PORT</text>`;
  [40, 88, 136, 184, 232, 280].forEach(x => s += `<rect x="${x}" y="80" width="40" height="26" fill="#cfe4ec" stroke="${INK}" stroke-width="1.4"/><path d="M${x} 80 l20 -6 l20 6" fill="#c8553d" stroke="${INK}" stroke-width="1"/>`);
  // skyltfönster med skyltdockor
  const win = (x, c1, c2) => `<rect x="${x}" y="116" width="96" height="60" fill="#dfeef5" stroke="${INK}" stroke-width="2"/>
    <g transform="translate(${x + 30} 172)"><path d="M-8 -36 h16 l4 30 h-24z" fill="${c1}" stroke="${INK}" stroke-width="1.2"/><circle cx="0" cy="-42" r="6" fill="#fbfbf7" stroke="${INK}" stroke-width="1.2"/><path d="M0 -6 v6 M-6 0 h12" stroke="${INK}" stroke-width="1.4"/></g>
    <g transform="translate(${x + 66} 172)"><rect x="-9" y="-36" width="18" height="22" rx="3" fill="${c2}" stroke="${INK}" stroke-width="1.2"/><rect x="-7" y="-14" width="14" height="10" fill="#3f5a74" stroke="${INK}" stroke-width="1.2"/><circle cx="0" cy="-42" r="6" fill="#fbfbf7" stroke="${INK}" stroke-width="1.2"/><path d="M0 -4 v4 M-6 0 h12" stroke="${INK}" stroke-width="1.4"/></g>`;
  s += win(28, '#c8553d', '#e3a33b') + win(236, '#7a3e6b', '#6f9a5b');
  s += `<rect x="148" y="116" width="64" height="60" fill="#3f5a74" stroke="${INK}" stroke-width="2"/><path d="M180 116 v60" stroke="#cfe4ec" stroke-width="2"/><rect x="152" y="120" width="24" height="52" fill="#cfe4ec" opacity=".5"/><rect x="184" y="120" width="24" height="52" fill="#cfe4ec" opacity=".5"/>`;
  s += `<g transform="translate(60 128)"><rect x="-20" y="-8" width="40" height="14" rx="3" fill="#c8553d" stroke="${INK}" stroke-width="1.2"/><text x="0" y="3" text-anchor="middle" font-size="8" font-family="Nunito,sans-serif" font-weight="900" fill="#fff">SOLDES</text></g>`;
  s += `<g transform="translate(300 128)"><rect x="-16" y="-8" width="32" height="14" rx="3" fill="#f2c46d" stroke="${INK}" stroke-width="1.2"/><text x="0" y="3" text-anchor="middle" font-size="8" font-family="Nunito,sans-serif" font-weight="900" fill="#7a3a1a">-40 %</text></g>`;
  s += cobbles(176, 360, 24);
  return s + `</svg>`;
}

function enrich(id, svg) {
  const e = EXTRA[id]; if (!svg || !e) return svg;
  if (e.back) { const i = svg.indexOf('/>', svg.indexOf('fill="url(#sky')); if (i > 0) svg = svg.slice(0, i + 2) + e.back + svg.slice(i + 2); }
  const f = e.front(); const j = svg.lastIndexOf('</svg>');
  return svg.slice(0, j) + f + svg.slice(j);
}
export function scene(id) {
  return enrich(id, ({ boulangerie, marche, tram: tramScene, police, port, ecole, cafe, gare, medecin, hotel, poste, plage, anniversaire, mairie, festival, vignoble, tribunal, noel, maison, magasin })[id]?.() || '');
}

// Stadssilhuett till startsidan
export function skyline() {
  const W = 360, H = 120;
  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMax slice">`;
  s += sky(W, H, '#a9cbd9', '#f6eedd');
  s += cloud(50, 26, 0.8) + cloud(300, 20, 0.7) + gull(200, 22) + gull(214, 16);
  s += `<rect x="172" y="34" width="20" height="60" fill="#e6dccb" stroke="${INK}" stroke-width="1.6"/><polygon points="169,34 182,4 195,34" fill="#6d7b8c" stroke="${INK}" stroke-width="1.6"/>`;
  s += house(6, 72, 46, 48, { roofH: 26 }) + house(54, 66, 52, 54, { plaster: '#f1dcc4', roofH: 30 }) + house(108, 76, 44, 44, { roof: '#7f6a5f', roofH: 24 });
  s += house(208, 70, 50, 50, { roofH: 28 }) + house(260, 64, 46, 56, { plaster: '#f4e2c8', roof: '#5f6d7e', roofH: 30 }) + house(308, 74, 48, 46, { roofH: 26 });
  s += `</svg>`;
  return s;
}

// ---------- Figurer ----------
export function character(id, mood = 'happy') {
  const think = mood === 'think', waving = mood === 'wave';
  if (think || waving) mood = waving ? 'happy' : 'think';
  const mouth = mood === 'think' ? `<path d="M45 57 h10" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`
    : mood === 'sad'
    ? `<path d="M44 58 q6 -5 12 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`
    : mood === 'wow'
      ? `<ellipse cx="50" cy="58" rx="4" ry="5" fill="${INK}"/>`
      : `<path d="M43 55 q7 8 14 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`;
  const eyes = think ? `<circle cx="43" cy="44" r="2.6" fill="${INK}"/><circle cx="59" cy="44" r="2.6" fill="${INK}"/><path d="M38 38 l7 -2 M55 37 l7 2" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>`
    : `<circle cx="42" cy="46" r="2.6" fill="${INK}"/><circle cx="58" cy="46" r="2.6" fill="${INK}"/>`;
  const cheeks = `<circle cx="36" cy="54" r="4" fill="#ef9f92" opacity=".7"/><circle cx="64" cy="54" r="4" fill="#ef9f92" opacity=".7"/>`;
  const face = `<circle cx="50" cy="48" r="20" fill="#f4cba6" stroke="${INK}" stroke-width="2"/>${cheeks}${eyes}${mouth}`;
  let body = '';
  if (id === 'brioche') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#d97f8f" stroke="${INK}" stroke-width="2"/>
      <path d="M34 132 q0 -44 16 -46 q16 2 16 46z" fill="#fbf7ee" stroke="${INK}" stroke-width="1.8"/>
      <circle cx="50" cy="104" r="2" fill="#d97f8f"/>
      <circle cx="50" cy="24" r="11" fill="#8a5a44" stroke="${INK}" stroke-width="2"/>
      <path d="M30 46 q0 -22 20 -22 q20 0 20 22 q-6 -12 -20 -12 q-14 0 -20 12z" fill="#8a5a44" stroke="${INK}" stroke-width="2"/>
      ${face}
      <ellipse cx="80" cy="96" rx="20" ry="5" transform="rotate(-50 80 96)" fill="#e3a865" stroke="${INK}" stroke-width="1.6"/>
      <path d="M74 88 l4 3 M78 82 l4 3 M82 76 l4 3" stroke="${INK}" stroke-width="1.2"/>`;
  } else if (id === 'poireau') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#7aa3c8" stroke="${INK}" stroke-width="2"/>
      <path d="M32 132 v-40 q18 -6 36 0 v40z" fill="#6f9a5b" stroke="${INK}" stroke-width="1.8"/>
      ${face}
      <path d="M38 60 q6 -5 12 -1 q6 -4 12 1 q-6 4 -12 1 q-6 3 -12 -1z" fill="#6b4a3a" stroke="${INK}" stroke-width="1.2"/>
      <path d="M28 38 q4 -16 22 -16 q18 0 22 14 l8 4 q-30 -6 -52 -2z" fill="#8a6d52" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M82 120 l8 -50" stroke="#f3ecd8" stroke-width="7" stroke-linecap="round"/>
      <path d="M90 72 l4 -22 M90 72 l-6 -20 M90 72 l10 -16" stroke="#6f9a5b" stroke-width="5" stroke-linecap="round"/>`;
  } else if (id === 'conducteur') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#2f4766" stroke="${INK}" stroke-width="2"/>
      <path d="M50 76 v56" stroke="#f2c46d" stroke-width="2" stroke-dasharray="2 6"/>
      <rect x="56" y="92" width="14" height="10" rx="2" fill="#f2c46d" stroke="${INK}" stroke-width="1.4"/>
      <path d="M36 78 l14 10 l14 -10" fill="none" stroke="#c8553d" stroke-width="3"/>
      ${face}
      <circle cx="42" cy="46" r="6" fill="none" stroke="${INK}" stroke-width="1.6"/><circle cx="58" cy="46" r="6" fill="none" stroke="${INK}" stroke-width="1.6"/><line x1="48" y1="46" x2="52" y2="46" stroke="${INK}" stroke-width="1.6"/>
      <path d="M28 34 q0 -14 22 -14 q22 0 22 14z" fill="#2f4766" stroke="${INK}" stroke-width="2"/>
      <rect x="27" y="32" width="46" height="7" rx="2" fill="#c8553d" stroke="${INK}" stroke-width="1.6"/>
      <path d="M26 39 q24 8 48 0" fill="#1f2f44" stroke="${INK}" stroke-width="1.6"/>
      <circle cx="50" cy="27" r="3" fill="#f2c46d"/>
      <rect x="80" y="96" width="14" height="20" rx="2" fill="#fbf3e4" stroke="${INK}" stroke-width="1.4" transform="rotate(12 87 106)"/>`;
  } else if (id === 'lefevre') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#1f2f44" stroke="${INK}" stroke-width="2"/>
      <path d="M50 78 v54" stroke="#0f1a28" stroke-width="2"/>
      <circle cx="50" cy="94" r="2.4" fill="#d9dde3"/><circle cx="50" cy="106" r="2.4" fill="#d9dde3"/><circle cx="50" cy="118" r="2.4" fill="#d9dde3"/>
      <rect x="58" y="86" width="12" height="6" rx="1" fill="#d9dde3"/>
      ${face}
      <path d="M43 58 q7 3 14 0" fill="none" stroke="${INK}" stroke-width="1.5"/>
      <path d="M30 40 q-2 -30 20 -34 q22 4 20 34z" fill="#1f2f44" stroke="${INK}" stroke-width="2"/>
      <rect x="27" y="38" width="46" height="5" rx="2" fill="#0f1a28" stroke="${INK}" stroke-width="1.4"/>
      <path d="M44 22 l6 -6 l6 6 l-6 8z" fill="#d9dde3" stroke="${INK}" stroke-width="1.2"/>
      <circle cx="50" cy="6" r="3" fill="#d9dde3" stroke="${INK}" stroke-width="1"/>`;
  } else if (id === 'gaspard') {
    body = `
      <path d="M20 132 q4 -56 30 -60 q26 4 30 60z" fill="#f2c94c" stroke="${INK}" stroke-width="2"/>
      <path d="M50 74 v58" stroke="${INK}" stroke-width="1.6"/>
      <circle cx="46" cy="96" r="1.8" fill="${INK}"/><circle cx="46" cy="112" r="1.8" fill="${INK}"/>
      ${face}
      <path d="M32 54 q0 22 18 24 q18 -2 18 -24 q-6 8 -18 8 q-12 0 -18 -8z" fill="#f3f1ea" stroke="${INK}" stroke-width="1.6"/>
      <path d="M43 57 q7 5 14 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>
      <path d="M22 40 q4 -24 28 -24 q24 0 28 24 l8 6 q-40 -6 -72 0z" fill="#f2c94c" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M84 118 l6 -40" stroke="#8a5a44" stroke-width="3"/><path d="M90 78 q8 10 2 24" fill="none" stroke="${INK}" stroke-width="1" stroke-dasharray="2 2"/>
      <path d="M86 104 q6 -4 10 0 q-4 4 -10 0z M96 104 l3 -3 v6z" fill="#7fa6c4" stroke="${INK}" stroke-width="1"/>`;
  } else if (id === 'dubois') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#6f9a5b" stroke="${INK}" stroke-width="2"/>
      <path d="M40 76 l10 14 l10 -14" fill="#fbf7ee" stroke="${INK}" stroke-width="1.6"/>
      <circle cx="44" cy="100" r="2" fill="#f2c46d"/><circle cx="44" cy="114" r="2" fill="#f2c46d"/>
      <path d="M28 52 q-4 -32 22 -32 q26 0 22 32 q-4 -18 -22 -20 q-18 2 -22 20z" fill="#c8553d" stroke="${INK}" stroke-width="2"/>
      ${face}
      <circle cx="42" cy="46" r="6" fill="none" stroke="${INK}" stroke-width="1.6"/><circle cx="58" cy="46" r="6" fill="none" stroke="${INK}" stroke-width="1.6"/><line x1="48" y1="46" x2="52" y2="46" stroke="${INK}" stroke-width="1.6"/>
      <path d="M28 52 q2 14 -2 18 M72 52 q-2 14 2 18" fill="none" stroke="#c8553d" stroke-width="5" stroke-linecap="round"/>
      <rect x="72" y="92" width="22" height="28" rx="2" fill="#3f5a74" stroke="${INK}" stroke-width="1.6" transform="rotate(-8 83 106)"/>
      <line x1="76" y1="98" x2="90" y2="96" stroke="#f2c46d" stroke-width="2"/>`;
  } else if (id === 'olivier') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#fbf7ee" stroke="${INK}" stroke-width="2"/>
      <g stroke="#3f5a74" stroke-width="3">${[84, 94, 104, 114, 124].map(y => `<line x1="${26 + (130 - y) / 6}" y1="${y}" x2="${74 - (130 - y) / 6}" y2="${y}"/>`).join('')}</g>
      <path d="M34 96 h32 v36 h-32z" fill="#7d6b9a" stroke="${INK}" stroke-width="1.6"/>
      <path d="M43 76 l7 5 l7 -5 l-7 5z" fill="#c8553d" stroke="${INK}" stroke-width="1.4"/>
      ${face}
      <path d="M38 58 q6 -6 12 -2 q6 -4 12 2 q-6 2 -12 0 q-6 2 -12 0z" fill="#3d2c29"/>
      <ellipse cx="50" cy="30" rx="24" ry="8" fill="#2f2a3a" stroke="${INK}" stroke-width="2" transform="rotate(-8 50 30)"/>
      <circle cx="54" cy="21" r="2.5" fill="#2f2a3a"/>
      <path d="M78 104 h14 v10 q0 6 -7 6 q-7 0 -7 -6z" fill="#fbf7ee" stroke="${INK}" stroke-width="1.4"/><path d="M92 107 q5 0 4 4 q-1 3 -4 2" fill="none" stroke="${INK}" stroke-width="1.4"/>
      <path d="M82 100 q2 -4 0 -7 M87 100 q2 -4 0 -7" fill="none" stroke="#b9aea3" stroke-width="1.4"/>`;
  } else if (id === 'duval') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#4f7c8a" stroke="${INK}" stroke-width="2"/>
      <path d="M40 76 l10 12 l10 -12" fill="#fbf7ee" stroke="${INK}" stroke-width="1.5"/>
      <path d="M38 80 q12 10 24 0" fill="none" stroke="#f2c46d" stroke-width="3"/>
      <circle cx="50" cy="104" r="2" fill="#f2c46d"/><circle cx="50" cy="116" r="2" fill="#f2c46d"/>
      <path d="M28 54 q-6 -34 22 -34 q28 0 22 34 q-2 -20 -22 -20 q-20 0 -22 20z" fill="#b8b2a8" stroke="${INK}" stroke-width="2"/>
      ${face}
      <path d="M30 32 q20 -16 40 0 v4 h-40z" fill="#355864" stroke="${INK}" stroke-width="1.8"/><rect x="28" y="34" width="44" height="5" rx="2" fill="#f2c46d" stroke="${INK}" stroke-width="1.2"/>
      <rect x="76" y="94" width="18" height="12" rx="2" fill="#fbf3e4" stroke="${INK}" stroke-width="1.4" transform="rotate(-10 85 100)"/><line x1="80" y1="100" x2="90" y2="98" stroke="#c8553d" stroke-width="1.5"/>`;
  } else if (id === 'lambert') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#fbfbf7" stroke="${INK}" stroke-width="2"/>
      <path d="M38 78 l12 16 l12 -16" fill="#7aa3c8" stroke="${INK}" stroke-width="1.5"/>
      <path d="M36 82 q-4 26 10 30 M64 82 q4 26 -10 30" fill="none" stroke="#5f6d7e" stroke-width="2.4"/><circle cx="46" cy="112" r="4" fill="#9aa5b1" stroke="${INK}" stroke-width="1.2"/>
      <rect x="60" y="100" width="12" height="4" fill="#5a9e8f"/>
      ${face}
      <circle cx="42" cy="46" r="6" fill="none" stroke="${INK}" stroke-width="1.6"/><circle cx="58" cy="46" r="6" fill="none" stroke="${INK}" stroke-width="1.6"/><line x1="48" y1="46" x2="52" y2="46" stroke="${INK}" stroke-width="1.6"/>
      <path d="M30 44 q0 -22 20 -22 q20 0 20 22 q-4 -8 -8 -10 q-12 4 -24 0 q-4 2 -8 10z" fill="#d9d4cc" stroke="${INK}" stroke-width="1.8"/>`;
  } else if (id === 'rousseau') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#a8744f" stroke="${INK}" stroke-width="2"/>
      <path d="M38 76 h24 l-12 14z" fill="#fbf7ee" stroke="${INK}" stroke-width="1.5"/>
      <rect x="58" y="92" width="12" height="7" rx="1" fill="#f2c46d" stroke="${INK}" stroke-width="1"/>
      <path d="M26 66 q-6 -46 24 -46 q30 0 24 46 q-4 -28 -24 -30 q-20 2 -24 30z" fill="#2f2a3a" stroke="${INK}" stroke-width="2"/>
      ${face}
      <circle cx="30" cy="56" r="2.5" fill="#f2c46d"/><circle cx="70" cy="56" r="2.5" fill="#f2c46d"/>
      <g transform="rotate(20 86 104)"><rect x="80" y="96" width="6" height="18" rx="2" fill="#f2c46d" stroke="${INK}" stroke-width="1.2"/><circle cx="83" cy="92" r="6" fill="none" stroke="#f2c46d" stroke-width="3"/></g>`;
  } else if (id === 'bernard') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#3f5a74" stroke="${INK}" stroke-width="2"/>
      <path d="M26 96 h48" stroke="#f2c94c" stroke-width="4"/>
      <path d="M68 78 l-34 50" stroke="#7a5240" stroke-width="3"/><rect x="18" y="104" width="28" height="22" rx="3" fill="#a07850" stroke="${INK}" stroke-width="1.6"/>
      ${face}
      <path d="M38 60 q6 -5 12 -1 q6 -4 12 1 q-6 5 -12 2 q-6 3 -12 -2z" fill="#9b9b9b" stroke="${INK}" stroke-width="1"/>
      <path d="M28 36 q0 -16 22 -16 q22 0 22 16z" fill="#3f5a74" stroke="${INK}" stroke-width="2"/><path d="M26 36 h50 q-4 6 -26 6 q-20 0 -24 -6z" fill="#2a3e52" stroke="${INK}" stroke-width="1.6"/>
      <rect x="44" y="24" width="12" height="7" rx="1" fill="#f2c94c" stroke="${INK}" stroke-width="1"/>
      <path d="M78 104 h16 v12 h-16z M78 104 l8 6 l8 -6" fill="#fbf7ee" stroke="${INK}" stroke-width="1.2"/>`;
  } else if (id === 'coralie') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#d64933" stroke="${INK}" stroke-width="2"/>
      <path d="M30 100 h40" stroke="#fbf3e4" stroke-width="5"/>
      <path d="M36 80 q14 16 28 0" fill="none" stroke="${INK}" stroke-width="1.4"/><circle cx="50" cy="94" r="4" fill="#c0c0c0" stroke="${INK}" stroke-width="1"/>
      <path d="M26 62 q-4 -40 24 -40 q28 0 24 40 q-2 -24 -24 -26 q-22 2 -24 26z" fill="#d9a441" stroke="${INK}" stroke-width="2"/>
      <path d="M72 50 q12 14 6 34" fill="none" stroke="#d9a441" stroke-width="7" stroke-linecap="round"/>
      ${face}
      <rect x="34" y="40" width="32" height="9" rx="4" fill="#2c3e50" opacity=".85"/>
      <path d="M86 110 a10 10 0 1 1 0.1 0z" fill="none" stroke="#d64933" stroke-width="5"/><path d="M86 100 v4 M86 116 v4 M76 110 h4 M92 110 h4" stroke="#fbf3e4" stroke-width="5"/>`;
  } else if (id === 'odette') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#b48ad6" stroke="${INK}" stroke-width="2"/>
      <path d="M30 86 q20 18 40 0" fill="none" stroke="#fbf3e4" stroke-width="3" stroke-dasharray="1 5" stroke-linecap="round"/>
      <path d="M30 118 l20 -20 l20 20" fill="none" stroke="#d06a8e" stroke-width="2"/>
      <circle cx="50" cy="22" r="12" fill="#e8e6e2" stroke="${INK}" stroke-width="2"/>
      <path d="M28 50 q-2 -28 22 -28 q24 0 22 28 q-4 -16 -22 -16 q-18 0 -22 16z" fill="#e8e6e2" stroke="${INK}" stroke-width="2"/>
      ${face}
      <circle cx="42" cy="46" r="6" fill="none" stroke="#b48ad6" stroke-width="1.8"/><circle cx="58" cy="46" r="6" fill="none" stroke="#b48ad6" stroke-width="1.8"/><line x1="48" y1="46" x2="52" y2="46" stroke="#b48ad6" stroke-width="1.8"/>
      <path d="M84 96 v24 M84 96 q-2 -8 4 -10" fill="none" stroke="#8a5a44" stroke-width="3" stroke-linecap="round"/>`;
  } else if (id === 'fontaine') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#3f4f80" stroke="${INK}" stroke-width="2"/>
      <path d="M38 76 l12 18 l12 -18" fill="#fbf7ee" stroke="${INK}" stroke-width="1.5"/>
      <path d="M26 82 l48 40" stroke="#3f5a74" stroke-width="6"/><path d="M26 82 l48 40" stroke="#fbf3e4" stroke-width="2"/><path d="M26 82 l48 40" stroke="#c8553d" stroke-width="6" stroke-dasharray="0 12 6 100"/>
      <path d="M26 54 q-6 -34 24 -36 q30 2 24 36 q-6 -22 -24 -24 q-18 2 -24 24z" fill="#6b4a3a" stroke="${INK}" stroke-width="2"/>
      ${face}
      <circle cx="30" cy="52" r="2.5" fill="#c0c0c0"/><circle cx="70" cy="52" r="2.5" fill="#c0c0c0"/>`;
  } else if (id === 'arnaud') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#2b2b33" stroke="${INK}" stroke-width="2"/>
      <path d="M38 76 q12 10 24 0 v20 h-24z" fill="#c4532f" stroke="${INK}" stroke-width="1.4"/>
      <ellipse cx="72" cy="112" rx="14" ry="11" fill="#c98a4b" stroke="${INK}" stroke-width="1.8"/><circle cx="72" cy="112" r="4" fill="#3d2c29"/>
      <path d="M62 104 l-30 -26" stroke="#8a5a44" stroke-width="5" stroke-linecap="round"/>
      <path d="M28 44 q-2 -26 22 -26 q24 0 22 26 q-4 -10 -10 -12 l-4 6 l-4 -8 l-6 6 l-4 -8 q-10 4 -16 16z" fill="#6b3a28" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
      ${face}
      <path d="M42 62 q8 4 16 0" fill="none" stroke="#6b3a28" stroke-width="2"/>`;
  } else if (id === 'vidal') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#6f9a5b" stroke="${INK}" stroke-width="2"/>
      <path d="M32 132 v-38 q18 -6 36 0 v38z" fill="#7a3e6b" stroke="${INK}" stroke-width="1.8"/>
      <path d="M40 78 l10 8 l10 -8" fill="none" stroke="#fbf7ee" stroke-width="2"/>
      <path d="M26 58 q-8 -40 24 -40 q32 0 24 40 q-2 14 -6 20 q2 -28 -18 -34 q-20 6 -18 34 q-4 -6 -6 -20z" fill="#8a5a44" stroke="${INK}" stroke-width="2"/>
      ${face}
      <path d="M22 34 q28 -26 56 0 q-28 -8 -56 0z" fill="#e8d3a0" stroke="${INK}" stroke-width="1.8"/><ellipse cx="50" cy="34" rx="34" ry="5" fill="#e8d3a0" stroke="${INK}" stroke-width="1.8"/><path d="M30 33 h40" stroke="#7a3e6b" stroke-width="3"/>
      <g transform="translate(80 100)"><path d="M-2 -14 q6 -6 10 0" fill="none" stroke="#6f9a5b" stroke-width="2"/>${[[0, 0], [7, 0], [3.5, 6], [10.5, 6], [7, 12], [0, 12], [3.5, 18]].map(([x, y]) => `<circle cx="${x}" cy="${y - 6}" r="4" fill="#7a3e6b" stroke="${INK}" stroke-width="1"/>`).join('')}</g>`;
  } else if (id === 'mercier') {
    body = `
      <path d="M20 132 q4 -56 30 -60 q26 4 30 60z" fill="#22252f" stroke="${INK}" stroke-width="2"/>
      <path d="M42 74 h16 l-2 22 h-12z" fill="#fbfbf7" stroke="${INK}" stroke-width="1.4"/>
      <path d="M44 76 q6 6 12 0 v6 q-6 4 -12 0z" fill="#fbfbf7" stroke="${INK}" stroke-width="1"/>
      <path d="M30 100 q20 6 40 0" fill="none" stroke="#c8553d" stroke-width="3"/>
      <path d="M28 52 q-6 -34 22 -34 q28 0 22 34 q-2 -18 -22 -20 q-20 2 -22 20z" fill="#d9d4cc" stroke="${INK}" stroke-width="2"/><circle cx="50" cy="20" r="8" fill="#d9d4cc" stroke="${INK}" stroke-width="1.8"/>
      ${face}
      <circle cx="42" cy="46" r="6" fill="none" stroke="${INK}" stroke-width="1.4"/><circle cx="58" cy="46" r="6" fill="none" stroke="${INK}" stroke-width="1.4"/><path d="M48 46 h4" stroke="${INK}" stroke-width="1.4"/>
      <g transform="translate(80 104) rotate(-20)"><rect x="-4" y="-14" width="8" height="28" rx="2" fill="#8a5a44" stroke="${INK}" stroke-width="1.4"/><rect x="-10" y="-20" width="20" height="9" rx="2" fill="#a8744f" stroke="${INK}" stroke-width="1.4"/></g>`;
  } else if (id === 'nicolas') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#2f6b4f" stroke="${INK}" stroke-width="2"/>
      <path d="M22 116 q28 8 56 0" fill="none" stroke="#c8553d" stroke-width="7"/><path d="M22 116 q28 8 56 0" fill="none" stroke="#fbf7ee" stroke-width="2" stroke-dasharray="4 4"/>
      <path d="M34 66 q16 26 32 0 q-2 14 -16 20 q-14 -6 -16 -20z" fill="#f3efe6" stroke="${INK}" stroke-width="1.6"/>
      ${face}
      <path d="M36 62 q14 12 28 0" fill="none" stroke="#f3efe6" stroke-width="5" stroke-linecap="round"/>
      <path d="M26 40 q4 -26 30 -24 q18 2 24 18 l8 14 q-30 -10 -62 -8z" fill="#c8553d" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
      <rect x="24" y="36" width="54" height="8" rx="4" fill="#f3efe6" stroke="${INK}" stroke-width="1.6"/><circle cx="88" cy="50" r="6" fill="#f3efe6" stroke="${INK}" stroke-width="1.6"/>
      <g transform="translate(80 104)"><path d="M-12 -6 l12 22 l12 -22z" fill="#c9a26a" stroke="${INK}" stroke-width="1.4"/><circle cx="-5" cy="-8" r="4" fill="#7a4a2a" stroke="${INK}" stroke-width="1"/><circle cx="3" cy="-9" r="4" fill="#8a5a3a" stroke="${INK}" stroke-width="1"/><circle cx="-1" cy="-13" r="4" fill="#6b3f22" stroke="${INK}" stroke-width="1"/></g>`;
  } else if (id === 'leroy') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#e8dcc0" stroke="${INK}" stroke-width="2"/>
      <path d="M34 132 v-46 h32 v46z" fill="#5f7fa0" stroke="${INK}" stroke-width="1.8"/><path d="M36 86 l-4 -12 M64 86 l4 -12" stroke="#5f7fa0" stroke-width="5" stroke-linecap="round"/>
      <rect x="44" y="96" width="12" height="9" rx="2" fill="#4c6a88" stroke="${INK}" stroke-width="1"/>
      <circle cx="40" cy="116" r="2.2" fill="#f2c46d"/><circle cx="62" cy="108" r="1.8" fill="#c8553d"/><circle cx="52" cy="124" r="2" fill="#fbfbf7"/>
      <path d="M27 54 q-6 -36 23 -36 q29 0 23 36 l-4 -18 q-19 -8 -38 0z" fill="#3d2c29" stroke="${INK}" stroke-width="2"/>
      ${face}
      <path d="M24 30 q26 -16 52 0 l-2 8 q-24 -10 -48 0z" fill="#c8553d" stroke="${INK}" stroke-width="1.6"/><circle cx="78" cy="30" r="4" fill="#c8553d" stroke="${INK}" stroke-width="1.2"/>
      <g transform="translate(82 96) rotate(18)"><rect x="-3" y="0" width="6" height="26" rx="2" fill="#8a5a44" stroke="${INK}" stroke-width="1.2"/><rect x="-11" y="-12" width="22" height="13" rx="4" fill="#f6e3b4" stroke="${INK}" stroke-width="1.4"/><path d="M-11 -8 h22" stroke="#e3a33b" stroke-width="3"/></g>`;
  } else if (id === 'chloe') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#2a3d52" stroke="${INK}" stroke-width="2"/>
      <path d="M42 74 l8 14 l8 -14" fill="#fbfbf7" stroke="${INK}" stroke-width="1.4"/>
      <rect x="58" y="92" width="14" height="8" rx="2" fill="#f6e3b4" stroke="${INK}" stroke-width="1"/><path d="M60 96 h10" stroke="#3f6f8f" stroke-width="1.6"/>
      <path d="M30 76 q20 18 40 0" fill="none" stroke="#f2c46d" stroke-width="3" stroke-dasharray="3 3"/>
      <path d="M26 66 q-8 -50 24 -50 q32 0 24 50 q-6 4 -6 -14 q-2 -18 -18 -22 q-16 4 -18 22 q0 18 -6 14z" fill="#b5653a" stroke="${INK}" stroke-width="2"/>
      ${face}
      <circle cx="35" cy="54" r="2.4" fill="#f2c46d"/><circle cx="65" cy="54" r="2.4" fill="#f2c46d"/>
      <g transform="translate(82 104)"><path d="M-12 -14 h24 l-3 26 h-18z" fill="#c8553d" stroke="${INK}" stroke-width="1.4"/><path d="M-6 -14 q6 -10 12 0" fill="none" stroke="${INK}" stroke-width="1.4"/></g>`;
  } else if (id === 'you') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#f2c46d" stroke="${INK}" stroke-width="2"/>
      <path d="M30 42 q0 -20 20 -20 q20 0 20 20 q-10 -8 -20 -8 q-10 0 -20 8z" fill="#3d2c29"/>
      ${face}`;
  }
  let extra = '';
  if (waving) extra = `<g class="char-wave"><path d="M24 96 q-12 -14 -10 -34" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/><path d="M24 96 q-12 -14 -10 -34" fill="none" stroke="#f4cba6" stroke-width="4.6" stroke-linecap="round"/><circle cx="14" cy="58" r="6" fill="#f4cba6" stroke="${INK}" stroke-width="1.6"/></g>`;
  if (think) extra = `<g class="char-think"><circle cx="80" cy="20" r="3" fill="#fff" stroke="${INK}" stroke-width="1.2"/><circle cx="88" cy="10" r="5" fill="#fff" stroke="${INK}" stroke-width="1.2"/></g>`;
  return `<svg viewBox="0 0 100 134" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="overflow:visible">${body}${extra}</svg>`;
}


// ---------- Stadskarta över Port-Saint-Clément ----------
// units: [{fr, color, state: 'done'|'cur'|'open'|'locked'}], i kursordning
const MAP_POS = [[46, 236], [92, 214], [140, 228], [186, 206], [232, 222], [212, 172], [160, 160], [106, 150], [54, 128], [96, 96], [150, 108], [204, 90], [170, 52], [114, 44], [60, 62], [22, 100], [28, 38], [84, 28], [146, 22], [212, 34]];
export function townMap(units) {
  const W = 360, H = 270;
  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" class="town-map" role="img" aria-label="Karta över Port-Saint-Clément">`;
  s += `<rect width="${W}" height="${H}" fill="#cfe6f1"/>`;
  for (let i = 0; i < 8; i++) s += `<path class="a-wave" d="M${262 + (i % 2) * 30} ${30 + i * 30} q8 -4 16 0 t16 0" fill="none" stroke="#fff" stroke-width="1.6" opacity=".8"/>`;
  s += `<path d="M0 0 H250 Q236 40 252 80 T246 160 Q232 200 256 236 L270 270 H0z" fill="#d9e7b8" stroke="${INK}" stroke-width="2"/>`;
  s += `<path d="M0 0 H250 Q236 40 252 80 T246 160 Q232 200 256 236 L270 270 H0z" fill="none" stroke="#efe2b0" stroke-width="6" opacity=".9" transform="translate(4 0)"/>`;
  // skog, kullar, åker
  [[246, 56], [236, 18], [178, 20], [28, 180], [14, 196], [228, 130]].forEach(([x, y]) => s += `<circle cx="${x}" cy="${y}" r="9" fill="#8fb86a" stroke="${INK}" stroke-width="1"/>`);
  s += `<path d="M120 0 q30 22 6 40" fill="none" stroke="#7fb4d0" stroke-width="7" stroke-linecap="round"/>`;
  // vägen genom kvarteren
  const pts = MAP_POS.slice(0, units.length);
  let d = `M${pts[0][0]} ${pts[0][1]}`; for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; d += ` Q${(x0 + x1) / 2 + (i % 2 ? 14 : -14)} ${(y0 + y1) / 2} ${x1} ${y1}`; }
  s += `<path d="${d}" fill="none" stroke="#e8d3a8" stroke-width="9" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#c9ad7c" stroke-width="1.5" stroke-dasharray="4 5"/>`;
  // fyr och båt
  s += `<g transform="translate(286 196)"><rect x="-5" y="-30" width="10" height="30" fill="#fbf3e4" stroke="${INK}" stroke-width="1.4"/><rect x="-5" y="-22" width="10" height="5" fill="#c8553d"/><rect x="-5" y="-11" width="10" height="5" fill="#c8553d"/><rect x="-7" y="-36" width="14" height="6" fill="#f2c46d" stroke="${INK}" stroke-width="1.2"/><circle class="a-blink" cx="0" cy="-33" r="7" fill="#fff6b0" opacity=".8"/></g>`;
  s += `<g class="a-bob"><path d="M300 110 h26 l-5 7 h-16z" fill="#c8553d" stroke="${INK}" stroke-width="1.2"/><line x1="313" y1="110" x2="313" y2="92" stroke="${INK}" stroke-width="1.2"/><path d="M314 94 l10 14 h-10z" fill="#fbf3e4" stroke="${INK}" stroke-width="1"/></g>`;
  s += `<g class="a-gull">${gull(0, 70)}${gull(14, 62)}</g>`;
  // kvartersmarkörer
  units.forEach((u, i) => {
    const [x, y] = pts[i];
    const locked = u.state === 'locked', done = u.state === 'done', cur = u.state === 'cur';
    const fill = locked ? '#c9c4bb' : u.color;
    s += `<g class="map-pin ${cur ? 'cur' : ''}" data-unit="${i}" transform="translate(${x} ${y})" style="cursor:pointer">`;
    if (cur) s += `<circle r="17" fill="${u.color}" opacity=".25" class="map-pulse"/>`;
    s += `<path d="M-11 -2 v-10 l11 -9 l11 9 v10 z" fill="${fill}" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>`;
    s += `<rect x="-3" y="-8" width="6" height="6" fill="${locked ? '#e6e1d8' : '#fbf3e4'}" stroke="${INK}" stroke-width=".8"/>`;
    s += `<text y="10" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="900" font-size="9" fill="${INK}">${i + 1}</text>`;
    if (done) s += `<circle cx="10" cy="-18" r="6" fill="#f2c46d" stroke="${INK}" stroke-width="1"/><text x="10" y="-15" text-anchor="middle" font-size="8">★</text>`;
    if (locked) s += `<text x="10" y="-14" font-size="8">🔒</text>`;
    s += `</g>`;
  });
  s += `<text x="12" y="${H - 10}" font-family="Fraunces,Georgia,serif" font-weight="700" font-size="13" fill="${INK}">Port-Saint-Clément</text>`;
  return s + `</svg>`;
}

// App-ikon (används även för att skapa PNG-ikoner)
export function appIcon() {
  return `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="0" fill="#fbf3e4"/>
  <circle cx="256" cy="256" r="230" fill="#3f5a74"/>
  <path d="M130 330 q126 -110 252 0" fill="none" stroke="#f2c46d" stroke-width="0"/>
  <ellipse cx="256" cy="300" rx="150" ry="62" transform="rotate(-22 256 300)" fill="#e3a865" stroke="#3d2c29" stroke-width="12"/>
  <path d="M170 300 l26 -30 M230 282 l26 -30 M290 262 l26 -30" stroke="#3d2c29" stroke-width="10" stroke-linecap="round"/>
  <text x="256" y="170" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="92" fill="#fbf3e4">Allez</text>
  </svg>`;
}
