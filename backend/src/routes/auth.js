import { Router } from "express";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { Admin } from "../models/Admin.js";
import { ah, HttpError } from "../utils/http.js";
import { clearSession, issueSession, requireAuth } from "../middleware/auth.js";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Onek bar vul password — 15 minute por abar try korun" },
});

router.post(
  "/login",
  loginLimiter,
  ah(async (req, res) => {
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const password = String(req.body?.password ?? "");
    const admin = await Admin.findOne({ email }).select("+passwordHash");
    const ok = admin && (await bcrypt.compare(password, admin.passwordHash));
    if (!ok) throw new HttpError(401, "Email ba password vul");
    admin.lastLoginAt = new Date();
    await admin.save();
    issueSession(res, admin);
    res.json({ admin: admin.toPublic() });
  })
);

router.post("/logout", (req, res) => {
  clearSession(res);
  res.json({ ok: true });
});

router.get("/me", requireAuth, (req, res) => res.json({ admin: req.admin.toPublic() }));

router.put(
  "/profile",
  requireAuth,
  ah(async (req, res) => {
    const name = String(req.body?.name ?? "").trim().slice(0, 80);
    if (!name) throw new HttpError(400, "Nam dite hobe");
    req.admin.name = name;
    await req.admin.save();
    res.json({ admin: req.admin.toPublic() });
  })
);

router.put(
  "/password",
  requireAuth,
  ah(async (req, res) => {
    const { currentPassword = "", newPassword = "" } = req.body ?? {};
    if (String(newPassword).length < 8) throw new HttpError(400, "Notun password kompokkhe 8 character");
    const admin = await Admin.findById(req.admin._id).select("+passwordHash");
    if (!(await bcrypt.compare(String(currentPassword), admin.passwordHash)))
      throw new HttpError(400, "Current password vul");
    admin.passwordHash = await bcrypt.hash(String(newPassword), 12);
    admin.tokenVersion = (admin.tokenVersion ?? 0) + 1; // logs out other devices
    await admin.save();
    issueSession(res, admin);
    res.json({ ok: true });
  })
);

export default router;
