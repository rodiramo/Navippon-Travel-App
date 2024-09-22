import express from "express";
import {
  getRestaurants,
  deleteRestaurant,
} from "../controllers/restaurants.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

/* Read */
router.get("/", verifyToken, getRestaurants);
router.delete("/:id", verifyToken, deleteRestaurant);

export default router;
