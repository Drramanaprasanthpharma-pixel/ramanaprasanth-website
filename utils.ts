import { CareSetting, CompatibilityStatus, Severity } from "@/lib/types";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const STATUS_LABEL: Record<CompatibilityStatus, string> = {
  compatible: "Compatible",
  incompatible: "Incompatible",
  caution: "Use with Caution / Limited Data",
};

export const STATUS_ICON: Record<CompatibilityStatus, string> = {
  compatible: "✅",
  incompatible: "❌",
  caution: "⚠️",
};

export const SEVERITY_LABEL: Record<Severity, string> = {
  major: "Major",
  moderate: "Moderate",
  minor: "Minor",
  "n/a": "N/A",
};

export const CARE_SETTING_LABEL: Record<CareSetting, string> = {
  icu: "ICU",
  pediatrics: "Pediatrics",
  neonates: "Neonates",
  oncology: "Oncology",
  general: "General Ward",
};

export function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function confidenceTier(score: number): "high" | "medium" | "low" {
  if (score >= 85) return "high";
  if (score >= 65) return "medium";
  return "low";
}
