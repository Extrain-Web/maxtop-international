// Saves the current live content as the website's offline fallback
// (src/lib/content/fallback-content.json) — used only if the API is down.
//   npm run snapshot   (backend must be running)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const api = (process.env.API_URL || `http://127.0.0.1:${process.env.PORT || 5000}`).replace(/\/$/, "");
const res = await fetch(`${api}/api/public/content`);
if (!res.ok) throw new Error(`API ${res.status} — backend cholche to?`);
const data = await res.json();
delete data.updatedAt;
const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../src/lib/content/fallback-content.json");
fs.writeFileSync(out, JSON.stringify(data));
console.log(`✓ fallback updated (${data.assets.productItems.length} products) → ${out}`);
