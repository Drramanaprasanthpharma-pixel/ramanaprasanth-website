import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IV Compatibility Checker | Clinical Pharmacy",
  description:
    "Hospital IV drug incompatibility and Y-site compatibility reference tool for ICU, pediatrics, neonatal, and oncology settings.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-clinical-bg text-clinical-ink antialiased">
        {children}
      </body>
    </html>
  );
}
