// Central i18n configuration for Maxtop International.
// Client-side instant language switching (no URL change).

export const locales = ["en", "bn", "ar", "fa"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export type Direction = "ltr" | "rtl";

export interface LocaleMeta {
  /** BCP-47 / html lang code */
  code: Locale;
  /** Name shown in English */
  label: string;
  /** Name shown in its own script */
  nativeLabel: string;
  /** Short code for the trigger button */
  short: string;
  /** Text direction */
  dir: Direction;
  /** Emoji flag for the switcher */
  flag: string;
}

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: {
    code: "en",
    label: "English",
    nativeLabel: "English",
    short: "EN",
    dir: "ltr",
    flag: "🇬🇧",
  },
  bn: {
    code: "bn",
    label: "Bangla",
    nativeLabel: "বাংলা",
    short: "বাং",
    dir: "ltr",
    flag: "🇧🇩",
  },
  ar: {
    code: "ar",
    label: "Arabic",
    nativeLabel: "العربية",
    short: "ع",
    dir: "rtl",
    flag: "🇸🇦",
  },
  fa: {
    code: "fa",
    label: "Persian",
    nativeLabel: "فارسی",
    short: "فا",
    dir: "rtl",
    flag: "🇮🇷",
  },
};

export const localeList: LocaleMeta[] = locales.map((l) => localeMeta[l]);

/** Returns text direction for a locale. */
export function dirOf(locale: Locale): Direction {
  return localeMeta[locale].dir;
}

/** Narrows an arbitrary string to a supported Locale, falling back to default. */
export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** localStorage key used to persist the visitor's language choice. */
export const LOCALE_STORAGE_KEY = "maxtop-locale";
