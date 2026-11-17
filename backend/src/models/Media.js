import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    originalName: String,
    url: { type: String, required: true },
    mime: String,
    size: Number,
  },
  { timestamps: true }
);

export const Media = mongoose.model("Media", mediaSchema);
