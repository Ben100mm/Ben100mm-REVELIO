import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCreators = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search, status, verified } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    
    if (search) {
      where.OR = [
        { displayName: { contains: search as string, mode: 'insensitive' } },
        { username: { contains: search as string, mode: 'insensitive' } },
        { bio: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    
    if (status) {
      where.status = status;
    }
    
    if (verified !== undefined) {
      where.isVerified = verified === 'true';
    }

    const [creators, total] = await Promise.all([
      prisma.creator.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          user: {
            select: { email: true }
          },
          socialLinks: true,
          _count: {
            select: { content: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.creator.count({ where })
    ]);

    res.json({
      success: true,
      data: creators,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get creators error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCreator = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const creator = await prisma.creator.findUnique({
      where: { id },
      include: {
        user: {
          select: { email: true }
        },
        socialLinks: true,
        content: {
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            type: true,
            status: true,
            publishedAt: true,
            _count: {
              select: { performance: true }
            }
          }
        },
        _count: {
          select: { 
            content: true,
            campaigns: true,
            earnings: true
          }
        }
      }
    });

    if (!creator) {
      return res.status(404).json({ message: 'Creator not found' });
    }

    res.json({
      success: true,
      data: creator
    });
  } catch (error) {
    console.error('Get creator error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCreator = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    // Check if user can update this creator
    const creator = await prisma.creator.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!creator) {
      return res.status(404).json({ message: 'Creator not found' });
    }

    if (userRole !== 'ADMIN' && creator.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedCreator = await prisma.creator.update({
      where: { id },
      data: req.body,
      include: {
        user: {
          select: { email: true }
        },
        socialLinks: true
      }
    });

    res.json({
      success: true,
      data: updatedCreator
    });
  } catch (error) {
    console.error('Update creator error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCreator = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.creator.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Creator deleted successfully'
    });
  } catch (error) {
    console.error('Delete creator error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCreatorContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10, type, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = { creatorId: id };
    
    if (type) {
      where.type = type;
    }
    
    if (status) {
      where.status = status;
    }

    const [content, total] = await Promise.all([
      prisma.content.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          brand: {
            select: { name: true, logo: true }
          },
          _count: {
            select: { performance: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.content.count({ where })
    ]);

    res.json({
      success: true,
      data: content,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get creator content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCreatorEarnings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, type } = req.query;

    const where: any = { creatorId: id };
    
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
    }
    
    if (type) {
      where.type = type;
    }

    const earnings = await prisma.creatorEarning.findMany({
      where,
      include: {
        content: {
          select: { title: true, type: true }
        }
      },
      orderBy: { date: 'desc' }
    });

    const totalEarnings = earnings.reduce((sum, earning) => sum + Number(earning.amount), 0);

    res.json({
      success: true,
      data: earnings,
      totalEarnings
    });
  } catch (error) {
    console.error('Get creator earnings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCreatorPerformance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, platform } = req.query;

    const where: any = {
      content: {
        creatorId: id
      }
    };
    
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
    }
    
    if (platform) {
      where.platform = platform;
    }

    const performance = await prisma.contentPerformance.findMany({
      where,
      include: {
        content: {
          select: { title: true, type: true }
        }
      },
      orderBy: { date: 'desc' }
    });

    // Aggregate performance data
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
      data: performance,
      aggregated
    });
  } catch (error) {
    console.error('Get creator performance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
