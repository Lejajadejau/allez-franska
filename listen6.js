// Lyssna och svara, andra omgången för kvarter 21–24 (en extra scen per lektion).
// Ljudet ligger i audio/v2/ls/<lektion>x-<rad>.mp3. Samma format som SCENESB.
// Röster: c = kvarterets figur, l = Léa, u = Lucas, n = berättaren, f = annan kvinna, m = annan man.
// Frågor på svenska upp till A2, på franska från B1. Rätt svar står först (blandas i appen).
export const SCENESB2 = {
  // ——— Le Restaurant (A2) ———
  re1: { ic: '📅', lines: [
    ['m', "Je voudrais réserver pour samedi midi. Nous sommes six.", 'Jag skulle vilja boka till lördag lunch. Vi är sex.'],
    ['c', "Six personnes à midi, c'est noté. À quel nom ?", 'Sex personer klockan tolv, det är noterat. Vilket namn?'],
    ['m', "Dupont, merci.", 'Dupont, tack.'] ],
    q: { q: 'Hur många är de?', o: ['Sex', 'Två', 'Tio'] } },
  re2: { ic: '🥗', lines: [
    ['l', "Il y a un plat végétarien ?", 'Finns det en vegetarisk rätt?'],
    ['c', "Oui, la lasagne aux légumes. Elle est délicieuse.", 'Ja, grönsakslasagnen. Den är jättegod.'] ],
    q: { q: 'Vilken vegetarisk rätt finns?', o: ['Grönsakslasagne', 'Ostomelett', 'Tomatsoppa'] } },
  re3: { ic: '🥤', lines: [
    ['c', "Et comme boisson ?", 'Och att dricka?'],
    ['u', "Un jus d'orange pour moi, et une carafe d'eau, s'il vous plaît.", 'En apelsinjuice till mig, och en karaff vatten, tack.'] ],
    q: { q: 'Vad dricker Lucas?', o: ['Apelsinjuice', 'Cola', 'Mjölk'] } },
  re4: { ic: '🍰', lines: [
    ['f', "Chef, ce gâteau au chocolat est extraordinaire !", 'Kocken, den här chokladkakan är fantastisk!'],
    ['c', "Merci ! C'est la recette de ma grand-mère.", 'Tack! Det är min mormors recept.'] ],
    q: { q: 'Vems recept är kakan?', o: ['Kockens mormors', 'Kockens mammas', 'Kvinnans eget'] } },
  re5: { ic: '💳', lines: [
    ['m', "Je peux payer par carte ?", 'Kan jag betala med kort?'],
    ['c', "Désolé, la machine ne marche pas aujourd'hui. Seulement en espèces.", 'Tyvärr, kortläsaren fungerar inte i dag. Bara kontant.'] ],
    q: { q: 'Hur kan mannen betala?', o: ['Bara kontant', 'Bara med kort', 'Med telefonen'] } },
  // ——— Le Stade (A2) ———
  st1: { ic: '🏊', lines: [
    ['u', "Tu fais quel sport, Léa ?", 'Vilken sport håller du på med, Léa?'],
    ['l', "Je fais de la natation le mardi et du tennis le samedi.", 'Jag simmar på tisdagar och spelar tennis på lördagar.'] ],
    q: { q: 'När spelar Léa tennis?', o: ['På lördagar', 'På tisdagar', 'På söndagar'] } },
  st2: { ic: '⏱️', lines: [
    ['c', "Allez, encore cinq minutes ! Après, on boit de l'eau.", 'Kom igen, fem minuter till! Sedan dricker vi vatten.'],
    ['u', "Seulement cinq ? Super !", 'Bara fem? Toppen!'] ],
    q: { q: 'Vad gör de efter fem minuter?', o: ['Dricker vatten', 'Går hem', 'Springer ett varv till'] } },
  st3: { ic: '🦵', lines: [
    ['l', "Aïe ! J'ai mal au genou.", 'Aj! Jag har ont i knät.'],
    ['c', "Assieds-toi. Je vais chercher de la glace.", 'Sätt dig. Jag hämtar is.'] ],
    q: { q: 'Var har Léa ont?', o: ['I knät', 'I ryggen', 'I huvudet'] } },
  st4: { ic: '🟨', lines: [
    ['c', "Numéro dix, carton jaune ! On ne touche pas le ballon avec la main.", 'Nummer tio, gult kort! Man rör inte bollen med handen.'] ],
    q: { q: 'Varför får nummer tio gult kort?', o: ['Han tog bollen med handen', 'Han sprang för långsamt', 'Han kom för sent'] } },
  st5: { ic: '🎉', lines: [
    ['n', "Dernière minute du match.", 'Matchens sista minut.'],
    ['u', "But ! Trois à deux ! On a gagné !", 'Mål! Tre–två! Vi vann!'] ],
    q: { q: 'Hur slutar matchen?', o: ['3–2', '2–2', '2–3'] } },
  // ——— Le Cinéma (B1) ———
  ci1: { ic: '😱', lines: [
    ['l', "On regarde un film d'horreur ce soir ?", 'Ska vi se en skräckfilm i kväll?'],
    ['u', "Non merci, j'ai peur après. Je préfère une comédie.", 'Nej tack, jag blir rädd efteråt. Jag vill hellre se en komedi.'] ],
    q: { q: 'Pourquoi Lucas ne veut-il pas voir un film d\'horreur ?', o: ['Il a peur après', 'Il l\'a déjà vu', 'Il est fatigué'] } },
  ci2: { ic: '🎟️', lines: [
    ['f', "Deux places pour la séance de vingt heures, s'il vous plaît.", 'Två biljetter till föreställningen klockan åtta, tack.'],
    ['c', "Il ne reste que des places au premier rang.", 'Det finns bara platser kvar på första raden.'] ],
    q: { q: 'Où restent les places libres ?', o: ['Au premier rang', 'Au dernier rang', 'Au milieu de la salle'] } },
  ci3: { ic: '⭐', lines: [
    ['c', "Alors, ce film ?", 'Nå, hur var filmen?'],
    ['l', "Les acteurs sont excellents, mais l'histoire est trop longue.", 'Skådespelarna är utmärkta, men handlingen är för lång.'] ],
    q: { q: 'Qu\'est-ce que Léa critique ?', o: ['L\'histoire est trop longue', 'Les acteurs sont mauvais', 'La musique est trop forte'] } },
  ci4: { ic: '🚀', lines: [
    ['u', "C'est l'histoire d'une fille qui part vivre sur la Lune avec son chien.", 'Det handlar om en flicka som flyttar till månen med sin hund.'] ],
    q: { q: 'Avec qui la fille part-elle sur la Lune ?', o: ['Avec son chien', 'Avec son frère', 'Avec ses parents'] } },
  ci5: { ic: '🎬', lines: [
    ['c', "Ce soir, la réalisatrice va répondre à vos questions après la projection.", 'I kväll svarar regissören på era frågor efter visningen.'] ],
    q: { q: 'Que se passe-t-il après la projection ?', o: ['La réalisatrice répond aux questions', 'On mange ensemble', 'On regarde un deuxième film'] } },
  // ——— Le Camping (B1) ———
  ca1: { ic: '🚿', lines: [
    ['m', "Les douches sont où, s'il vous plaît ?", 'Var finns duscharna?'],
    ['f', "Derrière la piscine. L'eau chaude est gratuite.", 'Bakom poolen. Varmvattnet är gratis.'] ],
    q: { q: 'Où sont les douches ?', o: ['Derrière la piscine', 'À côté de l\'accueil', 'Près de la plage'] } },
  ca2: { ic: '🦉', lines: [
    ['l', "Écoute ! Qu'est-ce que c'est, ce bruit ?", 'Lyssna! Vad är det för ljud?'],
    ['u', "C'est une chouette. Elle chasse la nuit.", 'Det är en uggla. Den jagar på natten.'] ],
    q: { q: 'Quel animal fait du bruit ?', o: ['Une chouette', 'Un renard', 'Un sanglier'] } },
  ca3: { ic: '🥾', lines: [
    ['f', "Le sentier jusqu'au lac fait huit kilomètres. Prenez beaucoup d'eau.", 'Leden till sjön är åtta kilometer. Ta med mycket vatten.'] ],
    q: { q: 'Quelle est la longueur du sentier ?', o: ['Huit kilomètres', 'Deux kilomètres', 'Quinze kilomètres'] } },
  ca4: { ic: '⛺', lines: [
    ['u', "Papa, la tente est mouillée !", 'Pappa, tältet är blött!'],
    ['m', "Ce n'est pas grave. On va la faire sécher au soleil demain matin.", 'Det gör inget. Vi torkar det i solen i morgon bitti.'] ],
    q: { q: 'Comment vont-ils sécher la tente ?', o: ['Au soleil demain matin', 'Dans la voiture', 'Près du feu ce soir'] } },
  ca5: { ic: '📷', lines: [
    ['l', "Regarde cette photo ! C'est nous au sommet de la montagne.", 'Titta på det här fotot! Det är vi på bergstoppen.'] ],
    q: { q: 'Où a été prise la photo ?', o: ['Au sommet de la montagne', 'Au bord du lac', 'Devant la tente'] } },
};
