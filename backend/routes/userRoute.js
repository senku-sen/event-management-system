import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  listUsers,
  updateUserRole,
  resetUserPassword,
  registerAdmin,
} from "../controllers/userController.js";
import { validateRegister, validateLogin, validateRoleChange, validatePasswordReset } from "../validators/userValidator.js";
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';





const router = express.Router();

// Public routes
router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

// TEMPORARY: Admin registration (remove after creating admin)
router.post("/register-admin", validateRegister, registerAdmin);

// Protected routes (require authentication)
router.get("/profile", authMiddleware, getProfile);

// Admin-only routes (require admin role)
router.get("/users", authMiddleware, listUsers);
router.put("/users/role", authMiddleware, validateRoleChange, updateUserRole);
router.put("/users/password", authMiddleware, validatePasswordReset, resetUserPassword);

export default router;
