import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const seedAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "Admin" });
    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Create admin user
    const adminData = {
      email: "admin@eventmanagement.com",
      password: await bcrypt.hash("AdminPass123!", 10),
      firstName: "System",
      lastName: "Administrator",
      phone: "+639171234567",
      address: "Admin Office, Manila",
      role: "Admin"
    };

    const admin = new User(adminData);
    await admin.save();

    console.log("✅ Admin user created successfully!");
    console.log("Email:", adminData.email);
    console.log("Password: AdminPass123!");
    
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedAdmin();
