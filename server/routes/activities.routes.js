import express from "express";
import {
  createActivity,
  getActivities,
  editActivity,
  getActivity,
  filterCategory,
  deleteActivity,
  saveActivity,
  filterPrefecture,
} from "../controllers/activities.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createActivity);
router.get("/", verifyToken, getActivities);
router.get("/:id", verifyToken, getActivity);
router.patch("/:id", verifyToken, editActivity);
router.patch("/:id/save", verifyToken, saveActivity);
router.delete("/:id", verifyToken, deleteActivity);
router.get("/filtered-category/:categoryName", verifyToken, filterCategory);
router.get("/filtered-prefecture/:prefectureId", verifyToken, filterPrefecture);
export default router;
