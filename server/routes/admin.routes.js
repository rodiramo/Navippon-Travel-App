import express from 'express';
import { getAllUsers, deleteUser, updateUserRole  } from '../controllers/admin.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/user-list', verifyToken, getAllUsers);
router.delete('/user/:id', verifyToken, deleteUser);
router.patch('/user/:userId', verifyToken, updateUserRole);

export default router;
