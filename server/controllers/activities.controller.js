import Activity from "../models/Activity.js";

export const createActivity = async (req, res) => {
  try {
    const newActivity = new Activity({
      activityName,
      location,
      prefecture,
      description,
      coverPath,
      saves: {},
      categories: [],
    });
    await newActivity.save();

    /* all activities */
    const activities = await Activity.find();
    res.status(201).json(activities);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* Read */

export const getActivities = async (req, res) => {

  try {
    const activities = await Activity.find();

    // Log activities to console
    console.log("Fetched activities:", activities);

    res.status(200).json(activities);
  } catch (err) {
    res.status(404).json({ message: err.message });
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