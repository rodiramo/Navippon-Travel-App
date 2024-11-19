import Region from "../models/Region.js";
import Experience from "../models/Experience.js";

export const getRegions = async (req, res) => {
  try {
    const regions = await Region.find();

    const regionsExperienceCount = {};

    const experiences = await Experience.aggregate([
      { $group: { _id: "$region", count: { $sum: 1 } } },
    ]);

    experiences.forEach(({ _id, count }) => {
      regionsExperienceCount[_id] = count;
    });

    const regionsWithCounts = regions.map((region) => ({
      ...region.toObject(),
      experienceCount: regionsExperienceCount[region._id] || 0,
    }));

    res.status(200).json(regionsWithCounts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getRegionById = async (req, res) => {
  try {
    const { id } = req.params;
    const region = await Region.findById(id);

    if (!region) {
      return res.status(404).json({ error: "Region not found" });
    }

    res.status(200).json(region);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
