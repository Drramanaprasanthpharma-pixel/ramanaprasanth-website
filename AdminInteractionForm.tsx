"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  CareSetting,
  CompatibilityRecord,
  CompatibilityStatus,
  IncompatibilityType,
  Reference,
  Severity,
} from "@/lib/types";
import { cx } from "@/lib/utils";

const EMPTY: Omit<CompatibilityRecord, "id"> = {
  drugA: "",
  drugB: "",
  status: "caution",
  confidenceScore: 70,
  type: "physical",
  severity: "moderate",
  mechanism: "",
  recommendedAction: "",
  alternativeAdministration: "",
  flushRecommendation: "",
  ySiteCompatible: "conditional",
  ySiteNotes: "",
  concentrationDependent: false,
  concentrationNotes: [],
  careSettings: [],
  careSettingNotes: {},
  references: [{ source: "Institutional Protocol", citation: "" }],
  lastReviewed: new Date().toISOString().slice(0, 10),
  reviewedBy: "",
};

const CARE_OPTIONS: CareSetting[] = ["icu", "pediatrics", "neonates", "oncology", "general"];
const REFERENCE_SOURCES: Reference["source"][] = [
  "Trissel's IV Compatibility",
  "King Guide to Parenteral Admixtures",
  "Micromedex",
  "ASHP",
  "Published Study",
  "Institutional Protocol",
  "Other",
];

interface Props {
  initial?: CompatibilityRecord;
  adminCode: string;
  onSaved: () => void;
  onCancel: () => void;
}

function fieldClass(extra = "") {
  return cx(
    "w-full rounded-md border border-clinical-border bg-white px-3 py-2 text-sm focus:border-clinical-teal focus:outline-none focus:ring-2 focus:ring-clinical-teal/20",
    extra
  );
}

export function AdminInteractionForm({ initial, adminCode, onSaved, onCancel }: Props) {
  const [form, setForm] = useState<Omit<CompatibilityRecord, "id">>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleCareSetting(setting: CareSetting) {
    const has = form.careSettings.includes(setting);
    update(
      "careSettings",
      has ? form.careSettings.filter((s) => s !== setting) : [...form.careSettings, setting]
    );
  }

  function updateReference(i: number, patch: Partial<Reference>) {
    const next = [...form.references];
    next[i] = { ...next[i], ...patch };
    update("references", next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const url = initial ? `/api/interactions/${initial.id}` : "/api/interactions";
    const method = initial ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "x-admin-code": adminCode },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Save failed");
        return;
      }
      onSaved();
    } catch {
      setError("Network error - please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-card border border-clinical-border bg-white p-6 shadow-card">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-clinical-muted">Drug A</label>
          <input required className={fieldClass()} value={form.drugA} onChange={(e) => update("drugA", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-clinical-muted">Drug B</label>
          <input required className={fieldClass()} value={form.drugB} onChange={(e) => update("drugB", e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-clinical-muted">Status</label>
          <select
            className={fieldClass()}
            value={form.status}
            onChange={(e) => update("status", e.target.value as CompatibilityStatus)}
          >
            <option value="compatible">Compatible</option>
            <option value="incompatible">Incompatible</option>
            <option value="caution">Caution / Limited data</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-clinical-muted">Confidence %</label>
          <input
            type="number"
            min={0}
            max={100}
            className={fieldClass()}
            value={form.confidenceScore}
            onChange={(e) => update("confidenceScore", Number(e.target.value))}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-clinical-muted">Type</label>
          <select
            className={fieldClass()}
            value={form.type}
            onChange={(e) => update("type", e.target.value as IncompatibilityType)}
          >
            <option value="physical">Physical</option>
            <option value="chemical">Chemical</option>
            <option value="therapeutic">Therapeutic</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-clinical-muted">Severity</label>
          <select
            className={fieldClass()}
            value={form.severity}
            onChange={(e) => update("severity", e.target.value as Severity)}
          >
            <option value="major">Major</option>
            <option value="moderate">Moderate</option>
            <option value="minor">Minor</option>
            <option value="n/a">N/A</option>
          </select>
        </div>
      </div>

      {(
        [
          ["mechanism", "Mechanism of Incompatibility"],
          ["recommendedAction", "Recommended Action"],
          ["alternativeAdministration", "Alternative Administration"],
          ["flushRecommendation", "Flush Recommendation"],
        ] as const
      ).map(([key, label]) => (
        <div key={key}>
          <label className="mb-1 block text-xs font-semibold uppercase text-clinical-muted">{label}</label>
          <textarea
            required
            rows={2}
            className={fieldClass()}
            value={form[key]}
            onChange={(e) => update(key, e.target.value)}
          />
        </div>
      ))}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-clinical-muted">Y-site compatible</label>
          <select
            className={fieldClass()}
            value={String(form.ySiteCompatible)}
            onChange={(e) =>
              update(
                "ySiteCompatible",
                e.target.value === "true" ? true : e.target.value === "false" ? false : e.target.value === "not-applicable" ? "not-applicable" : "conditional"
              )
            }
          >
            <option value="true">Compatible</option>
            <option value="false">Not compatible</option>
            <option value="conditional">Conditional</option>
            <option value="not-applicable">Not applicable</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold uppercase text-clinical-muted">Y-site notes (optional)</label>
          <input className={fieldClass()} value={form.ySiteNotes ?? ""} onChange={(e) => update("ySiteNotes", e.target.value)} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="concDep"
          type="checkbox"
          checked={form.concentrationDependent}
          onChange={(e) => update("concentrationDependent", e.target.checked)}
          className="h-4 w-4 rounded border-clinical-border text-clinical-teal focus:ring-clinical-teal"
        />
        <label htmlFor="concDep" className="text-sm text-clinical-ink">
          Compatibility is concentration-dependent
        </label>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase text-clinical-muted">Applicable care settings</label>
        <div className="flex flex-wrap gap-2">
          {CARE_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => toggleCareSetting(opt)}
              className={cx(
                "rounded-full border px-3 py-1.5 text-xs font-medium",
                form.careSettings.includes(opt)
                  ? "border-clinical-navy bg-clinical-navy text-white"
                  : "border-clinical-border bg-white text-clinical-muted"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-semibold uppercase text-clinical-muted">References</label>
          <button
            type="button"
            onClick={() => update("references", [...form.references, { source: "Other", citation: "" }])}
            className="flex items-center gap-1 text-xs font-semibold text-clinical-teal"
          >
            <Plus className="h-3.5 w-3.5" /> Add reference
          </button>
        </div>
        <div className="space-y-2">
          {form.references.map((ref, i) => (
            <div key={i} className="flex items-center gap-2">
              <select
                className={fieldClass("w-48")}
                value={ref.source}
                onChange={(e) => updateReference(i, { source: e.target.value as Reference["source"] })}
              >
                {REFERENCE_SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input
                className={fieldClass()}
                placeholder="Citation detail"
                value={ref.citation}
                onChange={(e) => updateReference(i, { citation: e.target.value })}
              />
              <button
                type="button"
                onClick={() => update("references", form.references.filter((_, idx) => idx !== i))}
                className="rounded-md p-2 text-clinical-muted hover:bg-status-incompatibleBg hover:text-status-incompatible"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-clinical-muted">Last reviewed</label>
          <input
            type="date"
            className={fieldClass()}
            value={form.lastReviewed}
            onChange={(e) => update("lastReviewed", e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-clinical-muted">Reviewed by</label>
          <input className={fieldClass()} value={form.reviewedBy ?? ""} onChange={(e) => update("reviewedBy", e.target.value)} />
        </div>
      </div>

      {error && <p className="text-sm font-medium text-status-incompatible">{error}</p>}

      <div className="flex items-center gap-3 border-t border-clinical-border pt-5">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-clinical-teal px-5 py-2.5 text-sm font-semibold text-white hover:bg-clinical-tealDeep disabled:opacity-50"
        >
          {saving ? "Saving..." : initial ? "Save changes" : "Create record"}
        </button>
        <button type="button" onClick={onCancel} className="text-sm font-medium text-clinical-muted hover:text-clinical-ink">
          Cancel
        </button>
      </div>
    </form>
  );
}
