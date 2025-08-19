import { Router } from 'express';
import { createVet, listVets } from '../controllers/vet.controller.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';

const router = Router();

router.get('/', listVets);
router.post('/', requireAuth, requireRoles('admin'), createVet);

export default router;

