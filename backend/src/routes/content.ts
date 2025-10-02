import express from 'express';
import {
  getContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  publishContent,
  getContentPerformance,
  distributeContent
} from '@/controllers/contentController';
import { authenticate, authorize } from '@/middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getContent);
router.get('/:id', getContentById);
router.get('/:id/performance', getContentPerformance);

// Protected routes
router.post('/', authenticate, authorize('CREATOR', 'ADMIN'), createContent);
router.put('/:id', authenticate, authorize('CREATOR', 'ADMIN'), updateContent);
router.delete('/:id', authenticate, authorize('CREATOR', 'ADMIN'), deleteContent);
router.post('/:id/publish', authenticate, authorize('CREATOR', 'ADMIN'), publishContent);
router.post('/:id/distribute', authenticate, authorize('CREATOR', 'ADMIN'), distributeContent);

export default router;
