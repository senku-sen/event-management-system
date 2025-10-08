import groupServices from "../services/groupService";


// Get all groups
export const getAllGroup = async (req, res) => {
  try {
    const groups = await groupServices.getAllGroup();
    res.status(200).json({
      success: true,
      count: groups.length,
      data: groups
    });
  } catch (error) {
    console.error("❌ Error in getAllGroup:", error);
    res.status(500).json({ 
      success: false,
      message: "Server Error", 
      error: error.message 
    });
  }
};


// Create group
export const createGroup = async (req, res) => {
  try {
    const group = await groupServices.createGroup(req.body);
    res.status(201).json({
      success: true,
      message: "Group created successfully",
      data: group
    });
  } catch (error) {
    console.error("❌ Error in createGroup:", error);
    res.status(500).json({ 
      success: false,
      message: "Server Error", 
      error: error.message 
    });
  }
};




export const deleteGroup = async (req, res) => {
  try {
    const group = await groupServices.deleteGroup(req.params.id);
    res.status(200).json({
      success: true,
      message: "Group deleted successfully",
      data: group
    });
  } catch (error) {
    console.error("❌ Error in deleteGroup:", error);
    res.status(500).json({ 
      success: false,
      message: "Server Error", 
      error: error.message 
    });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const group = await groupServices.updateGroup(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Group updated successfully",
      data: group
    });
  } catch (error) {
    console.error("❌ Error in updateGroup:", error);
    res.status(500).json({ 
      success: false,
      message: "Server Error", 
      error: error.message 
    });
  }
};


export const getGroupById = async (req, res) => {
  try {
    const group = await groupServices.getGroupById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Group fetched successfully",
      data: group
    });
  } catch (error) {
    console.error("❌ Error in getGroupById:", error);
    res.status(500).json({ 
      success: false,
      message: "Server Error", 
      error: error.message 
    });
  }
};