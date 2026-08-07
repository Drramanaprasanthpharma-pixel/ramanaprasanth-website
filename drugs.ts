import { DrugRef } from "@/lib/types";

// A starter formulary of common IV drugs. Extend via the admin panel or by
// editing this list / the `drugs` table in Supabase.
export const DRUGS: DrugRef[] = [
  { id: "ceftriaxone", name: "Ceftriaxone", aliases: ["Rocephin"], drugClass: "Cephalosporin antibiotic" },
  { id: "calcium-gluconate", name: "Calcium Gluconate", aliases: ["Calcium"], drugClass: "Electrolyte" },
  { id: "calcium-chloride", name: "Calcium Chloride", aliases: [], drugClass: "Electrolyte" },
  { id: "phenytoin", name: "Phenytoin", aliases: ["Dilantin"], drugClass: "Anticonvulsant" },
  { id: "furosemide", name: "Furosemide", aliases: ["Lasix"], drugClass: "Loop diuretic" },
  { id: "vancomycin", name: "Vancomycin", aliases: ["Vancocin"], drugClass: "Glycopeptide antibiotic" },
  { id: "heparin", name: "Heparin Sodium", aliases: ["Heparin"], drugClass: "Anticoagulant" },
  { id: "amiodarone", name: "Amiodarone", aliases: ["Cordarone"], drugClass: "Antiarrhythmic" },
  { id: "sodium-bicarbonate", name: "Sodium Bicarbonate", aliases: ["Bicarb"], drugClass: "Alkalinizing agent" },
  { id: "dopamine", name: "Dopamine", aliases: ["Intropin"], drugClass: "Vasopressor / inotrope" },
  { id: "propofol", name: "Propofol", aliases: ["Diprivan"], drugClass: "Sedative-hypnotic" },
  { id: "diazepam", name: "Diazepam", aliases: ["Valium"], drugClass: "Benzodiazepine" },
  { id: "midazolam", name: "Midazolam", aliases: ["Versed"], drugClass: "Benzodiazepine" },
  { id: "insulin-regular", name: "Insulin Regular (Human)", aliases: ["Insulin"], drugClass: "Antidiabetic hormone" },
  { id: "piperacillin-tazobactam", name: "Piperacillin-Tazobactam", aliases: ["Zosyn"], drugClass: "Penicillin/beta-lactamase inhibitor" },
  { id: "gentamicin", name: "Gentamicin", aliases: [], drugClass: "Aminoglycoside antibiotic" },
  { id: "magnesium-sulfate", name: "Magnesium Sulfate", aliases: ["MgSO4"], drugClass: "Electrolyte" },
  { id: "potassium-chloride", name: "Potassium Chloride", aliases: ["KCl"], drugClass: "Electrolyte" },
  { id: "ondansetron", name: "Ondansetron", aliases: ["Zofran"], drugClass: "Antiemetic (5-HT3 antagonist)" },
  { id: "norepinephrine", name: "Norepinephrine", aliases: ["Levophed"], drugClass: "Vasopressor" },
  { id: "dexamethasone", name: "Dexamethasone", aliases: ["Decadron"], drugClass: "Corticosteroid" },
  { id: "pantoprazole", name: "Pantoprazole", aliases: ["Protonix"], drugClass: "Proton pump inhibitor" },
  { id: "metronidazole", name: "Metronidazole", aliases: ["Flagyl"], drugClass: "Antibiotic (nitroimidazole)" },
  { id: "labetalol", name: "Labetalol", aliases: ["Trandate"], drugClass: "Beta-blocker" },
  { id: "morphine", name: "Morphine Sulfate", aliases: [], drugClass: "Opioid analgesic" },
  { id: "cisplatin", name: "Cisplatin", aliases: [], drugClass: "Antineoplastic (alkylating-like)" },
  { id: "doxorubicin", name: "Doxorubicin", aliases: ["Adriamycin"], drugClass: "Antineoplastic (anthracycline)" },
  { id: "mannitol", name: "Mannitol", aliases: [], drugClass: "Osmotic diuretic" },
  { id: "total-parenteral-nutrition", name: "Total Parenteral Nutrition (TPN)", aliases: ["TPN", "3-in-1"], drugClass: "Nutrition admixture" },
  { id: "sodium-chloride-0.9", name: "Sodium Chloride 0.9%", aliases: ["Normal Saline", "NS"], drugClass: "IV fluid / diluent" },
];

export function findDrug(query: string): DrugRef | undefined {
  const q = query.trim().toLowerCase();
  return DRUGS.find(
    (d) => d.name.toLowerCase() === q || d.aliases.some((a) => a.toLowerCase() === q)
  );
}

export function searchDrugs(query: string, limit = 8): DrugRef[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return DRUGS.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.aliases.some((a) => a.toLowerCase().includes(q))
  ).slice(0, limit);
}
