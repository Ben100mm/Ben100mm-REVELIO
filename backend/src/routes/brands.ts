import express from 'express';
import {
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
  getBrandCampaigns
} from '@/controllers/brandController';
import { authenticate, authorize } from '@/middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getBrands);
router.get('/:id', getBrand);

// Protected routes
router.get('/:id/campaigns', authenticate, getBrandCampaigns);
router.put('/:id', authenticate, authorize('BRAND', 'ADMIN'), updateBrand);
router.delete('/:id', authenticate, authorize('ADMIN'), deleteBrand);

export default router;
