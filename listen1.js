// Lyssna och svara: en kort ljudscen per lektion (kvarter 1–7). Texten visas först efter svaret.
// Röster: c = kvarterets figur, l = Léa, u = Lucas, n = berättaren, f = annan kvinna, m = annan man.
// Frågor på svenska upp till A2, på franska från B1. Rätt svar står först (blandas i appen).
export const SCENES1 = {
  // ——— La Boulangerie (A1) ———
  b1: { ic: '👋', lines: [
    ['c', "Bonjour, Léa ! Ça va ?", 'Hej Léa! Hur är det?'],
    ['l', "Ça va bien, merci. Et vous, Madame Brioche ?", 'Bra, tack. Och du, Madame Brioche?'],
    ['c', "Très bien ! Au revoir, et bonne journée !", 'Mycket bra! Hej då, och ha en bra dag!'] ],
    q: { q: 'Hur mår Madame Brioche?', o: ['Mycket bra', 'Inte så bra', 'Hon är trött'] } },
  b2: { ic: '🥖', lines: [
    ['u', "Maman, il y a du pain ?", 'Mamma, finns det bröd?'],
    ['f', "Non. Va à la boulangerie, s'il te plaît. Une baguette et deux croissants.", 'Nej. Gå till bageriet, tack. En baguette och två croissanter.'] ],
    q: { q: 'Vad ska Lucas köpa?', o: ['En baguette och två croissanter', 'Två baguetter och en croissant', 'Bara croissanter'] } },
  b3: { ic: '🛒', lines: [
    ['c', "Bonjour ! Vous désirez ?", 'Hej! Vad får det vara?'],
    ['m', "Je voudrais un pain au chocolat et une tarte aux pommes, s'il vous plaît.", 'Jag skulle vilja ha en chokladbulle och en äppelpaj, tack.'],
    ['c', "Très bien. Autre chose ?", 'Mycket bra. Något annat?'],
    ['m', "Non, c'est tout. Merci !", 'Nej, det är allt. Tack!'] ],
    q: { q: 'Vad beställer mannen?', o: ['En chokladbulle och en äppelpaj', 'En baguette och en kaka', 'Två croissanter'] } },
  b4: { ic: '💶', lines: [
    ['l', "Combien coûte le croissant ?", 'Hur mycket kostar croissanten?'],
    ['c', "Un euro vingt. Et la baguette, un euro dix.", 'En euro och tjugo. Och baguetten en euro och tio.'],
    ['l', "Alors, un croissant, s'il vous plaît.", 'Då tar jag en croissant, tack.'] ],
    q: { q: 'Vad kostar croissanten?', o: ['1,20 €', '1,10 €', '2,20 €'] } },
  b5: { ic: '⏰', lines: [
    ['n', "Le matin, à la boulangerie.", 'På morgonen, på bageriet.'],
    ['c', "Le pain est chaud ! Il est sept heures. La boulangerie ouvre maintenant.", 'Brödet är varmt! Klockan är sju. Bageriet öppnar nu.'],
    ['u', "Super ! J'adore le pain chaud.", 'Toppen! Jag älskar varmt bröd.'] ],
    q: { q: 'När öppnar bageriet?', o: ['Klockan sju', 'Klockan åtta', 'Klockan sex'] } },

  // ——— Le Marché (A1) ———
  m1: { ic: '🍎', lines: [
    ['c', "Les pommes sont très bonnes aujourd'hui !", 'Äpplena är mycket goda i dag!'],
    ['f', "Je voudrais trois pommes et une banane.", 'Jag skulle vilja ha tre äpplen och en banan.'],
    ['c', "Et des fraises ? Elles sont belles.", 'Och jordgubbar? De är fina.'],
    ['f', "Non merci, pas de fraises.", 'Nej tack, inga jordgubbar.'] ],
    q: { q: 'Vad köper kvinnan?', o: ['Tre äpplen och en banan', 'Jordgubbar och en banan', 'Tre bananer'] } },
  m2: { ic: '🥕', lines: [
    ['u', "Pour la soupe, il faut des carottes et des pommes de terre.", 'Till soppan behövs morötter och potatis.'],
    ['l', "Et des tomates ?", 'Och tomater?'],
    ['u', "Non, pas de tomates. Mais un oignon, oui.", 'Nej, inga tomater. Men en lök, ja.'] ],
    q: { q: 'Vad behövs INTE till soppan?', o: ['Tomater', 'Morötter', 'En lök'] } },
  m3: { ic: '🎨', lines: [
    ['l', "Regarde ! Le citron est jaune et la salade est verte.", 'Titta! Citronen är gul och salladen är grön.'],
    ['u', "Et la fraise ?", 'Och jordgubben?'],
    ['l', "La fraise est rouge, bien sûr !", 'Jordgubben är röd, så klart!'] ],
    q: { q: 'Vilken färg har citronen?', o: ['Gul', 'Grön', 'Röd'] } },
  m4: { ic: '⚖️', lines: [
    ['f', "C'est combien, le kilo de tomates ?", 'Hur mycket kostar ett kilo tomater?'],
    ['c', "Trois euros le kilo, madame.", 'Tre euro kilot, frun.'],
    ['f', "Alors, deux kilos, s'il vous plaît.", 'Då tar jag två kilo, tack.'],
    ['c', "Ça fait six euros.", 'Det blir sex euro.'] ],
    q: { q: 'Hur mycket betalar kvinnan?', o: ['6 €', '3 €', '2 €'] } },
  m5: { ic: '🧺', lines: [
    ['c', "Bonjour, Lucas ! Tu fais les courses pour ta maman ?", 'Hej Lucas! Handlar du åt din mamma?'],
    ['u', "Oui ! Elle veut des poires et un melon.", 'Ja! Hon vill ha päron och en melon.'],
    ['c', "Voilà. Et une pomme pour toi, c'est cadeau !", 'Varsågod. Och ett äpple till dig, det bjuder jag på!'] ],
    q: { q: 'Vad får Lucas gratis?', o: ['Ett äpple', 'En melon', 'Ett päron'] } },

  // ——— L'Arrêt du tram (A1) ———
  t1: { ic: '🚋', lines: [
    ['c', "Attention, le tram numéro trois part dans une minute.", 'Observera, spårvagn nummer tre går om en minut.'],
    ['l', "Vite, Lucas ! C'est notre tram !", 'Fort, Lucas! Det är vår spårvagn!'] ],
    q: { q: 'Vilket nummer har spårvagnen?', o: ['Tre', 'Två', 'Tretton'] } },
  t2: { ic: '🕒', lines: [
    ['u', "Pardon, madame, quelle heure est-il ?", 'Ursäkta, vad är klockan?'],
    ['f', "Il est trois heures et demie.", 'Hon är halv fyra.'],
    ['u', "Merci ! Le tram arrive à quatre heures.", 'Tack! Spårvagnen kommer klockan fyra.'] ],
    q: { q: 'Vad är klockan?', o: ['Halv fyra', 'Fyra', 'Tre'] } },
  t3: { ic: '📅', lines: [
    ['l', "Lundi, j'ai l'école. Mercredi, j'ai le sport.", 'På måndag har jag skola. På onsdag har jag idrott.'],
    ['u', "Et samedi ?", 'Och på lördag?'],
    ['l', "Samedi, je vais à la plage avec Mamie !", 'På lördag åker jag till stranden med mormor!'] ],
    q: { q: 'Vad gör Léa på lördag?', o: ['Åker till stranden', 'Har idrott', 'Går till skolan'] } },
  t4: { ic: '🗺️', lines: [
    ['m', "Excusez-moi, où est la gare ?", 'Ursäkta, var ligger stationen?'],
    ['c', "Prenez le tram deux. La gare est à droite, après le pont.", 'Ta spårvagn två. Stationen ligger till höger, efter bron.'],
    ['m', "Merci beaucoup !", 'Tack så mycket!'] ],
    q: { q: 'Var ligger stationen?', o: ['Till höger efter bron', 'Till vänster före bron', 'Bredvid bageriet'] } },
  t5: { ic: '🎫', lines: [
    ['c', "Bonjour ! Votre ticket, s'il vous plaît.", 'Hej! Er biljett, tack.'],
    ['l', "Oh non ! Mon ticket est à la maison !", 'Åh nej! Min biljett är hemma!'],
    ['c', "Ce n'est pas grave. Un ticket coûte deux euros.", 'Det gör inget. En biljett kostar två euro.'] ],
    q: { q: 'Var är Léas biljett?', o: ['Hemma', 'I väskan', 'På stationen'] } },

  // ——— Le Commissariat (A2) ———
  p1: { ic: '🚨', lines: [
    ['f', "Au secours ! On a volé mon sac !", 'Hjälp! Någon har stulit min väska!'],
    ['c', "Calmez-vous, madame. Où étiez-vous ?", 'Lugna er. Var var ni?'],
    ['f', "Devant la boulangerie. Un homme est parti en courant vers le port.", 'Utanför bageriet. En man sprang iväg mot hamnen.'] ],
    q: { q: 'Åt vilket håll sprang mannen?', o: ['Mot hamnen', 'Mot bageriet', 'Mot stationen'] } },
  p2: { ic: '🕵️', lines: [
    ['c', "Comment est l'homme ?", 'Hur ser mannen ut?'],
    ['u', "Il est grand, il a les cheveux noirs et une barbe.", 'Han är lång, han har svart hår och skägg.'],
    ['c', "Et ses yeux ?", 'Och hans ögon?'],
    ['u', "Je ne sais pas. Il portait des lunettes de soleil.", 'Jag vet inte. Han hade solglasögon.'] ],
    q: { q: 'Varför vet Lucas inte vilken färg mannen har på ögonen?', o: ['Han hade solglasögon', 'Det var mörkt', 'Han såg honom bakifrån'] } },
  p3: { ic: '🧥', lines: [
    ['c', "Qu'est-ce qu'il portait ?", 'Vad hade han på sig?'],
    ['f', "Un pantalon bleu, une veste verte et une casquette rouge.", 'Blå byxor, en grön jacka och en röd keps.'],
    ['c', "Une casquette rouge… Merci, c'est très utile.", 'En röd keps… Tack, det är till stor hjälp.'] ],
    q: { q: 'Vilken färg hade jackan?', o: ['Grön', 'Röd', 'Blå'] } },
  p4: { ic: '📝', lines: [
    ['c', "Qu'est-ce que vous avez fait hier soir ?", 'Vad gjorde ni i går kväll?'],
    ['m', "J'ai mangé au café, puis je suis rentré à la maison à dix heures.", 'Jag åt på kaféet, sedan gick jag hem klockan tio.'],
    ['c', "Quelqu'un peut le confirmer ?", 'Kan någon bekräfta det?'],
    ['m', "Oui, Monsieur Olivier, le patron du café.", 'Ja, Monsieur Olivier, som äger kaféet.'] ],
    q: { q: 'När gick mannen hem?', o: ['Klockan tio', 'Klockan elva', 'Klockan nio'] } },
  p5: { ic: '👮', lines: [
    ['c', "Bonne nouvelle, madame ! Nous avons retrouvé votre sac.", 'Goda nyheter! Vi har hittat er väska.'],
    ['f', "Merci ! Et mon portefeuille ?", 'Tack! Och min plånbok?'],
    ['c', "Il est dedans. Mais il manque vingt euros, je suis désolé.", 'Den ligger i den. Men det saknas tjugo euro, tyvärr.'] ],
    q: { q: 'Vad saknas?', o: ['Tjugo euro', 'Plånboken', 'Mobilen'] } },

  // ——— Le Port (A2) ———
  h1: { ic: '🌦️', lines: [
    ['n', "La météo de Port-Saint-Clément.", 'Väderleksrapporten för Port-Saint-Clément.'],
    ['f', "Ce matin, il pleut et il fait froid. Cet après-midi, il y aura du soleil, mais beaucoup de vent.", 'I morse regnar det och är kallt. I eftermiddag blir det sol, men mycket vind.'] ],
    q: { q: 'Hur blir vädret i eftermiddag?', o: ['Sol och mycket vind', 'Regn och kallt', 'Snö'] } },
  h2: { ic: '⛵', lines: [
    ['c', "Mon bateau s'appelle La Mouette. Il est petit, mais très rapide.", 'Min båt heter La Mouette. Den är liten, men väldigt snabb.'],
    ['u', "On peut faire un tour ?", 'Kan vi ta en tur?'],
    ['c', "Bien sûr ! Mettez vos gilets de sauvetage.", 'Så klart! Ta på er flytvästarna.'] ],
    q: { q: 'Vad ska barnen ta på sig?', o: ['Flytvästar', 'Mössor', 'Regnjackor'] } },
  h3: { ic: '🎣', lines: [
    ['l', "Ce week-end, on va pêcher avec Gaspard !", 'I helgen ska vi fiska med Gaspard!'],
    ['u', "Samedi ou dimanche ?", 'På lördag eller söndag?'],
    ['l', "Dimanche matin, à six heures. Il faut se lever tôt !", 'På söndag morgon, klockan sex. Vi måste gå upp tidigt!'] ],
    q: { q: 'När ska de fiska?', o: ['Söndag morgon klockan sex', 'Lördag kväll', 'Söndag eftermiddag'] } },
  h4: { ic: '🐟', lines: [
    ['c', "Hier, j'ai pêché dix poissons ! Mais un gros chat a volé le plus beau.", 'I går fick jag tio fiskar! Men en stor katt stal den finaste.'],
    ['l', "Ha ha ! Il en reste combien ?", 'Ha ha! Hur många är kvar?'],
    ['c', "Neuf. C'est assez pour le dîner.", 'Nio. Det räcker till middag.'] ],
    q: { q: 'Hur många fiskar har Gaspard kvar?', o: ['Nio', 'Tio', 'Elva'] } },
  h5: { ic: '⚓', lines: [
    ['c', "Attention, la mer est forte aujourd'hui. On ne sort pas.", 'Se upp, havet är grovt i dag. Vi åker inte ut.'],
    ['u', "Dommage ! Et demain ?", 'Synd! Och i morgon?'],
    ['c', "Demain, il fera beau. On partira à neuf heures.", 'I morgon blir det fint väder. Vi åker klockan nio.'] ],
    q: { q: 'Varför åker de inte ut i dag?', o: ['Havet är grovt', 'Båten är trasig', 'Gaspard är sjuk'] } },

  // ——— L'École (A2) ———
  e1: { ic: '👨‍👩‍👧', lines: [
    ['l', "Dans ma famille, il y a ma mère, mon père, mon frère Hugo et moi.", 'I min familj finns min mamma, min pappa, min bror Hugo och jag.'],
    ['c', "Et tu as des grands-parents ?", 'Och har du far- eller morföräldrar?'],
    ['l', "Oui, Mamie Odette. Elle habite près de la plage.", 'Ja, Mamie Odette. Hon bor nära stranden.'] ],
    q: { q: 'Var bor Mamie Odette?', o: ['Nära stranden', 'Nära skolan', 'I Paris'] } },
  e2: { ic: '📚', lines: [
    ['c', "Ouvrez vos livres à la page vingt-deux, s'il vous plaît.", 'Öppna era böcker på sidan tjugotvå, tack.'],
    ['u', "Madame, j'ai oublié mon livre !", 'Fröken, jag har glömt min bok!'],
    ['c', "Regarde avec Léa, alors.", 'Titta med Léa, då.'] ],
    q: { q: 'Vilken sida ska de öppna på?', o: ['22', '12', '32'] } },
  e3: { ic: '⚽', lines: [
    ['u', "Qu'est-ce que tu fais le mercredi après-midi ?", 'Vad gör du på onsdagseftermiddagarna?'],
    ['l', "Je fais de la danse. Et toi ?", 'Jag dansar. Och du?'],
    ['u', "Moi, je joue au foot. Et le samedi, je fais du piano.", 'Jag spelar fotboll. Och på lördagar spelar jag piano.'] ],
    q: { q: 'Vad gör Lucas på lördagar?', o: ['Spelar piano', 'Spelar fotboll', 'Dansar'] } },
  e4: { ic: '🌅', lines: [
    ['l', "Je me lève à sept heures, je prends mon petit-déjeuner et je pars à l'école à huit heures.", 'Jag går upp klockan sju, äter frukost och går till skolan klockan åtta.'],
    ['c', "Et le soir ?", 'Och på kvällen?'],
    ['l', "Je fais mes devoirs, puis je lis un peu avant de dormir.", 'Jag gör läxorna, sedan läser jag lite innan jag sover.'] ],
    q: { q: 'Vad gör Léa innan hon sover?', o: ['Läser lite', 'Tittar på tv', 'Gör läxorna'] } },
  e5: { ic: '🎒', lines: [
    ['c', "Bienvenue ! Cette année, nous avons un nouvel élève. Il s'appelle Karim.", 'Välkomna! I år har vi en ny elev. Han heter Karim.'],
    ['m', "Bonjour ! Je viens de Marseille. J'aime le dessin et le basket.", 'Hej! Jag kommer från Marseille. Jag gillar att teckna och basket.'] ],
    q: { q: 'Varifrån kommer Karim?', o: ['Marseille', 'Paris', 'Lyon'] } },

  // ——— Le Café (B1) ———
  c1: { ic: '☕', lines: [
    ['c', "Qu'est-ce que je vous sers ?", 'Vad får det lov att vara?'],
    ['f', "Un café crème et un croque-monsieur, s'il vous plaît. Ah, et une carafe d'eau.", 'En café crème och en croque-monsieur, tack. Åh, och en karaff vatten.'],
    ['c', "Désolé, il n'y a plus de croque-monsieur. Je vous propose une quiche ?", 'Tyvärr, croque-monsieuren är slut. Får jag föreslå en paj?'],
    ['f', "D'accord, va pour la quiche.", 'Okej, då tar jag pajen.'] ],
    q: { q: "Qu'est-ce que la cliente mange finalement ?", o: ['Une quiche', 'Un croque-monsieur', 'Rien'] } },
  c2: { ic: '💬', lines: [
    ['u', "À mon avis, le nouveau film est génial.", 'Enligt mig är den nya filmen fantastisk.'],
    ['l', "Je ne suis pas d'accord. L'histoire est trop longue et un peu bête.", 'Det håller jag inte med om. Handlingen är för lång och lite dum.'],
    ['u', "Bon, au moins, la musique est belle, non ?", 'Nåja, musiken är i alla fall fin, eller hur?'],
    ['l', "Ça, oui. Je suis d'accord.", 'Det, ja. Där håller jag med.'] ],
    q: { q: "Sur quoi Léa et Lucas sont-ils d'accord ?", o: ['La musique est belle', "L'histoire est géniale", 'Le film est trop court'] } },
  c3: { ic: '⚖️', lines: [
    ['c', "Le café ici est moins cher qu'à Paris, mais il est aussi bon !", 'Kaffet här är billigare än i Paris, men det är lika gott!'],
    ['m', "Et vos croissants sont meilleurs que ceux de la gare.", 'Och era croissanter är bättre än de på stationen.'],
    ['c', "Merci ! Ils viennent de chez Madame Brioche.", 'Tack! De kommer från Madame Brioche.'] ],
    q: { q: "D'où viennent les croissants du café ?", o: ['De chez Madame Brioche', 'De la gare', 'De Paris'] } },
  c4: { ic: '💭', lines: [
    ['l', "Si j'avais beaucoup d'argent, j'achèterais un bateau.", 'Om jag hade mycket pengar skulle jag köpa en båt.'],
    ['u', "Moi, je ferais le tour du monde.", 'Jag skulle resa jorden runt.'],
    ['c', "Et moi, je garderais mon petit café. Je suis heureux ici !", 'Och jag skulle behålla mitt lilla kafé. Jag är lycklig här!'] ],
    q: { q: 'Que ferait Monsieur Olivier avec beaucoup d’argent ?', o: ['Il garderait son café', 'Il achèterait un bateau', 'Il ferait le tour du monde'] } },
  c5: { ic: '🌙', lines: [
    ['c', "On ferme dans dix minutes. Je vous offre un dernier café ?", 'Vi stänger om tio minuter. Får jag bjuda på en sista kaffe?'],
    ['f', "Volontiers, mais un déca, sinon je ne vais pas dormir.", 'Gärna, men koffeinfritt, annars kommer jag inte att sova.'] ],
    q: { q: 'Pourquoi la cliente veut-elle un déca ?', o: ['Pour pouvoir dormir', "Parce qu'elle n'aime pas le café", "Parce que c'est moins cher"] } },
};
