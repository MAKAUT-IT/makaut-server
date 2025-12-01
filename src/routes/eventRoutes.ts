import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} from '../controllers/eventController';

const router = Router();

router.use(authenticateToken);

router.get('/', getEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;
