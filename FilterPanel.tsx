"use client";

import { CareSetting } from "@/lib/types";
import { CARE_SETTING_LABEL, cx } from "@/lib/utils";

const OPTIONS: CareSetting[] = ["icu", "pediatrics", "neonates", "oncology"];

interface Props {
  active: CareSetting | "all";
  onChange: (value: CareSetting | "all") => void;
}

export function FilterPanel({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-clinical-muted">
        Care setting
      </span>
      <button
        type="button"
        onClick={() => onChange("all")}
        className={cx(
          "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
          active === "all"
            ? "border-clinical-navy bg-clinical-navy text-white"
            : "border-clinical-border bg-white text-clinical-muted hover:border-clinical-teal hover:text-clinical-teal"
        )}
      >
        All settings
      </button>
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cx(
            "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
            active === opt
              ? "border-clinical-navy bg-clinical-navy text-white"
              : "border-clinical-border bg-white text-clinical-muted hover:border-clinical-teal hover:text-clinical-teal"
          )}
        >
          {CARE_SETTING_LABEL[opt]}
        </button>
      ))}
    </div>
  );
}
