import express from "express";
import { getBudget } from "../controllers/budget.controller.js";

const router = express.Router();

router.get("/", getBudget);

export default router;