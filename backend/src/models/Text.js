import mongoose from "mongoose";

// Page texts: one document per (language, section) e.g. ("bn", "hero").
const textSchema = new mongoose.Schema(
  {
    locale: { type: String, required: true },
    section: { type: String, required: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true, minimize: false }
);
textSchema.index({ locale: 1, section: 1 }, { unique: true });

export const Text = mongoose.model("Text", textSchema);
