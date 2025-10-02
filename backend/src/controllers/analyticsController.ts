import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPlatformAnalytics = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    const where: any = {};
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate as string);
      if (endDate) where.createdAt.lte = new Date(endDate as string);
    }

    const [
      totalCreators,
      totalBrands,
      totalContent,
      totalCampaigns,
      totalRevenue
    ] = await Promise.all([
      prisma.creator.count({ where: { createdAt: where.createdAt } }),
      prisma.brand.count({ where: { createdAt: where.createdAt } }),
      prisma.content.count({ where: { createdAt: where.createdAt } }),
      prisma.campaign.count({ where: { createdAt: where.createdAt } }),
      prisma.creatorEarning.aggregate({
        where: where.createdAt ? { createdAt: where.createdAt } : {},
        _sum: { amount: true }
      })
    ]);

    res.json({
      success: true,
      data: {
        totalCreators,
        totalBrands,
        totalContent,
        totalCampaigns,
        totalRevenue: totalRevenue._sum.amount || 0
      }
    });
  } catch (error) {
    console.error('Get platform analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCreatorAnalytics = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    const where: any = { creatorId: id };
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
    }

    const [earnings, performance] = await Promise.all([
      prisma.creatorEarning.findMany({
        where,
        orderBy: { date: 'desc' },
        take: 30
      }),
      prisma.contentPerformance.findMany({
        where: {
          content: { creatorId: id },
          ...(startDate || endDate ? {
            date: {
              ...(startDate ? { gte: new Date(startDate as string) } : {}),
              ...(endDate ? { lte: new Date(endDate as string) } : {})
            }
          } : {})
        },
        orderBy: { date: 'desc' },
        take: 30
      })
    ]);

    const totalEarnings = earnings.reduce((sum, earning) => sum + Number(earning.amount), 0);
    const totalViews = performance.reduce((sum, perf) => sum + perf.views, 0);
    const totalClicks = performance.reduce((sum, perf) => sum + perf.clicks, 0);

    res.json({
      success: true,
      data: {
        earnings,
        performance,
        totals: {
          earnings: totalEarnings,
          views: totalViews,
          clicks: totalClicks
        }
      }
    });
  } catch (error) {
    console.error('Get creator analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBrandAnalytics = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    const where: any = { brandId: id };
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate as string);
      if (endDate) where.createdAt.lte = new Date(endDate as string);
    }

    const campaigns = await prisma.campaign.findMany({
      where,
      include: {
        creator: {
          select: { id: true, username: true, displayName: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const totalBudget = campaigns.reduce((sum, campaign) => sum + Number(campaign.budget), 0);

    res.json({
      success: true,
      data: {
        campaigns,
        totalCampaigns: campaigns.length,
        totalBudget
      }
    });
  } catch (error) {
    console.error('Get brand analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getContentAnalytics = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, platform } = req.query;

    const where: any = { contentId: id };
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
      orderBy: { date: 'desc' }
    });

    const distributions = await prisma.contentDistribution.findMany({
      where: { contentId: id },
      orderBy: { createdAt: 'desc' }
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
        distributions,
        aggregated
      }
    });
  } catch (error) {
    console.error('Get content analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRevenueAnalytics = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, type } = req.query;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    let where: any = {};
    
    if (userRole === 'CREATOR') {
      const creator = await prisma.creator.findUnique({
        where: { userId },
        select: { id: true }
      });
      if (creator) {
        where.creatorId = creator.id;
      }
    } else if (userRole === 'BRAND') {
      const brand = await prisma.brand.findUnique({
        where: { userId },
        select: { id: true }
      });
      if (brand) {
        where = {
          content: {
            brandId: brand.id
          }
        };
      }
    }

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
        creator: {
          select: { username: true, displayName: true }
        },
        content: {
          select: { title: true, type: true }
        }
      },
      orderBy: { date: 'desc' }
    });

    const totalRevenue = earnings.reduce((sum, earning) => sum + Number(earning.amount), 0);

    res.json({
      success: true,
      data: {
        earnings,
        totalRevenue
      }
    });
  } catch (error) {
    console.error('Get revenue analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
