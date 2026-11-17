// Server-side access to the Express API (backend/).
import { cacheLife, cacheTag } from "next/cache";
import type { SiteContent } from "./content/types";
import fallbackContent from "./content/fallback-content.json";

export const CONTENT_TAG = "site-content";

/** Where the Next.js server reaches the API (server-to-server). */
export const API_URL = (process.env.API_URL || "http://127.0.0.1:5000").replace(/\/$/, "");

/**
 * All website content (texts in 4 languages, products, images, settings).
 * Cached; the API calls /revalidate after every admin save so changes show
 * up immediately, and the cache also refreshes itself every few minutes.
 * If the API is unreachable (e.g. during `next build` without the backend),
 * the original built-in content is used so the site never breaks.
 */
export async function getSiteContent(): Promise<SiteContent> {
  "use cache";
  cacheTag(CONTENT_TAG);
  try {
    const res = await fetch(`${API_URL}/api/public/content`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const data = (await res.json()) as SiteContent;
    cacheLife({ stale: 60, revalidate: 300, expire: 60 * 60 * 24 * 30 });
    return data;
  } catch (err) {
    console.warn(`[content] API not reachable at ${API_URL} — using built-in content.`, (err as Error).message);
    cacheLife({ stale: 30, revalidate: 30, expire: 300 });
    return fallbackContent as unknown as SiteContent;
  }
}
