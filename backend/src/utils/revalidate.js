import { config } from "../config.js";

// Tells the Next.js site to drop its cached copy of the content so admin
// changes appear immediately. Fire-and-forget: a failure only means the site
// refreshes a bit later (it re-checks the API every few minutes anyway).
let timer = null;

export function revalidateFrontend() {
  if (!config.revalidateSecret) return;
  clearTimeout(timer);
  timer = setTimeout(async () => {
    try {
      const res = await fetch(`${config.frontendUrl}/revalidate`, {
        method: "POST",
        headers: { "x-revalidate-secret": config.revalidateSecret },
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) console.warn("revalidate: frontend answered", res.status);
    } catch (err) {
      console.warn("revalidate: frontend not reachable —", err.message);
    }
  }, 300); // debounce bursts of saves
}
