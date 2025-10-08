import mongoose from "mongoose";

    const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["User", "Admin"],default: "User"},
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true, unique: true },
    phone: { type: String, required: true, match: [ /^(?:\+63|0)9\d{9}$/, "Please enter a valid Philippine mobile number"],  },
    address: { type: String, required: true },
    }, { timestamps: true });

export default mongoose.model("User", userSchema);