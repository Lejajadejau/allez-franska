// Allez ! – pushnotiser (Supabase Edge Function "push")
// type: 'cheer' → skickar pepp direkt till mottagaren
// type: 'buddy' → den som just gjort dagens första lektion: kompisar som inte övat i dag får en knuff
// type: 'cron'  → körs varje timme; den som inte övat i dag påminns vid sin valda tid (förval kl. 19)
import webpush from 'npm:web-push@3.6.7';
import { createClient } from 'npm:@supabase/supabase-js@2';

function serverKey() {
  const legacy = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (legacy) return legacy;
  const raw = Deno.env.get('SUPABASE_SECRET_KEYS') || '{}';
  try { const v = JSON.parse(raw); return Array.isArray(v) ? v[0] : Object.values(v)[0] as string; } catch { return raw; }
}
const sb = createClient(Deno.env.get('SUPABASE_URL')!, serverKey(), { auth: { persistSession: false } });

// Nycklar ligger i tabellen app_secrets (bara åtkomlig för servern). VAPID-nycklarna skapas automatiskt första gången.
async function secret(name: string) {
  const { data } = await sb.from('app_secrets').select('value').eq('name', name).maybeSingle();
  return data?.value as string | undefined;
}
let vapidReady: Promise<string> | null = null;
function vapid() {
  vapidReady ||= (async () => {
    let pub = await secret('vapid_public'), priv = await secret('vapid_private');
    if (!pub || !priv) {
      const k = webpush.generateVAPIDKeys();
      await sb.from('app_secrets').upsert([{ name: 'vapid_public', value: k.publicKey }, { name: 'vapid_private', value: k.privateKey }]);
      pub = await secret('vapid_public'); priv = await secret('vapid_private');
    }
    webpush.setVapidDetails('https://allez-franska.pages.dev', pub!, priv!);
    return pub!;
  })();
  return vapidReady;
}

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-cron-secret',
};
const json = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

async function sendTo(userId: string, payload: Record<string, string>) {
  await vapid();
  const { data: subs } = await sb.from('push_subs').select('*').eq('user_id', userId);
  let sent = 0;
  for (const s of subs || []) {
    try {
      await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, JSON.stringify(payload), { TTL: 60 * 60 * 6 });
      sent++;
    } catch (e) {
      const code = (e as { statusCode?: number }).statusCode;
      if (code === 404 || code === 410) await sb.from('push_subs').delete().eq('id', s.id);
      else console.error('push fel', code, e);
    }
  }
  return sent;
}

const sthlm = (opts: Intl.DateTimeFormatOptions, locale = 'sv-SE') => new Intl.DateTimeFormat(locale, { timeZone: 'Europe/Stockholm', ...opts }).format(new Date());
const daysBetween = (a: string, b: string) => Math.round((new Date(b + 'T12:00').getTime() - new Date(a + 'T12:00').getTime()) / 864e5);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  const body = await req.json().catch(() => ({}));

  if (body.type === 'key') return json({ key: await vapid() });

  if (body.type === 'cheer') {
    const jwt = (req.headers.get('Authorization') || '').replace('Bearer ', '');
    const { data: { user } } = await sb.auth.getUser(jwt);
    if (!user) return json({ error: 'inte inloggad' }, 401);
    const since = new Date(Date.now() - 2 * 60 * 1000).toISOString();
    const { data: ch } = await sb.from('cheers').select('*').eq('from_id', user.id).eq('to_id', body.to)
      .gte('created_at', since).order('created_at', { ascending: false }).limit(1);
    if (!ch?.length) return json({ error: 'ingen pepp hittad' }, 404);
    const { data: from } = await sb.from('profiles').select('name').eq('id', user.id).single();
    const who = from?.name || 'en vän';
    // 👉 = puff: en påminnelse från en kompis om att öva i dag
    const title = ch[0].emoji === '👉' ? `👉 Puff från ${who} – påminnelse om att öva i dag` : `${ch[0].emoji} Pepp från ${who}`;
    const sent = await sendTo(body.to, { title, body: ch[0].message, url: './' });
    return json({ sent });
  }

  if (body.type === 'buddy') {
    const jwt = (req.headers.get('Authorization') || '').replace('Bearer ', '');
    const { data: { user } } = await sb.auth.getUser(jwt);
    if (!user) return json({ error: 'inte inloggad' }, 401);
    const today = sthlm({ year: 'numeric', month: '2-digit', day: '2-digit' });
    const { data: me } = await sb.from('profiles').select('id,name,state').eq('id', user.id).single();
    const mine: string[] = (me?.state?.buddies || []).slice(0, 3);
    if (!mine.length || me?.state?.lastActive !== today) return json({ sent: 0 });
    const { data: friends } = await sb.from('profiles').select('id,name,state').in('id', mine);
    let sent = 0;
    for (const f of friends || []) {
      const st = f.state || {};
      if (!(st.buddies || []).includes(user.id) || st.lastActive === today) continue;
      // Gemensam svit fram till i går
      const A = new Set(me.state.days || []), B = new Set(st.days || []);
      const d = new Date(today + 'T12:00'); d.setDate(d.getDate() - 1);
      let n = 0;
      while (n < 400) { const k = d.toISOString().slice(0, 10); if (!(A.has(k) && B.has(k))) break; n++; d.setDate(d.getDate() - 1); }
      sent += await sendTo(f.id, {
        title: `👯 ${me.name} har gjort sin lektion!`,
        body: n ? `Nu är det din tur – er kompissvit på ${n} ${n === 1 ? 'dag' : 'dagar'} hänger på dig.` : 'Nu är det din tur – gör en lektion så startar er kompissvit.',
        url: './',
      });
    }
    return json({ sent });
  }

  // Automatisk kvällspuff kl. 20.30: har kompisen övat i dag men inte du, får du en puff (högst en per dag)
  if (body.type === 'nudge') {
    const cronSecret = await secret('cron');
    if (!cronSecret || req.headers.get('x-cron-secret') !== cronSecret) return json({ error: 'nej' }, 401);
    const hour = Number(sthlm({ hour: '2-digit', hourCycle: 'h23' }, 'en-GB'));
    if (hour !== 20 && !body.force) return json({ sent: 0, hour });
    const today = sthlm({ year: 'numeric', month: '2-digit', day: '2-digit' });
    const { data: subs } = await sb.from('push_subs').select('user_id');
    const ids = [...new Set((subs || []).map((s) => s.user_id))];
    if (!ids.length) return json({ sent: 0 });
    const { data: profs } = await sb.from('profiles').select('id,name,state').in('id', ids);
    const buddyIds = [...new Set((profs || []).flatMap((p) => (p.state?.buddies || []).slice(0, 3)))];
    const { data: buds } = buddyIds.length ? await sb.from('profiles').select('id,name,state').in('id', buddyIds) : { data: [] };
    const byId = new Map((buds || []).map((b) => [b.id, b]));
    // Manuella puffar som redan skickats i dag (de senaste 20 timmarna = sedan strax efter midnatt)
    const since = new Date(Date.now() - 20 * 3600e3).toISOString();
    const { data: manual } = await sb.from('cheers').select('from_id,to_id').eq('emoji', '👉').gte('created_at', since);
    const done = new Set((manual || []).map((c) => c.from_id + '>' + c.to_id));
    let sent = 0;
    for (const p of profs || []) {
      const st = p.state || {};
      if (st.lastActive === today) continue;
      const waiting: { name: string; n: number }[] = [];
      for (const fid of (st.buddies || []).slice(0, 3)) {
        const f = byId.get(fid); const fs = f?.state || {};
        if (!f || !(fs.buddies || []).includes(p.id) || fs.lastActive !== today || done.has(fid + '>' + p.id)) continue;
        const A = new Set(st.days || []), B = new Set(fs.days || []);
        const d = new Date(today + 'T12:00'); d.setDate(d.getDate() - 1);
        let n = 0;
        while (n < 400) { const k = d.toISOString().slice(0, 10); if (!(A.has(k) && B.has(k))) break; n++; d.setDate(d.getDate() - 1); }
        waiting.push({ name: f.name || 'en kompis', n });
      }
      if (!waiting.length) continue;
      const names = waiting.map((w) => w.name).join(' och ');
      const best = Math.max(...waiting.map((w) => w.n));
      sent += await sendTo(p.id, {
        title: `👉 Puff från ${names} – påminnelse om att öva i dag`,
        body: best > 0 ? `Er kompissvit på ${best} ${best === 1 ? 'dag' : 'dagar'} hänger på dig 🔥 En kort lektion räcker.` : 'Gör en lektion i dag så startar er kompissvit 🔥',
        url: './',
      });
    }
    return json({ sent, hour });
  }

  if (body.type === 'cron') {
    const cronSecret = await secret('cron');
    if (!cronSecret || req.headers.get('x-cron-secret') !== cronSecret) return json({ error: 'nej' }, 401);
    const hour = Number(sthlm({ hour: '2-digit', hourCycle: 'h23' }, 'en-GB'));
    const today = sthlm({ year: 'numeric', month: '2-digit', day: '2-digit' });
    const { data: subs } = await sb.from('push_subs').select('user_id');
    const ids = [...new Set((subs || []).map((s) => s.user_id))];
    if (!ids.length) return json({ sent: 0 });
    const { data: profs } = await sb.from('profiles').select('id,name,state').in('id', ids);
    let sent = 0;
    for (const p of profs || []) {
      const st = p.state || {};
      // Var och en väljer sin egen tid i appen (förval kl. 19)
      const want = Number.isInteger(st.remindHour) ? st.remindHour : 19;
      if (hour !== want && !body.force) continue;
      if (st.lastActive === today) continue;
      let streak = 0;
      if (st.lastActive) {
        const gap = daysBetween(st.lastActive, today);
        streak = gap <= 1 || gap - 1 <= (st.freezes || 0) ? st.streak || 0 : 0;
      }
      // Antal ord och meningar som ska repeteras i dag
      const due = Object.values(st.srs || {}).filter((it: any) => it && it.due && it.due <= today).length;
      const rep = due ? `${due} ${due === 1 ? 'ord väntar' : 'ord och meningar väntar'} på repetition.` : '';
      const msg = streak > 0
        ? { title: `🔥 Din svit på ${streak} ${streak === 1 ? 'dag' : 'dagar'} är i fara!`, body: rep ? `${rep} En kort runda räcker.` : 'En lektion räcker – Madame Brioche håller en croissant varm åt dig.' }
        : due
          ? { title: `🧠 ${due} att repetera i dag`, body: 'Fem minuter i Port-Saint-Clément så sitter de bättre.' }
          : { title: '🥐 Bonjour !', body: 'Fem minuter franska i Port-Saint-Clément i dag?' };
      sent += await sendTo(p.id, { ...msg, url: './' });
    }
    return json({ sent, hour });
  }

  return json({ error: 'okänd typ' }, 400);
});
