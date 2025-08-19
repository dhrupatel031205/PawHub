import { Router } from 'express';
import { createAnimal, deleteAnimal, getAnimal, listAnimals, updateAnimal } from '../controllers/animal.controller.js';
import { requireAuth, requireRoles } from '../middleware/auth.js';

const router = Router();

router.get('/', listAnimals);
router.get('/:id', getAnimal);
router.post('/', requireAuth, requireRoles('admin', 'vet'), createAnimal);
router.put('/:id', requireAuth, requireRoles('admin', 'vet'), updateAnimal);
router.delete('/:id', requireAuth, requireRoles('admin'), deleteAnimal);

export default router;

