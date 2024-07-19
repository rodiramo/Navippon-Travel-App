import express from "express";
import {
  getActivities,
  saveActivity,
  //deleteActivities,
  //addActivities
} from "../controllers/activities.controller.js";

import { authorizeRole } from "../middleware/role.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();
/* read */
router.get("/", verifyToken,  getActivities);

/* update */

router.patch("/:id/save", verifyToken, saveActivity);

export default router;
