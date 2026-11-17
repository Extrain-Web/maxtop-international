import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import { config } from "./config.js";
import { connectDb } from "./db.js";
import { Admin } from "./models/Admin.js";
import { seedIfEmpty } from "./content/service.js";
import { sameOriginWrites } from "./middleware/auth.js";
import { errorHandler, notFound } from "./middleware/error.js";
import authRoutes from "./routes/auth.js";
import publicRoutes from "./routes/public.js";
import adminRoutes from "./routes/admin.js";

export function createApp() {
  const app = express();
  app.set("trust proxy", 1); // behind Nginx / Next.js rewrite
  app.disable("x-powered-by");

  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(cors({ origin: config.allowedOrigins, credentials: true }));
  app.use(express.json({ limit: "2mb" }));
  app.use(cookieParser());

  // uploaded images (Nginx can serve this folder directly in production)
  app.use(
    "/uploads",
    express.static(config.uploadDir, {
      maxAge: "30d",
      immutable: true,
      setHeaders: (res) => res.set("X-Content-Type-Options", "nosniff"),
    })
  );

  app.get("/api/health", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));
  app.use("/api", sameOriginWrites);
  app.use("/api/auth", authRoutes);
  app.use("/api/public", publicRoutes);
  app.use("/api/admin", adminRoutes);

  app.use("/api", notFound);
  app.use(errorHandler);
  return app;
}

async function ensureBootstrapAdmin() {
  const { email, password, name } = config.bootstrapAdmin;
  if (!email || !password) return;
  if (await Admin.estimatedDocumentCount()) return;
  await Admin.create({ email, name, passwordHash: await bcrypt.hash(password, 12) });
  console.log(`✓ First admin created: ${email} (remove ADMIN_PASSWORD from .env now)`);
}

export async function start() {
  await connectDb();
  await seedIfEmpty();
  await ensureBootstrapAdmin();
  if (!(await Admin.estimatedDocumentCount()))
    console.warn("⚠ No admin account yet. Create one:  npm run create-admin -- you@example.com StrongPass123 \"Your Name\"");
  const app = createApp();
  return app.listen(config.port, () => console.log(`✓ Maxtop API running on http://localhost:${config.port}`));
}

// run directly: `node src/server.js`
if (import.meta.url === new URL(process.argv[1], "file://").href || process.argv[1]?.endsWith("server.js")) {
  start().catch((err) => {
    console.error("✖ Failed to start:", err.message);
    process.exit(1);
  });
}
