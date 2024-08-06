import express from "express";
import {
  getPrefectures,
  getPrefectureById,
} from "../controllers/prefectures.controller.js";

const router = express.Router();

router.get("/", getPrefectures);
router.get("/:id", getPrefectureById);

export default router;
