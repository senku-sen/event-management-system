import Event from '../models/eventModel.js';
import User from '../models/userModel.js';


const getEvents = async () => {
  try {
    return await Event.find()
      .populate({
        path: 'createdBy',
        select: 'name email'
      })
      .sort({ startDate: 1 });
  } catch (error) {
    console.error("Error fetching events: ", error);
    throw error;
  }
};

// [EVENT-03] Create a new event linked to user
const createEvent = async ({ title, description, startDate, endDate, location, category, maxAttendees, userId }) => {
  try {
    console.log("🟢 Creating event with data:", {
      title,
      startDate,
      endDate,
      location,
      category,
      maxAttendees,
      userId
    });

    // 1. Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // 2. Validate dates
    if (new Date(endDate) <= new Date(startDate)) {
      const error = new Error("End date must be after start date");
      error.statusCode = 400;
      throw error;
    }

    // 3. Create the event
    const newEvent = await Event.create({
      title,
      description,
      startDate,
      endDate,
      location,
      category,
      maxAttendees,
      createdBy: userId,
      status: 'upcoming'
    });

    // 4. Populate and return the created event with creator details
    const populatedEvent = await Event.findById(newEvent._id)
      .populate({
        path: 'createdBy',
        select: 'name email'
      });

    console.log("✅ Event created successfully:", populatedEvent);
    return populatedEvent;
  } catch (error) {
    console.error("❌ Error in createEvent service:", error);
    throw error;
  }
};

// [EVENT-03] Get specific event by id
const getEventById = async (id) => {
  try {
    const event = await Event.findById(id)
      .populate({
        path: 'createdBy',
        select: 'name email'
      });
    
    if (!event) {
      const error = new Error("Event not found");
      error.statusCode = 404;
      throw error;
    }
    
    return event;
  } catch (error) {
    console.error("Error fetching event: ", error);
    throw error;
  }
};

// [EVENT-04] Update event with authorization check
const updateEvent = async (id, updateData, userId, isAdmin) => {
  try {
    const event = await Event.findById(id);
    
    if (!event) {
      const error = new Error("Event not found");
      error.statusCode = 404;
      throw error;
    }

    // Authorization check
    if (!isAdmin && event.createdBy.toString() !== userId) {
      const error = new Error("Unauthorized: You can only edit your own events");
      error.statusCode = 403;
      throw error;
    }

    // Validate dates if they're being updated
    if (updateData.startDate && updateData.endDate) {
      if (new Date(updateData.endDate) <= new Date(updateData.startDate)) {
        const error = new Error("End date must be after start date");
        error.statusCode = 400;
        throw error;
      }
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { 
        ...updateData,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    ).populate({
      path: 'createdBy',
      select: 'name email'
    });

    return updatedEvent;
  } catch (error) {
    console.error("Error updating event: ", error);
    throw error;
  }
};

// [EVENT-05] Delete event with authorization check
const deleteEvent = async (id, userId, isAdmin) => {
  try {
    const event = await Event.findById(id);
    
    if (!event) {
      const error = new Error("Event not found");
      error.statusCode = 404;
      throw error;
    }

    // Authorization check
    if (!isAdmin && event.createdBy.toString() !== userId) {
      const error = new Error("Unauthorized: You can only delete your own events");
      error.statusCode = 403;
      throw error;
    }

    const deletedEvent = await Event.findByIdAndDelete(id);
    return deletedEvent;
  } catch (error) {
    console.error("Error deleting event: ", error);
    throw error;
  }
};

// [EVENT-06] Get events by user ID
const getEventsByUser = async (userId) => {
  try {
    return await Event.find({ createdBy: userId })
      .sort({ startDate: 1 });
  } catch (error) {
    console.error("Error fetching user events: ", error);
    throw error;
  }
};



export default {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventsByUser,
};
