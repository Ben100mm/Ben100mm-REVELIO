import express from 'express';
import {
  getPlatformAnalytics,
  getCreatorAnalytics,
  getBrandAnalytics,
  getContentAnalytics,
  getRevenueAnalytics
} from '@/controllers/analyticsController';
import { authenticate, authorize } from '@/middleware/auth';

const router = express.Router();

// Protected routes
router.get('/platform', authenticate, authorize('ADMIN'), getPlatformAnalytics);
router.get('/creator/:id', authenticate, getCreatorAnalytics);
router.get('/brand/:id', authenticate, getBrandAnalytics);
router.get('/content/:id', authenticate, getContentAnalytics);
router.get('/revenue', authenticate, getRevenueAnalytics);

export default router;
