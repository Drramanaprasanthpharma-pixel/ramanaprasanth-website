# Clinical Pharmacy SRH — IV Compatibility Checker

A hospital-grade reference tool for checking IV drug compatibility before
mixing, pushing, or Y-site co-administering medications. Built for pharmacy,
nursing, and ICU/NICU/oncology staff.

> ⚠️ **Clinical disclaimer**: This tool is a decision-support reference. It
> does not replace pharmacist judgment, your institution's approved
> protocols, or primary literature (Trissel's Handbook on Injectable Drugs,
> King Guide to Parenteral Admixtures, Micromedex, ASHP). The starter dataset
> shipped with this app is for demonstration and must be reviewed,
> corrected, and expanded by a licensed pharmacist before clinical use.

## Features

- Search by one or two IV drugs with autocomplete
- Color-coded result: ✅ Compatible / ❌ Incompatible / ⚠️ Caution / limited data
- Evidence confidence score (0–100%) shown as a circular gauge
- Full clinical detail per pair: mechanism, type (physical/chemical/
  therapeutic), severity, recommended action, alternative administration,
  flush recommendation, Y-site compatibility, concentration-dependence,
  references (Trissel's, King Guide, Micromedex, ASHP, published studies)
- Filters for ICU, Pediatrics, Neonates, Oncology
- Admin panel (access-code gated) to create/edit/delete records
- One-click PDF report generation + browser print stylesheet
- Fully responsive, keyboard-accessible UI
- Works immediately in a local "demo mode" against seed data — no database
  required to try it — and upgrades to persistent storage once Supabase is
  configured

## Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase (Postgres) ·
jsPDF · lucide-react

## Project structure

```
src/
  app/
    page.tsx                 Main search/checker page
    admin/page.tsx            Admin panel (access-code gated)
    api/
      drugs/route.ts          Autocomplete endpoint
      interactions/route.ts   List + create (admin)
      interactions/[id]/route.ts   Update + delete (admin)
      interactions/search/route.ts Pair lookup
  components/                 Reusable UI (search, filters, result card, admin form/table)
  lib/
    types.ts                  Domain model
    data/                     Formulary + starter compatibility dataset
    repository.ts             Supabase-or-in-memory data access layer
    supabase/                 Browser + server Supabase clients
    pdf.ts                    PDF report generator
    utils.ts, adminAuth.ts
  hooks/useDebounce.ts
supabase/schema.sql            Postgres schema + RLS policies
scripts/seed.ts                Pushes starter dataset into Supabase
```

## Getting started (demo mode, no database)

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without Supabase env vars set, the app runs
against the in-memory seed dataset in `src/lib/data/interactions.ts` — reads
work fully, and admin writes work for the life of the dev server (they reset
on restart). This is enough to try every feature end-to-end.

The admin panel is protected by `ADMIN_ACCESS_CODE`. Copy `.env.local.example`
to `.env.local` and set a real value before using the admin panel locally.

## Setting up persistent storage with Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase SQL editor, run `supabase/schema.sql`. This creates the
   `compatibility_records` table (and an optional `drugs` table) with row
   level security: public read access, and writes restricted to the
   service-role key (never exposed to the browser).
3. Copy `.env.local.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project
     Settings → API)
   - `SUPABASE_SERVICE_ROLE_KEY` (same page — keep this secret, server-only)
   - `ADMIN_ACCESS_CODE` — a passphrase for the admin panel
4. Seed the starter dataset:
   ```bash
   npm run seed
   ```
5. `npm run dev` (or deploy) — the app now reads/writes through Supabase
   automatically; no code changes needed.

## Deploying

Any Next.js host works (Vercel, Netlify, self-hosted Node). Set the same
environment variables from `.env.local` in your host's dashboard. Because
writes require the service-role key, make sure it is only ever set as a
server-side environment variable, never prefixed with `NEXT_PUBLIC_`.

## Extending the app

- **Add drugs to autocomplete**: edit `src/lib/data/drugs.ts`, or migrate to
  the optional `drugs` Supabase table and update `src/app/api/drugs/route.ts`
  to query it instead.
- **Add/correct compatibility records**: use the admin panel, or edit
  `src/lib/data/interactions.ts` (demo mode) / the Supabase table directly.
- **Replace the admin auth**: swap `src/lib/adminAuth.ts` and the admin
  login screen for Supabase Auth with a `pharmacist`/`admin` role and an
  audit log table — recommended before any real hospital deployment so
  every database change is attributed to a named, authenticated user.
- **Print layout**: `src/app/globals.css` has a `@media print` block and
  components use a `no-print` class to hide navigation/buttons when printing
  or exporting to PDF.

## Data quality note

Every seed record ships with a `confidenceScore`, `references`, and
`lastReviewed` date so the provenance of each claim is visible in the UI.
When adding new records via the admin panel, always cite a source
(Trissel's, King Guide, Micromedex, ASHP, a published study, or your
institution's own P&T-approved protocol) and have a second pharmacist review
before publishing, especially for `major` severity or neonatal/pediatric
entries.
