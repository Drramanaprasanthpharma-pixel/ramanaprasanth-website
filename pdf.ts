import { jsPDF } from "jspdf";
import { CompatibilityRecord } from "@/lib/types";
import { CARE_SETTING_LABEL, SEVERITY_LABEL, STATUS_LABEL, formatDate } from "@/lib/utils";

export function generateCompatibilityPdf(record: CompatibilityRecord, hospitalName?: string) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const marginX = 48;
  let y = 56;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - marginX * 2;

  const line = (h = 16) => {
    y += h;
  };
  const heading = (text: string, size = 11) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(size);
    doc.setTextColor(11, 61, 92);
    doc.text(text, marginX, y);
    line(size + 6);
  };
  const body = (text: string, size = 10) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    doc.setTextColor(30, 41, 51);
    const wrapped = doc.splitTextToSize(text || "-", maxWidth);
    doc.text(wrapped, marginX, y);
    line(wrapped.length * (size + 3) + 6);
  };
  const ensureSpace = (needed = 60) => {
    if (y + needed > doc.internal.pageSize.getHeight() - 48) {
      doc.addPage();
      y = 56;
    }
  };

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(11, 61, 92);
  doc.text(hospitalName || "Clinical Pharmacy - IV Compatibility Report", marginX, y);
  line(20);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(90, 100, 110);
  doc.text(`Generated ${new Date().toLocaleString()}`, marginX, y);
  line(18);
  doc.setDrawColor(225, 231, 235);
  doc.line(marginX, y, pageWidth - marginX, y);
  line(20);

  // Title / status
  heading(`${record.drugA} + ${record.drugB}`, 14);
  body(`Status: ${STATUS_LABEL[record.status]}   |   Confidence: ${record.confidenceScore}%   |   Severity: ${SEVERITY_LABEL[record.severity]}`);
  body(`Type: ${record.type}   |   Y-site compatible: ${String(record.ySiteCompatible)}   |   Concentration-dependent: ${record.concentrationDependent ? "Yes" : "No"}`);
  line(4);

  ensureSpace();
  heading("Mechanism of Incompatibility");
  body(record.mechanism);

  ensureSpace();
  heading("Recommended Action");
  body(record.recommendedAction);

  ensureSpace();
  heading("Alternative Administration");
  body(record.alternativeAdministration);

  ensureSpace();
  heading("Flush Recommendation");
  body(record.flushRecommendation);

  if (record.ySiteNotes) {
    ensureSpace();
    heading("Y-Site Notes");
    body(record.ySiteNotes);
  }

  if (record.concentrationNotes?.length) {
    ensureSpace();
    heading("Concentration-Dependent Notes");
    record.concentrationNotes.forEach((n) => body(`- ${n.drug} (${n.concentration}): ${n.note}`));
  }

  ensureSpace();
  heading("Applicable Care Settings");
  body(record.careSettings.map((c) => CARE_SETTING_LABEL[c]).join(", ") || "General");

  if (record.careSettingNotes) {
    Object.entries(record.careSettingNotes).forEach(([k, v]) => {
      if (v) body(`${CARE_SETTING_LABEL[k as keyof typeof CARE_SETTING_LABEL]}: ${v}`, 9);
    });
  }

  ensureSpace();
  heading("References");
  record.references.forEach((r) => body(`- ${r.source}${r.year ? ` (${r.year})` : ""}: ${r.citation}`, 9));

  ensureSpace();
  heading("Review Information");
  body(`Last reviewed: ${formatDate(record.lastReviewed)}${record.reviewedBy ? ` by ${record.reviewedBy}` : ""}`, 9);

  line(24);
  ensureSpace();
  doc.setDrawColor(225, 231, 235);
  doc.line(marginX, y, pageWidth - marginX, y);
  line(14);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(120, 130, 140);
  const disclaimer = doc.splitTextToSize(
    "This report is a clinical decision-support reference and does not replace pharmacist judgment, your institution's approved protocols, or primary literature (Trissel's, King Guide, Micromedex, ASHP). Verify high-risk combinations before administration.",
    maxWidth
  );
  doc.text(disclaimer, marginX, y);

  doc.save(`IV-Compatibility_${record.drugA}_${record.drugB}.pdf`.replace(/\s+/g, "-"));
}
