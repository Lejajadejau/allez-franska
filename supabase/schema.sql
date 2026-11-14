-- Allez ! – databas för topplista och pepp.
-- Klistra in allt i Supabase → SQL Editor → Run.

create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  name text not null default '',
  avatar text not null default '🦊',
  xp int not null default 0,
  week_key text not null default '',
  week_xp int not null default 0,
  streak int not null default 0,
  last_active date,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
drop policy if exists "alla inloggade ser profiler" on public.profiles;
drop policy if exists "skapa egen profil" on public.profiles;
drop policy if exists "uppdatera egen profil" on public.profiles;
create policy "alla inloggade ser profiler" on public.profiles for select to authenticated using (true);
create policy "skapa egen profil" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "uppdatera egen profil" on public.profiles for update to authenticated using (auth.uid() = id);

create table if not exists public.cheers (
  id bigint generated always as identity primary key,
  from_id uuid not null references public.profiles(id) on delete cascade,
  to_id uuid not null references public.profiles(id) on delete cascade,
  emoji text not null,
  message text not null,
  seen boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.cheers enable row level security;
drop policy if exists "se egna pepp" on public.cheers;
drop policy if exists "skicka pepp" on public.cheers;
drop policy if exists "markera pepp som läst" on public.cheers;
create policy "se egna pepp" on public.cheers for select to authenticated using (auth.uid() = to_id or auth.uid() = from_id);
create policy "skicka pepp" on public.cheers for insert to authenticated with check (auth.uid() = from_id);
create policy "markera pepp som läst" on public.cheers for update to authenticated using (auth.uid() = to_id);

-- Pushnotiser: en rad per telefon/webbläsare som har slagit på påminnelser
create table if not exists public.push_subs (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz not null default now()
);
alter table public.push_subs enable row level security;
drop policy if exists "egna prenumerationer" on public.push_subs;
create policy "egna prenumerationer" on public.push_subs for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Servernycklar (ingen policy = bara servern/service role kommer åt dem)
create table if not exists public.app_secrets (name text primary key, value text not null);
alter table public.app_secrets enable row level security;
insert into public.app_secrets (name, value) values ('cron', encode(extensions.gen_random_bytes(24), 'hex')) on conflict (name) do nothing;

-- Påminnelser: anropa funktionen varje hel timme (var och en påminns vid sin valda tid, förval kl. 19)
create extension if not exists pg_cron;
create extension if not exists pg_net;
select cron.schedule('allez-paminnelser', '0 * * * *', $$
  select net.http_post(
    url := 'https://yspfxxfaokpivyvyvojm.supabase.co/functions/v1/push',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-secret', (select value from public.app_secrets where name = 'cron')),
    body := '{"type":"cron"}'::jsonb
  );
$$);

-- Felrapporter från appen (anonyma). Alla får skicka, ingen kan läsa via appen.
create table if not exists public.app_errors (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  ver text check (char_length(ver) <= 40),
  msg text check (char_length(msg) <= 500),
  stack text check (char_length(stack) <= 2000),
  place text check (char_length(place) <= 200),
  ua text check (char_length(ua) <= 300)
);
alter table public.app_errors enable row level security;
drop policy if exists "skicka felrapport" on public.app_errors;
create policy "skicka felrapport" on public.app_errors for insert to anon, authenticated with check (true);
