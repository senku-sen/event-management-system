import userService from "../services/userService.js";
import { validateRegister, validateLogin, validateRoleChange, validatePasswordReset } from "../validators/userValidator.js";

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

const isAdmin = (req) => req?.user?.role === "admin";

// USR-05: Register controller (USR-02 validation, USR-03 role enforcement)
export const registerUser = async (req, res) => {
  try {
    const { error, value } = validateRegister(req.body);
    if (error) return sendError(res, 400, "Invalid input", error.details);

    // Enforce role to 'user' on self-registration per USR-03
    const createdUser = await userService.register({ ...value, role: "user" });
    return sendSuccess(res, 201, "User registered", { user: createdUser });
  } catch (err) {
    if (err && err.code === 11000) return sendError(res, 409, "Duplicate key", err);
    return sendError(res, 500, "Registration failed", { message: err?.message });
  }
};

// USR-05: Login controller (USR-02 validation, USR-04 authenticate & return JWT)
export const loginUser = async (req, res) => {
  try {
    const { error, value } = validateLogin(req.body); // expects email & password
    if (error) return sendError(res, 400, "Invalid credentials", error.details);

    const { token, user } = await userService.authenticate(value.email, value.password);
    return sendSuccess(res, 200, "Authenticated", { token, user });
  } catch (err) {
    return sendError(res, 401, "Authentication failed", { message: err?.message });
  }
};

// USR-05: Profile retrieval for authenticated user
export const getProfile = async (req, res) => {
  try {
    const userId = req?.user?.id;
    if (!userId) return sendError(res, 401, "Not authenticated");

    const user = await userService.getById(userId);
    if (!user) return sendError(res, 404, "User not found");
    return sendSuccess(res, 200, "Profile retrieved", { user });
  } catch (err) {
    return sendError(res, 500, "Failed to fetch profile", { message: err?.message });
  }
};

// USR-05: Admin-only - list all users
export const listUsers = async (req, res) => {
  try {
    if (!isAdmin(req)) return sendError(res, 403, "Forbidden");
    const users = await userService.list();
    return sendSuccess(res, 200, "Users retrieved", { users });
  } catch (err) {
    return sendError(res, 500, "Failed to list users", { message: err?.message });
  }
};

// USR-05: Admin-only - change user role
export const updateUserRole = async (req, res) => {
  try {
    if (!isAdmin(req)) return sendError(res, 403, "Forbidden");
    const { error, value } = validateRoleChange(req.body);
    if (error) return sendError(res, 400, "Invalid input", error.details);

    const updatedUser = await userService.updateRole(value.userId, value.role);
    return sendSuccess(res, 200, "Role updated", { user: updatedUser });
  } catch (err) {
    return sendError(res, 500, "Failed to update role", { message: err?.message });
  }
};

// USR-05: Admin-only - reset user password
export const resetUserPassword = async (req, res) => {
  try {
    if (!isAdmin(req)) return sendError(res, 403, "Forbidden");
    const { error, value } = validatePasswordReset(req.body);
    if (error) return sendError(res, 400, "Invalid input", error.details);

    await userService.resetPassword(value.userId, value.newPassword);
    return sendSuccess(res, 200, "Password reset", { userId: value.userId });
  } catch (err) {
    return sendError(res, 500, "Failed to reset password", { message: err?.message });
  }
};