// Imports the new product line + fixes Arabic/Persian texts of the original catalogue.
//   npm run import-products          (safe to run again — existing products are skipped)
//
// 1. optimises every image in scripts/data/catalog-images → uploads/*.webp (+ Media Library)
// 2. creates new categories (innerwear) and the 24 new products
// 3. corrects ar/fa texts of the original 12 categories and 31 products
// 4. tells the website to refresh

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import sharp from "sharp";
import { config } from "../src/config.js";
import { connectDb } from "../src/db.js";
import { Item } from "../src/models/Item.js";
import { Media } from "../src/models/Media.js";
import { createItem, seedIfEmpty, invalidate } from "../src/content/service.js";
import { revalidateFrontend } from "../src/utils/revalidate.js";
import { newCategories, newProducts } from "./data/new-products.mjs";
import { categoryFixes, itemFixes } from "./data/translation-fixes.mjs";
import { sectionFixes } from "./data/section-translations.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const imgDir = path.join(here, "data", "catalog-images");

await connectDb();
await seedIfEmpty();
fs.mkdirSync(config.uploadDir, { recursive: true });

// ── 1. images ────────────────────────────────────────────────────────────────
const imageUrl = {}; // productId → /uploads/...
for (const p of newProducts) {
  const filename = `catalog-${path.parse(p.file).name}.webp`;
  const dest = path.join(config.uploadDir, filename);
  const url = `/uploads/${filename}`;
  if (!fs.existsSync(dest)) {
    await sharp(path.join(imgDir, p.file))
      .rotate()
      .resize(1200, 1200, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(dest);
  }
  if (!(await Media.exists({ url }))) {
    await Media.create({ filename, originalName: p.file, url, mime: "image/webp", size: fs.statSync(dest).size });
  }
  imageUrl[p.id] = url;
}
console.log(`✓ ${newProducts.length} images optimised → uploads/`);

const resolveImg = (v) => (typeof v === "string" && v.startsWith("@") ? imageUrl[v.slice(1)] : v);

// ── 2. new categories + products ─────────────────────────────────────────────
let created = 0;
for (const c of newCategories) {
  if (await Item.exists({ collectionKey: "productCategories", itemId: c.id })) continue;
  await createItem("productCategories", { ...c, coverImg: resolveImg(c.coverImg), bannerImg: resolveImg(c.bannerImg) });
  console.log(`✓ category added: ${c.t.en.fullName}`);
}
for (const p of newProducts) {
  if (await Item.exists({ collectionKey: "productItems", itemId: String(p.id) })) continue;
  const { file, ...rest } = p;
  void file;
  await createItem("productItems", { ...rest, image: imageUrl[p.id] });
  created++;
}
console.log(`✓ ${created} new products added (${newProducts.length - created} already existed)`);

// keep products grouped by category in the admin & website order
const cats = (await Item.find({ collectionKey: "productCategories" }).sort({ order: 1 }).lean()).map((c) => c.itemId);
const products = await Item.find({ collectionKey: "productItems" }).lean();
products.sort(
  (a, b) => cats.indexOf(a.value.categoryId) - cats.indexOf(b.value.categoryId) || a.order - b.order || Number(a.itemId) - Number(b.itemId)
);
await Item.bulkWrite(products.map((d, order) => ({ updateOne: { filter: { _id: d._id }, update: { $set: { order } } } })));

// ── 3. Arabic / Persian corrections ─────────────────────────────────────────
let fixed = 0;
async function applyFix(collectionKey, itemId, fix) {
  const doc = await Item.findOne({ collectionKey, itemId: String(itemId) });
  if (!doc) return;
  let changed = false;
  for (const [locale, text] of Object.entries(fix)) {
    const current = doc.value.t?.[locale] ?? {};
    if (JSON.stringify({ ...current, ...text }) !== JSON.stringify(current)) {
      doc.value.t[locale] = { ...current, ...text };
      changed = true;
    }
  }
  if (changed) {
    doc.markModified("value");
    await doc.save();
    fixed++;
  }
}
for (const [id, fix] of Object.entries(categoryFixes)) await applyFix("productCategories", id, fix);
for (const [id, fix] of Object.entries(itemFixes)) await applyFix("productItems", id, fix);
for (const [collectionKey, items] of Object.entries(sectionFixes))
  for (const [id, fix] of Object.entries(items)) await applyFix(collectionKey, id, fix);
console.log(`✓ Bangla/Arabic/Persian text corrected on ${fixed} items`);

// ── 4. refresh website ──────────────────────────────────────────────────────
invalidate();
revalidateFrontend();
await new Promise((r) => setTimeout(r, 1500)); // let the revalidate call go out
const total = await Item.countDocuments({ collectionKey: "productItems" });
console.log(`✓ Done — ${total} products, ${cats.length} categories in the database`);
await mongoose.disconnect();
