import Prefecture from "../models/Prefecture.js";

export const getPrefectures = async (req, res) => {
  try {
    const prefectures = await Prefecture.find();
    res.status(200).json(prefectures);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};