import mongoose from "mongoose";

const DaySchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    prefecture: { type: mongoose.Schema.Types.ObjectId, ref: "Prefecture" },
    city: { type: String },
    date: { type: Date, required: true },
    schedule: [
      {
        time: { type: String, required: true },
        experience: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Experience",
        },
        custom: {
          name: { type: String },
          location: { type: String },
          description: { type: String },
          cost: { type: Number },
        },
      },
    ],
    notes: { type: String },
    dailyBudget: { type: Number },
  },
  { timestamps: true }
);

const Day = mongoose.model("Day", DaySchema);
export default Day;
