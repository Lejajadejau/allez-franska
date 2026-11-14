// Lyssna och svara för kvarter 21–24 (en scen per lektion). Samma format som SCENES1–3.
export const SCENES5 = {
  // ——— Le Restaurant (A2) ———
  re1: { ic: '📞', lines: [
    ['c', "Chez Bastien, bonjour !", 'Chez Bastien, hej!'],
    ['f', "Bonjour, une table pour deux, ce soir à vingt heures, c'est possible ?", 'Hej, ett bord för två i kväll klockan åtta, går det?'],
    ['c', "À vingt heures, c'est complet. Mais j'ai une table à vingt et une heures, en terrasse.", 'Klockan åtta är det fullbokat. Men jag har ett bord klockan nio, på uteserveringen.'],
    ['f', "Parfait, je la prends.", 'Perfekt, jag tar det.'] ],
    q: { q: 'När får kvinnan sitta?', o: ['Klockan nio på uteserveringen', 'Klockan åtta inomhus', 'Klockan sju i baren'] } },
  re2: { ic: '📜', lines: [
    ['u', "Papa, qu'est-ce que c'est, le plat du jour ?", 'Pappa, vad är dagens rätt?'],
    ['m', "Aujourd'hui, c'est du poulet avec des pommes de terre. Et le dessert, c'est une tarte aux pommes.", 'I dag är det kyckling med potatis. Och efterrätten är äppelpaj.'],
    ['u', "Miam, je prends le menu complet !", 'Mums, jag tar hela menyn!'] ],
    q: { q: 'Vad är dagens rätt?', o: ['Kyckling med potatis', 'Fisk med grönsaker', 'Biff med pommes frites'] } },
  re3: { ic: '🍽️', lines: [
    ['c', "Vous avez choisi ?", 'Har ni bestämt er?'],
    ['l', "Oui. Pour moi, une omelette et une salade. Et pour mon frère, un steak frites.", 'Ja. Till mig en omelett och en sallad. Och till min bror en biff med pommes frites.'],
    ['c', "Le steak, saignant ou bien cuit ?", 'Biffen, blodig eller genomstekt?'],
    ['u', "Bien cuit, s'il vous plaît !", 'Genomstekt, tack!'] ],
    q: { q: 'Vad beställer Léa till sig själv?', o: ['En omelett och en sallad', 'En biff med pommes frites', 'Fisksoppa'] } },
  re4: { ic: '🌶️', lines: [
    ['m', "Excusez-moi, ma soupe est froide.", 'Ursäkta, min soppa är kall.'],
    ['c', "Oh, je suis désolé ! Je vous en apporte une autre tout de suite.", 'Åh, förlåt! Jag kommer med en ny med en gång.'],
    ['m', "Merci. Et elle n'est pas trop épicée ?", 'Tack. Och den är inte för stark?'],
    ['c', "Non, juste un peu de poivre.", 'Nej, bara lite peppar.'] ],
    q: { q: 'Vad är fel på soppan?', o: ['Den är kall', 'Den är för salt', 'Den är för stark'] } },
  re5: { ic: '🧾', lines: [
    ['l', "L'addition, s'il vous plaît. On peut payer séparément ?", 'Notan, tack. Kan vi betala var för sig?'],
    ['c', "Bien sûr. Alors, pour vous, dix-huit euros, et pour Monsieur, vingt-deux euros.", 'Självklart. Då blir det arton euro för er och tjugotvå euro för herrn.'] ],
    q: { q: 'Hur mycket betalar Léa?', o: ['18 €', '22 €', '40 €'] } },

  // ——— Le Stade (A2) ———
  st1: { ic: '⚽', lines: [
    ['c', "Alors, Léa, tu préfères quel sport ?", 'Nå, Léa, vilken sport tycker du bäst om?'],
    ['l', "J'adore le tennis. Mais je fais aussi de la natation le vendredi.", 'Jag älskar tennis. Men jag simmar också på fredagar.'],
    ['c', "Super ! Et le foot ?", 'Toppen! Och fotboll?'],
    ['l', "Non, le foot, ce n'est pas pour moi.", 'Nej, fotboll är inget för mig.'] ],
    q: { q: 'Vilken sport tycker Léa mest om?', o: ['Tennis', 'Fotboll', 'Simning'] } },
  st2: { ic: '🏃', lines: [
    ['c', "On s'échauffe ! Trois tours de terrain, lentement.", 'Vi värmer upp! Tre varv runt planen, långsamt.'],
    ['u', "Trois tours ? C'est beaucoup !", 'Tre varv? Det är mycket!'],
    ['c', "Après, on fait une pause de deux minutes. Allez, courez !", 'Sedan tar vi två minuters paus. Kom igen, spring!'] ],
    q: { q: 'Hur många varv ska de springa?', o: ['Tre', 'Två', 'Tio'] } },
  st3: { ic: '🦵', lines: [
    ['m', "Coach, j'ai mal à l'épaule depuis hier.", 'Coach, jag har haft ont i axeln sedan i går.'],
    ['c', "Tu as lancé le ballon trop souvent. Aujourd'hui, tu cours, mais tu ne lances pas.", 'Du har kastat bollen för ofta. I dag springer du, men du kastar inte.'] ],
    q: { q: 'Var har mannen ont?', o: ['I axeln', 'I benet', 'I ryggen'] } },
  st4: { ic: '🟨', lines: [
    ['n', "Pendant le match.", 'Under matchen.'],
    ['c', "Hé, arbitre ! C'était une faute, il a poussé notre joueur !", 'Hallå, domaren! Det var regelbrott, han knuffade vår spelare!'],
    ['m', "Non, madame, il a touché le ballon. On continue !", 'Nej, han rörde bollen. Spelet fortsätter!'] ],
    q: { q: 'Vad säger domaren?', o: ['Att det inte var regelbrott', 'Att det var straff', 'Att matchen är slut'] } },
  st5: { ic: '🏆', lines: [
    ['n', "La finale. Dernière minute.", 'Finalen. Sista minuten.'],
    ['u', "J'ai le ballon… Je tire… But !", 'Jag har bollen … Jag skjuter … Mål!'],
    ['c', "On a gagné ! Deux à un ! Bravo, Lucas !", 'Vi vann! Två–ett! Bra jobbat, Lucas!'] ],
    q: { q: 'Hur slutar finalen?', o: ['Två–ett', 'Ett–ett', 'Noll–ett'] } },

  // ——— Le Cinéma (B1) ———
  ci1: { ic: '🎬', lines: [
    ['u', "Ce soir, il y a un film d'horreur à la télé. Tu le regardes avec moi ?", 'I kväll går det en skräckfilm på tv. Tittar du på den med mig?'],
    ['l', "Pas question, je ne dormirais pas de la nuit ! Je préfère un documentaire sur les baleines.", 'Inte en chans, då skulle jag inte sova på hela natten! Jag föredrar en dokumentär om valar.'] ],
    q: { q: 'Que préfère regarder Léa ?', o: ['Un documentaire sur les baleines', "Un film d'horreur", 'Une comédie'] } },
  ci2: { ic: '🎟️', lines: [
    ['m', "Deux places pour le film de vingt heures, s'il vous plaît. Un adulte et un étudiant.", 'Två biljetter till filmen klockan åtta, tack. En vuxen och en student.'],
    ['c', "Avec le tarif réduit, ça fait seize euros. Salle numéro deux, à gauche.", 'Med studentrabatten blir det sexton euro. Salong två, till vänster.'] ],
    q: { q: "Où se trouve la salle ?", o: ['À gauche', 'À droite', "À l'étage"] } },
  ci3: { ic: '⭐', lines: [
    ['l', "Alors, tu as aimé ?", 'Nå, tyckte du om den?'],
    ['u', "Les acteurs étaient très bons, mais l'histoire était ennuyeuse. Je me suis presque endormi !", 'Skådespelarna var mycket bra, men handlingen var tråkig. Jag somnade nästan!'] ],
    q: { q: "Qu'est-ce que Lucas n'a pas aimé ?", o: ["L'histoire", 'Les acteurs', 'La salle'] } },
  ci4: { ic: '📖', lines: [
    ['f', "C'est l'histoire d'un chien qui fait le tour de la France pour retrouver sa famille.", 'Det är historien om en hund som reser runt hela Frankrike för att hitta sin familj.'],
    ['l', "Et il la retrouve ?", 'Och hittar han den?'],
    ['f', "Je ne te dis pas la fin ! Mais prends des mouchoirs.", 'Slutet berättar jag inte! Men ta med näsdukar.'] ],
    q: { q: 'De quoi parle le film ?', o: ["D'un chien qui cherche sa famille", "D'une famille qui part en vacances", "D'un chien policier"] } },
  ci5: { ic: '🏅', lines: [
    ['n', "Au festival du film.", 'På filmfestivalen.'],
    ['c', "Et le grand prix du festival est attribué à… « Le Phare » !", 'Och festivalens stora pris går till … ”Fyren”!'],
    ['m', "Je n'y crois pas ! Merci au jury, et merci à toute l'équipe du tournage.", 'Jag kan inte tro det! Tack till juryn och tack till hela inspelningsteamet.'] ],
    q: { q: 'Quel film gagne le grand prix ?', o: ['« Le Phare »', '« La Dernière Marée »', '« Le Facteur »'] } },

  // ——— Le Camping (B1) ———
  ca1: { ic: '⛺', lines: [
    ['m', "Bonsoir, vous avez encore de la place pour une caravane ?", 'God kväll, har ni plats kvar för en husvagn?'],
    ['c', "Pour une caravane, non, désolée. Il ne me reste que des emplacements pour les tentes.", 'För en husvagn, nej, tyvärr. Jag har bara tältplatser kvar.'],
    ['m', "Tant pis, on essaiera le camping de la plage.", 'Synd, då provar vi campingen vid stranden.'] ],
    q: { q: "Pourquoi l'homme ne peut-il pas rester ?", o: ["Il n'y a plus de place pour les caravanes", 'Le camping est fermé', "C'est trop cher"] } },
  ca2: { ic: '✨', lines: [
    ['u', "Regarde le ciel, Léa ! On voit des milliers d'étoiles.", 'Titta på himlen, Léa! Man ser tusentals stjärnor.'],
    ['l', "Chut… Tu entends ? Quelque chose bouge dans la forêt.", 'Tyst … Hör du? Något rör sig i skogen.'],
    ['u', "C'est sûrement un sanglier. Ne bouge pas.", 'Det är säkert ett vildsvin. Rör dig inte.'] ],
    q: { q: "Selon Lucas, qu'est-ce qui bouge dans la forêt ?", o: ['Un sanglier', 'Un oiseau', 'Un chien'] } },
  ca3: { ic: '🎒', lines: [
    ['c', "Pour la randonnée de demain, il faut que vous preniez de l'eau, un chapeau et une lampe de poche.", 'Till morgondagens vandring måste ni ta med vatten, en hatt och en ficklampa.'],
    ['l', "Une lampe de poche ? On rentre tard ?", 'En ficklampa? Kommer vi tillbaka sent?'],
    ['c', "On part à cinq heures pour voir le lever du soleil au sommet.", 'Vi går klockan fem för att se soluppgången från toppen.'] ],
    q: { q: 'Pourquoi faut-il une lampe de poche ?', o: ["On part avant le lever du soleil", 'On rentre la nuit', 'Il y a une grotte'] } },
  ca4: { ic: '⛈️', lines: [
    ['u', "On était en train de manger quand le tonnerre a commencé.", 'Vi höll på att äta när åskan började.'],
    ['l', "Et cinq minutes après, il pleuvait tellement qu'on ne voyait plus rien.", 'Och fem minuter senare regnade det så mycket att vi inte såg någonting.'],
    ['u', "On s'est abrités dans la voiture jusqu'à minuit.", 'Vi sökte skydd i bilen ända till midnatt.'] ],
    q: { q: 'Où se sont-ils abrités ?', o: ['Dans la voiture', "À l'accueil", 'Sous un arbre'] } },
  ca5: { ic: '📸', lines: [
    ['f', "Alors, ces vacances au camping ?", 'Nå, hur var campingsemestern?'],
    ['l', "Inoubliables ! Mon meilleur souvenir, c'est le lever du soleil au sommet de la colline.", 'Oförglömlig! Mitt bästa minne är soluppgången på toppen av kullen.'],
    ['f', "Et le pire ?", 'Och det värsta?'],
    ['l', "Démonter la tente sous la pluie !", 'Att ta ner tältet i regnet!'] ],
    q: { q: 'Quel est le meilleur souvenir de Léa ?', o: ['Le lever du soleil au sommet', "L'orage", 'La piscine'] } },
};
