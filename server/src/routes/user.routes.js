import { Router } from 'express';
import { deleteUser, getMe, getUser, listUsers, updateMe } from '../controllers/user.controller.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';

const router = Router();

router.get('/me', requireAuth, getMe);
router.put('/me', requireAuth, updateMe);
router.get('/', requireAuth, requireRoles('admin'), listUsers);
router.get('/:id', requireAuth, requireRoles('admin'), getUser);
router.delete('/:id', requireAuth, requireRoles('admin'), deleteUser);

export default router;

