import mongoose from "mongoose";

// Single-document settings: "settings", "siteImages".
const kvSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true, minimize: false }
);

export const KeyValue = mongoose.model("KeyValue", kvSchema);
