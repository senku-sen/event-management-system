// [GRP-01] Create Group model with fields: 
// id, name, description, createdBy, visibility (enum: ‘public’, ‘private’), 
// maxEvents, createdAt, updatedAt.


import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
  },
  
  description : {
    type: string,
    required :  true,

  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  visibility: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },

  maxEvents: {
    type: Number,
    default: 10,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },


})

const group = mongoose.model('Group', groupSchema);

export default group;
