/**
 * Pushes the starter dataset (src/lib/data/interactions.ts) into Supabase.
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your
 * environment (e.g. via `.env.local`, loaded by `dotenv` below).
 *
 * Usage: npm run seed
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { SEED_INTERACTIONS } from "../src/lib/data/interactions";
import { toRow } from "../src/lib/repository";

config({ path: ".env.local" });

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Set them in .env.local and re-run with `dotenv -e .env.local -- npm run seed`, or export them in your shell."
    );
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey);
  const rows = SEED_INTERACTIONS.map(toRow);

  const { error, count } = await supabase
    .from("compatibility_records")
    .upsert(rows, { onConflict: "id", count: "exact" });

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`Seeded ${count ?? rows.length} compatibility records.`);
}

main();
