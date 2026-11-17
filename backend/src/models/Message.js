import mongoose from "mongoose";

// Inquiries from the website: contact form, RFQ, product price/sample requests.
const messageSchema = new mongoose.Schema(
  {
    source: { type: String, enum: ["contact", "rfq", "product"], default: "contact", index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    company: String,
    country: String,
    phone: String,
    category: String,
    quantity: String,
    message: String,
    ip: String,
    userAgent: String,
    status: { type: String, enum: ["new", "read", "replied", "archived"], default: "new", index: true },
    note: String,
  },
  { timestamps: true }
);
messageSchema.index({ createdAt: -1 });

export const Message = mongoose.model("Message", messageSchema);
