import express from "express";
import {
  createTrip,
  getUserTrips,
  getTripById,
  deleteTrip,
} from "../controllers/trips.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/create-trip", verifyToken, createTrip);
router.get("/", verifyToken, getUserTrips);
router.get("/:id", verifyToken, getTripById);
router.delete("/:id", verifyToken, deleteTrip);

export default router;
