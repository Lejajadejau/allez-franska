// Handritade SVG-miljöer i barnboksstil för Port-Saint-Clément
const INK = '#3d2c29';

// Korsvirkeshus (normandisk colombage)
function house(x, y, w, h, opt = {}) {
  const plaster = opt.plaster || '#f3e6cf';
  const roof = opt.roof || '#6d7b8c';
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
    s += `<rect x="${x + w * fx}" y="${y + h * fy}" width="${ww}" height="${h * 0.2}" rx="2" fill="#9cc3d5" stroke="${INK}" stroke-width="1.5"/>`;
    s += `<rect x="${x + w * fx - 2}" y="${y + h * fy + h * 0.2}" width="${ww + 4}" height="4" fill="#c8553d" stroke="${INK}" stroke-width="1"/>`;
  });
  s += `</g>`;
  return s;
}

function sky(w, h, top = '#bfdbe6', bottom = '#e9f2ee') {
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
  <path d="M${x - 8} ${y - 60} h16 l-3 -14 h-10 z" fill="#f6d47a"/><path d="M${x - 9} ${y - 74} h18 l-9 -6 z" fill="${INK}"/></g>`;
}

function flowers(x, y) {
  let s = `<rect x="${x}" y="${y}" width="34" height="9" rx="2" fill="#8a5a44" stroke="${INK}" stroke-width="1.3"/>`;
  ['#e07a8b', '#f2c46d', '#e07a8b', '#b48ad6'].forEach((c, i) => {
    s += `<circle cx="${x + 5 + i * 8}" cy="${y - 3}" r="4" fill="${c}" stroke="${INK}" stroke-width="1"/>`;
  });
  return s;
}

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
  let s = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">` + sky(W, H, '#bcd9e8', '#eaf2f2');
  s += gull(120, 40) + gull(140, 30) + cloud(220, 36);
  s += `<rect x="0" y="120" width="360" height="80" fill="#6f9fb8"/>`;
  for (let i = 0; i < 9; i++) s += `<path d="M${i * 44} ${140 + (i % 2) * 18} q11 -6 22 0 t22 0" fill="none" stroke="#e8f3f6" stroke-width="2"/>`;
  s += `<rect x="290" y="40" width="26" height="86" fill="#fbf3e4" stroke="${INK}" stroke-width="2"/>`;
  for (let i = 0; i < 3; i++) s += `<rect x="290" y="${52 + i * 26}" width="26" height="12" fill="#c8553d"/>`;
  s += `<rect x="286" y="28" width="34" height="14" fill="#f2c46d" stroke="${INK}" stroke-width="2"/><polygon points="284,28 303,14 322,28" fill="#c8553d" stroke="${INK}" stroke-width="2"/>`;
  s += `<path d="M60 150 h120 l-16 22 h-90 z" fill="#c8553d" stroke="${INK}" stroke-width="2"/><line x1="118" y1="150" x2="118" y2="80" stroke="${INK}" stroke-width="3"/><path d="M120 84 l44 58 h-44z" fill="#fbf3e4" stroke="${INK}" stroke-width="1.8"/>`;
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
  s += `<rect x="0" y="156" width="360" height="44" fill="#4a3a3a"/>`;
  for (let i = 0; i < 16; i++) { const x = 10 + i * 23, y = 168 + (i % 3) * 4; s += `<circle cx="${x}" cy="${y}" r="9" fill="${['#2b2240', '#3a2f50', '#251d36'][i % 3]}"/>`; if (i % 4 === 1) s += `<line x1="${x}" y1="${y - 6}" x2="${x + 4}" y2="${y - 22}" stroke="#2b2240" stroke-width="4" stroke-linecap="round"/>`; }
  return s + `</svg>`;
}

export function scene(id) {
  return ({ boulangerie, marche, tram: tramScene, police, port, ecole, cafe, gare, medecin, hotel, poste, plage, anniversaire, mairie, festival })[id]?.() || '';
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
  const mouth = mood === 'sad'
    ? `<path d="M44 58 q6 -5 12 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`
    : mood === 'wow'
      ? `<ellipse cx="50" cy="58" rx="4" ry="5" fill="${INK}"/>`
      : `<path d="M43 55 q7 8 14 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/>`;
  const eyes = `<circle cx="42" cy="46" r="2.6" fill="${INK}"/><circle cx="58" cy="46" r="2.6" fill="${INK}"/>`;
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
  } else if (id === 'you') {
    body = `
      <path d="M22 132 q4 -54 28 -58 q24 4 28 58z" fill="#f2c46d" stroke="${INK}" stroke-width="2"/>
      <path d="M30 42 q0 -20 20 -20 q20 0 20 20 q-10 -8 -20 -8 q-10 0 -20 8z" fill="#3d2c29"/>
      ${face}`;
  }
  return `<svg viewBox="0 0 100 134" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
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
