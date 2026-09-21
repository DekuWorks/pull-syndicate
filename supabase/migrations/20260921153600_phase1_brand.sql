-- Sprint 1 public-content schema. Commerce tables arrive in Phase 2.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role text not null default 'member' check (role in ('member', 'admin')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  location text,
  start_time timestamptz not null,
  end_time timestamptz,
  image text,
  event_url text,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  user_agent text,
  created_at timestamptz not null default now()
);

create table public.site_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text,
  body jsonb not null default '{}'::jsonb,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

create index events_published_start_idx on public.events (published, start_time);
create index events_slug_idx on public.events (slug);
create index site_content_published_idx on public.site_content (published, key);

create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger events_updated_at
before update on public.events
for each row execute function public.set_updated_at();

create trigger site_content_updated_at
before update on public.site_content
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.site_content enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy profiles_select_own
on public.profiles for select
using (auth.uid() = id);

create policy profiles_update_own
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id and role = (select p.role from public.profiles p where p.id = auth.uid()));

create policy events_public_read
on public.events for select
using (published = true);

create policy site_content_public_read
on public.site_content for select
using (published = true);

-- contact_submissions and newsletter_subscribers: no anon policies.
-- Edge Functions insert with the service role.
