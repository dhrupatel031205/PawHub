import { Router } from 'express';
import { commentBlog, createBlog, likeBlog, listBlogs, updateBlog } from '../controllers/blog.controller.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';

const router = Router();

router.get('/', listBlogs);
router.post('/', requireAuth, requireRoles('admin', 'vet'), createBlog);
router.put('/:id', requireAuth, requireRoles('admin', 'vet'), updateBlog);
router.post('/:id/like', requireAuth, likeBlog);
router.post('/:id/comment', requireAuth, commentBlog);

export default router;

