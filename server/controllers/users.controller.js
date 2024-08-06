import User from "../models/User.js";
import Category from "../models/Category.js";
import Budget from "../models/Budget.js";
import fs from "fs";
import path from "path";

const getCategoriesAndBudgets = async () => {
  try {
    const categories = await Category.find();
    const budgets = await Budget.find();
    return { categories, budgets };
  } catch (error) {
    throw new Error("Error fetching categories or budgets");
  }
};

export const getUserPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("preferences");
    if (!user) return res.status(404).json({ message: "User not found" });

    const { categories, budgets } = await getCategoriesAndBudgets();

    res.json({
      userPreferences: user.preferences || [],
      categories,
      budgets,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUserPreferences = async (req, res) => {
  try {
    const { categories, budgets } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          "preferences.categories": categories,
          "preferences.budgets": budgets,
        },
      },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    const {
      categories: allCategories,
      budgets: allBudgets,
    } = await getCategoriesAndBudgets();

    res.json({
      message: "Preferences updated successfully!",
      preferences: user.preferences,
      categories: allCategories,
      budgets: allBudgets,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserActivities = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("favoriteActivities");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.favoriteActivities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.file) {
      if (user.picturePath) {
        fs.unlinkSync(path.join("public/assets", user.picturePath));
      }
      updates.picturePath = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addRemoveFavoriteActivity = async (req, res) => {
  try {
    const { id, activityId } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favoriteActivities.includes(activityId)) {
      user.favoriteActivities = user.favoriteActivities.filter(
        (favActivityId) => favActivityId.toString() !== activityId
      );
    } else {
      user.favoriteActivities.push(activityId);
    }

    await user.save();
    res.status(200).json(user.favoriteActivities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const friends = await User.find({ _id: { $in: user.friends } });

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, picturePath }) => ({
        _id,
        firstName,
        lastName,
        picturePath,
      })
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    console.error("Error fetching user friends:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    console.log(
      `Received PATCH request with id: ${id} and friendId: ${friendId}`
    );

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter(
        (currentFriendId) => currentFriendId !== friendId
      );
      friend.friends = friend.friends.filter(
        (currentFriendId) => currentFriendId !== id
      );
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((currentFriendId) => User.findById(currentFriendId))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, picturePath }) => ({
        _id,
        firstName,
        lastName,
        picturePath,
      })
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    console.error("Error in addRemoveFriend:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
