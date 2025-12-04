import express from 'express';
import { uploadMarks, getMarks } from '../controllers/mark.controller';
import { protect, admin } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', protect, admin, uploadMarks);
router.get('/:studentId', protect, getMarks);

export default router;
