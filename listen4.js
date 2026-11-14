// Lyssna och svara, andra omgången: ytterligare en ljudscen per lektion (alla kvarter).
// Ljudet ligger i audio/v2/ls/<lektion>x-<rad>.mp3. Samma format som SCENES1–3.
// Röster: c = kvarterets figur, l = Léa, u = Lucas, n = berättaren, f = annan kvinna, m = annan man, w = väder.
// Frågor på svenska upp till A2, på franska från B1. Rätt svar står först (blandas i appen).
export const SCENESB = {
  // ——— La Boulangerie (A1) ———
  b1: { ic: '👋', lines: [
    ['c', "Bonsoir, Monsieur ! Vous allez bien ?", 'God kväll! Hur står det till?'],
    ['m', "Oui, merci. Je m'appelle Paul. Et vous ?", 'Bra, tack. Jag heter Paul. Och du?'],
    ['c', "Moi, c'est Madame Brioche. Enchantée !", 'Jag är Madame Brioche. Trevligt att träffas!'] ],
    q: { q: 'Vad heter mannen?', o: ['Paul', 'Pierre', 'Brioche'] } },
  b2: { ic: '🥐', lines: [
    ['l', "Madame Brioche, vous avez des croissants ?", 'Madame Brioche, har du croissanter?'],
    ['c', "Non, désolée. Il n'y a plus de croissants. Mais j'ai des pains au chocolat.", 'Nej, tyvärr. Croissanterna är slut. Men jag har chokladbullar.'],
    ['l', "D'accord, deux pains au chocolat, s'il vous plaît.", 'Okej, två chokladbullar, tack.'] ],
    q: { q: 'Vad köper Léa?', o: ['Två chokladbullar', 'Två croissanter', 'En baguette'] } },
  b3: { ic: '🍓', lines: [
    ['m', "Bonjour ! Je voudrais un gâteau pour ce soir.", 'Hej! Jag skulle vilja ha en tårta till i kväll.'],
    ['c', "Un gâteau au chocolat ou une tarte aux fraises ?", 'En chokladtårta eller en jordgubbspaj?'],
    ['m', "Une tarte aux fraises, s'il vous plaît. C'est pour ma fille.", 'En jordgubbspaj, tack. Den är till min dotter.'] ],
    q: { q: 'Vem är pajen till?', o: ['Hans dotter', 'Hans fru', 'Hans son'] } },
  b4: { ic: '💶', lines: [
    ['u', "Une baguette et un croissant, c'est combien ?", 'En baguette och en croissant, hur mycket blir det?'],
    ['c', "Deux euros trente, s'il te plaît.", 'Två euro och trettio, tack.'],
    ['u', "Voilà trois euros.", 'Här är tre euro.'],
    ['c', "Merci ! Et voilà soixante-dix centimes.", 'Tack! Och här är sjuttio cent.'] ],
    q: { q: 'Hur mycket får Lucas tillbaka?', o: ['70 cent', '30 cent', '2,30 €'] } },
  b5: { ic: '🕛', lines: [
    ['n', "Dimanche matin.", 'Söndag morgon.'],
    ['c', "Aujourd'hui, la boulangerie ferme à midi.", 'I dag stänger bageriet klockan tolv.'],
    ['f', "À midi ? Alors je prends deux baguettes maintenant !", 'Klockan tolv? Då tar jag två baguetter nu!'] ],
    q: { q: 'När stänger bageriet i dag?', o: ['Klockan tolv', 'Klockan sju', 'Klockan ett'] } },

  // ——— Le Marché (A1) ———
  m1: { ic: '🍊', lines: [
    ['l', "Je voudrais des bananes, s'il vous plaît.", 'Jag skulle vilja ha bananer, tack.'],
    ['c', "Désolé, pas de bananes aujourd'hui. Mais j'ai des oranges.", 'Tyvärr, inga bananer i dag. Men jag har apelsiner.'],
    ['l', "Alors, un kilo d'oranges.", 'Då tar jag ett kilo apelsiner.'] ],
    q: { q: 'Vad köper Léa?', o: ['Ett kilo apelsiner', 'Ett kilo bananer', 'Äpplen'] } },
  m2: { ic: '🍅', lines: [
    ['f', "Monsieur, vous avez des tomates ?", 'Har du tomater?'],
    ['c', "Oui, et des carottes, des oignons, des pommes de terre…", 'Ja, och morötter, lök, potatis …'],
    ['f', "Juste des tomates et une salade, merci.", 'Bara tomater och en sallad, tack.'] ],
    q: { q: 'Vad köper kvinnan?', o: ['Tomater och en sallad', 'Morötter och lök', 'Potatis och tomater'] } },
  m3: { ic: '🫑', lines: [
    ['u', "Regarde, Léa ! Un poivron violet !", 'Titta, Léa! En lila paprika!'],
    ['l', "Violet ? Non, il est rouge !", 'Lila? Nej, den är röd!'],
    ['u', "Ah oui… rouge et un peu noir.", 'Jaha … röd och lite svart.'] ],
    q: { q: 'Vilken färg har paprikan enligt Léa?', o: ['Röd', 'Lila', 'Grön'] } },
  m4: { ic: '🍓', lines: [
    ['m', "Les fraises, c'est combien ?", 'Vad kostar jordgubbarna?'],
    ['c', "Quatre euros la barquette. Deux barquettes, sept euros.", 'Fyra euro asken. Två askar för sju euro.'],
    ['m', "Alors deux barquettes, s'il vous plaît.", 'Då tar jag två askar, tack.'] ],
    q: { q: 'Hur mycket betalar mannen?', o: ['7 €', '8 €', '4 €'] } },
  m5: { ic: '🍒', lines: [
    ['c', "Le marché ferme à une heure. Vite, il reste des cerises !", 'Marknaden stänger klockan ett. Skynda, det finns körsbär kvar!'],
    ['f', "Oh, j'adore les cerises. Un kilo, s'il vous plaît.", 'Åh, jag älskar körsbär. Ett kilo, tack.'],
    ['c', "Pour vous, cinq euros.", 'För dig blir det fem euro.'] ],
    q: { q: 'När stänger marknaden?', o: ['Klockan ett', 'Klockan fem', 'Klockan elva'] } },

  // ——— L'Arrêt du tram (A1) ———
  t1: { ic: '🚋', lines: [
    ['n', "Une annonce dans le tram.", 'Ett utrop på spårvagnen.'],
    ['c', "Prochain arrêt : la plage. Ensuite : le port.", 'Nästa hållplats: stranden. Därefter: hamnen.'],
    ['u', "Léa, on descend à la plage !", 'Léa, vi går av vid stranden!'] ],
    q: { q: 'Var ska de gå av?', o: ['Vid stranden', 'Vid hamnen', 'Vid stationen'] } },
  t2: { ic: '⌚', lines: [
    ['l', "Pardon, Monsieur, quelle heure est-il ?", 'Ursäkta, vad är klockan?'],
    ['m', "Il est neuf heures et quart.", 'Den är kvart över nio.'],
    ['l', "Oh non ! L'école commence à neuf heures !", 'Åh nej! Skolan börjar klockan nio!'] ],
    q: { q: 'Vad är klockan?', o: ['Kvart över nio', 'Nio', 'Kvart i nio'] } },
  t3: { ic: '📅', lines: [
    ['u', "Le tram passe le dimanche ?", 'Går spårvagnen på söndagar?'],
    ['c', "Oui, mais seulement le matin. Du lundi au samedi, toute la journée.", 'Ja, men bara på förmiddagen. Måndag till lördag går den hela dagen.'],
    ['u', "Merci, Monsieur !", 'Tack!'] ],
    q: { q: 'När går spårvagnen på söndagar?', o: ['Bara på förmiddagen', 'Hela dagen', 'Inte alls'] } },
  t4: { ic: '🧭', lines: [
    ['f', "Excusez-moi, où est la poste ?", 'Ursäkta, var ligger posten?'],
    ['c', "Descendez au prochain arrêt. La poste est à gauche, à côté du café.", 'Gå av vid nästa hållplats. Posten ligger till vänster, bredvid kaféet.'],
    ['f', "Merci beaucoup !", 'Tack så mycket!'] ],
    q: { q: 'Var ligger posten?', o: ['Till vänster, bredvid kaféet', 'Till höger, bredvid kyrkan', 'Vid stationen'] } },
  t5: { ic: '🎫', lines: [
    ['c', "Les billets, s'il vous plaît !", 'Biljetterna, tack!'],
    ['m', "Voilà mon billet… Et voilà le billet de mon fils.", 'Här är min biljett … Och här är min sons biljett.'],
    ['c', "Merci. Bonne journée !", 'Tack. Ha en bra dag!'] ],
    q: { q: 'Hur många biljetter visar mannen?', o: ['Två', 'En', 'Tre'] } },

  // ——— Le Commissariat (A2) ———
  p1: { ic: '🐕', lines: [
    ['f', "Inspecteur ! Mon chien a disparu ! Il s'appelle Filou.", 'Kommissarien! Min hund är borta! Han heter Filou.'],
    ['c', "Calmez-vous, Madame. Où est-ce que vous l'avez vu pour la dernière fois ?", 'Lugna dig. Var såg du honom senast?'],
    ['f', "Au parc, près de la fontaine, ce matin.", 'I parken, nära fontänen, i morse.'] ],
    q: { q: 'Var såg kvinnan hunden senast?', o: ['I parken vid fontänen', 'På stranden', 'Vid bageriet'] } },
  p2: { ic: '🕵️', lines: [
    ['c', "Décrivez le voleur, s'il vous plaît.", 'Beskriv tjuven, tack.'],
    ['m', "Il est petit et un peu gros. Il a une barbe et il porte des lunettes.", 'Han är kort och lite tjock. Han har skägg och glasögon.'],
    ['c', "Il a les cheveux longs ou courts ?", 'Har han långt eller kort hår?'],
    ['m', "Il n'a pas de cheveux ! Il est chauve.", 'Han har inget hår! Han är flintskallig.'] ],
    q: { q: 'Hur ser tjuven ut?', o: ['Kort, med skägg och flint', 'Lång och smal, med långt hår', 'Kort, med glasögon och långt hår'] } },
  p3: { ic: '🧣', lines: [
    ['l', "J'ai perdu mon écharpe. Elle est bleue, avec des étoiles jaunes.", 'Jag har tappat min halsduk. Den är blå med gula stjärnor.'],
    ['c', "Une écharpe bleue… Voilà ! C'est la vôtre ?", 'En blå halsduk … Här! Är det din?'],
    ['l', "Oui ! Merci, inspecteur !", 'Ja! Tack, kommissarien!'] ],
    q: { q: 'Hur ser halsduken ut?', o: ['Blå med gula stjärnor', 'Gul med blå stjärnor', 'Röd och blå'] } },
  p4: { ic: '🌙', lines: [
    ['c', "Qu'est-ce que vous avez fait hier soir ?", 'Vad gjorde du i går kväll?'],
    ['m', "J'ai dîné chez mon frère, puis on a regardé un film.", 'Jag åt middag hos min bror, sedan tittade vi på en film.'],
    ['c', "Et après le film ?", 'Och efter filmen?'],
    ['m', "Je suis rentré à minuit et je me suis couché.", 'Jag kom hem vid midnatt och gick och lade mig.'] ],
    q: { q: 'Vad gjorde mannen efter middagen?', o: ['Tittade på film', 'Gick på bio', 'Gick hem och sov'] } },
  p5: { ic: '👛', lines: [
    ['u', "Bonjour, inspecteur. J'ai trouvé ce portefeuille dans la rue.", 'Hej, kommissarien. Jag hittade den här plånboken på gatan.'],
    ['c', "Merci, jeune homme ! Il y a une carte d'identité… C'est le portefeuille de Gaspard !", 'Tack, unge man! Det ligger ett id-kort här … Det är Gaspards plånbok!'],
    ['u', "Le pêcheur ? Je le connais ! Il habite au port.", 'Fiskaren? Jag känner honom! Han bor i hamnen.'] ],
    q: { q: 'Vems plånbok är det?', o: ['Gaspards', 'Madame Brioches', 'Lucas pappas'] } },

  // ——— Le Port (A2) ———
  h1: { ic: '🌤️', lines: [
    ['w', "La météo pour demain : du soleil le matin, puis des nuages. Il fera vingt degrés.", 'Vädret i morgon: sol på förmiddagen, sedan moln. Det blir tjugo grader.'],
    ['u', "Super, on peut aller à la plage le matin !", 'Toppen, vi kan gå till stranden på förmiddagen!'] ],
    q: { q: 'Hur varmt blir det i morgon?', o: ['20 grader', '12 grader', '25 grader'] } },
  h2: { ic: '⛵', lines: [
    ['c', "Tu vois ce bateau bleu ? C'est mon bateau. Il s'appelle La Mouette.", 'Ser du den blå båten? Det är min båt. Den heter Måsen.'],
    ['l', "Il est vieux ?", 'Är den gammal?'],
    ['c', "Oui, il a quarante ans, comme moi !", 'Ja, den är fyrtio år, precis som jag!'] ],
    q: { q: 'Hur gammal är båten?', o: ['40 år', '14 år', '4 år'] } },
  h3: { ic: '🎣', lines: [
    ['u', "Qu'est-ce que tu vas faire demain, Gaspard ?", 'Vad ska du göra i morgon, Gaspard?'],
    ['c', "Je vais réparer mon filet. Et dimanche, je vais aller à la pêche avec mon neveu.", 'Jag ska laga mitt nät. Och på söndag ska jag fiska med min brorson.'],
    ['u', "Je peux venir aussi ?", 'Får jag också följa med?'] ],
    q: { q: 'Vad ska Gaspard göra i morgon?', o: ['Laga sitt nät', 'Fiska', 'Måla båten'] } },
  h4: { ic: '🌬️', lines: [
    ['m', "Gaspard, tu as pêché beaucoup de poissons hier ?", 'Gaspard, fick du många fiskar i går?'],
    ['c', "Non, seulement trois. Il y avait trop de vent.", 'Nej, bara tre. Det blåste för mycket.'],
    ['m', "Pas de chance !", 'Otur!'] ],
    q: { q: 'Varför fick Gaspard så få fiskar?', o: ['Det blåste för mycket', 'Det regnade', 'Båten var trasig'] } },
  h5: { ic: '🐬', lines: [
    ['c', "Regardez, là-bas ! Des dauphins !", 'Titta där borta! Delfiner!'],
    ['u', "Où ? Je ne vois rien !", 'Var? Jag ser ingenting!'],
    ['c', "À droite, près du phare. Il y en a trois !", 'Till höger, nära fyren. Det är tre stycken!'] ],
    q: { q: 'Var är delfinerna?', o: ['Till höger, nära fyren', 'Till vänster, vid stranden', 'Bakom båten'] } },

  // ——— L'École (A2) ———
  e1: { ic: '📷', lines: [
    ['l', "Voici une photo de ma famille. Là, c'est mon oncle Marc.", 'Här är ett foto av min familj. Där är min farbror Marc.'],
    ['c', "Et la petite fille ?", 'Och den lilla flickan?'],
    ['l', "C'est ma cousine Zoé. Elle a quatre ans.", 'Det är min kusin Zoé. Hon är fyra år.'] ],
    q: { q: 'Vem är den lilla flickan?', o: ['Léas kusin', 'Léas syster', 'Léas faster'] } },
  e2: { ic: '🏛️', lines: [
    ['c', "Les enfants, demain, nous allons au musée. Apportez un pique-nique !", 'Barn, i morgon går vi till museet. Ta med matsäck!'],
    ['u', "On part à quelle heure ?", 'När åker vi?'],
    ['c', "À huit heures et demie, devant l'école.", 'Halv nio, utanför skolan.'] ],
    q: { q: 'När åker de?', o: ['Halv nio', 'Klockan åtta', 'Halv åtta'] } },
  e3: { ic: '🏊', lines: [
    ['c', "Léa, tu fais du sport ?", 'Léa, idrottar du?'],
    ['l', "Oui, je fais de la natation le mercredi et du tennis le samedi.", 'Ja, jag simmar på onsdagar och spelar tennis på lördagar.'],
    ['c', "Bravo ! Et tu joues d'un instrument ?", 'Bra! Och spelar du något instrument?'],
    ['l', "Non, mais je chante dans une chorale.", 'Nej, men jag sjunger i en kör.'] ],
    q: { q: 'Vad gör Léa på onsdagar?', o: ['Hon simmar', 'Hon spelar tennis', 'Hon sjunger i kör'] } },
  e4: { ic: '🚲', lines: [
    ['u', "Le matin, je me lève à sept heures. Je prends une douche et je mange des céréales.", 'På morgonen går jag upp klockan sju. Jag duschar och äter flingor.'],
    ['c', "Et tu vas à l'école à pied ?", 'Och går du till skolan?'],
    ['u', "Non, à vélo !", 'Nej, jag cyklar!'] ],
    q: { q: 'Hur tar sig Lucas till skolan?', o: ['Han cyklar', 'Han går', 'Med spårvagn'] } },
  e5: { ic: '🤧', lines: [
    ['m', "Bonjour, je suis le papa de Karim. Il est malade aujourd'hui.", 'Hej, jag är Karims pappa. Han är sjuk i dag.'],
    ['c', "Oh, j'espère que ce n'est pas grave !", 'Åh, jag hoppas att det inte är något allvarligt!'],
    ['m', "Non, il a un rhume. Il revient lundi.", 'Nej, han är förkyld. Han kommer tillbaka på måndag.'] ],
    q: { q: 'När kommer Karim tillbaka?', o: ['På måndag', 'I morgon', 'Om en vecka'] } },

  // ——— Le Café (B1) ———
  c1: { ic: '🥪', lines: [
    ['m', "Un café et un croque-monsieur, s'il vous plaît.", 'En kaffe och en croque-monsieur, tack.'],
    ['c', "Désolé, la cuisine est fermée jusqu'à midi. Je peux vous proposer un croissant ?", 'Tyvärr, köket är stängt till tolv. Får jag erbjuda en croissant?'],
    ['m', "Bon, d'accord. Et un verre d'eau, s'il vous plaît.", 'Okej då. Och ett glas vatten, tack.'] ],
    q: { q: "Pourquoi l'homme ne peut-il pas avoir de croque-monsieur ?", o: ["La cuisine est fermée jusqu'à midi", "Il n'y a plus de pain", 'Le café va fermer'] } },
  c2: { ic: '🎬', lines: [
    ['l', "Je trouve que ce film était génial !", 'Jag tycker att filmen var jättebra!'],
    ['u', "Ah bon ? Moi, je l'ai trouvé trop long. Mais la musique était belle.", 'Jaså? Jag tyckte att den var för lång. Men musiken var fin.'],
    ['l', "Là, je suis d'accord avec toi.", 'Där håller jag med dig.'] ],
    q: { q: "Qu'est-ce que Lucas a aimé dans le film ?", o: ['La musique', "L'histoire", 'La longueur'] } },
  c3: { ic: '☕', lines: [
    ['f', "Votre chocolat chaud est meilleur que celui du café de la gare !", 'Din varma choklad är godare än den på stationskaféet!'],
    ['c', "Merci ! Il est plus cher aussi, mais je fais tout moi-même.", 'Tack! Den är dyrare också, men jag gör allt själv.'],
    ['f', "Ça vaut la peine !", 'Det är värt det!'] ],
    q: { q: 'Pourquoi le chocolat est-il plus cher ?', o: ['Monsieur Olivier fait tout lui-même', 'La tasse est plus grande', 'Le lait vient de loin'] } },
  c4: { ic: '🌊', lines: [
    ['c', "Si je pouvais, j'ouvrirais un deuxième café, au bord de la mer.", 'Om jag kunde skulle jag öppna ett kafé till, vid havet.'],
    ['u', "Et vous serviriez des glaces ?", 'Och skulle du servera glass?'],
    ['c', "Bien sûr ! Et des crêpes le dimanche.", 'Självklart! Och crêpes på söndagar.'] ],
    q: { q: 'Où Monsieur Olivier ouvrirait-il un deuxième café ?', o: ['Au bord de la mer', 'À la gare', 'À la montagne'] } },
  c5: { ic: '🧾', lines: [
    ['m', "L'addition, s'il vous plaît. Je suis pressé, mon train part dans dix minutes.", 'Notan, tack. Jag har bråttom, mitt tåg går om tio minuter.'],
    ['c', "Voilà. Ça fait six euros cinquante.", 'Varsågod. Det blir sex euro och femtio.'],
    ['m', "Gardez la monnaie. Au revoir !", 'Behåll växeln. Hej då!'] ],
    q: { q: "Pourquoi l'homme est-il pressé ?", o: ['Son train part bientôt', 'Il a rendez-vous chez le médecin', 'Le café va fermer'] } },

  // ——— La Gare (A2) ———
  ga1: { ic: '🎟️', lines: [
    ['m', "Un aller simple pour Montpellier, s'il vous plaît.", 'En enkelbiljett till Montpellier, tack.'],
    ['c', "En première ou en deuxième classe ?", 'Första eller andra klass?'],
    ['m', "En deuxième. C'est combien ?", 'Andra. Vad kostar det?'],
    ['c', "Vingt-quatre euros.", 'Tjugofyra euro.'] ],
    q: { q: 'Vilken biljett köper mannen?', o: ['Enkel, andra klass', 'Tur och retur, första klass', 'Enkel, första klass'] } },
  ga2: { ic: '📢', lines: [
    ['c', "Attention, s'il vous plaît. Le train pour Marseille part du quai numéro quatre, avec vingt minutes de retard.", 'Observera. Tåget till Marseille går från spår fyra, tjugo minuter försenat.'],
    ['l', "Vingt minutes ! On a le temps de prendre un café.", 'Tjugo minuter! Vi hinner ta en kaffe.'] ],
    q: { q: 'Från vilket spår går tåget?', o: ['Spår 4', 'Spår 20', 'Spår 2'] } },
  ga3: { ic: '🧳', lines: [
    ['u', "Pardon, Madame, c'est votre valise ?", 'Ursäkta, är det din resväska?'],
    ['f', "Oui, désolée. Elle est trop lourde, je ne peux pas la mettre en haut.", 'Ja, förlåt. Den är för tung, jag kan inte lyfta upp den.'],
    ['u', "Je vais vous aider.", 'Jag hjälper dig.'] ],
    q: { q: 'Vad hjälper Lucas till med?', o: ['Att lyfta upp resväskan', 'Att hitta platsen', 'Att köpa biljett'] } },
  ga4: { ic: '🗺️', lines: [
    ['l', "Tu es déjà allé en Italie ?", 'Har du varit i Italien?'],
    ['u', "Non, mais je suis allé en Espagne et au Portugal.", 'Nej, men jag har varit i Spanien och Portugal.'],
    ['l', "Moi, j'ai envie de visiter le Japon un jour.", 'Jag vill åka till Japan någon gång.'] ],
    q: { q: 'Vilket land vill Léa besöka?', o: ['Japan', 'Italien', 'Portugal'] } },
  ga5: { ic: '🚆', lines: [
    ['c', "Le train pour Paris va partir ! Attention à la fermeture des portes !", 'Tåget till Paris avgår! Se upp, dörrarna stängs!'],
    ['m', "Attendez ! Attendez !", 'Vänta! Vänta!'],
    ['c', "Trop tard, Monsieur. Le prochain train part dans une heure.", 'För sent. Nästa tåg går om en timme.'] ],
    q: { q: 'När går nästa tåg?', o: ['Om en timme', 'Om tio minuter', 'I morgon'] } },

  // ——— Chez le Médecin (A2) ———
  me1: { ic: '⚽', lines: [
    ['u', "Docteur, j'ai mal au genou. Je suis tombé au foot.", 'Doktorn, jag har ont i knät. Jag ramlade när jag spelade fotboll.'],
    ['c', "Montre-moi… Tu peux marcher ?", 'Visa mig … Kan du gå?'],
    ['u', "Oui, mais je ne peux pas courir.", 'Ja, men jag kan inte springa.'] ],
    q: { q: 'Var har Lucas ont?', o: ['I knät', 'I foten', 'I ryggen'] } },
  me2: { ic: '🤕', lines: [
    ['f', "Ça ne va pas, j'ai mal à la tête depuis trois jours.", 'Jag mår inte bra, jag har haft huvudvärk i tre dagar.'],
    ['c', "Vous dormez bien ?", 'Sover du bra?'],
    ['f', "Non, je travaille beaucoup et je dors seulement cinq heures.", 'Nej, jag jobbar mycket och sover bara fem timmar.'] ],
    q: { q: 'Hur länge har kvinnan haft huvudvärk?', o: ['I tre dagar', 'I fem dagar', 'Sedan i går'] } },
  me3: { ic: '💊', lines: [
    ['m', "Bonjour, j'ai une ordonnance du docteur Lambert.", 'Hej, jag har ett recept från doktor Lambert.'],
    ['f', "Voilà le sirop. Une cuillère le matin et une le soir, pendant une semaine.", 'Här är hostmedicinen. En sked på morgonen och en på kvällen, i en vecka.'] ],
    q: { q: 'Hur länge ska mannen ta medicinen?', o: ['En vecka', 'Två dagar', 'En månad'] } },
  me4: { ic: '🛌', lines: [
    ['c', "Tu as un gros rhume, Léa. Reste au lit, bois beaucoup d'eau et ne va pas à l'école demain.", 'Du är ordentligt förkyld, Léa. Stanna i sängen, drick mycket vatten och gå inte till skolan i morgon.'],
    ['l', "Et je peux regarder la télé ?", 'Får jag titta på tv?'],
    ['c', "Oui, un peu !", 'Ja, lite!'] ],
    q: { q: 'Vad ska Léa INTE göra i morgon?', o: ['Gå till skolan', 'Dricka vatten', 'Titta på tv'] } },
  me5: { ic: '📞', lines: [
    ['f', "Cabinet du docteur Lambert, bonjour.", 'Doktor Lamberts mottagning, hej.'],
    ['m', "Bonjour, je voudrais un rendez-vous, c'est urgent.", 'Hej, jag skulle vilja boka en tid, det är bråttom.'],
    ['f', "Le docteur peut vous voir aujourd'hui à dix-sept heures.", 'Doktorn kan ta emot dig i dag klockan sjutton.'],
    ['m', "Parfait, merci.", 'Perfekt, tack.'] ],
    q: { q: 'När får mannen komma?', o: ['I dag kl. 17', 'I morgon kl. 7', 'I dag kl. 10'] } },

  // ——— L'Hôtel (A2) ———
  ho1: { ic: '🛎️', lines: [
    ['c', "Bonsoir, vous avez une réservation ?", 'God kväll, har du en bokning?'],
    ['f', "Non. Vous avez une chambre pour deux personnes ?", 'Nej. Har ni ett dubbelrum?'],
    ['c', "Oui, il reste une chambre avec vue sur la mer. Quatre-vingt-dix euros la nuit.", 'Ja, det finns ett rum kvar med havsutsikt. Nittio euro per natt.'] ],
    q: { q: 'Vad kostar rummet per natt?', o: ['90 €', '80 €', '19 €'] } },
  ho2: { ic: '🛏️', lines: [
    ['u', "Maman, il y a une télé dans la chambre !", 'Mamma, det finns en tv i rummet!'],
    ['f', "Et regarde le balcon ! On voit le port.", 'Och titta på balkongen! Man ser hamnen.'],
    ['u', "Mais où est la salle de bains ?", 'Men var är badrummet?'],
    ['f', "Là, derrière la porte.", 'Där, bakom dörren.'] ],
    q: { q: 'Vad ser man från balkongen?', o: ['Hamnen', 'Stranden', 'Torget'] } },
  ho3: { ic: '🌳', lines: [
    ['m', "Le petit-déjeuner est compris ?", 'Ingår frukosten?'],
    ['c', "Oui, Monsieur. Il est servi dans le jardin quand il fait beau.", 'Ja. Den serveras i trädgården när det är fint väder.'],
    ['m', "Super !", 'Toppen!'] ],
    q: { q: 'Var serveras frukosten när det är fint väder?', o: ['I trädgården', 'På rummet', 'I baren'] } },
  ho4: { ic: '🚿', lines: [
    ['l', "Madame, il n'y a pas d'eau chaude dans notre chambre.", 'Det finns inget varmvatten på vårt rum.'],
    ['c', "Oh, je suis désolée. J'appelle le plombier tout de suite.", 'Åh, förlåt. Jag ringer rörmokaren direkt.'],
    ['l', "Merci beaucoup.", 'Tack så mycket.'] ],
    q: { q: 'Vad är problemet?', o: ['Det finns inget varmvatten', 'Tv:n fungerar inte', 'Det är för kallt i rummet'] } },
  ho5: { ic: '🔑', lines: [
    ['c', "Vous partez déjà ? Vous avez aimé votre séjour ?", 'Åker du redan? Har du trivts?'],
    ['m', "Oui, beaucoup. Je reviendrai l'année prochaine.", 'Ja, mycket. Jag kommer tillbaka nästa år.'],
    ['c', "Avec plaisir ! N'oubliez pas de rendre la clé.", 'Vad roligt! Glöm inte att lämna tillbaka nyckeln.'] ],
    q: { q: 'Vad ska mannen komma ihåg?', o: ['Att lämna tillbaka nyckeln', 'Att betala', 'Att boka taxi'] } },

  // ——— La Poste (B1) ———
  po1: { ic: '📦', lines: [
    ['m', "Je voudrais envoyer ce paquet en Suède.", 'Jag skulle vilja skicka det här paketet till Sverige.'],
    ['c', "En prioritaire, il arrivera dans trois jours. En économique, dans une semaine.", 'Som prioriterat kommer det fram om tre dagar. Som ekonomibrev om en vecka.'],
    ['m', "Économique, ça ira. Ce n'est pas urgent.", 'Ekonomi räcker. Det är ingen brådska.'] ],
    q: { q: 'Quand le paquet arrivera-t-il ?', o: ['Dans une semaine', 'Dans trois jours', 'Demain'] } },
  po2: { ic: '💌', lines: [
    ['n', "Léa lit une carte postale.", 'Léa läser ett vykort.'],
    ['l', "Chère Léa, je suis à Lyon chez ma tante. Il pleut tous les jours, mais les musées sont super. Bisous, Inès.", 'Kära Léa, jag är hos min moster i Lyon. Det regnar varje dag, men museerna är jättebra. Kramar, Inès.'] ],
    q: { q: 'Quel temps fait-il à Lyon ?', o: ['Il pleut tous les jours', 'Il fait très chaud', 'Il neige'] } },
  po3: { ic: '✍️', lines: [
    ['c', "Autrefois, on écrivait des lettres à la main. Les gens attendaient le facteur avec impatience.", 'Förr skrev man brev för hand. Folk väntade otåligt på brevbäraren.'],
    ['u', "Et maintenant, on envoie des messages !", 'Och nu skickar man meddelanden!'],
    ['c', "Oui, mais une vraie lettre, c'est plus personnel.", 'Ja, men ett riktigt brev är mer personligt.'] ],
    q: { q: "Selon Monsieur Bernard, qu'est-ce qui est plus personnel ?", o: ['Une vraie lettre', 'Un message', 'Un coup de téléphone'] } },
  po4: { ic: '📮', lines: [
    ['c', "Tu as écrit à ta grand-mère ?", 'Har du skrivit till din mormor?'],
    ['l', "Oui, je lui ai envoyé une carte. Et j'ai téléphoné à mes cousins, je leur ai raconté nos vacances.", 'Ja, jag skickade ett kort till henne. Och jag ringde mina kusiner och berättade om vårt lov.'],
    ['c', "Très bien !", 'Bra!'] ],
    q: { q: "Qu'est-ce que Léa a fait pour sa grand-mère ?", o: ['Elle lui a envoyé une carte', 'Elle lui a téléphoné', 'Elle lui a rendu visite'] } },
  po5: { ic: '🏠', lines: [
    ['f', "J'attends un colis depuis deux semaines !", 'Jag har väntat på ett paket i två veckor!'],
    ['c', "Votre nom, s'il vous plaît ?", 'Ditt namn, tack?'],
    ['f', "Madame Petit, douze rue des Roses.", 'Madame Petit, Rosengatan tolv.'],
    ['c', "Ah… Il a été envoyé au vingt et un rue des Roses. Une erreur d'adresse !", 'Aha … Det skickades till Rosengatan tjugoett. Fel adress!'] ],
    q: { q: "Pourquoi le colis n'est-il pas arrivé ?", o: ['Il a été envoyé à la mauvaise adresse', "Il s'est perdu à l'étranger", 'Le facteur est malade'] } },

  // ——— La Plage (B1) ———
  pl1: { ic: '🧴', lines: [
    ['c', "N'oubliez pas la crème solaire, et remettez-en après chaque baignade !", 'Glöm inte solkrämen, och smörj in er igen efter varje dopp!'],
    ['u', "Même s'il y a des nuages ?", 'Även om det är molnigt?'],
    ['c', "Surtout s'il y a des nuages. On ne sent pas le soleil, mais il brûle quand même.", 'Särskilt om det är molnigt. Man känner inte solen, men den bränner ändå.'] ],
    q: { q: 'Quand faut-il remettre de la crème ?', o: ['Après chaque baignade', 'Une fois par jour', 'Seulement à midi'] } },
  pl2: { ic: '🪼', lines: [
    ['c', "Attention, il y a des méduses près des rochers. Restez de ce côté de la plage.", 'Se upp, det finns maneter vid klipporna. Stanna på den här sidan av stranden.'],
    ['l', "Et si on se fait piquer ?", 'Och om man blir bränd?'],
    ['c', "Venez me voir au poste de secours. J'ai ce qu'il faut.", 'Kom till mig på livräddarstationen. Jag har det som behövs.'] ],
    q: { q: 'Où sont les méduses ?', o: ['Près des rochers', 'Au milieu de la plage', 'Près du port'] } },
  pl3: { ic: '🏰', lines: [
    ['m', "Quand j'étais petit, je construisais des châteaux de sable énormes avec mon père.", 'När jag var liten byggde jag jättestora sandslott med min pappa.'],
    ['l', "Et vous gagniez des concours ?", 'Och vann ni tävlingar?'],
    ['m', "Une fois, oui ! On a gagné un vélo.", 'En gång, ja! Vi vann en cykel.'] ],
    q: { q: "Qu'est-ce qu'ils ont gagné ?", o: ['Un vélo', 'Un ballon', 'Un bateau'] } },
  pl4: { ic: '🚣', lines: [
    ['l', "Hier, on a loué un pédalo. On est allés jusqu'à la petite île.", 'I går hyrde vi en trampbåt. Vi åkte ända till den lilla ön.'],
    ['u', "Et au retour, il y avait beaucoup de vent. On a mis une heure !", 'Och på vägen tillbaka blåste det mycket. Det tog en timme!'] ],
    q: { q: 'Pourquoi le retour a-t-il été long ?', o: ['Il y avait beaucoup de vent', 'Le pédalo était cassé', 'Ils se sont perdus'] } },
  pl5: { ic: '👦', lines: [
    ['n', "Un petit garçon pleure sur la plage.", 'En liten pojke gråter på stranden.'],
    ['c', "Qu'est-ce qui se passe ? Tu as perdu tes parents ?", 'Vad har hänt? Har du tappat bort dina föräldrar?'],
    ['f', "Ah, te voilà ! Merci, mademoiselle, je le cherchais partout !", 'Där är du ju! Tack, jag har letat överallt efter honom!'] ],
    q: { q: 'Pourquoi le petit garçon pleure-t-il ?', o: ['Il a perdu ses parents', "Il s'est fait mal", 'Il a perdu son ballon'] } },

  // ——— L'Anniversaire (B1) ———
  an1: { ic: '📞', lines: [
    ['c', "Allô, Lucas ? C'est Mamie. Samedi, je fais un pique-nique pour mon anniversaire. Tu viendras ?", 'Hallå, Lucas? Det är mormor. På lördag har jag picknick för min födelsedag. Kommer du?'],
    ['u', "Bien sûr ! Je dois apporter quelque chose ?", 'Självklart! Ska jag ta med något?'],
    ['c', "Juste ta bonne humeur… et ta guitare !", 'Bara ditt goda humör … och din gitarr!'] ],
    q: { q: "Qu'est-ce que Lucas doit apporter ?", o: ['Sa guitare', 'Un gâteau', 'Des boissons'] } },
  an2: { ic: '🎈', lines: [
    ['l', "Il nous faut des ballons, des bougies et des serviettes.", 'Vi behöver ballonger, ljus och servetter.'],
    ['u', "J'ai déjà acheté les bougies et les serviettes.", 'Jag har redan köpt ljusen och servetterna.'],
    ['l', "Parfait. Alors il ne manque plus que les ballons.", 'Perfekt. Då fattas bara ballongerna.'] ],
    q: { q: "Qu'est-ce qui manque encore ?", o: ['Les ballons', 'Les bougies', 'Les serviettes'] } },
  an3: { ic: '💇', lines: [
    ['c', "Demain, je me lèverai tôt, j'irai chez le coiffeur et je mettrai ma plus belle robe.", 'I morgon går jag upp tidigt, går till frisören och tar på mig min finaste klänning.'],
    ['l', "Et le soir ?", 'Och på kvällen?'],
    ['c', "Le soir, je danserai !", 'På kvällen ska jag dansa!'] ],
    q: { q: 'Où ira Mamie Odette demain ?', o: ['Chez le coiffeur', 'Au marché', 'Chez le médecin'] } },
  an4: { ic: '📔', lines: [
    ['u', "Mamie, ouvre mon cadeau !", 'Mormor, öppna min present!'],
    ['c', "Oh, un album photo ! Avec toutes nos vacances ensemble… C'est toi qui l'as fait ?", 'Åh, ett fotoalbum! Med alla våra lov tillsammans … Har du gjort det?'],
    ['u', "Oui, avec Léa.", 'Ja, tillsammans med Léa.'] ],
    q: { q: "Qui a fait l'album ?", o: ['Lucas et Léa', 'Lucas tout seul', 'Les parents de Lucas'] } },
  an5: { ic: '🕯️', lines: [
    ['n', "Tout le monde chante.", 'Alla sjunger.'],
    ['c', "Merci, mes chéris ! Toutes ces bougies… Je vais avoir besoin d'aide pour les souffler !", 'Tack, mina älsklingar! Alla dessa ljus … Jag kommer att behöva hjälp att blåsa ut dem!'],
    ['l', "Un, deux, trois… on souffle !", 'Ett, två, tre … blås!'] ],
    q: { q: "Pourquoi Mamie Odette a-t-elle besoin d'aide ?", o: ['Il y a trop de bougies à souffler', 'Elle ne voit pas bien', 'Le gâteau est trop lourd'] } },

  // ——— La Mairie (B2) ———
  ma1: { ic: '📋', lines: [
    ['c', "L'ordre du jour : d'abord le marché du dimanche, ensuite les travaux de la rue principale.", 'Dagordningen: först söndagsmarknaden, sedan arbetena på huvudgatan.'],
    ['f', "Excusez-moi, on parlera aussi du bruit la nuit sur la place ?", 'Ursäkta, ska vi också prata om oljudet på torget på nätterna?'],
    ['c', "Oui, à la fin de la réunion, si nous avons le temps.", 'Ja, i slutet av mötet, om vi hinner.'] ],
    q: { q: 'Quand parlera-t-on du bruit ?', o: ["À la fin de la réunion, s'il reste du temps", 'Au début de la réunion', 'À la prochaine réunion'] } },
  ma2: { ic: '🧾', lines: [
    ['m', "Pour inscrire mon fils à la cantine, qu'est-ce qu'il faut ?", 'Vad behövs för att anmäla min son till skolmaten?'],
    ['c', "Il faut que vous remplissiez ce formulaire et que vous fournissiez un justificatif de domicile.", 'Du behöver fylla i den här blanketten och lämna ett bevis på var du bor.'],
    ['m', "Une facture d'électricité, ça suffit ?", 'Räcker det med en elräkning?'],
    ['c', "Oui, parfaitement.", 'Ja, alldeles utmärkt.'] ],
    q: { q: "Quel document l'homme peut-il apporter ?", o: ["Une facture d'électricité", 'Un passeport', "Une photo d'identité"] } },
  ma3: { ic: '🚶', lines: [
    ['l', "Pour moi, fermer le centre-ville aux voitures, c'est une excellente idée.", 'Jag tycker att det är en utmärkt idé att stänga centrum för bilar.'],
    ['m', "Peut-être, mais les commerçants risquent de perdre des clients.", 'Kanske, men handlarna riskerar att förlora kunder.'],
    ['l', "Au contraire, les piétons achètent plus quand ils se promènent tranquillement.", 'Tvärtom, fotgängare handlar mer när de kan promenera i lugn och ro.'] ],
    q: { q: "De quoi l'homme a-t-il peur ?", o: ['Que les commerçants perdent des clients', "Qu'il y ait plus de bruit", 'Que les bus soient en retard'] } },
  ma4: { ic: '🥕', lines: [
    ['c', "Je voudrais que chaque quartier ait son propre jardin partagé.", 'Jag skulle vilja att varje kvarter hade en egen gemensam trädgård.'],
    ['u', "Et que les écoles puissent y participer ?", 'Och att skolorna fick vara med?'],
    ['c', "Exactement. Les enfants apprendraient à cultiver des légumes.", 'Precis. Barnen skulle lära sig odla grönsaker.'] ],
    q: { q: "Qu'est-ce que les enfants apprendraient ?", o: ['À cultiver des légumes', 'À cuisiner', 'À construire des cabanes'] } },
  ma5: { ic: '🏊', lines: [
    ['n', "Résultat du vote.", 'Resultatet av omröstningen.'],
    ['c', "Le projet de piscine municipale est adopté, avec soixante-deux pour cent des voix. Les travaux commenceront au printemps.", 'Förslaget om ett kommunalt badhus har antagits med sextiotvå procent av rösterna. Arbetet börjar i vår.'] ],
    q: { q: 'Quand les travaux commenceront-ils ?', o: ['Au printemps', 'En été', "L'année prochaine"] } },

  // ——— Le Festival (B2) ———
  fe1: { ic: '🎷', lines: [
    ['c', "Ce soir, le concert de jazz est déplacé : il aura lieu sur la plage au lieu de la place.", 'I kväll flyttas jazzkonserten: den blir på stranden i stället för på torget.'],
    ['l', "Et il faut des billets ?", 'Behöver man biljetter?'],
    ['c', "Non, c'est gratuit, mais venez tôt pour avoir une bonne place.", 'Nej, det är gratis, men kom tidigt för att få en bra plats.'] ],
    q: { q: 'Où aura lieu le concert ?', o: ['Sur la plage', 'Sur la place', 'Au café'] } },
  fe2: { ic: '🏺', lines: [
    ['u', "Tu es allée au stand de poterie ?", 'Har du varit vid keramikståndet?'],
    ['l', "Oui, j'y suis allée ce matin. J'y ai acheté deux bols.", 'Ja, jag var där i morse. Jag köpte två skålar där.'],
    ['u', "Il en reste encore ?", 'Finns det några kvar?'],
    ['l', "Je crois que oui, mais dépêche-toi !", 'Jag tror det, men skynda dig!'] ],
    q: { q: "Qu'est-ce que Léa a acheté ?", o: ['Deux bols', 'Une assiette', 'Un vase'] } },
  fe3: { ic: '🎸', lines: [
    ['c', "Le groupe que vous allez entendre vient de Marseille. C'est un groupe dont tout le monde parle cet été.", 'Bandet som ni ska få höra kommer från Marseille. Det är ett band som alla pratar om i sommar.'],
    ['m', "Ce sont eux qui ont gagné le concours l'an dernier ?", 'Är det de som vann tävlingen i fjol?'],
    ['c', "Exactement !", 'Precis!'] ],
    q: { q: "D'où vient le groupe ?", o: ['De Marseille', 'De Paris', 'De Lyon'] } },
  fe4: { ic: '🚗', lines: [
    ['f', "Si j'avais su qu'il y aurait autant de monde, je serais venue à vélo.", 'Om jag hade vetat att det skulle vara så mycket folk hade jag cyklat hit.'],
    ['m', "Moi aussi. J'ai mis quarante minutes à trouver une place pour me garer !", 'Jag också. Det tog fyrtio minuter att hitta en parkeringsplats!'] ],
    q: { q: "Combien de temps l'homme a-t-il cherché une place ?", o: ['Quarante minutes', 'Quatorze minutes', 'Une heure'] } },
  fe5: { ic: '🎆', lines: [
    ['n', "Minuit sur la place.", 'Midnatt på torget.'],
    ['c', "Et maintenant, levez les yeux… le feu d'artifice !", 'Och nu, titta upp … fyrverkeriet!'],
    ['u', "Waouh ! Les couleurs se reflètent dans la mer !", 'Wow! Färgerna speglar sig i havet!'] ],
    q: { q: 'Que se passe-t-il à minuit ?', o: ["Un feu d'artifice", 'Un concert', 'Un bal'] } },

  // ——— Le Vignoble (B2) ———
  vi1: { ic: '✂️', lines: [
    ['c', "Coupez la grappe ici, juste au-dessus. Et ne mettez pas les raisins abîmés dans le seau.", 'Klipp av klasen här, precis ovanför. Och lägg inte de skadade druvorna i hinken.'],
    ['l', "Où est-ce que je les mets, alors ?", 'Var lägger jag dem då?'],
    ['c', "Par terre. Ils nourriront la terre.", 'På marken. De blir näring åt jorden.'] ],
    q: { q: 'Que fait-on des raisins abîmés ?', o: ['On les laisse par terre', 'On les mange', 'On les met dans le seau'] } },
  vi2: { ic: '❄️', lines: [
    ['f', "Vous croyez qu'il gèlera cette nuit ?", 'Tror du att det blir frost i natt?'],
    ['c', "Peut-être. Si la température descend sous zéro, on allumera des bougies entre les rangs pour protéger les vignes.", 'Kanske. Om temperaturen går under noll tänder vi ljus mellan raderna för att skydda vinrankorna.'] ],
    q: { q: "Que fera Monsieur Vidal s'il gèle ?", o: ['Il allumera des bougies entre les rangs', 'Il couvrira les vignes', 'Il cueillera tout le raisin'] } },
  vi3: { ic: '🍷', lines: [
    ['m', "Ce vin a un goût de fruits rouges, non ?", 'Det här vinet smakar röda bär, eller hur?'],
    ['c', "Oui, de cerise surtout. Il se marie très bien avec le fromage.", 'Ja, mest körsbär. Det passar mycket bra till ost.'],
    ['m', "Je vais en prendre six bouteilles.", 'Jag tar sex flaskor.'] ],
    q: { q: 'Avec quoi ce vin se marie-t-il bien ?', o: ['Le fromage', 'Le poisson', 'Le dessert'] } },
  vi4: { ic: '🎶', lines: [
    ['c', "En cueillant, on chante souvent. Ça rend le travail moins long.", 'Medan man plockar sjunger man ofta. Då känns arbetet kortare.'],
    ['u', "Et en chantant, on mange aussi quelques raisins !", 'Och medan man sjunger äter man några druvor också!'],
    ['c', "Quelques-uns, d'accord, mais pas tout le panier !", 'Några stycken, okej, men inte hela korgen!'] ],
    q: { q: 'Pourquoi chante-t-on en cueillant ?', o: ['Ça rend le travail moins long', 'Pour faire peur aux oiseaux', "Parce que c'est obligatoire"] } },
  vi5: { ic: '🥂', lines: [
    ['n', "Le soir de la fête.", 'På festkvällen.'],
    ['c', "Je lève mon verre à tous ceux qui ont travaillé dans les vignes. Sans vous, il n'y aurait pas de vin cette année !", 'Jag höjer mitt glas för alla som har arbetat i vingården. Utan er skulle det inte bli något vin i år!'],
    ['l', "À la santé de Monsieur Vidal !", 'Skål för Monsieur Vidal!'] ],
    q: { q: 'À qui Monsieur Vidal lève-t-il son verre ?', o: ['À ceux qui ont travaillé dans les vignes', 'À sa famille', 'Aux clients'] } },

  // ——— Le Tribunal (C1) ———
  tr1: { ic: '🏛️', lines: [
    ['f', "Excusez-moi, la salle d'audience numéro deux, s'il vous plaît ?", 'Ursäkta, var ligger rättssal två?'],
    ['c', "Au premier étage, au fond du couloir. Mais je vous préviens, l'audience a été renvoyée à cet après-midi.", 'En trappa upp, längst bort i korridoren. Men jag ska säga att förhandlingen har flyttats till i eftermiddag.'] ],
    q: { q: "Qu'apprend la dame ?", o: ["L'audience a été renvoyée à l'après-midi", 'La salle est fermée', "L'audience est annulée"] } },
  tr2: { ic: '🚋', lines: [
    ['c', "Pouvez-vous nous dire à quelle heure vous avez quitté le café ce soir-là ?", 'Kan du berätta när du lämnade kaféet den kvällen?'],
    ['m', "Vers vingt-deux heures. Je m'en souviens parce que le dernier tram venait de passer.", 'Runt tio på kvällen. Jag minns det eftersom den sista spårvagnen just hade gått.'],
    ['c', "Vous en êtes certain ?", 'Är du säker på det?'],
    ['m', "Absolument.", 'Helt säker.'] ],
    q: { q: "Comment le témoin se souvient-il de l'heure ?", o: ['Le dernier tram venait de passer', 'Il avait regardé sa montre', 'Le café fermait'] } },
  tr3: { ic: '⚖️', lines: [
    ['u', "Bien qu'il ait avoué, l'accusé peut encore être acquitté ?", 'Kan den tilltalade fortfarande frikännas, fast han har erkänt?'],
    ['c', "En théorie, oui. Un aveu ne suffit pas à lui seul ; il faut qu'il soit corroboré par d'autres éléments.", 'I teorin, ja. Ett erkännande räcker inte ensamt; det måste stödjas av annan bevisning.'] ],
    q: { q: "Que faut-il, en plus d'un aveu ?", o: ["D'autres éléments qui le corroborent", 'Un deuxième aveu', "La présence d'un avocat"] } },
  tr4: { ic: '🔨', lines: [
    ['n', "Le tribunal rend sa décision.", 'Domstolen meddelar sitt avgörande.'],
    ['c', "Le prévenu est condamné à une amende de cinq cents euros, dont la moitié avec sursis.", 'Den tilltalade döms till böter på femhundra euro, varav hälften villkorligt.'],
    ['m', "Je vais faire appel !", 'Jag kommer att överklaga!'] ],
    q: { q: 'Que veut faire le condamné ?', o: ['Faire appel', "Payer l'amende tout de suite", 'Présenter des excuses'] } },
  tr5: { ic: '🐟', lines: [
    ['c', "Le chat a donc traversé le jardin de la voisine à plusieurs reprises ?", 'Katten har alltså gått över grannens trädgård flera gånger?'],
    ['f', "Oui, et il a mangé les poissons de mon bassin !", 'Ja, och den har ätit upp fiskarna i min damm!'],
    ['c', "Avez-vous des preuves ?", 'Har du någon bevisning?'],
    ['f', "J'ai filmé la scène avec mon téléphone.", 'Jag filmade det med min mobil.'] ],
    q: { q: 'Quelle preuve la voisine présente-t-elle ?', o: ['Une vidéo', 'Une photo', 'Un témoin'] } },

  // ——— Le Marché de Noël (C1) ———
  no1: { ic: '🍷', lines: [
    ['c', "Ce vin chaud, c'est la recette de ma grand-mère : cannelle, orange et un soupçon de clou de girofle.", 'Glöggen är min mormors recept: kanel, apelsin och en aning nejlika.'],
    ['f', "Il sent merveilleusement bon. Vous la vendriez, cette recette ?", 'Den doftar underbart. Skulle du sälja receptet?'],
    ['c', "Jamais de la vie ! C'est un secret de famille.", 'Aldrig i livet! Det är en familjehemlighet.'] ],
    q: { q: 'Pourquoi Nicolas ne vend-il pas la recette ?', o: ["C'est un secret de famille", 'Elle est trop chère', "Il l'a oubliée"] } },
  no2: { ic: '🧶', lines: [
    ['l', "Je n'ai aucune idée de ce que je vais offrir à mon père.", 'Jag har ingen aning om vad jag ska ge pappa.'],
    ['u', "Pourquoi pas une écharpe tricotée main ? Il a toujours froid.", 'Varför inte en handstickad halsduk? Han fryser alltid.'],
    ['l', "Pas bête. À condition de la trouver dans sa couleur préférée : le vert.", 'Inte dumt. Om jag hittar en i hans favoritfärg, alltså grönt.'] ],
    q: { q: 'Quelle condition Léa pose-t-elle ?', o: ["Que l'écharpe soit verte", "Qu'elle ne coûte pas cher", "Qu'elle soit très longue"] } },
  no3: { ic: '🪵', lines: [
    ['c', "Chez nous, on met une bûche dans la cheminée le soir de Noël : le plus âgé et le plus jeune de la famille l'allument ensemble.", 'Hos oss lägger vi en stock i den öppna spisen på julafton: den äldsta och den yngsta i familjen tänder den tillsammans.'],
    ['l', "Quelle jolie coutume !", 'Vilken fin sed!'] ],
    q: { q: 'Qui allume la bûche ?', o: ['Le plus âgé et le plus jeune de la famille', 'Le père et la mère', 'Les invités'] } },
  no4: { ic: '✨', lines: [
    ['m', "Je vous souhaite d'excellentes fêtes, et que la nouvelle année vous apporte la santé !", 'Jag önskar dig en riktigt god jul, och att det nya året ger dig god hälsa!'],
    ['c', "Merci, à vous aussi ! Et surtout, ne perdez pas l'habitude de venir nous voir.", 'Tack, detsamma! Och framför allt, fortsätt att komma och hälsa på oss.'] ],
    q: { q: 'Que demande Nicolas au client ?', o: ['De continuer à venir le voir', 'De lui écrire', "De revenir l'été"] } },
  no5: { ic: '❄️', lines: [
    ['n', "La neige tombe sur Port-Saint-Clément.", 'Snön faller över Port-Saint-Clément.'],
    ['u', "Léa, réveille-toi ! Il a neigé toute la nuit !", 'Léa, vakna! Det har snöat hela natten!'],
    ['l', "De la neige au bord de la mer ? C'est incroyable !", 'Snö vid havet? Det är otroligt!'] ],
    q: { q: 'Pourquoi Léa est-elle étonnée ?', o: ['Il neige rarement au bord de la mer', 'Elle a reçu un cadeau', "Lucas s'est levé tôt"] } },

  // ——— La Maison (B1) ———
  ms1: { ic: '🏡', lines: [
    ['c', "Au rez-de-chaussée, il y a la cuisine et le salon. Le bureau est au sous-sol.", 'På bottenvåningen finns köket och vardagsrummet. Arbetsrummet ligger i källaren.'],
    ['l', "Au sous-sol ? Il n'y a pas de fenêtre, alors ?", 'I källaren? Då finns det inget fönster?'],
    ['c', "Si, une petite, mais il y fait un peu sombre.", 'Jo, ett litet, men det är lite mörkt där.'] ],
    q: { q: 'Où se trouve le bureau ?', o: ['Au sous-sol', 'Au premier étage', 'Au rez-de-chaussée'] } },
  ms2: { ic: '🛋️', lines: [
    ['u', "On met le canapé devant la fenêtre ?", 'Ska vi ställa soffan framför fönstret?'],
    ['c', "Non, plutôt contre le mur, en face de la télévision.", 'Nej, hellre mot väggen, mittemot tv:n.'],
    ['u', "Et la lampe ?", 'Och lampan?'],
    ['c', "À côté du canapé.", 'Bredvid soffan.'] ],
    q: { q: 'Où va le canapé ?', o: ['Contre le mur, en face de la télé', 'Devant la fenêtre', 'À côté de la porte'] } },
  ms3: { ic: '🗑️', lines: [
    ['c', "Lucas, c'est ton tour de sortir les poubelles. Et n'oublie pas de trier le verre !", 'Lucas, det är din tur att gå ut med soporna. Och glöm inte att sortera glaset!'],
    ['u', "Encore moi ? J'ai déjà fait la vaisselle hier !", 'Jag igen? Jag diskade ju i går!'],
    ['c', "Et Léa a passé l'aspirateur. Chacun son tour !", 'Och Léa dammsög. Var och en i tur och ordning!'] ],
    q: { q: "Qu'est-ce que Lucas doit faire ?", o: ['Sortir les poubelles', 'Faire la vaisselle', "Passer l'aspirateur"] } },
  ms4: { ic: '🛁', lines: [
    ['m', "Pour refaire la salle de bains, il me faudra deux semaines.", 'Det tar mig två veckor att göra om badrummet.'],
    ['c', "Deux semaines ! On ne pourra pas se doucher pendant tout ce temps ?", 'Två veckor! Kan vi inte duscha på hela den tiden?'],
    ['m', "Si, j'installerai une douche provisoire dans le garage.", 'Jo, jag sätter upp en tillfällig dusch i garaget.'] ],
    q: { q: 'Où se doucheront-ils pendant les travaux ?', o: ['Dans le garage', 'Chez les voisins', 'À la piscine'] } },
  ms5: { ic: '🖼️', lines: [
    ['l', "Ça y est, les travaux sont finis ! Il ne reste plus qu'à accrocher les tableaux.", 'Nu är renoveringen klar! Det enda som återstår är att hänga upp tavlorna.'],
    ['c', "Et à inviter les voisins pour fêter ça !", 'Och att bjuda grannarna för att fira!'] ],
    q: { q: 'Que reste-t-il à faire ?', o: ['Accrocher les tableaux', 'Peindre la cuisine', 'Changer les meubles'] } },

  // ——— Le Grand Magasin (B1) ———
  mg1: { ic: '👟', lines: [
    ['n', "Une annonce dans le magasin.", 'Ett utrop i varuhuset.'],
    ['c', "Chers clients, aujourd'hui seulement, moins trente pour cent sur toutes les chaussures, au deuxième étage !", 'Kära kunder, endast i dag: trettio procent på alla skor, två trappor upp!'] ],
    q: { q: 'Où se trouvent les chaussures ?', o: ['Au deuxième étage', 'Au premier étage', 'Au rez-de-chaussée'] } },
  mg2: { ic: '👗', lines: [
    ['f', "Vous avez cette robe en trente-huit ?", 'Har ni den här klänningen i storlek trettioåtta?'],
    ['c', "En noir, non, mais je l'ai en bleu marine.", 'Inte i svart, men jag har den i marinblått.'],
    ['f', "Le bleu marine, ça me va aussi. Je peux l'essayer ?", 'Marinblått går också bra. Får jag prova den?'] ],
    q: { q: 'En quelle couleur la robe existe-t-elle en 38 ?', o: ['En bleu marine', 'En noir', 'En rouge'] } },
  mg3: { ic: '👔', lines: [
    ['u', "Cette chemise est trop serrée aux épaules.", 'Den här skjortan är för trång över axlarna.'],
    ['c', "Essaie la taille au-dessus. Les manches seront peut-être un peu longues, mais tu pourras les retrousser.", 'Prova storleken större. Ärmarna blir kanske lite långa, men du kan kavla upp dem.'] ],
    q: { q: 'Quel est le problème de la chemise ?', o: ['Elle est trop serrée aux épaules', 'Les manches sont trop courtes', 'Elle est trop chère'] } },
  mg4: { ic: '🍞', lines: [
    ['m', "Je voudrais rendre ce grille-pain, il ne marche pas.", 'Jag skulle vilja lämna tillbaka den här brödrosten, den fungerar inte.'],
    ['c', "Vous avez le ticket de caisse ?", 'Har du kvittot?'],
    ['m', "Non, je l'ai perdu.", 'Nej, jag har tappat bort det.'],
    ['c', "Alors je ne peux pas vous rembourser, mais je peux vous l'échanger.", 'Då kan jag inte ge dig pengarna tillbaka, men jag kan byta den.'] ],
    q: { q: 'Que propose la vendeuse ?', o: ['Un échange', 'Un remboursement', 'Une réduction'] } },
  mg5: { ic: '🎧', lines: [
    ['l', "Ce casque est sans fil ?", 'Är de här hörlurarna trådlösa?'],
    ['c', "Oui, et la batterie dure vingt heures. En plus, il réduit le bruit.", 'Ja, och batteriet räcker i tjugo timmar. Dessutom har de brusreducering.'],
    ['l', "Parfait pour le train !", 'Perfekt för tåget!'] ],
    q: { q: 'Combien de temps dure la batterie ?', o: ['Vingt heures', 'Deux heures', 'Douze heures'] } },
};
