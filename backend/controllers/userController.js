import userService from "../services/userService.js";
import jwt from "jsonwebtoken";

const sendSuccess = (res, status = 200, message = "Success", data = {}) => {
  return res.status(status).json({
    success: true,
    status,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

const sendError = (res, status = 500, message = "Error", error = {}) => {
  return res.status(status).json({
    success: false,
    status,
    message,
    error,
    timestamp: new Date().toISOString(),
  });
};

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(409).json({ message: "Duplicate key error" });
    }
    res.status(500).json({ message: error.message });
  }
};

// [USR-03] Register new user with password hashing and role restriction
export const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    
    // Role assignment logic: Only Admin can assign 'Admin' role
    if (userData.role === "Admin") {
      // Check if requester is an Admin (from auth middleware)
      if (!req.user || req.user.role !== "Admin") {
        // Force role to 'User' for non-admin registration
        userData.role = "User";
      }
    } else {
      // Default to 'User' if no role specified
      userData.role = "User";
    }

    const user = await userService.registerUser(userData);
    
    return sendSuccess(res, 201, "User registered successfully", {
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    if (error && error.code === 11000) {
      return sendError(res, 409, "User already exists", {
        details: "Email or phone number already registered",
      });
    }
    return sendError(res, 500, "Registration failed", {
      details: error.message,
    });
  }
};

export const searchUserById = async (req, res) => {
  try {
    const user = await userService.searchUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchUserByName = async (req, res) => {
  try {
    const user = await userService.searchUserByName(req.params.name);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password)
      return res.status(400).json({ message: "Missing credentials" });
    const user = await userService.searchUserByName(name);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const valid = await userService.verifyPassword(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });
    const payload = { id: user._id, name: user.name, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h",
    }); 
    res.json({ token, user: payload });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};