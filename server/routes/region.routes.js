import express from "express";
import {
  getRegions,
  getRegionById,
} from "../controllers/regions.controller.js";

const router = express.Router();

router.get("/", getRegions);
router.get("/:id", getRegionById);

export default router;
