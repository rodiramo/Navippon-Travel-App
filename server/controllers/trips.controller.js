import Trip from "../models/Trip.js";
import mongoose from "mongoose";
import Day from "../models/Day.js"; // Make sure to import Day model

export const createTrip = async (req, res) => {
  const {
    userId,
    title,
    description,
    startDate,
    endDate,
    prefecture,
    budget,
    isPrivate = true,
    travelers = [],
  } = req.body;
  console.log("Incoming Request Body:", req.body);
  if (!userId || !title || !startDate || !endDate || !prefecture) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Validation for start and end dates
  if (start < today) {
    return res.status(400).json({ error: "Start date cannot be before today" });
  }

  if (end <= start || end - start < 24 * 60 * 60 * 1000) {
    return res.status(400).json({
      error: "End date must be at least one day after the start date",
    });
  }

  // Check for overlapping trips
  const overlappingTrips = await Trip.find({
    userId,
    $or: [
      { startDate: { $lte: end }, endDate: { $gte: start } },
      { startDate: { $gte: start }, endDate: { $lte: end } },
    ],
  });

  if (overlappingTrips.length > 0) {
    return res
      .status(400)
      .json({ error: "Date range overlaps with an existing trip" });
  }

  try {
    const travelersObjectIds = travelers.map(
      (travelerId) => new mongoose.Types.ObjectId(travelerId)
    );
    console.log("Creating new trip with data:", {
      userId,
      title,
      description,
      startDate,
      endDate,
      prefecture,
      budget,
      isPrivate,
      travelers,
    });

    // Create the new trip
    const newTrip = new Trip({
      userId,
      title,
      description,
      startDate,
      endDate,
      prefecture,
      budget,
      isPrivate,
      travelers: travelersObjectIds,
    });
    const savedTrip = await newTrip.save();

    // Calculate the number of days and create corresponding Day documents
    const daysPromises = [];
    const currentDate = new Date(startDate);

    while (currentDate <= end) {
      const dayDate = new Date(currentDate); // Store the date for the current day

      const newDay = new Day({
        tripId: savedTrip._id, // Link this day to the trip
        dayNumber: daysPromises.length + 1, // Incremental day number (1, 2, 3, ...)
        date: dayDate, // The specific date of the day
        experiences: [], // Optionally, you can add experiences later
      });

      daysPromises.push(newDay.save()); // Add this day to the list of promises
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    // Wait for all Day documents to be saved
    const savedDays = await Promise.all(daysPromises);

    // Update the Trip document with the references to the saved Day documents
    savedTrip.days = savedDays.map((day) => day._id);
    await savedTrip.save();

    // Return the saved trip as the response
    res.status(201).json(savedTrip);
  } catch (error) {
    console.error("Error creating trip:", error.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export const getUserTrips = async (req, res) => {
  const userId = req.user.id;

  try {
    const trips = await Trip.find({ userId })
      .populate("prefecture")
      .populate("budget")
      .sort({ startDate: 1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate("prefecture")
      .populate("budget")
      .populate("days");

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("prefecture")
      .populate("budget");

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    res.json(trip);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
