const authMiddleware = (req, res, next) => {
    try {
        // Get user from session, JWT token, or however you're handling auth
        // This is a basic example - adjust based on your auth strategy
        
        const user = req.user; // Assuming you set req.user somewhere (e.g., passport, JWT middleware)
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }
        
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid authentication'
        });
    }
};

const adminMiddleware = (req, res, next) => {
    try {
        const user = req.user;
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }
        
        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }
        
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Access denied'
        });
    }
};

export { authMiddleware, adminMiddleware };