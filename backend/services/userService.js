import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const createUser = async ({ name, password, role }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, password: hashedPassword, role });
    return await newUser.save();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const searchUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    console.error("Error searching user by ID:", error);
    throw error;
  }
};

const searchUserByName = async (name) => {
  try {
    return await User.findOne({ name });
  } catch (error) {
    console.error("Error searching user by name:", error);
    throw error;
  }
};

const searchUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    console.error("Error searching user by email:", error);
    throw error;
  }
};

const verifyPassword = async (plain, hash) => {
  try {
    return await bcrypt.compare(plain, hash);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
};

// [USR-04] Authenticate user and return JWT token with role info
const authenticateUser = async (email, password) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Create JWT payload with user info and role
    const payload = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    // Generate JWT token
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return {
      token,
      user: payload,
    };
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

export default {
  getUsers,
  createUser,
  searchUserById,
  searchUserByName,
  searchUserByEmail,
  authenticateUser,
  verifyPassword,
};