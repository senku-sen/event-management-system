import Group from "../models/groupModel";
import User from "../models/userModel";

const createGroup = async (groupData, userId) => {
    try {
        // Fetch user and verify admin status
        const user = await User.findById(userId);
        
        if (!user || user.role !== 'admin') {
            throw new Error('Unauthorized: Only admins can create groups');
        }
        
        const group = await Group.create(groupData);
        return group;
    } catch (error) {
        throw error;
    }
};

