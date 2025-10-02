import express from 'express';
import {
  getCreators,
  getCreator,
  updateCreator,
  deleteCreator,
  getCreatorContent,
  getCreatorEarnings,
  getCreatorPerformance
} from '@/controllers/creatorController';
import { authenticate, authorize } from '@/middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getCreators);
router.get('/:id', getCreator);
router.get('/:id/content', getCreatorContent);

// Protected routes
router.get('/:id/earnings', authenticate, getCreatorEarnings);
router.get('/:id/performance', authenticate, getCreatorPerformance);
router.put('/:id', authenticate, authorize('CREATOR', 'ADMIN'), updateCreator);
router.delete('/:id', authenticate, authorize('ADMIN'), deleteCreator);

export default router;
