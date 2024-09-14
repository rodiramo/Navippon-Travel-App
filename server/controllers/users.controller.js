import User from "../models/User.js";
import fs from "fs";
import path from "path";

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

export const checkIfActivityIsSaved = async (req, res) => {
  try {
    const { userId, activityId } = req.params;
    const user = await User.findById(userId).select("favorites");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isSaved = user.favoriteActivities.includes(activityId);

    return res.status(200).json({ isSaved });
  } catch (error) {
    console.error("Error checking saved status:", error);
    return res.status(500).json({ message: "Server error" });
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

    if (user._id.toString() === friendId) {
      return res
        .status(400)
        .json({ message: "You cannot add yourself as a friend" });
    }

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter(
        (currentFriendId) => currentFriendId.toString() !== friendId
      );
      friend.friends = friend.friends.filter(
        (currentFriendId) => currentFriendId.toString() !== id
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
