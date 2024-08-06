import Category from "../models/Category.js";
import Activity from "../models/Activity.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    const activityCounts = await Activity.aggregate([
      { $unwind: "$categories" },
      { $group: { _id: "$categories", count: { $sum: 1 } } },
    ]);

    const categoryCountMap = activityCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    const categoriesWithCounts = categories.map((category) => ({
      ...category.toObject(),
      count: categoryCountMap[category.category] || 0,
    }));

    res.status(200).json(categoriesWithCounts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
