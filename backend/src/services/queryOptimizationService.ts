import { PrismaClient } from '@prisma/client';
import cacheService from '@/services/cacheService';
import performanceService from '@/services/performanceService';

class QueryOptimizationService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Optimized creator list query with selective fields
   */
  async getCreatorsOptimized(params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    verified?: boolean;
  }) {
    const { page, limit, search, status, verified } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { displayName: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
        { bio: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (status) where.status = status;
    if (verified !== undefined) where.isVerified = verified;

    // Use select to only fetch needed fields
    const [creators, total] = await Promise.all([
      this.prisma.creator.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          username: true,
          displayName: true,
          bio: true,
          avatar: true,
          isVerified: true,
          status: true,
          createdAt: true,
          // Only include essential relations
          user: {
            select: { email: true }
          },
          _count: {
            select: { 
              content: true,
              campaigns: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.creator.count({ where })
    ]);

    return { creators, total };
  }

  /**
   * Optimized content list query with pagination
   */
  async getContentOptimized(params: {
    page: number;
    limit: number;
    search?: string;
    type?: string;
    status?: string;
    creatorId?: string;
  }) {
    const { page, limit, search, type, status, creatorId } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (type) where.type = type;
    if (status) where.status = status;
    if (creatorId) where.creatorId = creatorId;

    const [content, total] = await Promise.all([
      this.prisma.content.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          type: true,
          status: true,
          isSponsored: true,
          publishedAt: true,
          createdAt: true,
          creator: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatar: true,
              isVerified: true
            }
          },
          brand: {
            select: {
              name: true,
              logo: true
            }
          },
          _count: {
            select: {
              performance: true,
              distributions: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.content.count({ where })
    ]);

    return { content, total };
  }

  /**
   * Optimized analytics query with aggregation
   */
  async getPlatformAnalyticsOptimized(startDate?: Date, endDate?: Date) {
    const where: any = {};
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = startDate;
      if (endDate) where.createdAt.lte = endDate;
    }

    // Use aggregation queries for better performance
    const [
      totalCreators,
      totalBrands,
      totalContent,
      totalCampaigns,
      totalRevenue
    ] = await Promise.all([
      this.prisma.creator.count({ where: { createdAt: where.createdAt } }),
      this.prisma.brand.count({ where: { createdAt: where.createdAt } }),
      this.prisma.content.count({ where: { createdAt: where.createdAt } }),
      this.prisma.campaign.count({ where: { createdAt: where.createdAt } }),
      this.prisma.creatorEarning.aggregate({
        where: where.createdAt ? { createdAt: where.createdAt } : {},
        _sum: { amount: true }
      })
    ]);

    return {
      totalCreators,
      totalBrands,
      totalContent,
      totalCampaigns,
      totalRevenue: totalRevenue._sum.amount || 0
    };
  }

  /**
   * Optimized creator performance query
   */
  async getCreatorPerformanceOptimized(creatorId: string, startDate?: Date, endDate?: Date) {
    const where: any = {
      content: { creatorId }
    };
    
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = startDate;
      if (endDate) where.date.lte = endDate;
    }

    // Use aggregation for better performance
    const [performance, aggregated] = await Promise.all([
      this.prisma.contentPerformance.findMany({
        where,
        select: {
          id: true,
          platform: true,
          views: true,
          clicks: true,
          shares: true,
          comments: true,
          likes: true,
          revenue: true,
          date: true,
          content: {
            select: {
              title: true,
              type: true
            }
          }
        },
        orderBy: { date: 'desc' },
        take: 30
      }),
      this.prisma.contentPerformance.aggregate({
        where,
        _sum: {
          views: true,
          clicks: true,
          shares: true,
          comments: true,
          likes: true,
          revenue: true
        }
      })
    ]);

    return {
      performance,
      aggregated: {
        totalViews: aggregated._sum.views || 0,
        totalClicks: aggregated._sum.clicks || 0,
        totalShares: aggregated._sum.shares || 0,
        totalComments: aggregated._sum.comments || 0,
        totalLikes: aggregated._sum.likes || 0,
        totalRevenue: aggregated._sum.revenue || 0
      }
    };
  }

  /**
   * Optimized content performance query
   */
  async getContentPerformanceOptimized(contentId: string, startDate?: Date, endDate?: Date) {
    const where: any = { contentId };
    
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = startDate;
      if (endDate) where.date.lte = endDate;
    }

    const [performance, aggregated] = await Promise.all([
      this.prisma.contentPerformance.findMany({
        where,
        select: {
          id: true,
          platform: true,
          views: true,
          clicks: true,
          shares: true,
          comments: true,
          likes: true,
          revenue: true,
          date: true
        },
        orderBy: { date: 'desc' }
      }),
      this.prisma.contentPerformance.aggregate({
        where,
        _sum: {
          views: true,
          clicks: true,
          shares: true,
          comments: true,
          likes: true,
          revenue: true
        }
      })
    ]);

    return {
      performance,
      aggregated: {
        totalViews: aggregated._sum.views || 0,
        totalClicks: aggregated._sum.clicks || 0,
        totalShares: aggregated._sum.shares || 0,
        totalComments: aggregated._sum.comments || 0,
        totalLikes: aggregated._sum.likes || 0,
        totalRevenue: aggregated._sum.revenue || 0
      }
    };
  }

  /**
   * Batch operations for better performance
   */
  async batchUpdateContentStatus(contentIds: string[], status: string) {
    return this.prisma.content.updateMany({
      where: { id: { in: contentIds } },
      data: { status }
    });
  }

  /**
   * Optimized search with full-text search
   */
  async searchContentOptimized(query: string, limit: number = 20) {
    // Use database full-text search if available
    return this.prisma.content.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
          { tags: { has: query } }
        ]
      },
      select: {
        id: true,
        title: true,
        type: true,
        status: true,
        publishedAt: true,
        creator: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true
          }
        }
      },
      orderBy: { publishedAt: 'desc' },
      take: limit
    });
  }

  /**
   * Get paginated results with cursor-based pagination for better performance
   */
  async getContentWithCursor(cursor?: string, limit: number = 20) {
    const where = cursor ? { id: { lt: cursor } } : {};
    
    return this.prisma.content.findMany({
      where,
      select: {
        id: true,
        title: true,
        type: true,
        status: true,
        publishedAt: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  }

  /**
   * Optimized creator earnings query with date range
   */
  async getCreatorEarningsOptimized(creatorId: string, startDate?: Date, endDate?: Date) {
    const where: any = { creatorId };
    
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = startDate;
      if (endDate) where.date.lte = endDate;
    }

    const [earnings, totalEarnings] = await Promise.all([
      this.prisma.creatorEarning.findMany({
        where,
        select: {
          id: true,
          amount: true,
          type: true,
          description: true,
          date: true,
          content: {
            select: {
              title: true,
              type: true
            }
          }
        },
        orderBy: { date: 'desc' },
        take: 50
      }),
      this.prisma.creatorEarning.aggregate({
        where,
        _sum: { amount: true }
      })
    ]);

    return {
      earnings,
      totalEarnings: totalEarnings._sum.amount || 0
    };
  }
}

export default QueryOptimizationService;
