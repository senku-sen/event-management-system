import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

    // USR-05: list users (no password)
    const list = async () => {
    try {
        return await User.find().select("-password");
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
    };

    // USR-03: register with hashing; role enforced by controller
    const register = async ({ email, password, firstName, lastName, phone, address, role }) => {
    try {
        const existing = await User.findOne({ email });
        if (existing) {
        const err = new Error("User already exists");
        // mimic duplicate key shape used by controller
        err.code = 11000;
        throw err;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, firstName, lastName, phone, address, role });
        await newUser.save();

        const userObject = newUser.toObject();
        delete userObject.password;
        return userObject;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
    };

    // USR-04: authenticate and return JWT + public user
    const authenticate = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("Invalid credentials");

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) throw new Error("Invalid credentials");

        const payload = { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
        return { token, user: payload };
    } catch (error) {
        console.error("Error authenticating user:", error);
        throw error;
    }
    };

    // USR-05: get profile by id (no password)
    const getById = async (id) => {
    try {
        return await User.findById(id).select("-password");
    } catch (error) {
        console.error("Error fetching user by id:", error);
        throw error;
    }
    };

    // Optional: find by first or last name (case-insensitive), exclude password
    const findByName = async (nameQuery) => {
    try {
        const rx = new RegExp(nameQuery, "i");
        return await User.find({ $or: [{ firstName: rx }, { lastName: rx }] }).select("-password");
    } catch (error) {
        console.error("Error searching users by name:", error);
        throw error;
    }
    };

    // USR-05: admin - change role
    const updateRole = async (userId, role) => {
    try {
        if (!['user', 'admin'].includes(role)) {
        const err = new Error("Invalid role");
        err.status = 400;
        throw err;
        }
        const updated = await User.findByIdAndUpdate(userId, { role }, { new: true }).select("-password");
        return updated;
    } catch (error) {
        console.error("Error updating role:", error);
        throw error;
    }
    };

    // USR-05: admin - reset password
    const resetPassword = async (userId, newPassword) => {
    try {
        const hashed = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, { password: hashed });
        return true;
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
    };

export default {
  list,
  register,
  authenticate,
  getById,
  updateRole,
  resetPassword,
  findByName,
};