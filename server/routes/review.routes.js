import express from "express";
const router = express.Router();
import {
  createReview,
  deleteReview,
  getAllReviews,
  updateReview,
} from "../controllers/review.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

router
  .route("/")
  .post(verifyToken, createReview)
  .get(verifyToken, getAllReviews);

router
  .route("/:reviewId")
  .put(verifyToken, updateReview)
  .delete(verifyToken, deleteReview);

export default router;
