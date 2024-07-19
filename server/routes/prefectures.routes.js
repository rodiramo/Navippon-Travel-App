import express from "express";
import { getPrefectures } from "../controllers/prefectures.controller.js";

const router = express.Router();

router.get("/", getPrefectures);

export default router;