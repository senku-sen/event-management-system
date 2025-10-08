const validateSignUp = (req, res, next) => {
    const { email, password, phone, firstName, lastName, address } = req.body;

    // Email validation
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Password validation
    if (!password || password.length < 8) {
        return res
            .status(400)
            .json({ message: "Password must be at least 8 characters long" });
    }

    // First name validation
    if (!firstName) {
        return res.status(400).json({ message: "First name is required" });
    }

    // Last name validation
    if (!lastName) {
        return res.status(400).json({ message: "Last name is required" });
    }

    // Phone validation
    if (!phone) {
        return res.status(400).json({ message: "Phone number is required" });
    }

    const phonePattern = /^(?:\+63|0)9\d{9}$/;
    if (!phonePattern.test(phone)) {
        return res.status(400).json({
            message:
                "Invalid Philippine phone number. Use +639XXXXXXXXX or 09XXXXXXXXX format.",
        });
    }

    // Address validation
    if (!address) {
        return res.status(400).json({ message: "Address is required" });
    }

    next();
};

const validateSignIn = (req, res, next) => {
    const { email, password } = req.body;

    // Email validation
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Password validation
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    next();
};

export { validateSignUp, validateSignIn };