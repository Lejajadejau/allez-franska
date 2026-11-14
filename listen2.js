// Lyssna och svara, kvarter 8–14.
export const SCENES2 = {
  // ——— La Gare (A2) ———
  ga1: { ic: '🎟️', lines: [
    ['f', "Bonjour, un aller-retour pour Bordeaux, s'il vous plaît.", 'Hej, en tur och retur till Bordeaux, tack.'],
    ['c', "Pour quand ?", 'Till när?'],
    ['f', "Aller demain matin, retour dimanche soir.", 'Dit i morgon bitti, tillbaka på söndag kväll.'],
    ['c', "Ça fait quarante-cinq euros.", 'Det blir fyrtiofem euro.'] ],
    q: { q: 'När ska kvinnan åka tillbaka?', o: ['På söndag kväll', 'I morgon bitti', 'På lördag'] } },
  ga2: { ic: '📢', lines: [
    ['c', "Le train pour Toulouse de dix heures quinze partira avec vingt minutes de retard. Voie numéro quatre.", 'Tåget till Toulouse klockan 10.15 avgår tjugo minuter försenat. Spår fyra.'] ],
    q: { q: 'När går tåget till Toulouse nu?', o: ['10.35', '10.15', '10.20'] } },
  ga3: { ic: '🚆', lines: [
    ['m', "Excusez-moi, je crois que c'est ma place. J'ai le siège vingt-trois.", 'Ursäkta, jag tror att det är min plats. Jag har plats tjugotre.'],
    ['l', "Oh, pardon ! Moi, j'ai le vingt-cinq. C'est à côté de la fenêtre.", 'Åh, förlåt! Jag har tjugofem. Den är vid fönstret.'] ],
    q: { q: 'Vilken plats har Léa?', o: ['25, vid fönstret', '23, vid gången', '22'] } },
  ga4: { ic: '🌍', lines: [
    ['u', "Tu es déjà allée à l'étranger ?", 'Har du varit utomlands?'],
    ['l', "Oui, en Espagne et en Italie. L'année prochaine, je vais en Suède !", 'Ja, i Spanien och Italien. Nästa år åker jag till Sverige!'],
    ['u', "En Suède ? Il fait froid là-bas, non ?", 'Till Sverige? Det är kallt där, va?'] ],
    q: { q: 'Vart ska Léa nästa år?', o: ['Sverige', 'Spanien', 'Italien'] } },
  ga5: { ic: '🧳', lines: [
    ['c', "Vous avez votre billet et votre carte d'identité ?", 'Har ni biljetten och id-kortet?'],
    ['m', "Le billet, oui… Mais où est ma carte ? Ah, la voilà, dans ma poche !", 'Biljetten, ja… Men var är mitt kort? Där är det, i fickan!'],
    ['c', "Parfait. Bon voyage, monsieur !", 'Perfekt. Trevlig resa!'] ],
    q: { q: 'Var hittar mannen sitt id-kort?', o: ['I fickan', 'I väskan', 'Hemma'] } },

  // ——— Chez le Médecin (A2) ———
  me1: { ic: '🦵', lines: [
    ['c', "Où avez-vous mal ?", 'Var har ni ont?'],
    ['m', "J'ai mal au genou et un peu au dos.", 'Jag har ont i knät och lite i ryggen.'],
    ['c', "Depuis quand ?", 'Sedan när?'],
    ['m', "Depuis trois jours. J'ai trop couru.", 'Sedan tre dagar. Jag har sprungit för mycket.'] ],
    q: { q: 'Var har mannen mest ont?', o: ['I knät', 'I huvudet', 'I magen'] } },
  me2: { ic: '🤒', lines: [
    ['l', "Maman, je ne me sens pas bien. J'ai chaud et j'ai mal à la gorge.", 'Mamma, jag mår inte bra. Jag är varm och har ont i halsen.'],
    ['f', "Tu as de la fièvre : trente-huit cinq. Tu restes à la maison aujourd'hui.", 'Du har feber: trettioåtta och fem. Du stannar hemma i dag.'] ],
    q: { q: 'Hur hög feber har Léa?', o: ['38,5', '37,5', '39'] } },
  me3: { ic: '💊', lines: [
    ['c', "Prenez un comprimé trois fois par jour, après les repas.", 'Ta en tablett tre gånger om dagen, efter maten.'],
    ['f', "Pendant combien de temps ?", 'Hur länge?'],
    ['c', "Une semaine. Et buvez beaucoup d'eau.", 'En vecka. Och drick mycket vatten.'] ],
    q: { q: 'Hur ofta ska kvinnan ta tabletten?', o: ['Tre gånger om dagen', 'En gång om dagen', 'Varannan dag'] } },
  me4: { ic: '🩺', lines: [
    ['c', "Vous devez dormir plus et manger moins de sucre.", 'Ni måste sova mer och äta mindre socker.'],
    ['m', "Et le sport ?", 'Och idrott?'],
    ['c', "Marchez trente minutes par jour, c'est suffisant.", 'Gå trettio minuter om dagen, det räcker.'] ],
    q: { q: 'Vad råder doktorn mannen att göra?', o: ['Gå trettio minuter om dagen', 'Springa varje dag', 'Sluta med idrott'] } },
  me5: { ic: '📞', lines: [
    ['f', "Cabinet du docteur Lambert, bonjour.", 'Doktor Lamberts mottagning, hej.'],
    ['u', "Bonjour, je voudrais un rendez-vous, s'il vous plaît.", 'Hej, jag skulle vilja boka en tid, tack.'],
    ['f', "Jeudi à quatorze heures, ça vous va ?", 'Torsdag klockan fjorton, passar det?'],
    ['u', "Parfait, merci.", 'Perfekt, tack.'] ],
    q: { q: 'När får Lucas tid hos doktorn?', o: ['Torsdag klockan 14', 'Tisdag klockan 14', 'Torsdag klockan 4'] } },

  // ——— L'Hôtel (A2) ———
  ho1: { ic: '🛎️', lines: [
    ['m', "Bonsoir, j'ai réservé une chambre au nom de Dupont.", 'God kväll, jag har bokat ett rum i namnet Dupont.'],
    ['c', "Oui, une chambre double pour deux nuits. C'est la chambre douze, au premier étage.", 'Ja, ett dubbelrum för två nätter. Det är rum tolv, på första våningen.'] ],
    q: { q: 'Hur många nätter stannar Dupont?', o: ['Två', 'En', 'Tolv'] } },
  ho2: { ic: '🛏️', lines: [
    ['l', "La chambre est jolie ! Il y a un grand lit et un balcon.", 'Rummet är fint! Det finns en stor säng och en balkong.'],
    ['u', "Et une vue sur la mer !", 'Och utsikt över havet!'],
    ['l', "Mais il n'y a pas de télévision.", 'Men det finns ingen tv.'] ],
    q: { q: 'Vad finns INTE i rummet?', o: ['En tv', 'En balkong', 'En stor säng'] } },
  ho3: { ic: '🥐', lines: [
    ['c', "Le petit-déjeuner est servi de sept heures à dix heures, dans la salle à côté du jardin.", 'Frukosten serveras från sju till tio, i salen bredvid trädgården.'],
    ['m', "Il y a du café et du jus d'orange ?", 'Finns det kaffe och apelsinjuice?'],
    ['c', "Bien sûr, et aussi des croissants tout frais.", 'Så klart, och även alldeles färska croissanter.'] ],
    q: { q: 'När slutar frukosten?', o: ['Klockan tio', 'Klockan sju', 'Klockan elva'] } },
  ho4: { ic: '🚿', lines: [
    ['f', "Excusez-moi, il n'y a pas d'eau chaude dans la douche.", 'Ursäkta, det finns inget varmvatten i duschen.'],
    ['c', "Oh, je suis désolée. Je vous donne une autre chambre, la quinze.", 'Åh, jag ber om ursäkt. Jag ger er ett annat rum, nummer femton.'] ],
    q: { q: 'Vad är problemet?', o: ['Inget varmvatten', 'Ingen handduk', 'Det är för kallt i rummet'] } },
  ho5: { ic: '🧾', lines: [
    ['m', "Je voudrais payer, s'il vous plaît. On part ce matin.", 'Jag skulle vilja betala, tack. Vi åker i dag på morgonen.'],
    ['c', "Deux nuits et deux petits-déjeuners : cent soixante euros.", 'Två nätter och två frukostar: hundrasextio euro.'],
    ['m', "Je peux payer par carte ?", 'Kan jag betala med kort?'],
    ['c', "Bien sûr.", 'Självklart.'] ],
    q: { q: 'Hur mycket kostar det?', o: ['160 €', '116 €', '60 €'] } },

  // ——— La Poste (B1) ———
  po1: { ic: '📮', lines: [
    ['f', "Je voudrais envoyer ce colis en Suède. Il arrivera quand ?", 'Jag skulle vilja skicka det här paketet till Sverige. När kommer det fram?'],
    ['c', "En tarif normal, dans cinq jours. En express, dans deux jours, mais c'est plus cher.", 'Med vanlig post om fem dagar. Med express om två dagar, men det är dyrare.'],
    ['f', "Le tarif normal, ça ira.", 'Vanlig post räcker.'] ],
    q: { q: 'Quand le colis arrivera-t-il ?', o: ['Dans cinq jours', 'Dans deux jours', 'Demain'] } },
  po2: { ic: '✉️', lines: [
    ['n', "Une lettre de Léa à sa correspondante.", 'Ett brev från Léa till hennes brevvän.'],
    ['l', "Chère Elsa, merci pour ta lettre. Ici, tout va bien. Cet été, j'aimerais te rendre visite à Stockholm. Grosses bises, Léa.", 'Kära Elsa, tack för ditt brev. Här är allt bra. I sommar skulle jag vilja hälsa på dig i Stockholm. Stora kramar, Léa.'] ],
    q: { q: "Qu'est-ce que Léa aimerait faire cet été ?", o: ['Rendre visite à Elsa', 'Aller en Espagne', 'Travailler à la poste'] } },
  po3: { ic: '🕰️', lines: [
    ['c', "Autrefois, les gens écrivaient beaucoup de lettres. Le facteur passait deux fois par jour !", 'Förr skrev folk många brev. Brevbäraren kom två gånger om dagen!'],
    ['u', "Et maintenant ?", 'Och nu?'],
    ['c', "Maintenant, on envoie surtout des colis. Tout le monde achète sur Internet.", 'Nu skickar man mest paket. Alla handlar på nätet.'] ],
    q: { q: 'Que faisait le facteur autrefois ?', o: ['Il passait deux fois par jour', 'Il venait le dimanche', 'Il vendait des timbres'] } },
  po4: { ic: '🎁', lines: [
    ['l', "Tu as parlé à Mamie ?", 'Har du pratat med mormor?'],
    ['u', "Oui, je lui ai téléphoné hier. Et j'ai envoyé une carte aux cousins.", 'Ja, jag ringde henne i går. Och jag skickade ett kort till kusinerna.'],
    ['l', "Super, ils vont être contents. Je leur écrirai aussi.", 'Toppen, de kommer att bli glada. Jag ska också skriva till dem.'] ],
    q: { q: "Qu'est-ce que Lucas a fait pour les cousins ?", o: ['Il leur a envoyé une carte', 'Il leur a téléphoné', 'Il leur a rendu visite'] } },
  po5: { ic: '📦', lines: [
    ['m', "Mon colis devait arriver lundi. On est jeudi et toujours rien !", 'Mitt paket skulle komma i måndags. Det är torsdag och fortfarande ingenting!'],
    ['c', "Je regarde… Ah, il est resté à Bordeaux. Vous le recevrez demain matin.", 'Jag tittar… Aha, det har blivit kvar i Bordeaux. Ni får det i morgon bitti.'] ],
    q: { q: 'Où est resté le colis ?', o: ['À Bordeaux', 'À Paris', 'À la poste du port'] } },

  // ——— La Plage (B1) ———
  pl1: { ic: '☀️', lines: [
    ['c', "N'oubliez pas la crème solaire ! Le soleil tape fort à midi.", 'Glöm inte solkrämen! Solen gassar vid lunch.'],
    ['l', "On a aussi un parasol et des chapeaux.", 'Vi har också ett parasoll och hattar.'],
    ['c', "Parfait. Et buvez de l'eau toutes les heures.", 'Perfekt. Och drick vatten varje timme.'] ],
    q: { q: 'Quand le soleil est-il le plus fort ?', o: ['À midi', 'Le matin', 'Le soir'] } },
  pl2: { ic: '🚩', lines: [
    ['c', "Attention ! Le drapeau est rouge. La baignade est interdite cet après-midi.", 'Se upp! Flaggan är röd. Det är badförbud i eftermiddag.'],
    ['u', "Pourquoi ?", 'Varför?'],
    ['c', "Les vagues sont trop fortes. Vous pouvez jouer sur le sable.", 'Vågorna är för kraftiga. Ni kan leka i sanden.'] ],
    q: { q: 'Pourquoi est-il interdit de se baigner ?', o: ['Les vagues sont trop fortes', "L'eau est trop froide", 'Il y a des méduses'] } },
  pl3: { ic: '🏖️', lines: [
    ['f', "Quand j'étais petite, je venais ici chaque été avec mes grands-parents.", 'När jag var liten kom jag hit varje sommar med mina mor- och farföräldrar.'],
    ['l', "Qu'est-ce que vous faisiez ?", 'Vad gjorde ni?'],
    ['f', "On construisait des châteaux de sable et on mangeait des glaces à la vanille.", 'Vi byggde sandslott och åt vaniljglass.'] ],
    q: { q: 'Avec qui venait-elle à la plage ?', o: ['Avec ses grands-parents', 'Avec ses amies', 'Avec son frère'] } },
  pl4: { ic: '🐚', lines: [
    ['u', "Hier, on a trouvé un énorme coquillage. Ensuite, on a nagé jusqu'au rocher.", 'I går hittade vi ett jättestort snäckskal. Sedan simmade vi bort till klippan.'],
    ['l', "Et après, il a commencé à pleuvoir, alors on est rentrés.", 'Och efter det började det regna, så vi gick hem.'] ],
    q: { q: "Pourquoi sont-ils rentrés ?", o: ['Il a commencé à pleuvoir', 'Ils étaient fatigués', "C'était l'heure du dîner"] } },
  pl5: { ic: '🛟', lines: [
    ['c', "Un enfant est en difficulté près du rocher ! J'y vais !", 'Ett barn har problem nära klippan! Jag går dit!'],
    ['n', "Coralie nage très vite et ramène le petit garçon sur la plage.", 'Coralie simmar mycket fort och tar tillbaka den lilla pojken till stranden.'],
    ['f', "Merci, merci mille fois, mademoiselle !", 'Tack, tusen tack, fröken!'] ],
    q: { q: 'Que fait Coralie ?', o: ['Elle sauve un petit garçon', 'Elle cherche un coquillage', 'Elle ferme la plage'] } },

  // ——— L'Anniversaire (B1) ———
  an1: { ic: '💌', lines: [
    ['c', "Allô, Léa ? Samedi, je fête mes soixante-dix-neuf ans. Tu viens avec Lucas ?", 'Hallå, Léa? På lördag firar jag min sjuttionionde födelsedag. Kommer du med Lucas?'],
    ['l', "Avec plaisir, Mamie ! À quelle heure ?", 'Gärna, mormor! Vilken tid?'],
    ['c', "À quatre heures, pour le goûter.", 'Klockan fyra, till eftermiddagsfikat.'] ],
    q: { q: 'Quel âge Mamie Odette va-t-elle avoir ?', o: ['79 ans', '70 ans', '89 ans'] } },
  an2: { ic: '🎈', lines: [
    ['l', "Il faut encore acheter des ballons et des bougies.", 'Vi måste fortfarande köpa ballonger och ljus.'],
    ['u', "Je m'occupe des ballons. Et le gâteau ?", 'Jag tar hand om ballongerna. Och tårtan?'],
    ['l', "C'est Madame Brioche qui le prépare.", 'Det är Madame Brioche som gör den.'] ],
    q: { q: 'Qui prépare le gâteau ?', o: ['Madame Brioche', 'Lucas', 'Mamie Odette'] } },
  an3: { ic: '🔮', lines: [
    ['u', "Demain, je me lèverai tôt et je décorerai le salon.", 'I morgon ska jag gå upp tidigt och dekorera vardagsrummet.'],
    ['l', "Et moi, j'irai chercher le gâteau à midi.", 'Och jag ska hämta tårtan vid lunch.'],
    ['u', "Parfait, tout sera prêt avant quatre heures !", 'Perfekt, allt blir klart före klockan fyra!'] ],
    q: { q: 'Que fera Léa demain ?', o: ['Elle ira chercher le gâteau', 'Elle décorera le salon', 'Elle achètera des ballons'] } },
  an4: { ic: '🎁', lines: [
    ['c', "Oh, un livre de recettes ! Et des fleurs ! Merci, mes chéris.", 'Åh, en receptbok! Och blommor! Tack, mina älsklingar.'],
    ['u', "Il y a aussi une carte. On l'a écrite ensemble.", 'Det finns också ett kort. Vi skrev det tillsammans.'] ],
    q: { q: 'Qu’est-ce que Mamie Odette reçoit ?', o: ['Un livre de recettes et des fleurs', 'Un pull et un livre', 'Du chocolat'] } },
  an5: { ic: '🎂', lines: [
    ['n', "Tout le monde chante : « Joyeux anniversaire ! »", 'Alla sjunger: ”Grattis på födelsedagen!”'],
    ['c', "Je souffle les bougies… Et je fais un vœu, mais c'est un secret !", 'Jag blåser ut ljusen… Och önskar mig något, men det är en hemlighet!'] ],
    q: { q: 'Pourquoi Mamie Odette ne dit-elle pas son vœu ?', o: ["C'est un secret", "Elle l'a oublié", "Elle n'a pas fait de vœu"] } },

  // ——— La Mairie (B2) ———
  ma1: { ic: '🏛️', lines: [
    ['c', "Mesdames, messieurs, la réunion commence. Premier sujet : le nouveau parking près du port.", 'Mina damer och herrar, mötet börjar. Första punkten: den nya parkeringen vid hamnen.'],
    ['m', "Je pense que c'est une erreur. Le port doit rester un endroit calme.", 'Jag tycker att det är ett misstag. Hamnen ska förbli en lugn plats.'] ],
    q: { q: "Pourquoi l'homme est-il contre le parking ?", o: ['Le port doit rester calme', 'Ça coûte trop cher', 'Il n’y a pas de voitures'] } },
  ma2: { ic: '📋', lines: [
    ['c', "Pour ce dossier, il faut que vous apportiez une photo et un justificatif de domicile.", 'För den här ansökan måste ni ta med ett foto och ett adressbevis.'],
    ['f', "Il faut que je revienne demain, alors ?", 'Måste jag komma tillbaka i morgon, då?'],
    ['c', "Oui, ou vous pouvez tout envoyer par courriel.", 'Ja, eller så kan ni skicka allt via e-post.'] ],
    q: { q: 'Que doit apporter la dame ?', o: ['Une photo et un justificatif de domicile', 'Son passeport seulement', 'Une lettre du maire'] } },
  ma3: { ic: '⚖️', lines: [
    ['l', "Moi, je suis pour la piste cyclable : c'est bon pour l'environnement.", 'Jag är för cykelbanan: den är bra för miljön.'],
    ['m', "Certes, mais elle supprimera vingt places de stationnement devant les commerces.", 'Visserligen, men den tar bort tjugo parkeringsplatser framför affärerna.'],
    ['l', "Les clients viendront à vélo, voilà tout !", 'Kunderna kommer att cykla dit, så enkelt är det!'] ],
    q: { q: "Quel est l'inconvénient de la piste cyclable selon l'homme ?", o: ['Moins de places de stationnement', "C'est dangereux", 'Elle est trop chère'] } },
  ma4: { ic: '🙏', lines: [
    ['c', "Je voudrais que chaque habitant donne son avis avant vendredi.", 'Jag vill att varje invånare säger sin mening före fredag.'],
    ['u', "Et les jeunes ? On peut participer ?", 'Och ungdomarna? Får vi vara med?'],
    ['c', "Bien sûr ! J'aimerais même que vous organisiez un débat à l'école.", 'Självklart! Jag skulle till och med vilja att ni anordnar en debatt i skolan.'] ],
    q: { q: 'Que propose Madame Fontaine aux jeunes ?', o: ["D'organiser un débat à l'école", 'De voter dimanche', "D'écrire au journal"] } },
  ma5: { ic: '🗳️', lines: [
    ['c', "Résultats du vote : cinquante-huit pour cent pour la piste cyclable, quarante-deux pour cent contre.", 'Resultat av omröstningen: femtioåtta procent för cykelbanan, fyrtiotvå procent emot.'],
    ['n', "Dans la salle, certains applaudissent, d'autres secouent la tête.", 'I salen applåderar några, andra skakar på huvudet.'] ],
    q: { q: 'Combien de personnes ont voté contre ?', o: ['42 %', '58 %', '24 %'] } },
};
