import mongoose from "mongoose";
import Activity from "../models/Activity.js";
import Prefecture from "../models/Prefecture.js";
import fs from "fs";
import path from "path";

export const createActivity = async (req, res) => {
  try {
    // Destructure the request body to get all fields
    const {
      activityName,
      description,
      prefecture,
      coverPath,
      budget,
      contact,
      website,
      opening_time,
      closing_time,
      location,
      availability,
      price,
      range_price,
      icon,
    } = req.body;

    const categories = JSON.parse(req.body.categories);
    const city = JSON.parse(req.body.city);
    const images = req.body.images ? JSON.parse(req.body.images) : [];

    const existingActivity = await Activity.findOne({ activityName });
    if (existingActivity) {
      return res
        .status(409)
        .json({ message: "Una actividad con este nombre ya existe." });
    }

    const newActivity = new Activity({
      activityName,
      description,
      prefecture,
      coverPath,
      budget,
      categories,
      city,
      price,
      range_price: {
        min: range_price.min,
        max: range_price.max,
      },
      opening_time,
      closing_time,
      contact,
      website,
      location: {
        type: "Point",
        coordinates: location.coordinates,
      },
      availability: {
        all_year: availability.all_year,
        best_season: availability.best_season || [],
      },
      icon: icon || "activity.png",
    });

    await newActivity.save();

    const activities = await Activity.find()
      .populate("prefecture")
      .populate("budget")
      .sort({ createdAt: -1 });
    res.status(201).json({ activities });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("prefecture")
      .populate("budget")
      .sort({ createdAt: -1 });
    res.status(200).json(activities);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Edit existing activity
export const editActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      activityName,
      description,
      prefecture,
      budget,
      categories = [],
      city = [],
      price,
      range_price,
      opening_time,
      closing_time,
      contact,
      website,
      location,
      availability,
      icon,
      images = [],
    } = req.body;

    // Find the existing activity
    const activity = await Activity.findById(id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Prepare updated data with validation for arrays
    const updatedData = {
      activityName,
      description,
      prefecture,
      budget,
      categories: Array.isArray(categories)
        ? categories
        : JSON.parse(categories), // Parse if sent as a string
      city: Array.isArray(city) ? city : JSON.parse(city), // Parse if sent as a string
      price,
      range_price: {
        min: range_price?.min || activity.range_price.min, // Use new values or existing
        max: range_price?.max || activity.range_price.max,
      },
      opening_time,
      closing_time,
      contact,
      website,
      location: {
        type: "Point",
        coordinates: location?.coordinates || activity.location.coordinates, // Update if provided
      },
      availability: {
        all_year: availability?.all_year || activity.availability.all_year, // Handle optional availability
        best_season: Array.isArray(availability?.best_season)
          ? availability.best_season
          : activity.availability.best_season, // Preserve existing if not updated
      },
      icon: icon || activity.icon, // Optional icon update
      images: Array.isArray(images) ? images : JSON.parse(images), // Handle images as an array
    };

    // Handle cover image update
    if (req.file) {
      // Delete old cover image if exists
      if (activity.coverPath) {
        const oldImagePath = path.join("public/assets", activity.coverPath);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Remove old file
        }
      }
      updatedData.coverPath = req.file.filename; // Set new cover image path
    } else {
      updatedData.coverPath = coverPath || activity.coverPath; // Retain old image if no new image
    }

    // Update the activity in the database
    const updatedActivity = await Activity.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation is applied during update
    })
      .populate("prefecture")
      .populate("budget");

    // Send the updated activity as a response
    res.status(200).json(updatedActivity);
  } catch (err) {
    console.error("Error updating activity:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id)
      .populate("prefecture")
      .populate("budget");

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const filterCategory = async (req, res) => {
  try {
    const categoryName = req.params.categoryName;

    if (!categoryName) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const activities = await Activity.find({ categories: categoryName })
      .populate("prefecture")
      .populate("budget");

    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", details: error.message });
  }
};

export const filterPrefecture = async (req, res) => {
  const { prefectureId } = req.params;

  if (!prefectureId) {
    console.log("Missing prefecture ID in path");
    return res.status(400).json({ error: "Prefecture ID is required" });
  }

  try {
    const isPrefectureValid = await Prefecture.exists({ _id: prefectureId });
    if (!isPrefectureValid) {
      console.log("Prefecture not found:", prefectureId);
      return res.status(404).json({ error: "Prefecture not found" });
    }

    const activities = await Activity.find({ prefecture: prefectureId })
      .populate("prefecture")
      .populate("budget");

    if (activities.length === 0) {
      return res.status(204).json([]);
    }

    res.status(200).json(activities);
  } catch (error) {
    console.error("Error object:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
