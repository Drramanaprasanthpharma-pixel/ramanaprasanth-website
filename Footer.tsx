export function Footer() {
  return (
    <footer className="no-print mt-16 border-t border-clinical-border bg-white">
      <div className="mx-auto max-w-6xl px-5 py-6 text-xs leading-relaxed text-clinical-muted">
        <p>
          This tool is a clinical decision-support reference for hospital pharmacy and nursing
          staff. It does not replace pharmacist judgment, your institution&apos;s approved
          protocols, or primary literature (Trissel&apos;s Handbook on Injectable Drugs, King
          Guide to Parenteral Admixtures, Micromedex, ASHP guidance). Always verify high-risk
          combinations before administration.
        </p>
      </div>
    </footer>
  );
}
