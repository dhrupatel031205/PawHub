import { Router } from 'express';
import { createLostFound, listLostFound, updateLostFound } from '../controllers/lostfound.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', listLostFound);
router.post('/', requireAuth, createLostFound);
router.put('/:id', requireAuth, updateLostFound);

export default router;

