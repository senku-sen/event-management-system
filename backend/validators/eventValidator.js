export const validateEvent = (req, res, next) => {
    const { title, startDate, location, maxAttendees } = req.body;

    if(!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    if(!startDate || isNaN(Date.parse(startDate))) {
        return res.status(400).json({ error: 'Valid start date is required' });
    }

    if(!location) {
        return res.status(400).json({ error: 'Location is required' });
    }

    if(!maxAttendees || typeof maxAttendees !== 'number' || maxAttendees <= 0) {
        return res.status(400).json({ error: 'Max attendees must be a positive number' });
    }
    next();
};