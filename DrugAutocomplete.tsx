"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { DrugRef } from "@/lib/types";
import { useDebounce } from "@/hooks/useDebounce";
import { cx } from "@/lib/utils";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
}

export function DrugAutocomplete({ label, placeholder, value, onChange, autoFocus }: Props) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<DrugRef[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounced = useDebounce(query, 150);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setQuery(value), [value]);

  useEffect(() => {
    if (!debounced.trim()) {
      setSuggestions([]);
      return;
    }
    let cancelled = false;
    fetch(`/api/drugs?q=${encodeURIComponent(debounced)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setSuggestions(data.results ?? []);
      })
      .catch(() => !cancelled && setSuggestions([]));
    return () => {
      cancelled = true;
    };
  }, [debounced]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function select(drug: DrugRef) {
    setQuery(drug.name);
    onChange(drug.name);
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      select(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative flex-1">
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-clinical-muted">
        {label}
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-clinical-muted" />
        <input
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          className="w-full rounded-lg border border-clinical-border bg-white py-2.5 pl-9 pr-8 text-sm text-clinical-ink placeholder:text-clinical-muted/70 focus:border-clinical-teal focus:outline-none focus:ring-2 focus:ring-clinical-teal/20"
        />
        {query && (
          <button
            type="button"
            aria-label={`Clear ${label}`}
            onClick={() => {
              setQuery("");
              onChange("");
              setSuggestions([]);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-clinical-muted hover:bg-clinical-bg"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-20 mt-1.5 max-h-64 w-full overflow-auto rounded-lg border border-clinical-border bg-white shadow-panel"
        >
          {suggestions.map((drug, i) => (
            <li key={drug.id} role="option" aria-selected={i === activeIndex}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => select(drug)}
                className={cx(
                  "flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left text-sm hover:bg-clinical-bg",
                  i === activeIndex && "bg-clinical-bg"
                )}
              >
                <span className="font-medium text-clinical-ink">{drug.name}</span>
                <span className="text-xs text-clinical-muted">
                  {drug.drugClass}
                  {drug.aliases.length > 0 ? ` · ${drug.aliases.join(", ")}` : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
