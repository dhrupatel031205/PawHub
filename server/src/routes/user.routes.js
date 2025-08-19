import { Router } from 'express';
import { getMe, listUsers, updateMe } from '../controllers/user.controller.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';

const router = Router();

router.get('/me', requireAuth, getMe);
router.put('/me', requireAuth, updateMe);
router.get('/', requireAuth, requireRoles('admin'), listUsers);

export default router;

