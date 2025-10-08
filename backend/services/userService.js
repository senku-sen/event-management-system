import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Ensure JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

export default {
  // USR-05: List users (no password)
  list: async () => {
    try {
      return await User.find().select("-password").lean();
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  },

  // USR-03: Register with hashing; role enforced by controller
  register: async ({ email, password, firstName, lastName, phone, address, role }) => {
    try {
      const existing = await User.findOne({ email }).lean();
      if (existing) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 8); // Reduced salt rounds
      const newUser = new User({ email, password: hashedPassword, firstName, lastName, phone, address, role });
      await newUser.save();

      const userObject = newUser.toObject();
      delete userObject.password;
      return userObject;
    } catch (error) {
      throw new Error(error.message === "User already exists" ? error.message : "Registration failed");
    }
  },

  // USR-04: Authenticate and return JWT + public user
  authenticate: async (email, password) => {
    try {
      const user = await User.findOne({ email }).lean();
      if (!user) throw new Error("Invalid credentials");

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) throw new Error("Invalid credentials");

      const payload = { id: user._id, email, firstName: user.firstName, lastName: user.lastName, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
      return { token, user: payload };
    } catch (error) {
      throw new Error("Authentication failed");
    }
  },

  // USR-05: Get profile by id (no password)
  getById: async (id) => {
    try {
      const user = await User.findById(id).select("-password").lean();
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  },

  // Optional: Find by first or last name (case-insensitive), exclude password
  findByName: async (nameQuery) => {
    try {
      const rx = new RegExp(nameQuery, "i");
      return await User.find({ $or: [{ firstName: rx }, { lastName: rx }] }).select("-password").lean().limit(50);
    } catch (error) {
      throw new Error("Failed to search users");
    }
  },

  // USR-05: Admin - change role
  updateRole: async (userId, role) => {
    try {
      const updated = await User.findByIdAndUpdate(userId, { role }, { new: true }).select("-password").lean();
      if (!updated) throw new Error("User not found");
      return updated;
    } catch (error) {
      throw new Error(error.message === "User not found" ? error.message : "Failed to update role");
    }
  },

  // USR-05: Admin - reset password
  resetPassword: async (userId, newPassword) => {
    try {
      const hashed = await bcrypt.hash(newPassword, 8); // Reduced salt rounds
      const updated = await User.findByIdAndUpdate(userId, { password: hashed });
      if (!updated) throw new Error("User not found");
      return true;
    } catch (error) {
      throw new Error(error.message === "User not found" ? error.message : "Failed to reset password");
    }
  },
};