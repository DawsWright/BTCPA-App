import express from 'express';
import { getAllEvents, createEvent, getUniqueEvent } from '../controllers/eventController';

const router = express.Router();

router.get('/', getAllEvents);
router.post('/', createEvent);
router.get('/:id', getUniqueEvent);

export default router;