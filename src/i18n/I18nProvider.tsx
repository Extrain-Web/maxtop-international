"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  defaultLocale,
  dirOf,
  isLocale,
  LOCALE_STORAGE_KEY,
  localeMeta,
  type Direction,
  type Locale,
  type LocaleMeta,
} from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: Direction;
  /** Full translation dictionary for the active locale. */
  t: Dictionary;
  /** Metadata (label, flag, dir) for the active locale. */
  meta: LocaleMeta;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Always start from the default locale so the first client render matches
  // the server-rendered HTML (no hydration mismatch). The stored choice is
  // applied right after mount.
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // Apply the visitor's saved language once, after hydration.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isLocale(saved) && saved !== locale) {
        setLocaleState(saved);
      }
    } catch {
      /* localStorage unavailable (private mode, etc.) — keep default */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep <html lang/dir> and storage in sync with the active locale.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = dirOf(locale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      /* ignore persistence errors */
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      dir: dirOf(locale),
      t: dictionaries[locale],
      meta: localeMeta[locale],
    }),
    [locale, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Access the active locale, switcher, direction and translation dictionary. */
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within <I18nProvider>");
  }
  return ctx;
}
