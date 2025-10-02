import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getContent = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search, type, status, creatorId } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { content: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    
    if (type) {
      where.type = type;
    }
    
    if (status) {
      where.status = status;
    }
    
    if (creatorId) {
      where.creatorId = creatorId;
    }

    const [content, total] = await Promise.all([
      prisma.content.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
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
            select: { name: true, logo: true }
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
    console.error('Get content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getContentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const content = await prisma.content.findUnique({
      where: { id },
      include: {
        creator: {
          select: { 
            id: true, 
            username: true, 
            displayName: true, 
            avatar: true,
            isVerified: true,
            bio: true
          }
        },
        brand: {
          select: { name: true, logo: true, website: true }
        },
        performance: {
          orderBy: { date: 'desc' },
          take: 30
        },
        distributions: {
          include: {
            content: false
          }
        }
      }
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Get content by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createContent = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { title, content, type, isSponsored, brandId, tags, metadata } = req.body;

    // Get creator ID from user
    const creator = await prisma.creator.findUnique({
      where: { userId },
      select: { id: true }
    });

    if (!creator) {
      return res.status(404).json({ message: 'Creator profile not found' });
    }

    const newContent = await prisma.content.create({
      data: {
        creatorId: creator.id,
        title,
        content,
        type,
        isSponsored: isSponsored || false,
        brandId: isSponsored ? brandId : null,
        tags: tags || [],
        metadata: metadata || {},
        status: 'DRAFT'
      },
      include: {
        creator: {
          select: { 
            id: true, 
            username: true, 
            displayName: true, 
            avatar: true
          }
        },
        brand: {
          select: { name: true, logo: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: newContent
    });
  } catch (error) {
    console.error('Create content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    // Check if user can update this content
    const content = await prisma.content.findUnique({
      where: { id },
      include: {
        creator: {
          select: { userId: true }
        }
      }
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    if (userRole !== 'ADMIN' && content.creator.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedContent = await prisma.content.update({
      where: { id },
      data: req.body,
      include: {
        creator: {
          select: { 
            id: true, 
            username: true, 
            displayName: true, 
            avatar: true
          }
        },
        brand: {
          select: { name: true, logo: true }
        }
      }
    });

    res.json({
      success: true,
      data: updatedContent
    });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    // Check if user can delete this content
    const content = await prisma.content.findUnique({
      where: { id },
      include: {
        creator: {
          select: { userId: true }
        }
      }
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    if (userRole !== 'ADMIN' && content.creator.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await prisma.content.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const publishContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    // Check if user can publish this content
    const content = await prisma.content.findUnique({
      where: { id },
      include: {
        creator: {
          select: { userId: true }
        }
      }
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    if (content.creator.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedContent = await prisma.content.update({
      where: { id },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date()
      },
      include: {
        creator: {
          select: { 
            id: true, 
            username: true, 
            displayName: true, 
            avatar: true
          }
        },
        brand: {
          select: { name: true, logo: true }
        }
      }
    });

    res.json({
      success: true,
      data: updatedContent,
      message: 'Content published successfully'
    });
  } catch (error) {
    console.error('Publish content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getContentPerformance = async (req: Request, res: Response) => {
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
    console.error('Get content performance error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const distributeContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { platforms } = req.body;

    // Check if content exists and is published
    const content = await prisma.content.findUnique({
      where: { id },
      select: { id: true, status: true, title: true, content: true }
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    if (content.status !== 'PUBLISHED') {
      return res.status(400).json({ message: 'Content must be published before distribution' });
    }

    // Create distribution records
    const distributions = await Promise.all(
      platforms.map((platform: string) =>
        prisma.contentDistribution.create({
          data: {
            contentId: id,
            platform,
            status: 'PENDING'
          }
        })
      )
    );

    // TODO: Implement actual social media posting logic here
    // This would integrate with various social media APIs

    res.json({
      success: true,
      data: distributions,
      message: 'Content distribution initiated'
    });
  } catch (error) {
    console.error('Distribute content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
