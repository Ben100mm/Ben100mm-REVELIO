import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  createContract,
  getContracts,
  getContract,
  updateContract,
  signContract,
  createMilestone,
  updateMilestone
} from '../controllers/contractController';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Contract CRUD operations
router.post('/', authorize('BRAND'), createContract);
router.get('/', getContracts);
router.get('/:id', getContract);
router.put('/:id', authorize('BRAND'), updateContract);
router.patch('/:id/sign', signContract);

// Milestone operations
router.post('/:contractId/milestones', authorize('BRAND'), createMilestone);
router.put('/milestones/:milestoneId', updateMilestone);

export default router;
