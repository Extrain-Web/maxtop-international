import mongoose from "mongoose";
import multer from "multer";

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  let status = err.status || 500;
  let message = err.message || "Server error";
  if (err instanceof mongoose.Error.CastError) [status, message] = [404, "Not found"];
  if (err instanceof multer.MulterError) [status, message] = [400, err.code === "LIMIT_FILE_SIZE" ? "File onek boro" : err.message];
  if (err.type === "entity.too.large") [status, message] = [413, "Data onek boro"];
  if (status >= 500) {
    console.error(`[${req.method} ${req.originalUrl}]`, err);
    message = "Server error";
  }
  res.status(status).json({ error: message });
}

export function notFound(req, res) {
  res.status(404).json({ error: `Not found: ${req.method} ${req.path}` });
}
