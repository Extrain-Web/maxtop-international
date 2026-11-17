import { Router } from "express";
import rateLimit from "express-rate-limit";
import { Message } from "../models/Message.js";
import { getPublicContent } from "../content/service.js";
import { ah, HttpError } from "../utils/http.js";

const router = Router();

// Everything the website needs, in one request (cached in memory).
router.get(
  "/content",
  ah(async (req, res) => {
    res.set("Cache-Control", "no-store");
    res.json(await getPublicContent());
  })
);

const inquiryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 8,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

const clip = (v, n) => (typeof v === "string" ? v.trim().slice(0, n) : "");

router.post(
  "/inquiries",
  inquiryLimiter,
  ah(async (req, res) => {
    const b = req.body ?? {};
    if (clip(b.website, 200)) return res.json({ ok: true }); // honeypot → silently ignore bots
    const name = clip(b.name, 120);
    const email = clip(b.email, 200);
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new HttpError(400, "Please enter your name and a valid email.");
    await Message.create({
      source: ["contact", "rfq", "product"].includes(b.source) ? b.source : "contact",
      name,
      email,
      company: clip(b.company, 200),
      country: clip(b.country, 120),
      phone: clip(b.phone, 60),
      category: clip(b.category, 300),
      quantity: clip(b.quantity, 200),
      message: clip(b.message, 5000),
      ip: req.ip,
      userAgent: clip(req.get("user-agent"), 300),
    });
    res.status(201).json({ ok: true });
  })
);

export default router;
