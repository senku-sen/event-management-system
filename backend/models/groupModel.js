import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed'],
        default: 'upcoming',
        required: true,
    },
    category: {
        type: String,
        enum: ['conference', 'workshop', 'webinar', 'meetup'],
        required: true,
    },
    maxAttendees: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: Date, 
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true, } 
);

const Group = mongoose.model('Group', eventSchema);

export default Group;
