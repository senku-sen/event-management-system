import eventServices from "../services/eventServices";

// Get all events with filtering by user role
export const getEvents = async (req, res) => {
  try {
    const events = await eventServices.getEvents();
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error("❌ Error in getEvents:", error);
    res.status(500).json({ 
      success: false,
      message: "Server Error", 
      error: error.message 
    });
  }
};

// Create event (any logged-in user)
export const createEvent = async (req, res) => {
  try {
    console.log("🟢 Received body:", req.body);
    const { title, description, startDate, endDate, location, category, maxAttendees } = req.body;
    
    const eventData = {
      title,
      description,
      startDate,
      endDate,
      location,
      category,
      maxAttendees,
      userId: req.user.id // From auth middleware
    };

    const newEvent = await eventServices.createEvent(eventData);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent
    });
  } catch (error) {
    console.error("❌ Error in createEvent:", error);
    
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ 
      success: false,
      message: error.message || "Server Error",
      error: error.message 
    });
  }
};

// Get specific event by id
export const getEventById = async (req, res) => {
  try {
    const id = req.params.id;
    const event = await eventServices.getEventById(id);
    
    if (!event) {
      return res.status(404).json({ 
        success: false,
        message: "Event not found" 
      });
    }
    
    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error("❌ Error in getEventById:", error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ 
      success: false,
      message: error.message || "Server Error",
      error: error.message 
    });
  }
};

//  Update event (own events or Admin)
export const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;

    const updatedEvent = await eventServices.updateEvent(id, updateData, userId, isAdmin);
    
    if (!updatedEvent) {
      return res.status(404).json({ 
        success: false,
        message: "Event not found" 
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent
    });
  } catch (error) {
    console.error("❌ Error in updateEvent:", error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ 
      success: false,
      message: error.message || "Server Error",
      error: error.message 
    });
  }
};

// Delete event (own events or Admin)
export const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;

    const deletedEvent = await eventServices.deleteEvent(id, userId, isAdmin);
    
    if (!deletedEvent) {
      return res.status(404).json({ 
        success: false,
        message: "Event not found" 
      });
    }
    
    res.status(200).json({ 
      success: true,
      message: "Event deleted successfully", 
      data: deletedEvent 
    });
  } catch (error) {
    console.error("❌ Error in deleteEvent:", error);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ 
      success: false,
      message: error.message || "Server Error",
      error: error.message 
    });
  }
};

//  Get events by user
export const getEventsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const events = await eventServices.getEventsByUser(userId);
    
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error("❌ Error in getEventsByUser:", error);
    res.status(500).json({ 
      success: false,
      message: "Server Error", 
      error: error.message 
    });
  }
};

// [EVENT-07] Get upcoming events
export const getUpcomingEvents = async (req, res) => {
  try {
    const events = await eventServices.getUpcomingEvents();
    
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error("❌ Error in getUpcomingEvents:", error);
    res.status(500).json({ 
      success: false,
      message: "Server Error", 
      error: error.message 
    });
  }
};
