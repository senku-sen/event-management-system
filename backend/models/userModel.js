import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

// Index for faster email lookups
userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("User", userSchema);