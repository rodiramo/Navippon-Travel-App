import mongoose from "mongoose";

const TRAVELER_ROLES = ["viewer", "editor"]; // Role constants

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

    budget: { type: mongoose.Schema.Types.ObjectId, ref: "Budget" },
    totalDays: { type: Number },
    isPrivate: { type: Boolean, default: true },
    travelers: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, enum: TRAVELER_ROLES, default: "viewer" },
      },
    ],
    days: [{ type: mongoose.Schema.Types.ObjectId, ref: "Day" }],
  },
  { timestamps: true }
);

// Method to calculate trip days and populate the days field
TripSchema.methods.calculateDays = async function () {
  const Day = mongoose.model("Day");
  const days = [];
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);

  while (start <= end) {
    const newDay = await Day.create({
      date: new Date(start),
      tripId: this._id,
    });
    days.push(newDay._id);
    start.setDate(start.getDate() + 1);
  }

  this.days = days;
};

// Middleware to automatically calculate days before saving
TripSchema.pre("save", async function (next) {
  if (this.isModified("startDate") || this.isModified("endDate")) {
    await this.calculateDays();
  }
  next();
});

const Trip = mongoose.model("Trip", TripSchema);
export default Trip;
