import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    /** bump to log out every session of this admin (e.g. after password change) */
    tokenVersion: { type: Number, default: 0 },
    lastLoginAt: Date,
  },
  { timestamps: true }
);

adminSchema.methods.toPublic = function () {
  return { id: String(this._id), email: this.email, name: this.name, lastLoginAt: this.lastLoginAt };
};

export const Admin = mongoose.model("Admin", adminSchema);
