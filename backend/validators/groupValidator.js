export const validatorGroup = (req, res, next) => {
    const { name, visibility, maxEvents } = req.body;
    
    // Check if name is provided
    if (!name || name.trim() === '') {
        return res.status(400).json({ 
            success: false, 
            message: 'Name is required' 
        });
    }
    
    // Set visibility to 'public' by default
    if (!visibility) {
        req.body.visibility = 'public';
    }
    
    // Validate visibility value
    if (visibility && !['public', 'private'].includes(visibility)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Visibility must be either public or private' 
        });
    }
    
    // Make sure maxEvents is a positive number
    if (maxEvents !== undefined) {
        if (typeof maxEvents !== 'number' || maxEvents <= 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'MaxEvents must be a positive number' 
            });
        }
    }
    
    // Only Admins can create groups
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ 
            success: false, 
            message: 'Only Admins can create groups' 
        });
    }
    
    next();
};