import Trip from "../models/Trip.js";

export const createTrip = async (req, res) => {
  const {
    userId,
    title,
    description,
    startDate,
    endDate,
    prefecture,
    categories = [],
    budget,
  } = req.body;

  if (!userId || !title || !startDate || !endDate || !prefecture) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const overlappingTrips = await Trip.find({
    userId,
    $or: [
      {
        startDate: { $lte: endDate },
        endDate: { $gte: startDate },
      },
      {
        startDate: { $gte: startDate, $lte: endDate },
        endDate: { $gte: startDate, $lte: endDate },
      },
    ],
  });

  if (overlappingTrips.length > 0) {
    return res
      .status(400)
      .json({ error: "Date range overlaps with an existing trip" });
  }

  try {
    const newTrip = new Trip({
      userId,
      title,
      description,
      startDate,
      endDate,
      prefecture,
      categories,
      budget,
    });

    newTrip.calculateDays();

    const savedTrip = await newTrip.save();
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
      .populate("categories")
      .populate("budget");

    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate("prefecture")
      .populate("categories")
      .populate("budget");

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
      .populate("categories")
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
