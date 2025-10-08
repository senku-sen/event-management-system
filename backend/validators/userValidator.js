// Utility to send validation error response
const sendValidationError = (res, errors) => {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  };
  
  export const validateRegister = (req, res, next) => {
    const { email, password, firstName, lastName, phone, address, role } = req.body ?? {};
    const errors = {};
  
    if (!email || !email.trim()) errors.email = "Email is required";
    else if (!/^([^\s@]+)@([^\s@]+)\.([^\s@]+)$/.test(email)) errors.email = "Email format is invalid";
  
    if (!password || password.length < 6) errors.password = "Password must be at least 6 characters";
  
    if (!firstName || !firstName.trim()) errors.firstName = "First name is required";
  
    if (!lastName || !lastName.trim()) errors.lastName = "Last name is required";
  
    if (!phone || !/^(?:\+63|0)9\d{9}$/.test(phone)) errors.phone = "Phone must match Philippine mobile format";
  
    if (!address || !address.trim()) errors.address = "Address is required";
  
    if (role && !["user", "admin"].includes(role.toLowerCase())) errors.role = "Role must be either 'user' or 'admin'";
  
    if (Object.keys(errors).length) return sendValidationError(res, errors);
  
    req.body = { email, password, firstName, lastName, phone, address, role: role?.toLowerCase() };
    next();
  };
  
  export const validateLogin = (req, res, next) => {
    const { email, password } = req.body ?? {};
    const errors = {};
  
    if (!email || !email.trim()) errors.email = "Email is required";
    else if (!/^([^\s@]+)@([^\s@]+)\.([^\s@]+)$/.test(email)) errors.email = "Email format is invalid";
  
    if (!password || !password.trim()) errors.password = "Password is required";
  
    if (Object.keys(errors).length) return sendValidationError(res, errors);
  
    req.body = { email, password };
    next();
  };
  
  export const validateRoleChange = (req, res, next) => {
    const { userId, role } = req.body ?? {};
    const errors = {};
  
    if (!userId) errors.userId = "User ID is required";
    if (!role || !["user", "admin"].includes(role.toLowerCase())) errors.role = "Role must be either 'user' or 'admin'";
  
    if (Object.keys(errors).length) return sendValidationError(res, errors);
  
    req.body = { userId, role: role.toLowerCase() };
    next();
  };
  
  export const validatePasswordReset = (req, res, next) => {
    const { userId, newPassword } = req.body ?? {};
    const errors = {};
  
    if (!userId) errors.userId = "User ID is required";
    if (!newPassword || newPassword.length < 6) errors.newPassword = "New password must be at least 6 characters";
  
    if (Object.keys(errors).length) return sendValidationError(res, errors);
  
    req.body = { userId, newPassword };
    next();
  };