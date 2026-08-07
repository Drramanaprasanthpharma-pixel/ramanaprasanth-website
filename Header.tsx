import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Header() {
  return (
    <header className="no-print border-b border-clinical-border bg-clinical-navy">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-clinical-teal">
            <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.25} />
          </div>
          <div className="leading-tight">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-clinical-teal">
              Clinical Pharmacy SRH
            </p>
            <p className="text-sm font-semibold text-white">IV Compatibility Checker</p>
          </div>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-white/85">
          <Link href="/" className="hover:text-white">
            Checker
          </Link>
          <Link href="/admin" className="hover:text-white">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
