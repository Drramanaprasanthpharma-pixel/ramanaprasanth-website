"use client";

import { useState } from "react";
import { AlertTriangle, ArrowRightLeft, Loader2, SearchX } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DrugAutocomplete } from "@/components/DrugAutocomplete";
import { FilterPanel } from "@/components/FilterPanel";
import { ResultCard } from "@/components/ResultCard";
import { EmptyState } from "@/components/EmptyState";
import { CareSetting, CompatibilityRecord } from "@/lib/types";
import { CARE_SETTING_LABEL, cx } from "@/lib/utils";

type SearchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "found"; record: CompatibilityRecord }
  | { status: "not-found" }
  | { status: "error"; message: string };

export default function HomePage() {
  const [drugA, setDrugA] = useState("");
  const [drugB, setDrugB] = useState("");
  const [careSetting, setCareSetting] = useState<CareSetting | "all">("all");
  const [search, setSearch] = useState<SearchState>({ status: "idle" });

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!drugA.trim()) return;

    setSearch({ status: "loading" });
    try {
      const params = new URLSearchParams({ drugA: drugA.trim() });
      if (drugB.trim()) params.set("drugB", drugB.trim());

      const res = await fetch(`/api/interactions/search?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        setSearch({ status: "error", message: data.error ?? "Search failed" });
        return;
      }
      if (!data.record) {
        setSearch({ status: "not-found" });
        return;
      }
      setSearch({ status: "found", record: data.record });
    } catch {
      setSearch({ status: "error", message: "Network error - please try again." });
    }
  }

  const filteredRecord =
    search.status === "found" &&
    careSetting !== "all" &&
    !search.record.careSettings.includes(careSetting)
      ? null
      : search.status === "found"
      ? search.record
      : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:py-12">
        <div className="no-print mb-8 max-w-2xl">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-clinical-teal">
            Hospital IV admixture reference
          </p>
          <h1 className="text-2xl font-semibold text-clinical-ink sm:text-3xl">
            Check IV drug compatibility before you mix, push, or Y-site.
          </h1>
          <p className="mt-2 text-sm text-clinical-muted">
            Search one drug for its general profile, or two drugs to check physical, chemical,
            and therapeutic compatibility with an evidence-based confidence score.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="no-print rounded-card border border-clinical-border bg-white p-5 shadow-card sm:p-6"
        >
          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-end">
            <DrugAutocomplete
              label="Drug 1"
              placeholder="e.g., Ceftriaxone"
              value={drugA}
              onChange={setDrugA}
              autoFocus
            />
            <div className="hidden pb-2.5 text-clinical-muted sm:block">
              <ArrowRightLeft className="h-4 w-4" />
            </div>
            <DrugAutocomplete
              label="Drug 2 (optional)"
              placeholder="e.g., Calcium Gluconate"
              value={drugB}
              onChange={setDrugB}
            />
            <button
              type="submit"
              disabled={!drugA.trim() || search.status === "loading"}
              className="flex h-[42px] items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-clinical-teal px-6 text-sm font-semibold text-white transition-colors hover:bg-clinical-tealDeep disabled:cursor-not-allowed disabled:opacity-50"
            >
              {search.status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Check Compatibility"
              )}
            </button>
          </div>

          <div className="mt-5 border-t border-clinical-border pt-4">
            <FilterPanel active={careSetting} onChange={setCareSetting} />
          </div>
        </form>

        <div className="mt-8">
          {search.status === "idle" && (
            <EmptyState
              icon={SearchX}
              title="No search yet"
              description="Enter one or two IV drugs above and select Check Compatibility to see the full clinical profile."
            />
          )}

          {search.status === "not-found" && (
            <EmptyState
              icon={AlertTriangle}
              title="No record on file for this pair"
              description="This combination isn't in the database yet. Treat as limited data / use with caution, consult a pharmacist, and consider adding it via the admin panel once verified."
            />
          )}

          {search.status === "error" && (
            <EmptyState icon={AlertTriangle} title="Something went wrong" description={search.message} />
          )}

          {search.status === "found" && !filteredRecord && (
            <EmptyState
              icon={AlertTriangle}
              title={`No specific guidance filed for ${CARE_SETTING_LABEL[careSetting as CareSetting]}`}
              description="A record exists for this pair but has no notes for the selected care setting. Clear the filter to see the general record, and confirm with a pharmacist for this population."
            />
          )}

          {filteredRecord && <ResultCard record={filteredRecord} />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
