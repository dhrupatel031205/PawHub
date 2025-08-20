import { Router } from 'express';
import { createAdoption, deleteAdoption, getAdoption, listAdoptions, requestAdoption, updateAdoptionStatus } from '../controllers/adoption.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', listAdoptions);
router.get('/:id', getAdoption);
router.post('/', requireAuth, createAdoption);
router.post('/:id/request', requireAuth, requestAdoption);
router.put('/:id/status', requireAuth, updateAdoptionStatus);
router.delete('/:id', requireAuth, deleteAdoption);

export default router;

