export type CompatibilityStatus = "compatible" | "incompatible" | "caution";

export type IncompatibilityType = "physical" | "chemical" | "therapeutic" | "unknown";

export type Severity = "major" | "moderate" | "minor" | "n/a";

export type CareSetting = "icu" | "pediatrics" | "neonates" | "oncology" | "general";

export interface DrugRef {
  id: string;
  name: string;
  aliases: string[];
  drugClass: string;
}

export interface ConcentrationNote {
  drug: string;
  concentration: string;
  note: string;
}

export interface Reference {
  source:
    | "Trissel's IV Compatibility"
    | "King Guide to Parenteral Admixtures"
    | "Micromedex"
    | "ASHP"
    | "Published Study"
    | "Institutional Protocol"
    | "Other";
  citation: string;
  year?: number;
  url?: string;
}

export interface CompatibilityRecord {
  id: string;
  drugA: string;
  drugB: string;
  status: CompatibilityStatus;
  confidenceScore: number; // 0-100, evidence/confidence percentage
  type: IncompatibilityType;
  severity: Severity;
  mechanism: string;
  recommendedAction: string;
  alternativeAdministration: string;
  flushRecommendation: string;
  ySiteCompatible: boolean | "conditional" | "not-applicable";
  ySiteNotes?: string;
  concentrationDependent: boolean;
  concentrationNotes?: ConcentrationNote[];
  careSettings: CareSetting[];
  careSettingNotes?: Partial<Record<CareSetting, string>>;
  references: Reference[];
  lastReviewed: string; // ISO date
  reviewedBy?: string;
}

export interface SearchFilters {
  careSetting?: CareSetting | "all";
}
