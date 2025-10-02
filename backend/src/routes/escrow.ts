import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  createEscrowPayment,
  releaseEscrowPayment,
  refundEscrowPayment,
  getEscrowPayments
} from '../controllers/escrowController';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Escrow payment operations
router.post('/contracts/:contractId', authorize('BRAND'), createEscrowPayment);
router.patch('/:escrowId/release', authorize('BRAND'), releaseEscrowPayment);
router.patch('/:escrowId/refund', authorize('BRAND'), refundEscrowPayment);
router.get('/', getEscrowPayments);

export default router;
