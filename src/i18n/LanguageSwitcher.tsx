"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { localeList } from "./config";
import { useI18n } from "./I18nProvider";

interface LanguageSwitcherProps {
  /** "light" for dark backgrounds (e.g. footer), "dark" for light headers. */
  variant?: "dark" | "light";
  /** Render as a full-width block (used inside the mobile menu). */
  block?: boolean;
}

export default function LanguageSwitcher({
  variant = "dark",
  block = false,
}: LanguageSwitcherProps) {
  const { locale, setLocale, meta } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const triggerBase =
    variant === "light"
      ? "text-slate-200 border-white/15 bg-white/5 hover:bg-white/10"
      : "text-slate-700 border-slate-200 bg-white hover:bg-slate-50 hover:text-emerald-600";

  return (
    <div ref={ref} className={`relative ${block ? "w-full" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className={`inline-flex items-center gap-1.5 rounded-xl border font-bold transition-all cursor-pointer ${triggerBase} ${
          block
            ? "w-full justify-between px-4 py-3 text-sm"
            : "px-2.5 sm:px-3 py-2 text-xs sm:text-sm"
        }`}
      >
        <span className="inline-flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="text-base leading-none">{meta.flag}</span>
          <span className={block ? "" : "hidden sm:inline"}>{meta.nativeLabel}</span>
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 opacity-70 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute z-[60] mt-2 min-w-[190px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10 animate-in fade-in slide-in-from-top-1 duration-150 ${
            block ? "left-0 right-0" : "end-0"
          }`}
        >
          {localeList.map((l) => {
            const active = l.code === locale;
            return (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setLocale(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                    active
                      ? "bg-emerald-50 text-emerald-700 font-bold"
                      : "text-slate-700 hover:bg-slate-50 font-semibold"
                  }`}
                >
                  <span className="text-lg leading-none">{l.flag}</span>
                  <span className="flex flex-col leading-tight">
                    <span>{l.nativeLabel}</span>
                    <span className="text-[11px] font-medium text-slate-400">
                      {l.label}
                    </span>
                  </span>
                  {active && <Check className="w-4 h-4 ms-auto text-emerald-600" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
