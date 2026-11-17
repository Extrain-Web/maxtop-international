// Create (or reset the password of) an admin account.
//   npm run create-admin -- admin@example.com "StrongPassword123" "Your Name"
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDb } from "../src/db.js";
import { Admin } from "../src/models/Admin.js";

const [email, password, name = "Admin"] = process.argv.slice(2);
if (!email || !password) {
  console.log('Usage: npm run create-admin -- <email> <password> ["Name"]');
  process.exit(1);
}
if (password.length < 8) {
  console.error("Password kompokkhe 8 character hote hobe");
  process.exit(1);
}

await connectDb();
const passwordHash = await bcrypt.hash(password, 12);
const existing = await Admin.findOne({ email: email.toLowerCase() });
if (existing) {
  existing.passwordHash = passwordHash;
  existing.tokenVersion = (existing.tokenVersion ?? 0) + 1;
  await existing.save();
  console.log(`✓ Password updated for ${existing.email}`);
} else {
  await Admin.create({ email, name, passwordHash });
  console.log(`✓ Admin created: ${email}`);
}
await mongoose.disconnect();
