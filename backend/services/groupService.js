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

const getAllGroup = async (user) => {
    try {
        let query = {};
        
        // Regular users see only public groups
        // Admins see all groups (public + private)
        if (!user || user.role !== 'admin') {
            query.visibility = 'public';
        }
        
        // Get all groups based on query
        const groups = await Group.find(query)
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });
        
        // For each group, fetch its events
        const groupsWithEvents = await Promise.all(
            groups.map(async (group) => {
                const events = await Event.find({ groupId: group._id });
                return {
                    ...group.toObject(),
                    events
                };
            })
        );
        
        return groupsWithEvents;
    } catch (error) {
        throw error;
    }
};


const deleteGroup = async (groupId) => {
    try {
        const group = await Group.findByIdAndDelete(groupId);
        return group;
    } catch (error) {
        throw error;
    }
};


const updateGroup = async (groupId, groupData) => {
    try {
        const group = await Group.findByIdAndUpdate(groupId, groupData, { new: true });
        return group;
    } catch (error) {
        throw error;
    }
};


const searchGroupById = async (groupId) => {
    try {
        const group = await Group.findById(groupId);
        return group;
    } catch (error) {
        throw error;
    }
};

