import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import paymentService from '../services/paymentService';

const prisma = new PrismaClient();

export const createEscrowPayment = async (req: Request, res: Response) => {
  try {
    const { contractId } = req.params;
    const userId = (req as any).user.id;
    const { amount, milestoneId } = req.body;

    // Verify contract ownership (brand only)
    const contract = await prisma.contract.findFirst({
      where: { 
        id: contractId,
        brand: { userId }
      },
      include: {
        creator: {
          select: {
            id: true,
            userId: true
          }
        }
      }
    });

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found or access denied' });
    }

    if (contract.status !== 'ACTIVE') {
      return res.status(400).json({ message: 'Contract must be active to create escrow payments' });
    }

    // Create escrow payment record
    const escrowPayment = await prisma.escrowPayment.create({
      data: {
        contractId,
        amount: Number(amount),
        status: 'HELD',
        milestoneId: milestoneId || null
      }
    });

    // Create Stripe payment intent for escrow
    const paymentIntentResult = await paymentService.createPaymentIntent({
      amount: Number(amount),
      currency: 'usd',
      creatorId: contract.creator.id,
      brandId: contract.brandId,
      campaignId: contractId,
      description: `Escrow payment for contract: ${contract.title}`
    });

    if (!paymentIntentResult.success) {
      // Rollback escrow payment creation
      await prisma.escrowPayment.delete({
        where: { id: escrowPayment.id }
      });
      return res.status(400).json({ message: paymentIntentResult.error });
    }

    // Update escrow payment with Stripe payment intent ID
    const updatedEscrowPayment = await prisma.escrowPayment.update({
      where: { id: escrowPayment.id },
      data: {
        stripePaymentIntentId: paymentIntentResult.paymentIntentId
      },
      include: {
        contract: {
          select: {
            id: true,
            title: true,
            creator: {
              select: {
                id: true,
                username: true,
                displayName: true
              }
            },
            brand: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: updatedEscrowPayment,
      clientSecret: paymentIntentResult.clientSecret
    });
  } catch (error) {
    console.error('Create escrow payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const releaseEscrowPayment = async (req: Request, res: Response) => {
  try {
    const { escrowId } = req.params;
    const userId = (req as any).user.id;
    const { releaseReason } = req.body;

    // Verify escrow payment ownership (brand only)
    const escrowPayment = await prisma.escrowPayment.findFirst({
      where: {
        id: escrowId,
        contract: {
          brand: { userId }
        }
      },
      include: {
        contract: {
          include: {
            creator: {
              select: {
                id: true,
                userId: true
              }
            }
          }
        }
      }
    });

    if (!escrowPayment) {
      return res.status(404).json({ message: 'Escrow payment not found or access denied' });
    }

    if (escrowPayment.status !== 'HELD') {
      return res.status(400).json({ message: 'Escrow payment is not in HELD status' });
    }

    // Create creator payout
    const payoutResult = await paymentService.createCreatorPayout({
      creatorId: escrowPayment.contract.creator.id,
      amount: Number(escrowPayment.amount),
      description: `Payment release for contract: ${escrowPayment.contract.title}`,
      contentId: escrowPayment.contractId
    });

    if (!payoutResult.success) {
      return res.status(400).json({ message: payoutResult.error });
    }

    // Update escrow payment status
    const updatedEscrowPayment = await prisma.escrowPayment.update({
      where: { id: escrowId },
      data: {
        status: 'RELEASED',
        releaseReason,
        releasedAt: new Date()
      },
      include: {
        contract: {
          select: {
            id: true,
            title: true,
            creator: {
              select: {
                id: true,
                username: true,
                displayName: true
              }
            },
            brand: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    // Create creator earning record
    await prisma.creatorEarning.create({
      data: {
        creatorId: escrowPayment.contract.creator.id,
        amount: escrowPayment.amount,
        type: 'COMMISSION',
        description: `Contract payment: ${escrowPayment.contract.title}`,
        contentId: escrowPayment.contractId
      }
    });

    res.json({
      success: true,
      data: updatedEscrowPayment
    });
  } catch (error) {
    console.error('Release escrow payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const refundEscrowPayment = async (req: Request, res: Response) => {
  try {
    const { escrowId } = req.params;
    const userId = (req as any).user.id;
    const { refundReason } = req.body;

    // Verify escrow payment ownership (brand only)
    const escrowPayment = await prisma.escrowPayment.findFirst({
      where: {
        id: escrowId,
        contract: {
          brand: { userId }
        }
      },
      include: {
        contract: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });

    if (!escrowPayment) {
      return res.status(404).json({ message: 'Escrow payment not found or access denied' });
    }

    if (escrowPayment.status !== 'HELD') {
      return res.status(400).json({ message: 'Escrow payment is not in HELD status' });
    }

    // Update escrow payment status
    const updatedEscrowPayment = await prisma.escrowPayment.update({
      where: { id: escrowId },
      data: {
        status: 'REFUNDED',
        releaseReason: refundReason,
        releasedAt: new Date()
      },
      include: {
        contract: {
          select: {
            id: true,
            title: true,
            creator: {
              select: {
                id: true,
                username: true,
                displayName: true
              }
            },
            brand: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    res.json({
      success: true,
      data: updatedEscrowPayment
    });
  } catch (error) {
    console.error('Refund escrow payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEscrowPayments = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { contractId, status } = req.query;

    let where: any = {};

    if (contractId) {
      where.contractId = contractId;
    }

    if (status) {
      where.status = status;
    }

    // Filter by user's contracts
    const userContracts = await prisma.contract.findMany({
      where: {
        OR: [
          { brand: { userId } },
          { creator: { userId } }
        ]
      },
      select: { id: true }
    });

    where.contractId = {
      in: userContracts.map(c => c.id)
    };

    const escrowPayments = await prisma.escrowPayment.findMany({
      where,
      include: {
        contract: {
          select: {
            id: true,
            title: true,
            creator: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatar: true
              }
            },
            brand: {
              select: {
                id: true,
                name: true,
                logo: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: escrowPayments
    });
  } catch (error) {
    console.error('Get escrow payments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
