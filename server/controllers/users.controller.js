import User from "../models/User.js";
import Activity from "../models/Activity.js";

/*read*/

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
    const user = await User.findById(id);

    const activities = await Promise.all(
      user.activities.map((id) => Activity.findById(id))
    );

    const formattedActivities = activities.map(
      ({ _id, activityName, description, location, coverPath, city }) => {
        return {
          _id,
          activityName,
          description,
          location,
          coverPath,
          city,
        };
      }
    );
    res.status(200).json(formattedActivities);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const editUser = async (req, res)  =>{
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

export const addRemoveActivity = async (req, res) => {
  try {
    const { id, activityId } = req.params;
    const user = await User.findById(id);
    const activity = await Activity.findById(activityId);

    if (user.activities.includes(activityId)) {
      user.activities = user.activities.filter(
        (activity) => activity !== activityId
      );
      activity.activities = activity.activities.filter(
        (userId) => userId !== id
      );
    } else {
      user.activities.push(activityId);
      activity.activities.push(id);
    }
    await user.save();
    await activity.save();

    const formattedActivities = activities.map(
      ({ _id, activityName, description, location, coverPath, city }) => {
        return {
          _id,
          activityName,
          description,
          location,
          coverPath,
          city,
        };
      }
    );
    res.status(200).json(formattedActivities);
  } catch (err) {
    res.status(404).json({ message: err.message });
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

    // Return formatted list of friends
    const formattedFriends = friends.map(({ _id, firstName, lastName, picturePath }) => ({
      _id,
      firstName,
      lastName,
      picturePath,
    }));

    res.status(200).json(formattedFriends);
  } catch (err) {
    console.error("Error fetching user friends:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* UPDATE */


export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, picturePath }) => {
        return { _id, firstName, lastName, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

