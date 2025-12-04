import express from 'express';
import { uploadAttendance, getAttendance } from '../controllers/attendance.controller';
import { protect, admin } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/upload', protect, admin, uploadAttendance);
router.get('/:studentId', protect, getAttendance); // Student can view their own, admin can view any. Logic in controller or here?
// Ideally, check if req.user.id === studentId OR req.user.role === 'admin'

export default router;
