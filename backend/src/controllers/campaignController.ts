import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search, status, brandId, creatorId } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    
    if (status) {
      where.status = status;
    }
    
    if (brandId) {
      where.brandId = brandId;
    }
    
    if (creatorId) {
      where.creatorId = creatorId;
    }

    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          brand: {
            select: { 
              id: true, 
              name: true, 
              logo: true,
              industry: true
            }
          },
          creator: {
            select: { 
              id: true, 
              username: true, 
              displayName: true, 
              avatar: true,
              isVerified: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.campaign.count({ where })
    ]);

    res.json({
      success: true,
      data: campaigns,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        brand: {
          select: { 
            id: true, 
            name: true, 
            logo: true,
            industry: true,
            website: true
          }
        },
        creator: {
          select: { 
            id: true, 
            username: true, 
            displayName: true, 
            avatar: true,
            isVerified: true,
            bio: true
          }
        }
      }
    });

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    res.json({
      success: true,
      data: campaign
    });
  } catch (error) {
    console.error('Get campaign error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { title, description, budget, creatorId, startDate, endDate, requirements } = req.body;

    // Get brand ID from user
    const brand = await prisma.brand.findUnique({
      where: { userId },
      select: { id: true }
    });

    if (!brand) {
      return res.status(404).json({ message: 'Brand profile not found' });
    }

    const campaign = await prisma.campaign.create({
      data: {
        brandId: brand.id,
        creatorId,
        title,
        description,
        budget,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        requirements: requirements || {},
        status: 'DRAFT'
      },
      include: {
        brand: {
          select: { 
            id: true, 
            name: true, 
            logo: true
          }
        },
        creator: {
          select: { 
            id: true, 
            username: true, 
            displayName: true, 
            avatar: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: campaign
    });
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    // Check if user can update this campaign
    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        brand: {
          select: { userId: true }
        }
      }
    });

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    if (userRole !== 'ADMIN' && campaign.brand.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedCampaign = await prisma.campaign.update({
      where: { id },
      data: req.body,
      include: {
        brand: {
          select: { 
            id: true, 
            name: true, 
            logo: true
          }
        },
        creator: {
          select: { 
            id: true, 
            username: true, 
            displayName: true, 
            avatar: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: updatedCampaign
    });
  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    // Check if user can delete this campaign
    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        brand: {
          select: { userId: true }
        }
      }
    });

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    if (userRole !== 'ADMIN' && campaign.brand.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await prisma.campaign.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Campaign deleted successfully'
    });
  } catch (error) {
    console.error('Delete campaign error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCampaignPerformance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    const where: any = {
      content: {
        campaigns: {
          some: { id }
        }
      }
    };
    
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
    }

    const performance = await prisma.contentPerformance.findMany({
      where,
      include: {
        content: {
          select: { 
            id: true, 
            title: true, 
            type: true,
            creator: {
              select: { username: true, displayName: true }
            }
          }
        }
      },
      orderBy: { date: 'desc' }
    });

    const aggregated = performance.reduce((acc, perf) => {
      acc.totalViews += perf.views;
      acc.totalClicks += perf.clicks;
      acc.totalShares += perf.shares;
      acc.totalComments += perf.comments;
      acc.totalLikes += perf.likes;
      acc.totalRevenue += Number(perf.revenue);
      return acc;
    }, {
      totalViews: 0,
      totalClicks: 0,
      totalShares: 0,
      totalComments: 0,
      totalLikes: 0,
      totalRevenue: 0
    });

    res.json({
      success: true,
      data: {
        performance,
        aggregated
      }
    });
  } catch (error) {
    console.error('Get campaign performance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
