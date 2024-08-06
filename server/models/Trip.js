// models/Trip.js
import mongoose from "mongoose";

const TripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    prefecture: { type: mongoose.Schema.Types.ObjectId, ref: "Prefecture" },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    budget: { type: mongoose.Schema.Types.ObjectId, ref: "Budget" },
    days: [{ type: Date }],
  },
  { timestamps: true }
);

TripSchema.methods.calculateDays = function () {
  const days = [];
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);
  while (start <= end) {
    days.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }
  this.days = days;
};

const Trip = mongoose.model("Trip", TripSchema);
export default Trip;
