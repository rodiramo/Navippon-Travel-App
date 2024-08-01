import Activity from "../models/Activity.js";
import fs from "fs";
import path from "path";

// Create a new activity
export const createActivity = async (req, res) => {
  try {
    const {
      activityName,
      description,
      prefecture,
      coverPath,
      budget,
    } = req.body;
    const categories = JSON.parse(req.body.categories);

    const existingActivity = await Activity.findOne({ activityName });
    if (existingActivity) {
      return res
        .status(409)
        .json({ message: "Activity with this name already exists" });
    }

    const newActivity = new Activity({
      activityName,
      description,
      prefecture,
      coverPath,
      budget,
      categories,
      saves: {},
    });

    await newActivity.save();

    const activities = await Activity.find()
      .populate("prefecture")
      .populate("budget");

    res.status(201).json(newActivity);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("prefecture")
      .populate("budget");
    res.status(200).json(activities);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const filterActivities = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};

    if (category) {
      filter.categories = category;
    }

    const activities = await Activity.find(filter)
      .populate("prefecture")
      .populate("budget");

    if (activities.length === 0) {
      return res
        .status(404)
        .json({ message: "No activities found for this category" });
    }

    res.status(200).json(activities);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const editActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      activityName,
      description,
      prefecture,
      budget,
      categories = [],
    } = req.body;

    const activity = await Activity.findById(id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    const updatedData = {
      activityName,
      description,
      prefecture,
      budget,
      categories: Array.isArray(categories)
        ? categories
        : JSON.parse(categories),
    };

    if (req.file) {
      if (activity.coverPath) {
        fs.existsSync(path.join("public/assets", activity.coverPath));
      }
      updatedData.coverPath = req.file.filename;
    }

    const updatedActivity = await Activity.findByIdAndUpdate(id, updatedData, {
      new: true,
    })
      .populate("prefecture")
      .populate("budget");

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

export const saveActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const activity = await Activity.findById(id);

    const isSaved = activity.saves.get(userId);
    if (isSaved) {
      activity.saves.delete(userId);
    } else {
      activity.saves.set(userId, true);
    }

    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { saves: activity.saves },
      { new: true }
    );

    res.status(200).json(updatedActivity);
  } catch (err) {
    res.status(404).json({ message: err.message });
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
