import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePost,
  editPost,
  addComment,
  deleteComment,
} from "../controllers/posts.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

/* Read */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* Update */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/edit", verifyToken, editPost);

/* Delete */
router.delete("/:id", verifyToken, deletePost);

/* Comment */
router.post("/:id/comment", verifyToken, addComment);
router.delete("/:id/comment", verifyToken, deleteComment);

console.log(router.stack); 

export default router;
