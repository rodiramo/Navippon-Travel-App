import express from "express";
import {
  getUser,
  editUser,
  getUserActivities,
  addRemoveActivity,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.patch("/:id", verifyToken, editUser);

router.get("/:id/friends", verifyToken, getUserFriends);

router.get("/:id/activities", verifyToken, getUserActivities);
router.patch("/:id/activityId", verifyToken, addRemoveActivity);

router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
