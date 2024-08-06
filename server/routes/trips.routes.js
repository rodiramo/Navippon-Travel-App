import express from "express";
import { createTrip, getUserTrips } from "../controllers/trips.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/", verifyToken, createTrip);
router.get("/", verifyToken, getUserTrips);
export default router;
