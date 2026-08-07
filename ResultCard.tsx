"use client";

import { Download, FlaskConical, Printer, Syringe } from "lucide-react";
import { CompatibilityRecord } from "@/lib/types";
import {
  CARE_SETTING_LABEL,
  SEVERITY_LABEL,
  STATUS_ICON,
  STATUS_LABEL,
  cx,
  formatDate,
} from "@/lib/utils";
import { ConfidenceGauge } from "@/components/ConfidenceGauge";
import { generateCompatibilityPdf } from "@/lib/pdf";

const STATUS_STYLES: Record<CompatibilityRecord["status"], { border: string; bg: string; text: string; bar: string }> = {
  compatible: {
    border: "border-status-compatibleBorder",
    bg: "bg-status-compatibleBg",
    text: "text-status-compatible",
    bar: "bg-status-compatible",
  },
  incompatible: {
    border: "border-status-incompatibleBorder",
    bg: "bg-status-incompatibleBg",
    text: "text-status-incompatible",
    bar: "bg-status-incompatible",
  },
  caution: {
    border: "border-status-cautionBorder",
    bg: "bg-status-cautionBg",
    text: "text-status-caution",
    bar: "bg-status-caution",
  },
};

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-clinical-border/70 py-3 first:border-t-0 first:pt-0">
      <dt className="mb-1 font-mono text-[11px] uppercase tracking-wide text-clinical-muted">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-clinical-ink">{children}</dd>
    </div>
  );
}

export function ResultCard({ record }: { record: CompatibilityRecord }) {
  const styles = STATUS_STYLES[record.status];
  const hospitalName = process.env.NEXT_PUBLIC_HOSPITAL_NAME;

  return (
    <div
      id="result-card"
      className={cx("print-card overflow-hidden rounded-card border shadow-card", styles.border)}
    >
      <div className={cx("h-1.5 w-full", styles.bar)} />

      <div className={cx("flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between", styles.border, styles.bg)}>
        <div>
          <div className="mb-1 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-clinical-muted">
            <FlaskConical className="h-3.5 w-3.5" /> Compatibility Result
          </div>
          <h2 className="text-lg font-semibold text-clinical-ink sm:text-xl">
            {record.drugA} <span className="text-clinical-muted">+</span> {record.drugB}
          </h2>
          <p className={cx("mt-1.5 flex items-center gap-1.5 text-sm font-semibold", styles.text)}>
            <span>{STATUS_ICON[record.status]}</span>
            {STATUS_LABEL[record.status]}
            <span className="text-clinical-muted">
              &nbsp;· Severity: {SEVERITY_LABEL[record.severity]} · Type:{" "}
              {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ConfidenceGauge score={record.confidenceScore} />
          <div className="no-print flex flex-col gap-2">
            <button
              onClick={() => generateCompatibilityPdf(record, hospitalName)}
              className="flex items-center gap-1.5 rounded-md bg-clinical-navy px-3 py-2 text-xs font-semibold text-white hover:bg-clinical-navyDeep"
            >
              <Download className="h-3.5 w-3.5" /> Save PDF
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 rounded-md border border-clinical-border bg-white px-3 py-2 text-xs font-semibold text-clinical-ink hover:border-clinical-teal"
            >
              <Printer className="h-3.5 w-3.5" /> Print
            </button>
          </div>
        </div>
      </div>

      <dl className="grid grid-cols-1 gap-x-8 p-5 md:grid-cols-2">
        <div>
          <DetailRow label="Mechanism of Incompatibility">{record.mechanism}</DetailRow>
          <DetailRow label="Recommended Action">{record.recommendedAction}</DetailRow>
          <DetailRow label="Alternative Administration">{record.alternativeAdministration}</DetailRow>
          <DetailRow label="Flush Recommendation">{record.flushRecommendation}</DetailRow>
        </div>
        <div>
          <DetailRow label="Y-Site Compatibility">
            <span className="inline-flex items-center gap-1.5">
              <Syringe className="h-4 w-4 text-clinical-muted" />
              {typeof record.ySiteCompatible === "boolean"
                ? record.ySiteCompatible
                  ? "Compatible"
                  : "Not compatible"
                : record.ySiteCompatible === "not-applicable"
                ? "Not applicable"
                : "Conditional / verify concentration"}
            </span>
            {record.ySiteNotes && (
              <span className="mt-1 block text-xs text-clinical-muted">{record.ySiteNotes}</span>
            )}
          </DetailRow>

          <DetailRow label="Concentration-Dependent">
            {record.concentrationDependent ? "Yes" : "No"}
            {record.concentrationNotes?.length ? (
              <ul className="mt-1.5 space-y-1 text-xs text-clinical-muted">
                {record.concentrationNotes.map((n, i) => (
                  <li key={i}>
                    <span className="font-medium text-clinical-ink">{n.drug}</span> ({n.concentration}):{" "}
                    {n.note}
                  </li>
                ))}
              </ul>
            ) : null}
          </DetailRow>

          <DetailRow label="Applicable Care Settings">
            <div className="flex flex-wrap gap-1.5">
              {record.careSettings.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-clinical-border bg-clinical-bg px-2.5 py-0.5 text-xs font-medium text-clinical-ink"
                >
                  {CARE_SETTING_LABEL[s]}
                </span>
              ))}
            </div>
            {record.careSettingNotes && (
              <ul className="mt-2 space-y-1 text-xs text-clinical-muted">
                {Object.entries(record.careSettingNotes).map(([k, v]) =>
                  v ? (
                    <li key={k}>
                      <span className="font-medium text-clinical-ink">
                        {CARE_SETTING_LABEL[k as keyof typeof CARE_SETTING_LABEL]}:
                      </span>{" "}
                      {v}
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </DetailRow>

          <DetailRow label="References">
            <ul className="space-y-1 text-xs text-clinical-muted">
              {record.references.map((r, i) => (
                <li key={i}>
                  <span className="font-medium text-clinical-ink">{r.source}</span>
                  {r.year ? ` (${r.year})` : ""} — {r.citation}
                </li>
              ))}
            </ul>
          </DetailRow>
        </div>
      </dl>

      <div className="border-t border-clinical-border bg-clinical-bg px-5 py-2.5 font-mono text-[11px] text-clinical-muted">
        Last reviewed {formatDate(record.lastReviewed)}
        {record.reviewedBy ? ` by ${record.reviewedBy}` : ""}
      </div>
    </div>
  );
}
