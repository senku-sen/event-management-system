// Add or update these validation functions

const validateRegister = (data) => {
    const errors = {};
    
    if (!data.name || data.name.trim() === '') {
        errors.name = 'Name is required';
    }
    
    if (!data.email || data.email.trim() === '') {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Email is invalid';
    }
    
    if (!data.password || data.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

const validateLogin = (data) => {
    const errors = {};
    
    if (!data.email || data.email.trim() === '') {
        errors.email = 'Email is required';
    }
    
    if (!data.password || data.password.trim() === '') {
        errors.password = 'Password is required';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

const validateRoleChange = (data) => {
    const errors = {};
    
    if (!data.role || !['admin', 'user'].includes(data.role)) {
        errors.role = 'Role must be either admin or user';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

const validatePasswordReset = (data) => {
    const errors = {};
    
    if (!data.newPassword || data.newPassword.length < 6) {
        errors.newPassword = 'New password must be at least 6 characters';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export { validateRegister, validateLogin, validateRoleChange, validatePasswordReset };