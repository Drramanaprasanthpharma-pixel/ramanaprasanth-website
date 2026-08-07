"use client";

import { Pencil, Trash2 } from "lucide-react";
import { CompatibilityRecord } from "@/lib/types";
import { STATUS_ICON, STATUS_LABEL, formatDate } from "@/lib/utils";

interface Props {
  records: CompatibilityRecord[];
  onEdit: (record: CompatibilityRecord) => void;
  onDelete: (record: CompatibilityRecord) => void;
}

export function AdminTable({ records, onEdit, onDelete }: Props) {
  if (records.length === 0) {
    return (
      <p className="rounded-card border border-dashed border-clinical-border bg-white p-8 text-center text-sm text-clinical-muted">
        No records yet. Create the first one above.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-card border border-clinical-border bg-white shadow-card">
      <table className="w-full text-left text-sm">
        <thead className="bg-clinical-bg text-xs uppercase tracking-wide text-clinical-muted">
          <tr>
            <th className="px-4 py-3">Pair</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Confidence</th>
            <th className="px-4 py-3">Severity</th>
            <th className="px-4 py-3">Reviewed</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id} className="border-t border-clinical-border">
              <td className="px-4 py-3 font-medium text-clinical-ink">
                {r.drugA} + {r.drugB}
              </td>
              <td className="px-4 py-3">
                {STATUS_ICON[r.status]} {STATUS_LABEL[r.status]}
              </td>
              <td className="px-4 py-3 font-mono">{r.confidenceScore}%</td>
              <td className="px-4 py-3 capitalize">{r.severity}</td>
              <td className="px-4 py-3 text-clinical-muted">{formatDate(r.lastReviewed)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(r)}
                    className="rounded-md p-1.5 text-clinical-muted hover:bg-clinical-bg hover:text-clinical-teal"
                    aria-label={`Edit ${r.drugA} + ${r.drugB}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(r)}
                    className="rounded-md p-1.5 text-clinical-muted hover:bg-status-incompatibleBg hover:text-status-incompatible"
                    aria-label={`Delete ${r.drugA} + ${r.drugB}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
