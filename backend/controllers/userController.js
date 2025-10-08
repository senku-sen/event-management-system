import userService from "../services/userService.js";
import { validateRegister, validateLogin, validateRoleChange, validatePasswordReset } from "../validators/userValidator.js";

// Simplified success response
const sendSuccess = (res, data, status = 200, message = "Success") => {
  res.status(status).json({ success: true, message, data });
};

// Simplified error response
const sendError = (res, message, status = 500) => {
  res.status(status).json({ success: false, message });
};

// Check if user is admin
const isAdmin = (req) => req?.user?.role === "admin";

// USR-05: Register controller
export const registerUser = async (req, res) => {
  try {
    const createdUser = await userService.register({ ...req.body, role: "user" });
    sendSuccess(res, { user: createdUser }, 201, "User registered");
  } catch (err) {
    if (err.message === "User already exists") return sendError(res, "User already exists", 409);
    sendError(res, "Registration failed", 500);
  }
};

// USR-05: Login controller
export const loginUser = async (req, res) => {
  try {
    const { token, user } = await userService.authenticate(req.body.email, req.body.password);
    sendSuccess(res, { token, user }, 200, "Authenticated");
  } catch (err) {
    sendError(res, "Authentication failed", 401);
  }
};

// USR-05: Profile retrieval
export const getProfile = async (req, res) => {
  try {
    const userId = req?.user?.id;
    if (!userId) return sendError(res, "Not authenticated", 401);
    const user = await userService.getById(userId);
    sendSuccess(res, { user }, 200, "Profile retrieved");
  } catch (err) {
    sendError(res, err.message === "User not found" ? "User not found" : "Failed to fetch profile", err.message === "User not found" ? 404 : 500);
  }
};

// USR-05: Admin - list all users
export const listUsers = async (req, res) => {
  try {
    if (!isAdmin(req)) return sendError(res, "Forbidden", 403);
    const users = await userService.list();
    sendSuccess(res, { users }, 200, "Users retrieved");
  } catch (err) {
    sendError(res, "Failed to list users", 500);
  }
};

// USR-05: Admin - change user role
export const updateUserRole = async (req, res) => {
  try {
    if (!isAdmin(req)) return sendError(res, "Forbidden", 403);
    const updatedUser = await userService.updateRole(req.body.userId, req.body.role);
    sendSuccess(res, { user: updatedUser }, 200, "Role updated");
  } catch (err) {
    sendError(res, err.message === "User not found" ? "User not found" : "Failed to update role", err.message === "User not found" ? 404 : 500);
  }
};

// USR-05: Admin - reset user password
export const resetUserPassword = async (req, res) => {
  try {
    if (!isAdmin(req)) return sendError(res, "Forbidden", 403);
    await userService.resetPassword(req.body.userId, req.body.newPassword);
    sendSuccess(res, { userId: req.body.userId }, 200, "Password reset");
  } catch (err) {
    sendError(res, err.message === "User not found" ? "User not found" : "Failed to reset password", err.message === "User not found" ? 404 : 500);
  }
};