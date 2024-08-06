import express from "express";
import {
  getUser,
  editUser,
  getUserActivities,
  addRemoveFavoriteActivity,
  getUserFriends,
  getUserPreferences,
  createUserPreferences,
  addRemoveFriend,
} from "../controllers/users.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.patch("/:id", verifyToken, editUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id/activities", verifyToken, getUserActivities);
router.patch(
  "/:id/favorites/:activityId",
  verifyToken,
  addRemoveFavoriteActivity
);
router.delete(
  "/:id/favorites/:activityId",
  verifyToken,
  addRemoveFavoriteActivity
);

router.get("/:id/preferences", verifyToken, getUserPreferences);
router.patch("/:id/preferences", verifyToken, createUserPreferences);
router.patch("/:id/friend/:friendId", verifyToken, addRemoveFriend);
export default router;
