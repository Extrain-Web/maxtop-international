import { Router } from "express";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import multer from "multer";
import sharp from "sharp";
import { config } from "../config.js";
import { requireAuth } from "../middleware/auth.js";
import { ah, HttpError } from "../utils/http.js";
import { Item } from "../models/Item.js";
import { Message } from "../models/Message.js";
import { Media } from "../models/Media.js";
import { Text } from "../models/Text.js";
import { COLLECTIONS, LOCALES, LOCALE_LABELS, isCollectionKey } from "../content/collections.js";
import { SITE_IMAGES, defaultSiteImages } from "../content/images.js";
import { DEFAULT_SETTINGS, SETTINGS_FIELDS } from "../content/settings.js";
import {
  DEFAULTS,
  createItem,
  deleteItem,
  readCollection,
  readKv,
  reorderItems,
  resetTextSection,
  saveSettings,
  saveSiteImages,
  saveTextSection,
  textSections,
  updateItem,
  mergedSection,
} from "../content/service.js";

const router = Router();
router.use(requireAuth);

const MESSAGE_STATUSES = ["new", "read", "replied", "archived"];
const MESSAGE_SOURCES = ["contact", "rfq", "product"];

// ── meta: everything the dashboard needs to render its forms ────────────────
router.get("/meta", (req, res) => {
  res.json({
    locales: LOCALES,
    localeLabels: LOCALE_LABELS,
    collections: COLLECTIONS,
    siteImages: SITE_IMAGES,
    settingsFields: SETTINGS_FIELDS,
    textSections: textSections(),
  });
});

// ── dashboard overview ───────────────────────────────────────────────────────
router.get(
  "/overview",
  ah(async (req, res) => {
    const counts = Object.fromEntries(
      await Promise.all(
        Object.keys(COLLECTIONS).map(async (k) => [k, await Item.countDocuments({ collectionKey: k })])
      )
    );
    const since = new Date(Date.now() - 13 * 864e5);
    since.setHours(0, 0, 0, 0);
    const [newMessages, totalMessages, media, latest, bySource, perDay] = await Promise.all([
      Message.countDocuments({ status: "new" }),
      Message.countDocuments(),
      Media.countDocuments(),
      Message.find().sort({ createdAt: -1 }).limit(6).lean(),
      Message.aggregate([{ $group: { _id: "$source", n: { $sum: 1 } } }]),
      Message.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, n: { $sum: 1 } } },
      ]),
    ]);
    res.json({
      counts,
      messages: {
        new: newMessages,
        total: totalMessages,
        bySource: Object.fromEntries(bySource.map((s) => [s._id, s.n])),
      },
      media,
      latest,
      perDay: Object.fromEntries(perDay.map((d) => [d._id, d.n])),
    });
  })
);

// ── collections (products, categories, services, faq …) ─────────────────────
router.param("key", (req, res, next, key) =>
  isCollectionKey(key) ? next() : next(new HttpError(404, "Unknown collection"))
);

router.get(
  "/collections/:key",
  ah(async (req, res) => res.json({ items: await readCollection(req.params.key) }))
);
router.post(
  "/collections/:key",
  ah(async (req, res) => res.status(201).json({ item: await createItem(req.params.key, req.body) }))
);
router.put(
  "/collections/:key/order",
  ah(async (req, res) => {
    await reorderItems(req.params.key, req.body?.ids);
    res.json({ ok: true });
  })
);
router.put(
  "/collections/:key/:id",
  ah(async (req, res) => res.json({ item: await updateItem(req.params.key, req.params.id, req.body) }))
);
router.delete(
  "/collections/:key/:id",
  ah(async (req, res) => {
    await deleteItem(req.params.key, req.params.id);
    res.json({ ok: true });
  })
);

// ── page texts (per language, per section) ──────────────────────────────────
router.get(
  "/texts/:section",
  ah(async (req, res) => {
    const { section } = req.params;
    const template = DEFAULTS.texts.en[section];
    if (template === undefined) throw new HttpError(404, "Unknown section");
    const docs = await Text.find({ section }).lean();
    const values = {};
    for (const l of LOCALES)
      values[l] = mergedSection(l, section, docs.find((d) => d.locale === l)?.value);
    res.json({ section, template, values });
  })
);
router.put(
  "/texts/:section/:locale",
  ah(async (req, res) =>
    res.json({ value: await saveTextSection(req.params.locale, req.params.section, req.body?.value) })
  )
);
router.delete(
  "/texts/:section/:locale",
  ah(async (req, res) => res.json({ value: await resetTextSection(req.params.locale, req.params.section) }))
);

// ── site images & settings ──────────────────────────────────────────────────
router.get(
  "/site-images",
  ah(async (req, res) => res.json({ images: await readKv("siteImages", defaultSiteImages()) }))
);
router.put("/site-images", ah(async (req, res) => res.json({ images: await saveSiteImages(req.body?.images) })));
router.get("/settings", ah(async (req, res) => res.json({ settings: await readKv("settings", DEFAULT_SETTINGS) })));
router.put("/settings", ah(async (req, res) => res.json({ settings: await saveSettings(req.body?.settings) })));

// ── messages / inquiries ────────────────────────────────────────────────────
const escapeRx = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

router.get(
  "/messages",
  ah(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 20);
    const filter = {};
    filter.status = MESSAGE_STATUSES.includes(req.query.status) ? req.query.status : { $ne: "archived" };
    if (MESSAGE_SOURCES.includes(req.query.source)) filter.source = req.query.source;
    const q = String(req.query.q ?? "").trim().slice(0, 100);
    if (q) {
      const rx = new RegExp(escapeRx(q), "i");
      filter.$or = [{ name: rx }, { email: rx }, { company: rx }, { message: rx }, { category: rx }];
    }
    const [items, total] = await Promise.all([
      Message.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Message.countDocuments(filter),
    ]);
    res.json({ items, total, page, pages: Math.max(1, Math.ceil(total / limit)) });
  })
);
router.get(
  "/messages/:id",
  ah(async (req, res) => {
    const msg = await Message.findById(req.params.id);
    if (!msg) throw new HttpError(404, "Message paoa jay nai");
    if (msg.status === "new") {
      msg.status = "read";
      await msg.save();
    }
    res.json({ message: msg });
  })
);
router.patch(
  "/messages/:id",
  ah(async (req, res) => {
    const update = {};
    if (MESSAGE_STATUSES.includes(req.body?.status)) update.status = req.body.status;
    if (typeof req.body?.note === "string") update.note = req.body.note.slice(0, 2000);
    const msg = await Message.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!msg) throw new HttpError(404, "Message paoa jay nai");
    res.json({ message: msg });
  })
);
router.delete(
  "/messages/:id",
  ah(async (req, res) => {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  })
);

// ── media library (image uploads) ───────────────────────────────────────────
const ALLOWED = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/avif": ".avif",
  "image/gif": ".gif",
};
fs.mkdirSync(config.uploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: config.uploadDir,
    filename: (req, file, cb) => {
      const base =
        path
          .parse(file.originalname)
          .name.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 40) || "image";
      cb(null, `${Date.now()}-${crypto.randomBytes(3).toString("hex")}-${base}${ALLOWED[file.mimetype]}`);
    },
  }),
  limits: { fileSize: config.maxUploadMb * 1024 * 1024, files: 10 }, // before optimisation
  fileFilter: (req, file, cb) =>
    ALLOWED[file.mimetype]
      ? cb(null, true)
      : cb(new HttpError(400, "Shudhu image file (jpg, png, webp, avif, gif) upload kora jabe")),
});

router.get(
  "/media",
  ah(async (req, res) => res.json({ items: await Media.find().sort({ createdAt: -1 }).limit(500).lean() }))
);
router.post(
  "/media",
  upload.array("files", 10),
  ah(async (req, res) => {
    // optimise: max 1600px, WebP (phone photos of 5 MB become ~200 KB); GIFs are kept as-is
    const files = [];
    for (const f of req.files ?? []) {
      if (f.mimetype === "image/gif") {
        files.push({ filename: f.filename, originalname: f.originalname, mimetype: f.mimetype, size: f.size });
        continue;
      }
      const webpName = `${path.parse(f.filename).name}.webp`;
      const webpPath = path.join(config.uploadDir, webpName);
      try {
        await sharp(f.path).rotate().resize(1600, 1600, { fit: "inside", withoutEnlargement: true }).webp({ quality: 84 }).toFile(webpPath);
        if (webpPath !== f.path) await fs.promises.rm(f.path, { force: true });
        files.push({ filename: webpName, originalname: f.originalname, mimetype: "image/webp", size: fs.statSync(webpPath).size });
      } catch {
        await fs.promises.rm(f.path, { force: true });
        throw new HttpError(400, `"${f.originalname}" valid image na`);
      }
    }
    const docs = await Media.insertMany(
      files.map((f) => ({
        filename: f.filename,
        originalName: f.originalname,
        url: `/uploads/${f.filename}`,
        mime: f.mimetype,
        size: f.size,
      }))
    );
    res.status(201).json({ items: docs });
  })
);
router.delete(
  "/media/:id",
  ah(async (req, res) => {
    const doc = await Media.findById(req.params.id);
    if (!doc) throw new HttpError(404, "File paoa jay nai");
    await fs.promises.rm(path.join(config.uploadDir, path.basename(doc.filename)), { force: true });
    await doc.deleteOne();
    res.json({ ok: true });
  })
);

export default router;
