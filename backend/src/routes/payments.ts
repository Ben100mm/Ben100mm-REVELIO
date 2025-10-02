import express from 'express';
import {
  createPaymentIntent,
  createCreatorPayout,
  createStripeAccount,
  createAccountLink,
  getAccountStatus,
  processCreatorEarning,
  getCreatorEarningsSummary,
  handleStripeWebhook
} from '@/controllers/paymentController';
import { authenticate, authorize } from '@/middleware/auth';

const router = express.Router();

// Webhook endpoint (no auth required)
router.post('/webhooks/stripe', handleStripeWebhook);

// Protected routes
router.post('/create-payment-intent', authenticate, authorize('BRAND', 'ADMIN'), createPaymentIntent);
router.post('/create-payout', authenticate, authorize('CREATOR', 'ADMIN'), createCreatorPayout);
router.post('/create-stripe-account', authenticate, authorize('CREATOR', 'ADMIN'), createStripeAccount);
router.post('/create-account-link', authenticate, authorize('CREATOR', 'ADMIN'), createAccountLink);
router.get('/account-status/:accountId', authenticate, authorize('CREATOR', 'ADMIN'), getAccountStatus);
router.post('/process-earning', authenticate, authorize('ADMIN'), processCreatorEarning);
router.get('/earnings-summary', authenticate, authorize('CREATOR', 'ADMIN'), getCreatorEarningsSummary);

export default router;
