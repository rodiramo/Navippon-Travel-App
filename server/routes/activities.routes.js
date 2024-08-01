import express from "express";
import {
  createActivity,
  getActivities,
  editActivity,
  getActivity,
  filterActivities,
  deleteActivity,
  saveActivity,
} from "../controllers/activities.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createActivity);
router.get("/", verifyToken, getActivities);
router.get("/filtered-activities", verifyToken, filterActivities);
router.get("/:id", verifyToken, getActivity);
router.patch("/:id", verifyToken, editActivity);
router.patch("/:id/save", verifyToken, saveActivity);
router.delete("/:id", verifyToken, deleteActivity);

export default router;
