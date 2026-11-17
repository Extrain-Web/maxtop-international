import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const isProd = process.env.NODE_ENV === "production";

if (isProd && !process.env.JWT_SECRET) {
  console.error("✖ JWT_SECRET is required in production (.env)");
  process.exit(1);
}

export const config = {
  isProd,
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/maxtop",
  jwtSecret: process.env.JWT_SECRET || crypto.randomBytes(32).toString("hex"),
  cookieName: "maxtop_admin",
  sessionDays: Number(process.env.SESSION_DAYS || 7),
  uploadDir: path.resolve(root, process.env.UPLOAD_DIR || "uploads"),
  maxUploadMb: Number(process.env.MAX_UPLOAD_MB || 15),
  /** comma separated list of site origins allowed to call the API from a browser */
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  /** Next.js site (server-to-server) — used to refresh its cache after admin edits */
  frontendUrl: (process.env.FRONTEND_URL || "http://127.0.0.1:3000").replace(/\/$/, ""),
  revalidateSecret: process.env.REVALIDATE_SECRET || "",
  /** optional first admin, created on boot when no admin exists */
  bootstrapAdmin: {
    email: process.env.ADMIN_EMAIL || "",
    password: process.env.ADMIN_PASSWORD || "",
    name: process.env.ADMIN_NAME || "Admin",
  },
};
