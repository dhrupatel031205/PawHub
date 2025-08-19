import { Router } from 'express';
import { createAdoption, listAdoptions, requestAdoption, updateAdoptionStatus } from '../controllers/adoption.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', listAdoptions);
router.post('/', requireAuth, createAdoption);
router.post('/:id/request', requireAuth, requestAdoption);
router.put('/:id/status', requireAuth, updateAdoptionStatus);

export default router;

