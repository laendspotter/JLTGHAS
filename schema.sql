-- JLTG Stuttgart Schema — paste into Supabase SQL editor

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  room_code text unique not null,
  status text not null default 'lobby',
  hiding_duration_min int not null default 60,
  time_started timestamptz,
  time_ended timestamptz,
  bonus_time_min int not null default 0,
  created_at timestamptz default now()
);

create table if not exists players (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id) on delete cascade,
  name text not null,
  role text not null,
  client_id text not null,
  lat double precision,
  lng double precision,
  location_updated_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id) on delete cascade,
  category text not null,
  question_text text not null,
  draw_count int not null default 1,
  keep_count int not null default 1,
  status text not null default 'pending',
  answer boolean,
  photo_url text,
  created_at timestamptz default now()
);

create table if not exists deck (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references sessions(id) on delete cascade,
  card_id int not null,
  card_category text not null,
  card_name text not null,
  card_text text not null,
  card_value int,
  status text not null default 'hand',
  played_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists card_offers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references questions(id) on delete cascade,
  session_id uuid references sessions(id) on delete cascade,
  card_id int not null,
  card_category text not null,
  card_name text not null,
  card_text text not null,
  card_value int,
  chosen boolean default false,
  created_at timestamptz default now()
);

-- enable realtime
alter publication supabase_realtime add table sessions;
alter publication supabase_realtime add table players;
alter publication supabase_realtime add table questions;
alter publication supabase_realtime add table deck;
alter publication supabase_realtime add table card_offers;

-- disable RLS for now
alter table sessions disable row level security;
alter table players disable row level security;
alter table questions disable row level security;
alter table deck disable row level security;
alter table card_offers disable row level security;
