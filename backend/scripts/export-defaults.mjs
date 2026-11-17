// One-time / maintenance script (run with Node ≥ 22.18, it imports .ts files):
//   node backend/scripts/export-defaults.mjs
// Reads the original static content of the Next.js site (src/i18n + src/data)
// and writes backend/src/content/defaults.json — the "factory defaults" that
// `npm run seed` loads into MongoDB.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { COLLECTIONS, LOCALES } from "../src/content/collections.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const web = path.resolve(here, "../../src");
const load = (rel) => import(pathToFileURL(path.join(web, rel)).href);

const dicts = {};
for (const l of LOCALES) dicts[l] = (await load(`i18n/dictionaries/${l}.ts`))[l];

const products = await load("data/productsData.ts");
const services = await load("data/servicesData.ts");
const how = await load("data/howWeWorkData.ts");
const why = await load("data/whyChooseUsData.ts");
const stats = await load("data/statsData.ts");
const gallery = await load("data/galleryData.ts");
const recog = await load("data/recognitionsData.ts");
const lucide = await import("lucide-react"); // same module instance the data files use

const clone = (v) => JSON.parse(JSON.stringify(v));
const get = (o, p) => p.reduce((c, k) => (c == null ? c : c[k]), o);
// prefer the names offered in the admin icon picker (src/lib/content/icons.ts)
const registry = new Set(
  [...fs.readFileSync(path.join(web, "lib/content/icons.ts"), "utf8").matchAll(/([A-Z][A-Za-z0-9]+),/g)].map((m) => m[1])
);
const iconName = (comp) => {
  const lib = lucide.default ?? lucide;
  const names = Object.entries(lib).filter(([n, c]) => c === comp && /^[A-Z]/.test(n)).map(([n]) => n);
  return names.find((n) => registry.has(n)) ?? "HelpCircle";
};
const textsAt = (p, i) => Object.fromEntries(LOCALES.map((l) => [l, clone(get(dicts[l], p)?.[i] ?? {})]));
const same = (obj) => Object.fromEntries(LOCALES.map((l) => [l, clone(obj)]));

const collections = {
  productCategories: products.productCategoryAssets.map((a, i) => ({ ...a, t: textsAt(["productCategories"], i) })),
  productItems: products.productAssets.map((a, i) => ({ ...clone(a), isFeatured: !!a.isFeatured, t: textsAt(["productItems"], i) })),
  services: services.serviceAssets.map((a, i) => ({ id: a.id, num: a.num, icon: iconName(a.icon), image: a.image, t: textsAt(["services", "items"], i) })),
  howWeWork: how.howWeWorkAssets.map((a, i) => ({ id: a.id, stepNumber: a.stepNumber, icon: iconName(a.icon), t: textsAt(["howWeWork", "steps"], i) })),
  whyChooseUs: why.whyChooseAssets.map((a, i) => ({ id: a.id, icon: iconName(a.icon), t: textsAt(["whyChooseUs", "cards"], i) })),
  faq: dicts.en.faq.items.map((_, i) => ({ id: i + 1, t: textsAt(["faq", "items"], i) })),
  stats: stats.statsData.map((s) => ({ id: s.id, value: s.value, t: same({ label: s.label, subLabel: s.subLabel ?? "" }) })),
  galleryCategories: gallery.galleryCategories.map((c) => ({ id: c.id, t: same({ label: c.label }) })),
  gallery: gallery.galleryImages.map((g) => ({
    id: g.id, category: g.category, image: g.image,
    t: same({ title: g.title, categoryLabel: g.categoryLabel, location: g.location, machinery: g.machinery }),
  })),
  recognizedBy: recog.recognizedByLogos.map((l) => ({ id: l.id, image: l.image, t: same({ name: l.name, tooltip: l.tooltip }) })),
  partnerCerts: recog.partnerCertificationsLogos.map((l) => ({ id: l.id, image: l.image, t: same({ name: l.name, tooltip: l.tooltip }) })),
};

// page texts = dictionaries without the arrays that became collections
const texts = {};
for (const l of LOCALES) {
  const d = clone(dicts[l]);
  for (const def of Object.values(COLLECTIONS)) {
    if (!def.dictPath) continue;
    const parent = get(d, def.dictPath.slice(0, -1));
    if (parent) delete parent[def.dictPath.at(-1)];
  }
  texts[l] = d;
}

const out = path.resolve(here, "../src/content/defaults.json");
fs.writeFileSync(out, JSON.stringify({ texts, collections }, null, 1));
console.log("wrote", out, Object.fromEntries(Object.entries(collections).map(([k, v]) => [k, v.length])));

// Also write the composed payload the Next.js site uses when the API is down.
const { composeDefaults } = await import("../src/content/service.js");
const fallback = path.resolve(here, "../../src/lib/content/fallback-content.json");
const composed = composeDefaults();
delete composed.updatedAt;
fs.writeFileSync(fallback, JSON.stringify(composed));
console.log("wrote", fallback);
