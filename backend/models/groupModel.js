import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        visibility: {
            type: String,
            enum: ['public', 'private'],
            default: 'public'
        },
        maxEvents: {
            type: Number,
            required: true,
            default: 10
        }
    },
    {
        timestamps: true
    }
);

const Group = mongoose.model('Group', groupSchema);

export default Group;