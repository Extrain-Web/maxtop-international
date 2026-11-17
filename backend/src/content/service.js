// Content service: seeding, validation, and composing the payload the
// Next.js site consumes (GET /api/public/content).

import fs from "node:fs";
import { Item } from "../models/Item.js";
import { Text } from "../models/Text.js";
import { KeyValue } from "../models/KeyValue.js";
import { COLLECTIONS, COLLECTION_KEYS, LOCALES } from "./collections.js";
import { SITE_IMAGES, defaultSiteImages } from "./images.js";
import { DEFAULT_SETTINGS } from "./settings.js";
import { HttpError } from "../utils/http.js";
import { revalidateFrontend } from "../utils/revalidate.js";

export const DEFAULTS = JSON.parse(fs.readFileSync(new URL("./defaults.json", import.meta.url), "utf8"));

const isObj = (v) => !!v && typeof v === "object" && !Array.isArray(v);
const clone = (v) => JSON.parse(JSON.stringify(v));

// ─────────────────────────────────────────────────────────────────────────────
// Seeding
// ─────────────────────────────────────────────────────────────────────────────

export async function seedIfEmpty() {
  const [items, texts] = await Promise.all([Item.estimatedDocumentCount(), Text.estimatedDocumentCount()]);
  if (items === 0 && texts === 0) {
    await seedAll();
    console.log("✓ Database seeded with the original website content");
  }
}

export async function seedAll({ force = false } = {}) {
  if (force) await Promise.all([Item.deleteMany({}), Text.deleteMany({}), KeyValue.deleteMany({})]);
  const itemDocs = [];
  for (const key of COLLECTION_KEYS) {
    (DEFAULTS.collections[key] ?? []).forEach((value, order) =>
      itemDocs.push({ collectionKey: key, itemId: String(value.id), order, value })
    );
  }
  const textDocs = [];
  for (const locale of LOCALES)
    for (const [section, value] of Object.entries(DEFAULTS.texts[locale] ?? {}))
      textDocs.push({ locale, section, value });

  await Item.insertMany(itemDocs, { ordered: false }).catch(ignoreDupes);
  await Text.insertMany(textDocs, { ordered: false }).catch(ignoreDupes);
  invalidate();
}

function ignoreDupes(err) {
  if (err?.code !== 11000 && !err?.writeErrors?.every((e) => e.code === 11000)) throw err;
}

// ─────────────────────────────────────────────────────────────────────────────
// Reading
// ─────────────────────────────────────────────────────────────────────────────

function deepMerge(base, over) {
  if (!isObj(base) || !isObj(over)) return over ?? base;
  const out = { ...base };
  for (const [k, v] of Object.entries(over)) {
    out[k] = isObj(v) && isObj(base[k]) ? deepMerge(base[k], v) : v ?? base[k];
  }
  return out;
}

export async function readCollection(key) {
  const docs = await Item.find({ collectionKey: key }).sort({ order: 1, _id: 1 }).lean();
  return docs.map((d) => ({ ...d.value, _id: String(d._id) }));
}

export async function readTexts(locale) {
  const docs = await Text.find({ locale }).lean();
  const saved = Object.fromEntries(docs.map((d) => [d.section, d.value]));
  return deepMerge(clone(DEFAULTS.texts[locale] ?? DEFAULTS.texts.en), saved);
}

export async function readKv(key, fallback) {
  const doc = await KeyValue.findOne({ key }).lean();
  return isObj(fallback) ? { ...fallback, ...(doc?.value ?? {}) } : doc?.value ?? fallback;
}

/** per-locale text of an item, falling back to English field by field */
export function itemText(item, locale) {
  const out = { ...(item.t?.en ?? {}) };
  for (const [k, v] of Object.entries(item.t?.[locale] ?? {})) {
    if (typeof v === "string" ? v.trim() !== "" : Array.isArray(v) ? v.length > 0 : v != null) out[k] = v;
  }
  return out;
}

const assetPart = ({ t, _id, ...rest }) => rest;

// No in-memory cache here on purpose: the Next.js site already caches this
// payload (and only asks again after an admin save or every few minutes), and
// reading fresh from MongoDB means scripts / manual DB edits show up at once.
// Concurrent requests share one in-flight read.
let inFlight = null;

/** kept for callers; there is nothing to clear any more */
export function invalidate() {}

export async function getPublicContent() {
  if (!inFlight) inFlight = compose().finally(() => (inFlight = null));
  return inFlight;
}

async function compose() {
  const cols = Object.fromEntries(await Promise.all(COLLECTION_KEYS.map(async (k) => [k, await readCollection(k)])));
  const texts = Object.fromEntries(await Promise.all(LOCALES.map(async (l) => [l, await readTexts(l)])));
  return composeFrom({
    cols,
    texts,
    images: await readKv("siteImages", defaultSiteImages()),
    settings: await readKv("settings", DEFAULT_SETTINGS),
  });
}

/** The original content, composed without a database (frontend fallback). */
export function composeDefaults() {
  return composeFrom({
    cols: clone(DEFAULTS.collections),
    texts: clone(DEFAULTS.texts),
    images: defaultSiteImages(),
    settings: { ...DEFAULT_SETTINGS },
  });
}

/** Pure: builds the public payload from collections + texts. */
export function composeFrom({ cols, texts, images, settings }) {
  const dictionaries = {};
  for (const locale of LOCALES) {
    const dict = texts[locale];
    for (const key of COLLECTION_KEYS) {
      const path = COLLECTIONS[key].dictPath;
      if (!path) continue;
      let cur = dict;
      for (const p of path.slice(0, -1)) cur = cur[p] ??= {};
      cur[path.at(-1)] = cols[key].map((it) => itemText(it, locale));
    }
    dictionaries[locale] = dict;
  }

  const localized = (key) =>
    cols[key].map((it) => ({ ...assetPart(it), t: Object.fromEntries(LOCALES.map((l) => [l, itemText(it, l)])) }));

  return {
    dictionaries,
    assets: {
      productCategories: cols.productCategories.map(assetPart),
      productItems: cols.productItems.map(assetPart),
      services: cols.services.map(assetPart),
      howWeWork: cols.howWeWork.map(assetPart),
      whyChooseUs: cols.whyChooseUs.map(assetPart),
    },
    localized: {
      stats: localized("stats"),
      galleryCategories: localized("galleryCategories"),
      gallery: localized("gallery"),
      recognizedBy: localized("recognizedBy"),
      partnerCerts: localized("partnerCerts"),
    },
    images,
    settings,
    updatedAt: new Date().toISOString(),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────────────────────────

const str = (v, max = 5000) => (typeof v === "string" ? v : v == null ? "" : String(v)).slice(0, max);
const strList = (v) =>
  (Array.isArray(v) ? v : typeof v === "string" ? v.split("\n") : [])
    .map((x) => str(x, 500).trim())
    .filter(Boolean)
    .slice(0, 100);
const isImageUrl = (s) => /^(\/[^\s]*|https:\/\/[^\s]+)$/.test(s);

function cleanField(field, value) {
  switch (field.type) {
    case "number":
      return Number.isFinite(Number(value)) ? Number(value) : 0;
    case "checkbox":
      return value === true || value === "true" || value === "on";
    case "list":
      return strList(value);
    case "colors":
      return strList(value).filter((c) => /^#[0-9a-fA-F]{3,8}$/.test(c));
    case "image": {
      const s = str(value, 1000).trim();
      if (s && !isImageUrl(s)) throw new HttpError(400, `"${field.label}" e valid image link din (/uploads/... ba https://...)`);
      return s;
    }
    case "icon":
      return str(value, 60).replace(/[^A-Za-z0-9]/g, "") || "HelpCircle";
    default:
      return str(value);
  }
}

const isEmpty = (v) => v === "" || (Array.isArray(v) && v.length === 0);

/** Validates one item of a collection. `existing` = other items (for id checks). */
export async function cleanItem(key, raw, { currentId } = {}) {
  const def = COLLECTIONS[key];
  const item = isObj(raw) ? raw : {};
  const clean = {};

  for (const f of def.fields) {
    const v = cleanField(f, item[f.name]);
    if (f.required && isEmpty(v)) throw new HttpError(400, `"${f.label}" dite hobe`);
    clean[f.name] = v;
  }

  clean.t = {};
  const t = isObj(item.t) ? item.t : {};
  for (const l of LOCALES) {
    const src = isObj(t[l]) ? t[l] : {};
    clean.t[l] = Object.fromEntries(def.textFields.map((f) => [f.name, cleanField(f, src[f.name])]));
  }
  for (const f of def.textFields)
    if (f.required && isEmpty(clean.t.en[f.name])) throw new HttpError(400, `English "${f.label}" dite hobe`);

  // relations (category must exist)
  for (const f of def.fields) {
    if (!f.optionsFrom) continue;
    const exists = await Item.exists({ collectionKey: f.optionsFrom, itemId: String(clean[f.name]) });
    if (!exists) throw new HttpError(400, `${f.label} thik nai`);
  }

  // id
  const others = await Item.find({ collectionKey: key, ...(currentId ? { _id: { $ne: currentId } } : {}) }, { itemId: 1 }).lean();
  const taken = new Set(others.map((o) => o.itemId));
  if (def.idType === "slug") {
    const id = str(item.id, 80).trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
    if (!id) throw new HttpError(400, "ID (slug) dite hobe — choto haater english, jemon: t-shirts");
    if (taken.has(id)) throw new HttpError(400, `ID "${id}" age thekei ase — onno ID din`);
    clean.id = id;
  } else {
    const wanted = Number(item.id);
    clean.id =
      Number.isInteger(wanted) && wanted > 0 && !taken.has(String(wanted))
        ? wanted
        : Math.max(0, ...[...taken].map(Number).filter(Number.isFinite)) + 1;
  }
  return { id: clean.id, ...clean };
}

// ─────────────────────────────────────────────────────────────────────────────
// Writes
// ─────────────────────────────────────────────────────────────────────────────

function changed() {
  invalidate();
  revalidateFrontend();
}

export async function createItem(key, raw) {
  const value = await cleanItem(key, raw);
  const last = await Item.findOne({ collectionKey: key }).sort({ order: -1 }).lean();
  const doc = await Item.create({ collectionKey: key, itemId: String(value.id), order: (last?.order ?? -1) + 1, value });
  changed();
  return { ...doc.value, _id: String(doc._id) };
}

export async function updateItem(key, mongoId, raw) {
  const doc = await Item.findOne({ _id: mongoId, collectionKey: key });
  if (!doc) throw new HttpError(404, "Item paoa jay nai");
  const value = await cleanItem(key, raw, { currentId: doc._id });

  // renaming a category id → move its children along
  const oldId = doc.itemId;
  if (String(value.id) !== oldId) await moveChildren(key, oldId, String(value.id));

  doc.itemId = String(value.id);
  doc.value = value;
  doc.markModified("value");
  await doc.save();
  changed();
  return { ...doc.value, _id: String(doc._id) };
}

const CHILDREN = {
  productCategories: { child: "productItems", field: "categoryId" },
  galleryCategories: { child: "gallery", field: "category" },
};

async function moveChildren(key, from, to) {
  const rel = CHILDREN[key];
  if (!rel) return;
  await Item.updateMany(
    { collectionKey: rel.child, [`value.${rel.field}`]: from },
    { $set: { [`value.${rel.field}`]: to } }
  );
}

export async function deleteItem(key, mongoId) {
  const doc = await Item.findOne({ _id: mongoId, collectionKey: key });
  if (!doc) throw new HttpError(404, "Item paoa jay nai");
  const rel = CHILDREN[key];
  if (rel) {
    const count = await Item.countDocuments({ collectionKey: rel.child, [`value.${rel.field}`]: doc.itemId });
    if (count) throw new HttpError(400, `Ei category te ekhono ${count} ta item ase. Age oigulo onno category te nin ba delete korun.`);
  }
  await doc.deleteOne();
  changed();
}

export async function reorderItems(key, ids) {
  if (!Array.isArray(ids)) throw new HttpError(400, "ids array dite hobe");
  await Item.bulkWrite(
    ids.map((id, order) => ({ updateOne: { filter: { _id: id, collectionKey: key }, update: { $set: { order } } } }))
  );
  changed();
}

/**
 * Keep only keys/shape that exist in the English section (the template).
 * A key missing from `value` falls back to that language's own default text
 * (`fallback`), never to English — so new keys added in code stay translated.
 */
function sanitizeLike(template, value, fallback) {
  const fb = fallback ?? template;
  if (typeof template === "string") return typeof value === "string" ? value.slice(0, 10000) : typeof fb === "string" ? fb : template;
  if (Array.isArray(template)) {
    if (!Array.isArray(value)) return Array.isArray(fb) ? fb : template;
    if (template.length && typeof template[0] === "string")
      return value.filter((v) => typeof v === "string").map((v) => v.slice(0, 2000)).slice(0, 50);
    // arrays of objects keep their length: the components pair them by index with images/icons
    return template.map((tpl, i) => sanitizeLike(tpl, value[i], Array.isArray(fb) ? fb[i] : undefined));
  }
  if (isObj(template)) {
    const src = isObj(value) ? value : {};
    const fbo = isObj(fb) ? fb : {};
    return Object.fromEntries(Object.entries(template).map(([k, tpl]) => [k, sanitizeLike(tpl, src[k], fbo[k])]));
  }
  return template;
}

/** Text of one section as the admin should see it: language default + saved edits. */
export function mergedSection(locale, section, saved) {
  const base = clone(DEFAULTS.texts[locale]?.[section] ?? DEFAULTS.texts.en[section]);
  return saved === undefined ? base : deepMerge(base, saved);
}

export function textSections() {
  return Object.keys(DEFAULTS.texts.en);
}

export async function saveTextSection(locale, section, value) {
  if (!LOCALES.includes(locale)) throw new HttpError(400, "Unknown language");
  const template = DEFAULTS.texts.en[section];
  if (template === undefined) throw new HttpError(404, "Unknown section");
  const clean = sanitizeLike(template, value, DEFAULTS.texts[locale]?.[section]);
  await Text.updateOne({ locale, section }, { $set: { value: clean } }, { upsert: true });
  changed();
  return clean;
}

export async function resetTextSection(locale, section) {
  const value = DEFAULTS.texts[locale]?.[section];
  if (value === undefined) throw new HttpError(404, "Unknown section");
  await Text.updateOne({ locale, section }, { $set: { value } }, { upsert: true });
  changed();
  return value;
}

export async function saveSiteImages(input) {
  const src = isObj(input) ? input : {};
  const out = {};
  for (const def of SITE_IMAGES) {
    const v = str(src[def.key], 1000).trim();
    if (!v || v === def.default) continue;
    if (!isImageUrl(v)) throw new HttpError(400, `"${def.label}" e valid image link din`);
    out[def.key] = v;
  }
  await KeyValue.updateOne({ key: "siteImages" }, { $set: { value: out } }, { upsert: true });
  changed();
  return readKv("siteImages", defaultSiteImages());
}

export async function saveSettings(input) {
  const src = isObj(input) ? input : {};
  const out = {};
  for (const [k, def] of Object.entries(DEFAULT_SETTINGS))
    out[k] = Array.isArray(def)
      ? strList(src[k])
      : typeof def === "boolean"
        ? src[k] === true || src[k] === "true"
        : str(src[k], 2000).trim();
  await KeyValue.updateOne({ key: "settings" }, { $set: { value: out } }, { upsert: true });
  changed();
  return out;
}
