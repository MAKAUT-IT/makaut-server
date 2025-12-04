import express from 'express';
import { login, registerAdmin } from '../controllers/auth.controller';
import { protect, admin } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/login', login);
router.post('/register', protect, admin, registerAdmin); // Only admin can register other admins (or use seed)

export default router;
