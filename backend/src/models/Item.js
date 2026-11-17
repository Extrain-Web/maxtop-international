import mongoose from "mongoose";

// One document per collection item (a product, a category, a service card…).
// `value` holds the cleaned item: { id, ...assetFields, t: { en, bn, ar, fa } }.
const itemSchema = new mongoose.Schema(
  {
    collectionKey: { type: String, required: true, index: true },
    itemId: { type: String, required: true },
    order: { type: Number, default: 0 },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true, minimize: false }
);
itemSchema.index({ collectionKey: 1, itemId: 1 }, { unique: true });
itemSchema.index({ collectionKey: 1, order: 1 });

export const Item = mongoose.model("Item", itemSchema);
