import express from "express";
import {
  createExperience,
  getExperiences,
  editExperience,
  getExperience,
  getExperiencesSearch,
  filterCategory,
  deleteExperience,
  filterPrefecture,
} from "../controllers/experience.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createExperience);
router.get("/", verifyToken, getExperiences);
router.get("/tabs", verifyToken, getExperiencesSearch);
router.get("/:id", verifyToken, getExperience);
router.patch("/:id", verifyToken, editExperience);
router.delete("/:id", verifyToken, deleteExperience);
router.get("/filtered-category/:categoryName", verifyToken, filterCategory);
router.get("/filtered-prefecture/:prefectureId", verifyToken, filterPrefecture);
export default router;