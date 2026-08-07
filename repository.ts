import { getSupabaseServerClient } from "@/lib/supabase/server";
import { SEED_INTERACTIONS } from "@/lib/data/interactions";
import { CompatibilityRecord } from "@/lib/types";

// In-memory mutable copy used only when Supabase is not configured.
// NOTE: this resets on every server restart / cold start - it exists so the
// admin panel and API are exercisable in a local demo without a database.
// Configure Supabase for real, persistent hospital deployments.
const memoryStore: CompatibilityRecord[] = SEED_INTERACTIONS.map((r) => ({ ...r }));

function normalizePair(a: string, b: string) {
  return [a.trim().toLowerCase(), b.trim().toLowerCase()].sort();
}

export async function listInteractions(): Promise<CompatibilityRecord[]> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return memoryStore;

  const { data, error } = await supabase
    .from("compatibility_records")
    .select("*")
    .order("last_reviewed", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(fromRow);
}

export async function findInteraction(
  drugA: string,
  drugB: string
): Promise<CompatibilityRecord | null> {
  const [x, y] = normalizePair(drugA, drugB);
  const all = await listInteractions();
  return (
    all.find((r) => {
      const [rx, ry] = normalizePair(r.drugA, r.drugB);
      return rx === x && ry === y;
    }) ?? null
  );
}

export async function createInteraction(
  record: Omit<CompatibilityRecord, "id">
): Promise<CompatibilityRecord> {
  const id = `${slug(record.drugA)}_${slug(record.drugB)}_${Date.now()}`;
  const withId = { ...record, id };

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    memoryStore.unshift(withId);
    return withId;
  }

  const { data, error } = await supabase
    .from("compatibility_records")
    .insert(toRow(withId))
    .select()
    .single();

  if (error) throw new Error(error.message);
  return fromRow(data);
}

export async function updateInteraction(
  id: string,
  patch: Partial<CompatibilityRecord>
): Promise<CompatibilityRecord | null> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    const idx = memoryStore.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    memoryStore[idx] = { ...memoryStore[idx], ...patch };
    return memoryStore[idx];
  }

  const { data, error } = await supabase
    .from("compatibility_records")
    .update(toRow(patch as CompatibilityRecord))
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return fromRow(data);
}

export async function deleteInteraction(id: string): Promise<boolean> {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    const idx = memoryStore.findIndex((r) => r.id === id);
    if (idx === -1) return false;
    memoryStore.splice(idx, 1);
    return true;
  }

  const { error } = await supabase.from("compatibility_records").delete().eq("id", id);
  return !error;
}

function slug(s: string) {
  return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// --- Supabase row <-> domain model mapping (snake_case columns) ---

export function toRow(r: CompatibilityRecord) {
  return {
    id: r.id,
    drug_a: r.drugA,
    drug_b: r.drugB,
    status: r.status,
    confidence_score: r.confidenceScore,
    type: r.type,
    severity: r.severity,
    mechanism: r.mechanism,
    recommended_action: r.recommendedAction,
    alternative_administration: r.alternativeAdministration,
    flush_recommendation: r.flushRecommendation,
    y_site_compatible: String(r.ySiteCompatible),
    y_site_notes: r.ySiteNotes ?? null,
    concentration_dependent: r.concentrationDependent,
    concentration_notes: r.concentrationNotes ?? null,
    care_settings: r.careSettings,
    care_setting_notes: r.careSettingNotes ?? null,
    reference_list: r.references,
    last_reviewed: r.lastReviewed,
    reviewed_by: r.reviewedBy ?? null,
  };
}

function fromRow(row: any): CompatibilityRecord {
  const ySite =
    row.y_site_compatible === "true"
      ? true
      : row.y_site_compatible === "false"
      ? false
      : row.y_site_compatible === "not-applicable"
      ? "not-applicable"
      : "conditional";

  return {
    id: row.id,
    drugA: row.drug_a,
    drugB: row.drug_b,
    status: row.status,
    confidenceScore: row.confidence_score,
    type: row.type,
    severity: row.severity,
    mechanism: row.mechanism,
    recommendedAction: row.recommended_action,
    alternativeAdministration: row.alternative_administration,
    flushRecommendation: row.flush_recommendation,
    ySiteCompatible: ySite,
    ySiteNotes: row.y_site_notes ?? undefined,
    concentrationDependent: row.concentration_dependent,
    concentrationNotes: row.concentration_notes ?? undefined,
    careSettings: row.care_settings ?? [],
    careSettingNotes: row.care_setting_notes ?? undefined,
    references: row.reference_list ?? [],
    lastReviewed: row.last_reviewed,
    reviewedBy: row.reviewed_by ?? undefined,
  };
}
