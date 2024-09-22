import express from "express";
import { getHotels, deleteHotel } from "../controllers/hotels.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

/* Read */
router.get("/", verifyToken, getHotels);
router.delete("/:id", verifyToken, deleteHotel);

export default router;
