// Lyssna och svara, kvarter 15–20.
export const SCENES3 = {
  // ——— Le Festival (B2) ———
  fe1: { ic: '🎪', lines: [
    ['c', "Ce soir, le concert de jazz commence à vingt et une heures sur la grande scène. Le feu d'artifice est prévu à minuit.", 'I kväll börjar jazzkonserten klockan tjugoett på stora scenen. Fyrverkeriet är planerat till midnatt.'],
    ['u', "Et s'il pleut ?", 'Och om det regnar?'],
    ['c', "Le concert aura lieu sous le chapiteau, mais le feu d'artifice sera reporté.", 'Då hålls konserten i tältet, men fyrverkeriet skjuts upp.'] ],
    q: { q: "Que se passera-t-il s'il pleut ?", o: ["Le feu d'artifice sera reporté", 'Le concert sera annulé', 'Tout aura lieu à la mairie'] } },
  fe2: { ic: '🎟️', lines: [
    ['l', "Tu as des billets pour le spectacle ?", 'Har du biljetter till föreställningen?'],
    ['u', "J'en ai deux. Tu veux venir ?", 'Jag har två. Vill du följa med?'],
    ['l', "Oui ! Et on va au marché d'abord ? J'y ai vu de super crêpes.", 'Ja! Och ska vi gå till torget först? Jag såg jättegoda crêpes där.'] ],
    q: { q: "Où Léa a-t-elle vu des crêpes ?", o: ['Au marché', 'Sous le chapiteau', 'Au café'] } },
  fe3: { ic: '🎭', lines: [
    ['c', "L'artiste que vous allez entendre vient de Montréal. C'est la ville où elle a commencé à chanter, à quinze ans.", 'Artisten som ni ska få höra kommer från Montréal. Det är staden där hon började sjunga, femton år gammal.'],
    ['f', "C'est elle qui a gagné le prix l'année dernière, non ?", 'Det är väl hon som vann priset förra året?'],
    ['c', "Exactement !", 'Precis!'] ],
    q: { q: "À quel âge l'artiste a-t-elle commencé à chanter ?", o: ['À quinze ans', 'À cinq ans', 'À vingt ans'] } },
  fe4: { ic: '🌠', lines: [
    ['m', "Si j'avais su qu'il y aurait autant de monde, je serais venu plus tôt.", 'Om jag hade vetat att det skulle komma så mycket folk hade jag kommit tidigare.'],
    ['l', "Nous aussi ! On ne voit presque rien d'ici.", 'Vi också! Vi ser nästan ingenting härifrån.'],
    ['m', "Montez sur ce banc, vous verrez mieux.", 'Ställ er på den här bänken, så ser ni bättre.'] ],
    q: { q: "Que regrette l'homme ?", o: ["De ne pas être venu plus tôt", "D'être venu seul", "D'avoir payé trop cher"] } },
  fe5: { ic: '🎆', lines: [
    ['c', "Merci à tous les bénévoles ! Sans vous, ce festival n'aurait jamais existé.", 'Tack till alla volontärer! Utan er hade den här festivalen aldrig funnits.'],
    ['n', "Le public applaudit pendant de longues minutes, puis le ciel s'illumine.", 'Publiken applåderar i flera minuter, sedan lyses himlen upp.'] ],
    q: { q: 'Qui Arnaud remercie-t-il ?', o: ['Les bénévoles', 'Le maire', 'Les musiciens'] } },

  // ——— Le Vignoble (B2) ———
  vi1: { ic: '🍇', lines: [
    ['c', "Les vendanges commencent lundi. On cueille le raisin à la main, tôt le matin, avant qu'il fasse trop chaud.", 'Vinskörden börjar på måndag. Vi plockar druvorna för hand, tidigt på morgonen, innan det blir för varmt.'],
    ['u', "Pourquoi à la main ?", 'Varför för hand?'],
    ['c', "Parce que les machines abîment les grappes.", 'För att maskinerna skadar klasarna.'] ],
    q: { q: 'Pourquoi cueille-t-on le raisin à la main ?', o: ['Les machines abîment les grappes', "C'est moins cher", 'Il fait trop chaud'] } },
  vi2: { ic: '🌤️', lines: [
    ['f', "Demain, il fera beau dans le Sud, mais des orages éclateront en fin de journée.", 'I morgon blir det fint väder i södern, men det blir åskväder mot kvällen.'],
    ['c', "Alors on finira la vigne du haut avant quatre heures. Pas question de perdre la récolte !", 'Då gör vi klart den övre vingården före klockan fyra. Vi får inte förlora skörden!'] ],
    q: { q: 'Pourquoi Madame Vidal veut-elle finir avant quatre heures ?', o: ['Des orages sont prévus', 'Il fait trop chaud', 'Les vendangeurs partent'] } },
  vi3: { ic: '🍷', lines: [
    ['c', "Ici, à la cave, le vin repose dans des tonneaux en chêne pendant deux ans.", 'Här i källaren vilar vinet i ekfat i två år.'],
    ['l', "Et les enfants peuvent goûter ?", 'Och får barnen smaka?'],
    ['c', "Non, mais vous goûterez notre jus de raisin. Il est délicieux !", 'Nej, men ni får smaka vår druvjuice. Den är utsökt!'] ],
    q: { q: 'Combien de temps le vin reste-t-il dans les tonneaux ?', o: ['Deux ans', 'Deux mois', 'Dix ans'] } },
  vi4: { ic: '🎶', lines: [
    ['c', "En travaillant, on chante. Ça donne du courage !", 'Medan vi arbetar sjunger vi. Det ger kraft!'],
    ['u', "Moi, je me suis coupé le doigt en coupant une grappe.", 'Jag skar mig i fingret när jag skar av en klase.'],
    ['c', "Fais attention ! Mets ce pansement et prends des gants.", 'Var försiktig! Sätt på det här plåstret och ta handskar.'] ],
    q: { q: "Qu'est-il arrivé à Lucas ?", o: ["Il s'est coupé le doigt", "Il est tombé", "Il a perdu ses gants"] } },
  vi5: { ic: '🥂', lines: [
    ['c', "La récolte de cette année est exceptionnelle. Merci à tous ! Ce soir, on danse dans la cour.", 'Årets skörd är exceptionell. Tack allihop! I kväll dansar vi på gården.'],
    ['n', "Les musiciens accordent leurs violons sous les lampions.", 'Musikerna stämmer sina fioler under lyktorna.'] ],
    q: { q: 'Comment est la récolte cette année ?', o: ['Exceptionnelle', 'Mauvaise', 'Normale'] } },

  // ——— Le Tribunal (C1) ———
  tr1: { ic: '🏛️', lines: [
    ['c', "Le palais de justice a été construit au dix-neuvième siècle. Les audiences sont publiques, sauf exception.", 'Domstolsbyggnaden byggdes på artonhundratalet. Förhandlingarna är offentliga, med vissa undantag.'],
    ['l', "On peut donc assister à un procès ?", 'Kan man alltså vara med på en rättegång?'],
    ['c', "Tout à fait, à condition de rester silencieux.", 'Absolut, förutsatt att man är tyst.'] ],
    q: { q: "À quelle condition peut-on assister à une audience ?", o: ['Rester silencieux', 'Avoir une invitation', 'Être majeur'] } },
  tr2: { ic: '🗣️', lines: [
    ['m', "Ce soir-là, j'ai entendu un bruit de verre brisé, puis j'ai vu une silhouette s'enfuir vers la ruelle.", 'Den kvällen hörde jag ljudet av krossat glas, sedan såg jag en gestalt fly mot gränden.'],
    ['c', "Pourriez-vous décrire cette silhouette ?", 'Skulle ni kunna beskriva gestalten?'],
    ['m', "Pas vraiment. Il faisait nuit et elle portait une capuche.", 'Inte riktigt. Det var mörkt och den bar luva.'] ],
    q: { q: "Qu'est-ce que le témoin a entendu d'abord ?", o: ['Un bruit de verre brisé', 'Un cri', 'Une voiture'] } },
  tr3: { ic: '🤔', lines: [
    ['c', "Bien que les preuves soient minces, le témoignage de la voisine est troublant.", 'Även om bevisen är tunna är grannens vittnesmål oroande.'],
    ['f', "À moins qu'elle ne se soit trompée d'heure…", 'Om hon inte har tagit fel på tiden…'],
    ['c', "C'est précisément ce que nous devons vérifier.", 'Det är just det vi måste kontrollera.'] ],
    q: { q: 'Que faut-il vérifier ?', o: ["Si la voisine s'est trompée d'heure", 'Si les preuves sont fausses', "Si l'accusé a un alibi"] } },
  tr4: { ic: '⚖️', lines: [
    ['c', "Le tribunal déclare l'accusé non coupable, faute de preuves suffisantes.", 'Domstolen förklarar den åtalade icke skyldig, i brist på tillräckliga bevis.'],
    ['n', "Dans la salle, un murmure de soulagement parcourt les bancs.", 'I salen går ett sorl av lättnad genom bänkraderna.'] ],
    q: { q: "Pourquoi l'accusé est-il acquitté ?", o: ['Faute de preuves suffisantes', 'Il a avoué', 'Le témoin a menti'] } },
  tr5: { ic: '🐈', lines: [
    ['c', "Dans l'affaire dite « du chat », le voisin réclamait des dommages pour ses rosiers saccagés.", 'I det så kallade ”kattmålet” krävde grannen skadestånd för sina förstörda rosenbuskar.'],
    ['u', "Et le chat, il a été condamné ?", 'Och katten, blev den dömd?'],
    ['c', "Le chat, non ! Mais sa propriétaire devra installer une clôture.", 'Katten, nej! Men dess ägare måste sätta upp ett staket.'] ],
    q: { q: 'Que devra faire la propriétaire du chat ?', o: ['Installer une clôture', 'Payer une amende', 'Donner son chat'] } },

  // ——— Le Marché de Noël (C1) ———
  no1: { ic: '🎄', lines: [
    ['c', "Vin chaud, pain d'épices, santons de Provence… Approchez, tout est fait main !", 'Glögg, pepparkaksbröd, provensalska julkrubbsfigurer… Kom fram, allt är handgjort!'],
    ['f', "Vous êtes ouvert jusqu'à quand ?", 'Hur länge har ni öppet?'],
    ['c', "Jusqu'au vingt-quatre, à dix-huit heures. Après, je rentre réveillonner en famille.", 'Till den tjugofjärde, klockan arton. Sedan åker jag hem och firar julafton med familjen.'] ],
    q: { q: "Jusqu'à quand le chalet est-il ouvert ?", o: ['Le 24 à 18 heures', 'Le 25 à midi', 'Le 31 décembre'] } },
  no2: { ic: '🎁', lines: [
    ['u', "Je ne sais pas quoi offrir à Papa. Il a déjà tout !", 'Jag vet inte vad jag ska ge pappa. Han har redan allt!'],
    ['l', "Offre-lui une expérience plutôt qu'un objet : un cours de cuisine, par exemple.", 'Ge honom en upplevelse i stället för en sak: en matlagningskurs, till exempel.'],
    ['u', "Excellente idée, il rêve d'apprendre à faire des macarons.", 'Lysande idé, han drömmer om att lära sig göra macarons.'] ],
    q: { q: 'Que conseille Léa ?', o: ['Offrir une expérience', 'Offrir un livre', 'Ne rien offrir'] } },
  no3: { ic: '🕯️', lines: [
    ['c', "En Provence, la tradition veut qu'on serve treize desserts le soir de Noël, en souvenir du Christ et des douze apôtres.", 'I Provence säger traditionen att man serverar tretton desserter på julafton, till minne av Kristus och de tolv apostlarna.'],
    ['l', "Treize ! On n'aura jamais assez de place pour tout manger.", 'Tretton! Vi kommer aldrig att få plats med allt.'] ],
    q: { q: 'Combien de desserts sert-on en Provence ?', o: ['Treize', 'Douze', 'Trois'] } },
  no4: { ic: '✨', lines: [
    ['f', "Je vous souhaite de joyeuses fêtes et une année pleine de bonheur et de santé.", 'Jag önskar er god helg och ett år fullt av lycka och hälsa.'],
    ['c', "Merci, à vous aussi ! Et que tous vos projets se réalisent.", 'Tack, detsamma! Och må alla era planer gå i uppfyllelse.'] ],
    q: { q: 'Que souhaite Nicolas en retour ?', o: ['Que ses projets se réalisent', 'Beaucoup de cadeaux', 'De la neige'] } },
  no5: { ic: '🌟', lines: [
    ['n', "Minuit sonne. La neige tombe doucement sur les chalets illuminés.", 'Klockan slår tolv. Snön faller sakta över de upplysta stånden.'],
    ['l', "Écoute… On entend les cloches de l'église.", 'Lyssna… Man hör kyrkklockorna.'],
    ['u', "Joyeux Noël, Léa.", 'God jul, Léa.'] ],
    q: { q: "Qu'entend-on à minuit ?", o: ["Les cloches de l'église", 'Un concert', 'Le tram'] } },

  // ——— La Maison (B1) ———
  ms1: { ic: '🏠', lines: [
    ['c', "Au rez-de-chaussée, il y a la cuisine et le salon. En haut, trois chambres et une salle de bains.", 'På bottenvåningen finns köket och vardagsrummet. På övervåningen tre sovrum och ett badrum.'],
    ['l', "Et le grenier ?", 'Och vinden?'],
    ['c', "Il est plein de vieux cartons. Personne n'y monte jamais !", 'Den är full av gamla kartonger. Ingen går någonsin upp dit!'] ],
    q: { q: 'Combien de chambres y a-t-il en haut ?', o: ['Trois', 'Deux', 'Quatre'] } },
  ms2: { ic: '🛋️', lines: [
    ['u', "On met le canapé où ?", 'Var ställer vi soffan?'],
    ['c', "Contre le mur, en face de la fenêtre. Et la lampe à côté du fauteuil.", 'Mot väggen, mitt emot fönstret. Och lampan bredvid fåtöljen.'],
    ['u', "Et cette vieille armoire ?", 'Och det här gamla skåpet?'],
    ['c', "Dans la chambre d'amis.", 'I gästrummet.'] ],
    q: { q: "Où va l'armoire ?", o: ["Dans la chambre d'amis", 'Dans le salon', 'Au grenier'] } },
  ms3: { ic: '🧹', lines: [
    ['c', "Lucas, tu passes l'aspirateur. Léa, tu fais la vaisselle. Moi, je m'occupe du linge.", 'Lucas, du dammsuger. Léa, du diskar. Jag tar hand om tvätten.'],
    ['l', "Et après, on peut sortir ?", 'Och efteråt, får vi gå ut?'],
    ['c', "Après, oui. Mais d'abord, rangez vos chambres !", 'Efteråt, ja. Men först städar ni era rum!'] ],
    q: { q: 'Que doit faire Léa ?', o: ['La vaisselle', "Passer l'aspirateur", 'Le linge'] } },
  ms4: { ic: '🔨', lines: [
    ['c', "Le plombier vient mardi pour la fuite dans la salle de bains, et l'électricien jeudi.", 'Rörmokaren kommer på tisdag för läckan i badrummet, och elektrikern på torsdag.'],
    ['m', "Et la peinture de la cuisine ?", 'Och målningen av köket?'],
    ['c', "On la fera nous-mêmes ce week-end.", 'Den gör vi själva i helgen.'] ],
    q: { q: 'Quand vient le plombier ?', o: ['Mardi', 'Jeudi', 'Ce week-end'] } },
  ms5: { ic: '🎉', lines: [
    ['c', "Enfin, les travaux sont terminés ! La cuisine est jaune, comme je le voulais.", 'Äntligen är renoveringen klar! Köket är gult, som jag ville.'],
    ['l', "C'est magnifique, Madame Leroy. On fait une crémaillère ?", 'Det är jättefint, Madame Leroy. Ska vi ha inflyttningsfest?'],
    ['c', "Excellente idée ! Samedi soir, j'invite tout le quartier.", 'Lysande idé! På lördag kväll bjuder jag in hela kvarteret.'] ],
    q: { q: 'De quelle couleur est la cuisine ?', o: ['Jaune', 'Bleue', 'Blanche'] } },

  // ——— Le Grand Magasin (B1) ———
  mg1: { ic: '🏬', lines: [
    ['f', "Votre attention, s'il vous plaît : les jouets sont au troisième étage, l'électroménager au sous-sol. Bonnes courses !", 'Hör upp, tack: leksakerna finns på tredje våningen, hushållsapparaterna i källaren. Trevlig shopping!'] ],
    q: { q: 'Où sont les jouets ?', o: ['Au troisième étage', 'Au sous-sol', 'Au rez-de-chaussée'] } },
  mg2: { ic: '👕', lines: [
    ['l', "Vous avez ce pull en bleu, taille M ?", 'Har ni den här tröjan i blått, storlek M?'],
    ['c', "En bleu, il ne reste que du S. Mais en vert, j'ai du M.", 'I blått finns bara S kvar. Men i grönt har jag M.'],
    ['l', "Bon, je vais essayer le vert.", 'Okej, då provar jag den gröna.'] ],
    q: { q: 'Quel pull Léa va-t-elle essayer ?', o: ['Le vert, taille M', 'Le bleu, taille S', 'Le bleu, taille M'] } },
  mg3: { ic: '🪞', lines: [
    ['u', "Il est trop court, ce pantalon. Vous avez la taille au-dessus ?", 'De här byxorna är för korta. Har ni storleken över?'],
    ['c', "Je vous l'apporte tout de suite. Et la veste, elle vous va ?", 'Jag hämtar dem direkt. Och jackan, passar den?'],
    ['u', "La veste, elle est parfaite.", 'Jackan sitter perfekt.'] ],
    q: { q: 'Quel est le problème du pantalon ?', o: ['Il est trop court', 'Il est trop large', "Il n'a pas la bonne couleur"] } },
  mg4: { ic: '💳', lines: [
    ['f', "Je voudrais échanger ces chaussures, elles me font mal.", 'Jag skulle vilja byta de här skorna, de skaver.'],
    ['c', "Vous avez le ticket de caisse ?", 'Har ni kvittot?'],
    ['f', "Oui, le voilà. Je les ai achetées samedi.", 'Ja, här är det. Jag köpte dem i lördags.'],
    ['c', "Pas de problème, vous avez trente jours pour échanger.", 'Inga problem, ni har trettio dagar på er att byta.'] ],
    q: { q: 'Combien de jours a-t-on pour échanger ?', o: ['Trente', 'Quinze', 'Sept'] } },
  mg5: { ic: '📱', lines: [
    ['u', "Quelle est la différence entre ces deux téléphones ?", 'Vad är skillnaden mellan de här två telefonerna?'],
    ['c', "Celui-ci a une meilleure batterie, celui-là un meilleur appareil photo. Et il coûte cent euros de plus.", 'Den här har bättre batteri, den där en bättre kamera. Och den kostar hundra euro mer.'],
    ['u', "Je préfère la batterie. Je prends le premier.", 'Jag föredrar batteriet. Jag tar den första.'] ],
    q: { q: 'Pourquoi Lucas choisit-il le premier téléphone ?', o: ['Pour sa batterie', 'Pour son appareil photo', "Parce qu'il est plus beau"] } },
};
