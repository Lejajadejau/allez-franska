// Verbträning: böjningar räknas fram ur presens + några oregelbundna stammar.
// p = presens (je, tu, il, nous, vous, ils), pp = particip, e = böjs med être, f = futurumstam, sj = oregelbunden subjunktiv
const R_ER = (st, nous) => [st + 'e', st + 'es', st + 'e', nous || st + 'ons', st + 'ez', st + 'ent'];
const R_IR = st => [st + 'is', st + 'is', st + 'it', st + 'issons', st + 'issez', st + 'issent'];
const R_RE = st => [st + 's', st + 's', st, st + 'ons', st + 'ez', st + 'ent'];

export const VERBS = [
  { v: 'être', sv: 'vara', p: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'], pp: 'été', f: 'ser', imp: 'ét', sj: ['sois', 'sois', 'soit', 'soyons', 'soyez', 'soient'] },
  { v: 'avoir', sv: 'ha', p: ['ai', 'as', 'a', 'avons', 'avez', 'ont'], pp: 'eu', f: 'aur', sj: ['aie', 'aies', 'ait', 'ayons', 'ayez', 'aient'] },
  { v: 'aller', sv: 'gå, åka', p: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'], pp: 'allé', e: 1, f: 'ir', sj: ['aille', 'ailles', 'aille', 'allions', 'alliez', 'aillent'] },
  { v: 'faire', sv: 'göra', p: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'], pp: 'fait', f: 'fer', sj: ['fasse', 'fasses', 'fasse', 'fassions', 'fassiez', 'fassent'] },
  { v: 'pouvoir', sv: 'kunna', p: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'], pp: 'pu', f: 'pourr', sj: ['puisse', 'puisses', 'puisse', 'puissions', 'puissiez', 'puissent'] },
  { v: 'vouloir', sv: 'vilja', p: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'], pp: 'voulu', f: 'voudr', sj: ['veuille', 'veuilles', 'veuille', 'voulions', 'vouliez', 'veuillent'] },
  { v: 'venir', sv: 'komma', p: ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'], pp: 'venu', e: 1, f: 'viendr' },
  { v: 'prendre', sv: 'ta', p: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'], pp: 'pris', f: 'prendr' },
  { v: 'savoir', sv: 'veta, kunna', p: ['sais', 'sais', 'sait', 'savons', 'savez', 'savent'], pp: 'su', f: 'saur', sj: ['sache', 'saches', 'sache', 'sachions', 'sachiez', 'sachent'] },
  { v: 'devoir', sv: 'måste', p: ['dois', 'dois', 'doit', 'devons', 'devez', 'doivent'], pp: 'dû', f: 'devr' },
  { v: 'dire', sv: 'säga', p: ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'], pp: 'dit', f: 'dir' },
  { v: 'voir', sv: 'se', p: ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'], pp: 'vu', f: 'verr' },
  { v: 'mettre', sv: 'sätta, lägga', p: ['mets', 'mets', 'met', 'mettons', 'mettez', 'mettent'], pp: 'mis', f: 'mettr' },
  { v: 'boire', sv: 'dricka', p: ['bois', 'bois', 'boit', 'buvons', 'buvez', 'boivent'], pp: 'bu', f: 'boir' },
  { v: 'partir', sv: 'åka iväg', p: ['pars', 'pars', 'part', 'partons', 'partez', 'partent'], pp: 'parti', e: 1, f: 'partir' },
  { v: 'sortir', sv: 'gå ut', p: ['sors', 'sors', 'sort', 'sortons', 'sortez', 'sortent'], pp: 'sorti', e: 1, f: 'sortir' },
  { v: 'lire', sv: 'läsa', p: ['lis', 'lis', 'lit', 'lisons', 'lisez', 'lisent'], pp: 'lu', f: 'lir' },
  { v: 'écrire', sv: 'skriva', p: ['écris', 'écris', 'écrit', 'écrivons', 'écrivez', 'écrivent'], pp: 'écrit', f: 'écrir' },
  { v: 'parler', sv: 'prata', p: R_ER('parl'), pp: 'parlé', f: 'parler' },
  { v: 'aimer', sv: 'tycka om', p: R_ER('aim'), pp: 'aimé', f: 'aimer' },
  { v: 'manger', sv: 'äta', p: R_ER('mang', 'mangeons'), pp: 'mangé', f: 'manger' },
  { v: 'habiter', sv: 'bo', p: R_ER('habit'), pp: 'habité', f: 'habiter' },
  { v: 'travailler', sv: 'arbeta', p: R_ER('travaill'), pp: 'travaillé', f: 'travailler' },
  { v: 'regarder', sv: 'titta', p: R_ER('regard'), pp: 'regardé', f: 'regarder' },
  { v: 'finir', sv: 'bli klar, avsluta', p: R_IR('fin'), pp: 'fini', f: 'finir' },
  { v: 'choisir', sv: 'välja', p: R_IR('chois'), pp: 'choisi', f: 'choisir' },
  { v: 'attendre', sv: 'vänta', p: R_RE('attend'), pp: 'attendu', f: 'attendr' },
  { v: 'vendre', sv: 'sälja', p: R_RE('vend'), pp: 'vendu', f: 'vendr' },
];

export const TENSES = [
  { id: 'pres', fr: 'Présent', sv: 'presens', ex: 'jag gör' },
  { id: 'pc', fr: 'Passé composé', sv: 'det som har hänt', ex: 'jag har gjort, jag gjorde' },
  { id: 'imp', fr: 'Imparfait', sv: 'imperfekt (pågående, vana)', ex: 'jag brukade göra' },
  { id: 'fut', fr: 'Futur simple', sv: 'futurum', ex: 'jag ska göra' },
  { id: 'cond', fr: 'Conditionnel', sv: 'konditionalis', ex: 'jag skulle göra' },
  { id: 'subj', fr: 'Subjonctif', sv: 'subjunktiv (efter il faut que)', ex: 'att jag gör' },
];

export const PERSONS = ['je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles'];
const END_IMP = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'];
const END_FUT = ['ai', 'as', 'a', 'ons', 'ez', 'ont'];
const END_SJ = ['e', 'es', 'e', 'ions', 'iez', 'ent'];
const AV = ['ai', 'as', 'a', 'avons', 'avez', 'ont'], ET = ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'];

// Lägger till en ändelse och rättar stavningen före i (mangeions → mangions)
const join = (stem, end) => end[0] === 'i' ? stem.replace(/ge$/, 'g').replace(/ç$/, 'c') + end : stem + end;

const impStem = vb => vb.imp || vb.p[3].replace(/ons$/, '');
// Returnerar alla godtagbara former; den första visas som rätt svar
export function conj(vb, tense, i) {
  switch (tense) {
    case 'pres': return [vb.p[i]];
    case 'imp': return [join(impStem(vb), END_IMP[i])];
    case 'fut': return [vb.f + END_FUT[i]];
    case 'cond': return [vb.f + END_IMP[i]];
    case 'subj': {
      if (vb.sj) return [vb.sj[i]];
      const stem = i === 3 || i === 4 ? impStem(vb) : vb.p[5].replace(/ent$/, '');
      return [join(stem, END_SJ[i])];
    }
    case 'pc': {
      if (!vb.e) return [`${AV[i]} ${vb.pp}`];
      const base = `${ET[i]} ${vb.pp}`;
      return i < 3 ? [base, base + 'e'] : [base + 's', base + 'es'];
    }
  }
  return [''];
}
// Hur svaret visas, t.ex. "suis allé(e)"
export function shown(vb, tense, i) {
  if (tense === 'pc' && vb.e) return i < 3 ? `${ET[i]} ${vb.pp}(e)` : `${ET[i]} ${vb.pp}(e)s`;
  return conj(vb, tense, i)[0];
}
const vowel = s => /^[aeiouyéèêâîôûœh]/i.test(s);
// Pronomen framför formen, med apostrof där det behövs (j'ai, que j'aille, qu'il)
export function pron(tense, i, form) {
  const p = PERSONS[i];
  if (tense === 'subj') {
    if (i === 0) return vowel(form) ? "que j'" : 'que je';
    if (i === 2) return "qu'il/qu'elle";
    if (i === 5) return "qu'ils/qu'elles";
    return 'que ' + p;
  }
  return i === 0 && vowel(form) ? "j'" : p;
}
