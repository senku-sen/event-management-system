import jwt from "jsonwebtoken";
import userService from "../services/userService.js";

// Secret key (should be in .env file in real apps)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Middleware to verify JWT and attach user to request
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
      error: { details: "Missing or invalid token" },
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userService.searchUserById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
        error: { details: "User not found" },
      });
    }

    req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
      error: { details: "Invalid or expired token" },
    });
  }
};

// Middleware to allow only Admin users
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "Admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied",
      error: { details: "Admin privileges required" },
    });
  }

  next();
};
