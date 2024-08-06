import Prefecture from "../models/Prefecture.js";
import Activity from "../models/Activity.js";

export const getPrefectures = async (req, res) => {
  try {
    const prefectures = await Prefecture.find();

    const prefectureActivityCounts = {};

    const activities = await Activity.aggregate([
      { $group: { _id: "$prefecture", count: { $sum: 1 } } },
    ]);

    activities.forEach(({ _id, count }) => {
      prefectureActivityCounts[_id] = count;
    });

    const prefecturesWithCounts = prefectures.map((prefecture) => ({
      ...prefecture.toObject(),
      activityCount: prefectureActivityCounts[prefecture._id] || 0,
    }));

    res.status(200).json(prefecturesWithCounts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPrefectureById = async (req, res) => {
  try {
    const { id } = req.params;
    const prefecture = await Prefecture.findById(id);

    if (!prefecture) {
      return res.status(404).json({ error: "Prefecture not found" });
    }

    res.status(200).json(prefecture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
