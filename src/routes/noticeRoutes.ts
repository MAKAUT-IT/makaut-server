import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import {
    getNotices,
    getNotice,
    createNotice,
    updateNotice,
    deleteNotice,
} from '../controllers/noticeController';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

router.get('/', getNotices);
router.get('/:id', getNotice);
router.post('/', createNotice);
router.put('/:id', updateNotice);
router.delete('/:id', deleteNotice);

export default router;
