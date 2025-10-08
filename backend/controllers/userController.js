import userService from "../services/userService.js";

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
    return sendSuccess(res, 200, "Users retrieved successfully", { users });
  } catch (error) {
    return sendError(res, 500, "Failed to retrieve users", { 
      details: error.message 
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    return sendSuccess(res, 201, "User created successfully", { user });
  } catch (error) {
    if (error && error.code === 11000) {
      return sendError(res, 409, "Duplicate key error", { 
        details: "User already exists" 
      });
    }
    return sendError(res, 500, "Failed to create user", { 
      details: error.message 
    });
  }
};

// [USR-03] Register new user with password hashing and role restriction
export const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    
    // Role assignment logic: Restrict 'Admin' role assignment
    // Only authenticated Admin users can create Admin accounts
    if (userData.role === "Admin") {
      if (!req.user || req.user.role !== "Admin") {
        // Force role to 'User' for non-admin registration attempts
        userData.role = "User";
      }
    } else {
      // Default to 'User' if no role specified
      userData.role = "User";
    }

    // Call service to register user (handles password hashing)
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

// [USR-04] Login user - authenticate and return JWT token
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return sendError(res, 400, "Missing credentials", { 
        details: "Email and password are required" 
      });
    }
    
    // Call service to authenticate user and get JWT token
    const result = await userService.authenticateUser(email, password);
    
    return sendSuccess(res, 200, "Login successful", {
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return sendError(res, 401, "Invalid credentials", { 
        details: "Email or password is incorrect" 
      });
    }
    return sendError(res, 500, "Login failed", { 
      details: error.message 
    });
  }
};

export const searchUserById = async (req, res) => {
  try {
    const user = await userService.searchUserById(req.params.id);
    if (!user) {
      return sendError(res, 404, "User not found", { 
        details: "No user found with this ID" 
      });
    }
    return sendSuccess(res, 200, "User found", { user });
  } catch (error) {
    return sendError(res, 500, "Failed to search user", { 
      details: error.message 
    });
  }
};

export const searchUserByName = async (req, res) => {
  try {
    const user = await userService.searchUserByName(req.params.name);
    if (!user) {
      return sendError(res, 404, "User not found", { 
        details: "No user found with this name" 
      });
    }
    return sendSuccess(res, 200, "User found", { user });
  } catch (error) {
    return sendError(res, 500, "Failed to search user", { 
      details: error.message 
    });
  }
};