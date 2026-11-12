# Allez ! – franska i Port-Saint-Clément

Appen fungerar direkt i **ensamläge** (allt sparas i telefonen). För topplista och pepp mellan familj och vänner kopplar du på en gratis Supabase-databas – det tar ungefär 10 minuter.

## 1. Lägg upp appen på Netlify
1. Packa upp zip-filen.
2. Gå till app.netlify.com → **Add new site → Deploy manually**.
3. Dra mappen `allez` dit. Du får en adress som `https://något.netlify.app` – byt gärna namn under *Site configuration → Change site name* (t.ex. `allez-familjen`).

## 2. Skapa databasen (Supabase)
1. Skapa ett gratis konto på supabase.com och ett nytt projekt. Välj regionen **Stockholm (eu-north-1)**.
2. Öppna **SQL Editor**, klistra in allt från `supabase.sql` och tryck **Run**.
3. Gå till **Authentication → Sign In / Providers → Email** och stäng av **Confirm email**. Då kan alla börja direkt utan att klicka på en länk i ett mejl.
4. Gå till **Project Settings → API** (eller **Data API**) och kopiera
   - **Project URL**
   - **anon / publishable key** (den publika nyckeln – *inte* service_role/secret).
5. Öppna `config.js` och klistra in dem:
   ```js
   SUPABASE_URL: 'https://xxxx.supabase.co',
   SUPABASE_ANON_KEY: 'eyJ…',
   ```
6. Dra mappen till Netlify igen (*Deploys → dra och släpp*) så att den nya versionen publiceras.

Den publika nyckeln får ligga i appen – databasreglerna i `supabase.sql` gör att var och en bara kan ändra sin egen profil.

## 3. Bjud in familj och vänner
Skicka länken. Var och en:
1. öppnar länken i mobilen (Safari på iPhone, Chrome på Android)
2. väljer **Dela → Lägg till på hemskärmen** (iPhone) eller **⋮ → Lägg till på startskärmen** (Android)
3. skapar ett konto med e-post och lösenord, väljer namn och figur.

När alla är med kan du stänga för nya konton: **Authentication → Sign In / Providers → Allow new users to sign up** av.

## Bra att veta
- **Uttal:** telefonens franska röst används. På iPhone kan en bättre röst laddas ner i *Inställningar → Hjälpmedel → Uppläst innehåll → Röster → Franska*.
- **Taluppgifter** fungerar bäst i Chrome på Android. På iPhone går det att stänga av dem under Profil.
- **Påminnelser** (pushnotiser) finns inte ännu – pepp syns när man öppnar appen.
- **Nytt innehåll** läggs till i `content.js`. Spårvagnen, polisstationen och hamnen finns redan på kartan som "Byggs snart".
