import express from "express";
import {
  makeFavorite,
  getFavorites,
  checkFavoriteStatus,
} from "../controllers/favorite.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/status", verifyToken, checkFavoriteStatus);
router.put("/", verifyToken, makeFavorite);
router.get("/", verifyToken, getFavorites);
export default router;
