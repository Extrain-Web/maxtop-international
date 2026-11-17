// Load the original website content into MongoDB.
//   npm run seed            → only fills an empty database
//   npm run seed -- --force → ⚠ DELETES all edited content and restores the original
import mongoose from "mongoose";
import { connectDb } from "../src/db.js";
import { seedAll, seedIfEmpty } from "../src/content/service.js";

await connectDb();
if (process.argv.includes("--force")) {
  await seedAll({ force: true });
  console.log("✓ Content reset to the original website content");
} else {
  await seedIfEmpty();
  console.log("✓ Seed check done");
}
await mongoose.disconnect();
