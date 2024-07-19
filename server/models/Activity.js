// activity.js

import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  activityName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  prefecture: {
    type: String,
    required: true,
  },
  coverPath: {
    type: String,
    required: true,
  },
  categories: [String], 
  saves: { type: Map, of: Boolean },
  location: {
    type: String,
    required: true,
  },
});

const Activity = mongoose.model("Activity", ActivitySchema);
export default Activity;
