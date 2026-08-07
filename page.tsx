"use client";

import { useEffect, useState } from "react";
import { Lock, Plus } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminTable } from "@/components/AdminTable";
import { AdminInteractionForm } from "@/components/AdminInteractionForm";
import { CompatibilityRecord } from "@/lib/types";

const STORAGE_KEY = "iv-checker-admin-code";

export default function AdminPage() {
  const [adminCode, setAdminCode] = useState<string | null>(null);
  const [codeInput, setCodeInput] = useState("");
  const [records, setRecords] = useState<CompatibilityRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<CompatibilityRecord | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? sessionStorage.getItem(STORAGE_KEY) : null;
    if (stored) setAdminCode(stored);
  }, []);

  useEffect(() => {
    if (adminCode) loadRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminCode]);

  async function loadRecords() {
    setLoading(true);
    try {
      const res = await fetch("/api/interactions");
      const data = await res.json();
      setRecords(data.records ?? []);
    } finally {
      setLoading(false);
    }
  }

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    sessionStorage.setItem(STORAGE_KEY, codeInput);
    setAdminCode(codeInput);
  }

  async function handleDelete(record: CompatibilityRecord) {
    if (!adminCode) return;
    if (!confirm(`Delete the record for ${record.drugA} + ${record.drugB}?`)) return;
    await fetch(`/api/interactions/${record.id}`, {
      method: "DELETE",
      headers: { "x-admin-code": adminCode },
    });
    loadRecords();
  }

  if (!adminCode) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-5 py-16 text-center">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-clinical-navy">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <h1 className="mb-1 text-lg font-semibold text-clinical-ink">Admin access</h1>
          <p className="mb-6 text-sm text-clinical-muted">
            Enter the pharmacy admin access code to manage the compatibility database.
          </p>
          <form onSubmit={handleUnlock} className="w-full space-y-3">
            <input
              type="password"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Access code"
              className="w-full rounded-lg border border-clinical-border px-3 py-2.5 text-sm focus:border-clinical-teal focus:outline-none focus:ring-2 focus:ring-clinical-teal/20"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-clinical-teal py-2.5 text-sm font-semibold text-white hover:bg-clinical-tealDeep"
            >
              Unlock admin panel
            </button>
          </form>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="mb-1 font-mono text-xs uppercase tracking-[0.14em] text-clinical-teal">
              Admin panel
            </p>
            <h1 className="text-2xl font-semibold text-clinical-ink">Compatibility database</h1>
          </div>
          {!creating && !editing && (
            <button
              onClick={() => setCreating(true)}
              className="flex items-center gap-1.5 rounded-lg bg-clinical-teal px-4 py-2.5 text-sm font-semibold text-white hover:bg-clinical-tealDeep"
            >
              <Plus className="h-4 w-4" /> New record
            </button>
          )}
        </div>

        {(creating || editing) && (
          <div className="mb-8">
            <AdminInteractionForm
              key={editing?.id ?? "new"}
              initial={editing ?? undefined}
              adminCode={adminCode}
              onSaved={() => {
                setCreating(false);
                setEditing(null);
                loadRecords();
              }}
              onCancel={() => {
                setCreating(false);
                setEditing(null);
              }}
            />
          </div>
        )}

        {loading ? (
          <p className="text-sm text-clinical-muted">Loading records…</p>
        ) : (
          <AdminTable records={records} onEdit={setEditing} onDelete={handleDelete} />
        )}
      </main>
      <Footer />
    </div>
  );
}
