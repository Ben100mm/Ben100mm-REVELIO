import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

interface PaymentIntentData {
  amount: number;
  currency: string;
  creatorId: string;
  brandId: string;
  campaignId?: string;
  contentId?: string;
  description: string;
}

interface PayoutData {
  creatorId: string;
  amount: number;
  description: string;
  contentId?: string;
}

class PaymentService {
  async createPaymentIntent(data: PaymentIntentData) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(data.amount * 100), // Convert to cents
        currency: data.currency || 'usd',
        metadata: {
          creatorId: data.creatorId,
          brandId: data.brandId,
          campaignId: data.campaignId || '',
          contentId: data.contentId || '',
        },
        description: data.description,
      });

      return {
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      };
    } catch (error: any) {
      console.error('Stripe payment intent creation error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async createCreatorPayout(data: PayoutData) {
    try {
      // Get creator's Stripe account
      const creator = await prisma.creator.findUnique({
        where: { id: data.creatorId },
        include: { user: true },
      });

      if (!creator) {
        return { success: false, error: 'Creator not found' };
      }

      // Check if creator has Stripe account connected
      if (!creator.stripeAccountId) {
        return { success: false, error: 'Creator has not connected Stripe account' };
      }

      // Create transfer to creator's account
      const transfer = await stripe.transfers.create({
        amount: Math.round(data.amount * 100),
        currency: 'usd',
        destination: creator.stripeAccountId,
        metadata: {
          creatorId: data.creatorId,
          contentId: data.contentId || '',
        },
      });

      // Record the payout in our database
      await prisma.creatorEarning.create({
        data: {
          creatorId: data.creatorId,
          amount: data.amount,
          type: 'PAYOUT',
          description: data.description,
          contentId: data.contentId,
        },
      });

      return {
        success: true,
        transferId: transfer.id,
        amount: data.amount,
      };
    } catch (error: any) {
      console.error('Stripe payout creation error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async createStripeAccount(creatorId: string, email: string) {
    try {
      const account = await stripe.accounts.create({
        type: 'express',
        email: email,
        capabilities: {
          transfers: { requested: true },
        },
        metadata: {
          creatorId: creatorId,
        },
      });

      // Update creator with Stripe account ID
      await prisma.creator.update({
        where: { id: creatorId },
        data: { stripeAccountId: account.id },
      });

      return {
        success: true,
        accountId: account.id,
      };
    } catch (error: any) {
      console.error('Stripe account creation error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async createAccountLink(accountId: string) {
    try {
      const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: `${process.env.FRONTEND_URL}/creator/stripe/reauth`,
        return_url: `${process.env.FRONTEND_URL}/creator/stripe/success`,
        type: 'account_onboarding',
      });

      return {
        success: true,
        url: accountLink.url,
      };
    } catch (error: any) {
      console.error('Stripe account link creation error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getAccountStatus(accountId: string) {
    try {
      const account = await stripe.accounts.retrieve(accountId);
      
      return {
        success: true,
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
        detailsSubmitted: account.details_submitted,
        requirements: account.requirements,
      };
    } catch (error: any) {
      console.error('Stripe account status error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async calculatePlatformFee(amount: number): Promise<number> {
    // Platform takes 10% fee
    const platformFeeRate = 0.10;
    return amount * platformFeeRate;
  }

  async processCreatorEarning(
    creatorId: string,
    contentId: string,
    performanceData: {
      views: number;
      clicks: number;
      shares: number;
      comments: number;
      likes: number;
    },
    earningType: 'CPM' | 'CPC' | 'CPV' | 'REVENUE_SHARE'
  ) {
    try {
      let amount = 0;

      // Calculate earnings based on type
      switch (earningType) {
        case 'CPM':
          amount = (performanceData.views / 1000) * 2.5; // $2.50 per 1000 views
          break;
        case 'CPC':
          amount = performanceData.clicks * 0.15; // $0.15 per click
          break;
        case 'CPV':
          amount = performanceData.views * 0.001; // $0.001 per view
          break;
        case 'REVENUE_SHARE':
          // This would be based on actual revenue generated
          amount = performanceData.clicks * 0.25; // $0.25 per click for revenue share
          break;
      }

      // Apply platform fee
      const platformFee = await this.calculatePlatformFee(amount);
      const creatorAmount = amount - platformFee;

      // Record the earning
      const earning = await prisma.creatorEarning.create({
        data: {
          creatorId: creatorId,
          amount: creatorAmount,
          type: earningType,
          description: `Earnings from ${earningType} performance`,
          contentId: contentId,
        },
      });

      return {
        success: true,
        earning: earning,
        totalAmount: amount,
        platformFee: platformFee,
        creatorAmount: creatorAmount,
      };
    } catch (error: any) {
      console.error('Creator earning processing error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async getCreatorEarningsSummary(creatorId: string, startDate?: Date, endDate?: Date) {
    try {
      const where: any = { creatorId };
      
      if (startDate || endDate) {
        where.date = {};
        if (startDate) where.date.gte = startDate;
        if (endDate) where.date.lte = endDate;
      }

      const earnings = await prisma.creatorEarning.findMany({
        where,
        include: {
          content: {
            select: { title: true, type: true },
          },
        },
        orderBy: { date: 'desc' },
      });

      const totalEarnings = earnings.reduce((sum, earning) => sum + Number(earning.amount), 0);
      const pendingPayouts = earnings.filter(e => e.type === 'PAYOUT').reduce((sum, earning) => sum + Number(earning.amount), 0);

      return {
        success: true,
        earnings: earnings,
        totalEarnings: totalEarnings,
        pendingPayouts: pendingPayouts,
        availableBalance: totalEarnings - pendingPayouts,
      };
    } catch (error: any) {
      console.error('Creator earnings summary error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async createWebhookEndpoint() {
    try {
      const endpoint = await stripe.webhookEndpoints.create({
        url: `${process.env.BACKEND_URL}/api/webhooks/stripe`,
        enabled_events: [
          'payment_intent.succeeded',
          'payment_intent.payment_failed',
          'account.updated',
          'transfer.created',
        ],
      });

      return {
        success: true,
        endpointId: endpoint.id,
        secret: endpoint.secret,
      };
    } catch (error: any) {
      console.error('Stripe webhook endpoint creation error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async handleWebhookEvent(payload: string, signature: string) {
    try {
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
          break;
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailure(event.data.object as Stripe.PaymentIntent);
          break;
        case 'account.updated':
          await this.handleAccountUpdate(event.data.object as Stripe.Account);
          break;
        case 'transfer.created':
          await this.handleTransferCreated(event.data.object as Stripe.Transfer);
          break;
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      return { success: true };
    } catch (error: any) {
      console.error('Stripe webhook handling error:', error);
      return { success: false, error: error.message };
    }
  }

  private async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
    // Handle successful payment
    console.log('Payment succeeded:', paymentIntent.id);
    // Update campaign status, create content, etc.
  }

  private async handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
    // Handle failed payment
    console.log('Payment failed:', paymentIntent.id);
    // Notify brand, update campaign status, etc.
  }

  private async handleAccountUpdate(account: Stripe.Account) {
    // Handle account updates
    console.log('Account updated:', account.id);
    // Update creator's Stripe account status
  }

  private async handleTransferCreated(transfer: Stripe.Transfer) {
    // Handle transfer creation
    console.log('Transfer created:', transfer.id);
    // Update creator earnings, send notification, etc.
  }
}

export default new PaymentService();
