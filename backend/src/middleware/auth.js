import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { Admin } from "../models/Admin.js";
import { HttpError } from "../utils/http.js";

export function issueSession(res, admin) {
  const token = jwt.sign({ sub: String(admin._id), v: admin.tokenVersion ?? 0 }, config.jwtSecret, {
    expiresIn: `${config.sessionDays}d`,
  });
  res.cookie(config.cookieName, token, {
    httpOnly: true,
    secure: config.isProd,
    sameSite: "lax",
    path: "/",
    maxAge: config.sessionDays * 24 * 60 * 60 * 1000,
  });
}

export function clearSession(res) {
  res.clearCookie(config.cookieName, { path: "/" });
}

export async function requireAuth(req, _res, next) {
  try {
    const token = req.cookies?.[config.cookieName] || req.get("authorization")?.replace(/^Bearer /, "");
    if (!token) throw new HttpError(401, "Login korun");
    let payload;
    try {
      payload = jwt.verify(token, config.jwtSecret);
    } catch {
      throw new HttpError(401, "Session sesh — abar login korun");
    }
    const admin = await Admin.findById(payload.sub);
    if (!admin || (admin.tokenVersion ?? 0) !== payload.v) throw new HttpError(401, "Session sesh — abar login korun");
    req.admin = admin;
    next();
  } catch (err) {
    next(err);
  }
}

/** Blocks state-changing requests coming from other websites (CSRF guard). */
export function sameOriginWrites(req, _res, next) {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  const origin = req.get("origin");
  if (!origin) return next(); // server-to-server / curl
  const host = req.get("x-forwarded-host") || req.get("host");
  let ok = config.allowedOrigins.includes(origin);
  try {
    ok ||= new URL(origin).host === host;
  } catch {
    /* bad origin header */
  }
  return ok ? next() : next(new HttpError(403, "Origin not allowed"));
}
