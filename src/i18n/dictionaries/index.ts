import type { Locale } from "../config";
import { en, type Dictionary } from "./en";
import { bn } from "./bn";
import { ar } from "./ar";
import { fa } from "./fa";

export type { Dictionary };

export const dictionaries: Record<Locale, Dictionary> = { en, bn, ar, fa };
