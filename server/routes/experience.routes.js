import express from "express";
import {
  createExperience,
  getExperiences,
  editExperience,
  getExperience,
  getExperiencesSearch,
  searchExperiences,
  filterCategory,
  filterRegion,
  deleteExperience,
  filterPrefecture,
} from "../controllers/experience.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Middleware for logging all requests for this router
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log("Query Parameters:", req.query);
  console.log("Body:", req.body);
  next();
});

router.post("/", verifyToken, createExperience);
router.get("/", verifyToken, getExperiences);
router.get("/search", verifyToken, getExperiencesSearch);
router.get("/search-location", searchExperiences);
router.get("/:id", verifyToken, getExperience);
router.patch("/:id", verifyToken, editExperience);
router.delete("/:id", verifyToken, deleteExperience);
router.get("/filtered-category/:categoryName", verifyToken, filterCategory);
router.get("/filtered-region/:regionId", verifyToken, filterRegion);
router.get("/filtered-prefecture/:prefectureId", verifyToken, filterPrefecture);

export default router;
