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
  .put(verifyToken, updateReview)
  .delete(verifyToken, deleteReview)
  .get(verifyToken, getAllReviews);

export default router;
