import { Router } from 'express';
import { createVet, deleteVet, getVet, listVets, updateVet } from '../controllers/vet.controller.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';

const router = Router();

router.get('/', listVets);
router.get('/:id', getVet);
router.post('/', requireAuth, requireRoles('admin'), createVet);
router.put('/:id', requireAuth, requireRoles('admin'), updateVet);
router.delete('/:id', requireAuth, requireRoles('admin'), deleteVet);

export default router;

