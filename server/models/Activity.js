import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  activityName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  prefecture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prefecture",
  },
  coverPath: {
    type: String,
    required: true,
  },
  budget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Budget",
  },
  categories: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Activity = mongoose.model("Activity", ActivitySchema);
export default Activity;
