import { Request, Response } from 'express';
import paymentService from '@/services/paymentService';

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency, creatorId, campaignId, contentId, description } = req.body;
    const userId = (req as any).user.id;

    // Get brand ID from user
    const brand = await prisma.brand.findUnique({
      where: { userId },
      select: { id: true }
    });

    if (!brand) {
      return res.status(404).json({ message: 'Brand profile not found' });
    }

    const result = await paymentService.createPaymentIntent({
      amount,
      currency: currency || 'usd',
      creatorId,
      brandId: brand.id,
      campaignId,
      contentId,
      description,
    });

    if (!result.success) {
      return res.status(400).json({ message: result.error });
    }

    res.json({
      success: true,
      clientSecret: result.clientSecret,
      paymentIntentId: result.paymentIntentId,
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createCreatorPayout = async (req: Request, res: Response) => {
  try {
    const { creatorId, amount, description, contentId } = req.body;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    // Check if user can create payout for this creator
    if (userRole !== 'ADMIN') {
      const creator = await prisma.creator.findUnique({
        where: { id: creatorId },
        select: { userId: true }
      });

      if (!creator || creator.userId !== userId) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }

    const result = await paymentService.createCreatorPayout({
      creatorId,
      amount,
      description,
      contentId,
    });

    if (!result.success) {
      return res.status(400).json({ message: result.error });
    }

    res.json({
      success: true,
      transferId: result.transferId,
      amount: result.amount,
    });
  } catch (error) {
    console.error('Create creator payout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createStripeAccount = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    // Get creator profile
    const creator = await prisma.creator.findUnique({
      where: { userId },
      include: { user: true }
    });

    if (!creator) {
      return res.status(404).json({ message: 'Creator profile not found' });
    }

    const result = await paymentService.createStripeAccount(creator.id, creator.user.email);

    if (!result.success) {
      return res.status(400).json({ message: result.error });
    }

    res.json({
      success: true,
      accountId: result.accountId,
    });
  } catch (error) {
    console.error('Create Stripe account error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createAccountLink = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.body;

    const result = await paymentService.createAccountLink(accountId);

    if (!result.success) {
      return res.status(400).json({ message: result.error });
    }

    res.json({
      success: true,
      url: result.url,
    });
  } catch (error) {
    console.error('Create account link error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAccountStatus = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;

    const result = await paymentService.getAccountStatus(accountId);

    if (!result.success) {
      return res.status(400).json({ message: result.error });
    }

    res.json({
      success: true,
      data: {
        chargesEnabled: result.chargesEnabled,
        payoutsEnabled: result.payoutsEnabled,
        detailsSubmitted: result.detailsSubmitted,
        requirements: result.requirements,
      },
    });
  } catch (error) {
    console.error('Get account status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const processCreatorEarning = async (req: Request, res: Response) => {
  try {
    const { creatorId, contentId, performanceData, earningType } = req.body;

    const result = await paymentService.processCreatorEarning(
      creatorId,
      contentId,
      performanceData,
      earningType
    );

    if (!result.success) {
      return res.status(400).json({ message: result.error });
    }

    res.json({
      success: true,
      data: {
        earning: result.earning,
        totalAmount: result.totalAmount,
        platformFee: result.platformFee,
        creatorAmount: result.creatorAmount,
      },
    });
  } catch (error) {
    console.error('Process creator earning error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCreatorEarningsSummary = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    let creatorId = req.query.creatorId as string;

    // If not admin, use the authenticated user's creator ID
    if (userRole !== 'ADMIN') {
      const creator = await prisma.creator.findUnique({
        where: { userId },
        select: { id: true }
      });

      if (!creator) {
        return res.status(404).json({ message: 'Creator profile not found' });
      }

      creatorId = creator.id;
    }

    if (!creatorId) {
      return res.status(400).json({ message: 'Creator ID is required' });
    }

    const result = await paymentService.getCreatorEarningsSummary(
      creatorId,
      startDate ? new Date(startDate as string) : undefined,
      endDate ? new Date(endDate as string) : undefined
    );

    if (!result.success) {
      return res.status(400).json({ message: result.error });
    }

    res.json({
      success: true,
      data: {
        earnings: result.earnings,
        totalEarnings: result.totalEarnings,
        pendingPayouts: result.pendingPayouts,
        availableBalance: result.availableBalance,
      },
    });
  } catch (error) {
    console.error('Get creator earnings summary error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const handleStripeWebhook = async (req: Request, res: Response) => {
  try {
    const signature = req.headers['stripe-signature'] as string;
    const payload = JSON.stringify(req.body);

    const result = await paymentService.handleWebhookEvent(payload, signature);

    if (!result.success) {
      return res.status(400).json({ message: result.error });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Stripe webhook handling error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
