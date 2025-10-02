import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createContract = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { briefId, creatorId, title, description, terms, deliverables, totalAmount, startDate, endDate } = req.body;

    // Get brand ID from user
    const brand = await prisma.brand.findUnique({
      where: { userId },
      select: { id: true }
    });

    if (!brand) {
      return res.status(404).json({ message: 'Brand profile not found' });
    }

    // Verify brief ownership
    const brief = await prisma.brief.findFirst({
      where: { 
        id: briefId,
        brandId: brand.id
      }
    });

    if (!brief) {
      return res.status(404).json({ message: 'Brief not found or access denied' });
    }

    // Check if creator has applied to this brief
    const application = await prisma.briefApplication.findFirst({
      where: {
        briefId,
        creatorId,
        status: 'ACCEPTED'
      }
    });

    if (!application) {
      return res.status(400).json({ message: 'Creator has not been accepted for this brief' });
    }

    const contract = await prisma.contract.create({
      data: {
        briefId,
        creatorId,
        brandId: brand.id,
        title,
        description,
        terms: terms || {},
        deliverables: deliverables || {},
        totalAmount: Number(totalAmount),
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        status: 'DRAFT'
      },
      include: {
        brief: {
          select: {
            id: true,
            title: true
          }
        },
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
    });

    res.status(201).json({
      success: true,
      data: contract
    });
  } catch (error) {
    console.error('Create contract error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getContracts = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { page = 1, limit = 10, status, role } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    let where: any = {};

    if (role === 'brand') {
      const brand = await prisma.brand.findUnique({
        where: { userId },
        select: { id: true }
      });
      if (!brand) {
        return res.status(404).json({ message: 'Brand profile not found' });
      }
      where.brandId = brand.id;
    } else if (role === 'creator') {
      const creator = await prisma.creator.findUnique({
        where: { userId },
        select: { id: true }
      });
      if (!creator) {
        return res.status(404).json({ message: 'Creator profile not found' });
      }
      where.creatorId = creator.id;
    }

    if (status) {
      where.status = status;
    }

    const [contracts, total] = await Promise.all([
      prisma.contract.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          brief: {
            select: {
              id: true,
              title: true
            }
          },
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
          },
          milestones: {
            select: {
              id: true,
              title: true,
              amount: true,
              status: true,
              dueDate: true
            }
          },
          _count: {
            select: {
              milestones: true,
              escrowPayments: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.contract.count({ where })
    ]);

    res.json({
      success: true,
      data: contracts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get contracts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getContract = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const contract = await prisma.contract.findFirst({
      where: {
        id,
        OR: [
          { brand: { userId } },
          { creator: { userId } }
        ]
      },
      include: {
        brief: {
          select: {
            id: true,
            title: true,
            description: true
          }
        },
        creator: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            bio: true
          }
        },
        brand: {
          select: {
            id: true,
            name: true,
            logo: true,
            industry: true
          }
        },
        milestones: {
          orderBy: { createdAt: 'asc' }
        },
        escrowPayments: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found or access denied' });
    }

    res.json({
      success: true,
      data: contract
    });
  } catch (error) {
    console.error('Get contract error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateContract = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const updateData = req.body;

    // Verify ownership (brand only for updates)
    const contract = await prisma.contract.findFirst({
      where: { 
        id,
        brand: { userId }
      }
    });

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found or access denied' });
    }

    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.briefId;
    delete updateData.creatorId;
    delete updateData.brandId;
    delete updateData.createdAt;

    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }

    const updatedContract = await prisma.contract.update({
      where: { id },
      data: updateData,
      include: {
        brief: {
          select: {
            id: true,
            title: true
          }
        },
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
    });

    res.json({
      success: true,
      data: updatedContract
    });
  } catch (error) {
    console.error('Update contract error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const signContract = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const { signature } = req.body;

    // Verify ownership (creator or brand)
    const contract = await prisma.contract.findFirst({
      where: {
        id,
        OR: [
          { brand: { userId } },
          { creator: { userId } }
        ]
      }
    });

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found or access denied' });
    }

    if (contract.status !== 'DRAFT' && contract.status !== 'PENDING_SIGNATURE') {
      return res.status(400).json({ message: 'Contract cannot be signed in current status' });
    }

    // Update contract status
    const updatedContract = await prisma.contract.update({
      where: { id },
      data: { 
        status: 'ACTIVE',
        // Add signature data to terms
        terms: {
          ...contract.terms as any,
          signatures: {
            ...(contract.terms as any)?.signatures || {},
            [userId]: {
              signature,
              signedAt: new Date().toISOString()
            }
          }
        }
      },
      include: {
        brief: {
          select: {
            id: true,
            title: true
          }
        },
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
    });

    res.json({
      success: true,
      data: updatedContract
    });
  } catch (error) {
    console.error('Sign contract error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createMilestone = async (req: Request, res: Response) => {
  try {
    const { contractId } = req.params;
    const userId = (req as any).user.id;
    const { title, description, amount, dueDate } = req.body;

    // Verify contract ownership (brand only)
    const contract = await prisma.contract.findFirst({
      where: { 
        id: contractId,
        brand: { userId }
      }
    });

    if (!contract) {
      return res.status(404).json({ message: 'Contract not found or access denied' });
    }

    const milestone = await prisma.milestone.create({
      data: {
        contractId,
        title,
        description,
        amount: Number(amount),
        dueDate: dueDate ? new Date(dueDate) : null,
        status: 'PENDING'
      }
    });

    res.json({
      success: true,
      data: milestone
    });
  } catch (error) {
    console.error('Create milestone error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateMilestone = async (req: Request, res: Response) => {
  try {
    const { milestoneId } = req.params;
    const userId = (req as any).user.id;
    const updateData = req.body;

    // Verify milestone ownership through contract
    const milestone = await prisma.milestone.findFirst({
      where: {
        id: milestoneId,
        contract: {
          OR: [
            { brand: { userId } },
            { creator: { userId } }
          ]
        }
      }
    });

    if (!milestone) {
      return res.status(404).json({ message: 'Milestone not found or access denied' });
    }

    if (updateData.dueDate) {
      updateData.dueDate = new Date(updateData.dueDate);
    }

    const updatedMilestone = await prisma.milestone.update({
      where: { id: milestoneId },
      data: updateData
    });

    res.json({
      success: true,
      data: updatedMilestone
    });
  } catch (error) {
    console.error('Update milestone error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
