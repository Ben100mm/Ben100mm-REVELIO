import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  getBriefs,
  getBrief,
  createBrief,
  updateBrief,
  publishBrief,
  deleteBrief,
  getBriefApplications
} from '../controllers/briefController';

const router = Router();

// Public routes (for marketplace)
router.get('/', getBriefs);
router.get('/:id', getBrief);

// Protected routes (brand only)
router.use(authenticate);
router.use(authorize('BRAND'));

router.post('/', createBrief);
router.put('/:id', updateBrief);
router.patch('/:id/publish', publishBrief);
router.delete('/:id', deleteBrief);
router.get('/:briefId/applications', getBriefApplications);

export default router;
