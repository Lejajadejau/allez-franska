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
