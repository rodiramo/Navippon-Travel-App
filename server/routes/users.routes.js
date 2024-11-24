import express from "express";
import {
  getUser,
  editUser,
  getUserExperiences,
  addRemoveFavoriteExperience,
  getUserFriends,
  checkIfExperienceIsSaved,
  addRemoveFriend,
} from "../controllers/users.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.patch("/:id", verifyToken, editUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id/experiences", verifyToken, getUserExperiences);
router.patch(
  "/:id/favorites/:experienceId",
  verifyToken,
  addRemoveFavoriteExperience
);
router.delete(
  "/:id/favorites/:experienceId",
  verifyToken,
  addRemoveFavoriteExperience
);
router.patch("/:id/friend/:friendId", verifyToken, addRemoveFriend);
export default router;
