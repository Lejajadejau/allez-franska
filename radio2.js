// Radio Port-Saint-Clément, andra programmet för kvarter 19–24.
// Ljudet ligger i audio/v2/ls/r2-<kvarter>-<rad>.mp3. Samma format som RADIO.
// Röster: h = programledaren, w = vädret, n = reklam/trafik, c = kvarterets figur, f/m = lyssnare.
export const RADIO2 = {
  maison: { title: 'Trafiken', lines: [
    ['n', "Info trafic : la rue des Lilas est fermée toute la semaine à cause de travaux.", 'Trafikinformation: Rue des Lilas är avstängd hela veckan på grund av vägarbeten.'],
    ['h', "Prenez plutôt le boulevard du Port. Et pensez au tram : il passe toutes les dix minutes.", 'Ta hellre Boulevard du Port. Och tänk på spårvagnen: den går var tionde minut.'] ],
    qs: [
      { q: 'Pourquoi la rue des Lilas est-elle fermée ?', o: ['À cause de travaux', 'À cause d\'un marché', 'À cause de la neige'] },
      { q: 'Quelle route faut-il prendre ?', o: ['Le boulevard du Port', 'La rue de la Gare', 'L\'avenue des Pins'] },
      { q: 'Le tram passe toutes les combien ?', o: ['Toutes les dix minutes', 'Toutes les heures', 'Toutes les deux minutes'] } ] },
  magasin: { title: 'Lyssnarna ringer', lines: [
    ['h', "Une auditrice nous appelle. Bonjour, madame !", 'En lyssnare ringer oss. Hej!'],
    ['f', "Bonjour ! J'ai acheté un pull trop petit. Le magasin veut bien l'échanger, mais seulement avec le ticket de caisse.", 'Hej! Jag köpte en tröja som var för liten. Butiken byter gärna, men bara mot kvittot.'] ],
    qs: [
      { q: 'Quel est le problème avec le pull ?', o: ['Il est trop petit', 'Il est trop cher', 'Il a un trou'] },
      { q: 'Que faut-il pour l\'échanger ?', o: ['Le ticket de caisse', 'Une carte de fidélité', 'Rien du tout'] },
      { q: 'Qui appelle la radio ?', o: ['Une auditrice', 'Le vendeur', 'Le maire'] } ] },
  restaurant: { title: 'Veckans matnyheter', lines: [
    ['h', "Bonne nouvelle : le restaurant de Chef Bastien ouvre aussi le dimanche midi.", 'Goda nyheter: kocken Bastiens restaurang har nu öppet även på söndagslunchen.'],
    ['c', "Oui ! Et le premier dimanche, le dessert est offert à tous les enfants.", 'Ja! Och första söndagen bjuder vi alla barn på efterrätt.'] ],
    qs: [
      { q: 'När har restaurangen nu också öppet?', o: ['Söndag lunch', 'Måndag kväll', 'Lördag morgon'] },
      { q: 'Vad bjuder Bastien på första söndagen?', o: ['Efterrätt till barnen', 'Kaffe till alla', 'En gratis förrätt'] },
      { q: 'Vem får gratis efterrätt?', o: ['Alla barn', 'Alla vuxna', 'Bara de första tio gästerna'] } ] },
  stade: { title: 'Loppet i stan', lines: [
    ['h', "Dimanche, c'est la course de Port-Saint-Clément : cinq kilomètres le long de la mer.", 'På söndag är det Port-Saint-Clément-loppet: fem kilometer längs havet.'],
    ['c', "Le départ est à neuf heures, devant le stade. Tout le monde peut courir !", 'Starten går klockan nio, framför idrottsplatsen. Alla får springa!'] ],
    qs: [
      { q: 'Hur långt är loppet?', o: ['Fem kilometer', 'Tio kilometer', 'En kilometer'] },
      { q: 'Var går starten?', o: ['Framför idrottsplatsen', 'Vid hamnen', 'Vid stationen'] },
      { q: 'Vilken tid går starten?', o: ['Klockan nio', 'Klockan sju', 'Klockan tolv'] } ] },
  cinema: { title: 'Sommarbio', lines: [
    ['h', "Cet été, le cinéma en plein air revient sur la plage, tous les vendredis soir.", 'I sommar kommer utomhusbion tillbaka till stranden, varje fredagskväll.'],
    ['c', "Apportez une couverture. Les films commencent quand le soleil se couche.", 'Ta med en filt. Filmerna börjar när solen går ner.'] ],
    qs: [
      { q: 'Où a lieu le cinéma en plein air ?', o: ['Sur la plage', 'Au parc', 'Sur la place du marché'] },
      { q: 'Quel jour ?', o: ['Le vendredi soir', 'Le samedi après-midi', 'Le dimanche matin'] },
      { q: 'Que faut-il apporter ?', o: ['Une couverture', 'Une lampe de poche', 'Un parapluie'] } ] },
  camping: { title: 'Brandrisk', lines: [
    ['w', "Attention : il fait très chaud et très sec cette semaine. Le risque d'incendie est élevé.", 'Varning: det är mycket varmt och torrt den här veckan. Brandrisken är hög.'],
    ['h', "Dans les campings, les barbecues sont interdits jusqu'à samedi.", 'På campingplatserna är grillning förbjuden till och med lördag.'] ],
    qs: [
      { q: 'Quel temps fait-il cette semaine ?', o: ['Très chaud et très sec', 'Froid et pluvieux', 'Du vent et de la neige'] },
      { q: 'Qu\'est-ce qui est interdit dans les campings ?', o: ['Les barbecues', 'Les tentes', 'Les vélos'] },
      { q: 'Jusqu\'à quand ?', o: ['Jusqu\'à samedi', 'Jusqu\'à demain', 'Tout l\'été'] } ] },
};
