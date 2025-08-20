import { Router } from 'express';
import { createLostFound, deleteLostFound, getLostFound, listLostFound, updateLostFound } from '../controllers/lostfound.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', listLostFound);
router.get('/:id', getLostFound);
router.post('/', requireAuth, createLostFound);
router.put('/:id', requireAuth, updateLostFound);
router.delete('/:id', requireAuth, deleteLostFound);

export default router;

