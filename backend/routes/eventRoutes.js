import express from 'express';
import { 
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';
import { validateEvent } from '../validators/eventValidator.js';

const router = express.Router();

// GET /api/events - Get events (Users see own; Admins see all)
router.get('/', getEvents);

// POST /api/events - Create event (logged-in users)
router.post('/', validateEvent, createEvent);

// PUT /api/events/:id - Update event (owner or Admin)
router.put('/:id', validateEvent, updateEvent);

// DELETE /api/events/:id - Delete event (owner or Admin)
router.delete('/:id', deleteEvent);

export default router;