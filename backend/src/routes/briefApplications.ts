import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  createApplication,
  getCreatorApplications,
  updateApplicationStatus,
  withdrawApplication
} from '../controllers/briefApplicationController';

const router = Router();

// Creator routes
router.use(authenticate);
router.use(authorize('CREATOR'));

router.post('/briefs/:briefId', createApplication);
router.get('/creator', getCreatorApplications);
router.patch('/:applicationId/withdraw', withdrawApplication);

// Brand routes (for managing applications)
router.patch('/:applicationId/status', authenticate, authorize('BRAND'), updateApplicationStatus);

export default router;
