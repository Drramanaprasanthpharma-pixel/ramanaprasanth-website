/**
 * Dev-only utility: prints INSERT statements for supabase/seed.sql, generated
 * from src/lib/data/interactions.ts, so teams that prefer running raw SQL
 * (instead of `npm run seed`) have an equivalent file. Not used by the app.
 *
 * Usage: npx tsx scripts/generate-seed-sql.ts > supabase/seed.sql
 */
import { SEED_INTERACTIONS } from "../src/lib/data/interactions";
import { toRow } from "../src/lib/repository";

function sqlStr(v: unknown) {
  if (v === null || v === undefined) return "NULL";
  return `'${String(v).replace(/'/g, "''")}'`;
}
function sqlJson(v: unknown) {
  if (v === null || v === undefined) return "NULL";
  return `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb`;
}
function sqlArray(v: string[]) {
  return `ARRAY[${v.map((s) => sqlStr(s)).join(", ")}]::text[]`;
}

const lines: string[] = [
  "-- Auto-generated from src/lib/data/interactions.ts. Run in the Supabase SQL editor",
  "-- as an alternative to `npm run seed`. Safe to re-run (upserts by id).",
  "",
];

for (const record of SEED_INTERACTIONS) {
  const row = toRow(record);
  lines.push(
    `insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)`,
    `values (${sqlStr(row.id)}, ${sqlStr(row.drug_a)}, ${sqlStr(row.drug_b)}, ${sqlStr(row.status)}, ${row.confidence_score}, ${sqlStr(
      row.type
    )}, ${sqlStr(row.severity)}, ${sqlStr(row.mechanism)}, ${sqlStr(row.recommended_action)}, ${sqlStr(
      row.alternative_administration
    )}, ${sqlStr(row.flush_recommendation)}, ${sqlStr(row.y_site_compatible)}, ${sqlStr(row.y_site_notes)}, ${row.concentration_dependent}, ${sqlJson(
      row.concentration_notes
    )}, ${sqlArray(row.care_settings)}, ${sqlJson(row.care_setting_notes)}, ${sqlJson(row.reference_list)}, ${sqlStr(
      row.last_reviewed
    )}, ${sqlStr(row.reviewed_by)})`,
    `on conflict (id) do update set`,
    `  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,`,
    `  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,`,
    `  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,`,
    `  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,`,
    `  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,`,
    `  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,`,
    `  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,`,
    `  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;`,
    ""
  );
}

console.log(lines.join("\n"));
