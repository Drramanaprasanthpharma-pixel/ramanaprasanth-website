-- Clinical Pharmacy SRH: IV Compatibility Checker
-- Run this in the Supabase SQL editor (or via `psql`) before seeding data.

create table if not exists compatibility_records (
  id text primary key,
  drug_a text not null,
  drug_b text not null,
  status text not null check (status in ('compatible', 'incompatible', 'caution')),
  confidence_score integer not null check (confidence_score between 0 and 100),
  type text not null check (type in ('physical', 'chemical', 'therapeutic', 'unknown')),
  severity text not null check (severity in ('major', 'moderate', 'minor', 'n/a')),
  mechanism text not null,
  recommended_action text not null,
  alternative_administration text not null,
  flush_recommendation text not null,
  y_site_compatible text not null check (y_site_compatible in ('true', 'false', 'conditional', 'not-applicable')),
  y_site_notes text,
  concentration_dependent boolean not null default false,
  concentration_notes jsonb,
  care_settings text[] not null default '{}',
  care_setting_notes jsonb,
  reference_list jsonb not null default '[]',
  last_reviewed date not null,
  reviewed_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Case-insensitive lookup index for pair search
create index if not exists idx_compat_drug_a on compatibility_records (lower(drug_a));
create index if not exists idx_compat_drug_b on compatibility_records (lower(drug_b));

-- Keep updated_at current on every write
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_compat_updated_at on compatibility_records;
create trigger trg_compat_updated_at
  before update on compatibility_records
  for each row execute procedure set_updated_at();

-- Row Level Security: public read access, writes only via the service-role
-- key used by the server-side API routes (never exposed to the browser).
alter table compatibility_records enable row level security;

drop policy if exists "Public read access" on compatibility_records;
create policy "Public read access"
  on compatibility_records for select
  using (true);

-- No insert/update/delete policy is created for the anon/public role, so
-- writes are only possible using the service_role key from API routes.

-- Optional: formulary table if you want to manage the drug list in the DB
-- instead of src/lib/data/drugs.ts.
create table if not exists drugs (
  id text primary key,
  name text not null,
  aliases text[] not null default '{}',
  drug_class text not null
);

alter table drugs enable row level security;
drop policy if exists "Public read access drugs" on drugs;
create policy "Public read access drugs"
  on drugs for select
  using (true);
