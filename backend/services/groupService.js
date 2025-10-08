import Group from "../models/groupModel.js";
import User from "../models/userModel.js";
import Event from "../models/eventModel.js";

const createGroup = async (userId, groupData) => {
  try {
    const user = await User.findById(userId);

    if (!user || user.role !== "Admin") {
      const err = new Error("Only admins can create groups");
      err.statusCode = 403;
      throw err;
    }

    const payload = {
      ...groupData,
      createdBy: userId,
    };

    const group = await Group.create(payload);
    return group;
  } catch (error) {
    throw error;
  }
};

const getAllGroups = async (user) => {
  try {
    const query = (!user || user.role !== "Admin") ? { visibility: "public" } : {};

    const groups = await Group.find(query)
      .populate("createdBy", "firstName lastName email")
      .sort({ createdAt: -1 })
      .lean();

    const groupsWithEvents = await Promise.all(
      groups.map(async (group) => {
        const events = await Event.find({ groupId: group._id }).lean();
        return {
          ...group,
          events,
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
    const group = await Group.findByIdAndDelete(groupId).lean();
    return group;
  } catch (error) {
    throw error;
  }
};


const updateGroup = async (groupId, groupData) => {
  try {
    const group = await Group.findByIdAndUpdate(
      groupId,
      { ...groupData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).lean();
    return group;
  } catch (error) {
    throw error;
  }
};


const getGroupById = async (groupId) => {
  try {
    const group = await Group.findById(groupId)
      .populate("createdBy", "firstName lastName email")
      .lean();
    return group;
  } catch (error) {
    throw error;
  }
};

export default {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};

