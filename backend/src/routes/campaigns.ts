import express from 'express';
import {
  getCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  getCampaignPerformance
} from '@/controllers/campaignController';
import { authenticate, authorize } from '@/middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getCampaigns);
router.get('/:id', getCampaign);

// Protected routes
router.post('/', authenticate, authorize('BRAND', 'ADMIN'), createCampaign);
router.put('/:id', authenticate, authorize('BRAND', 'ADMIN'), updateCampaign);
router.delete('/:id', authenticate, authorize('BRAND', 'ADMIN'), deleteCampaign);
router.get('/:id/performance', authenticate, getCampaignPerformance);

export default router;
