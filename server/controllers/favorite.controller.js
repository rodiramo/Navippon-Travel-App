import Favorite from "../models/Favorite.js";

/**
 * Add a favorite
 */
export const makeFavorite = async (req, res) => {
  try {
    const userId = req.user.id; // User ID from the token
    const { experienceId } = req.body;

    if (!experienceId) {
      return res
        .status(400)
        .json({ success: false, message: "Experience ID is required." });
    }

    // Check if this experience is already a favorite
    const existingFavorite = await Favorite.findOne({
      userFrom: userId,
      experienceId,
    });

    if (existingFavorite) {
      // Remove favorite if it exists
      await Favorite.deleteOne({ _id: existingFavorite._id });
      return res.status(200).json({
        success: true,
        message: "Removed from favorites.",
        isFavorite: false,
      });
    }

    // Add to favorites if it doesn't exist
    const newFavorite = new Favorite({ userFrom: userId, experienceId });
    await newFavorite.save();

    res.status(200).json({
      success: true,
      message: "Added to favorites.",
      isFavorite: true,
      favorite: newFavorite,
    });
  } catch (error) {
    console.error("Error toggling favorite:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * Get favorites for a user
 */
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await Favorite.find({ userFrom: userId })
      .populate("experienceId", "name image price description")
      .exec();

    res.status(200).json({ success: true, favorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * Check if an experience is a favorite
 */
export const checkFavoriteStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { experienceId } = req.query;

    if (!experienceId) {
      return res.status(400).json({ message: "Experience ID is required." });
    }

    const favorite = await Favorite.findOne({ userFrom: userId, experienceId });

    res.status(200).json({ isFavorite: !!favorite });
  } catch (error) {
    console.error("Error checking favorite status:", error);
    res.status(500).json({ message: "Server error." });
  }
};
