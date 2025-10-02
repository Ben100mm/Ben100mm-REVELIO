import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBriefs = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search, status, brandId, isPublic } = req.query;
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

    if (isPublic !== undefined) {
      where.isPublic = isPublic === 'true';
    }

    const [briefs, total] = await Promise.all([
      prisma.brief.findMany({
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
          applications: {
            select: {
              id: true,
              status: true,
              creator: {
                select: {
                  id: true,
                  username: true,
                  displayName: true,
                  avatar: true
                }
              }
            }
          },
          _count: {
            select: {
              applications: true,
              contracts: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.brief.count({ where })
    ]);

    res.json({
      success: true,
      data: briefs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get briefs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBrief = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const brief = await prisma.brief.findUnique({
      where: { id },
      include: {
        brand: {
          select: { 
            id: true, 
            name: true, 
            logo: true,
            industry: true
          }
        },
        applications: {
          include: {
            creator: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatar: true,
                bio: true,
                isVerified: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        contracts: {
          include: {
            creator: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatar: true
              }
            }
          }
        }
      }
    });

    if (!brief) {
      return res.status(404).json({ message: 'Brief not found' });
    }

    res.json({
      success: true,
      data: brief
    });
  } catch (error) {
    console.error('Get brief error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createBrief = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { 
      title, 
      description, 
      requirements, 
      budget, 
      deadline, 
      isPublic, 
      tags, 
      platforms, 
      contentType 
    } = req.body;

    // Get brand ID from user
    const brand = await prisma.brand.findUnique({
      where: { userId },
      select: { id: true }
    });

    if (!brand) {
      return res.status(404).json({ message: 'Brand profile not found' });
    }

    const brief = await prisma.brief.create({
      data: {
        brandId: brand.id,
        title,
        description,
        requirements: requirements || {},
        budget: Number(budget),
        deadline: deadline ? new Date(deadline) : null,
        isPublic: isPublic || false,
        tags: tags || [],
        platforms: platforms || [],
        contentType: contentType || 'ARTICLE',
        status: 'DRAFT'
      },
      include: {
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
      data: brief
    });
  } catch (error) {
    console.error('Create brief error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBrief = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const updateData = req.body;

    // Verify ownership
    const brief = await prisma.brief.findFirst({
      where: { 
        id,
        brand: { userId }
      }
    });

    if (!brief) {
      return res.status(404).json({ message: 'Brief not found or access denied' });
    }

    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.brandId;
    delete updateData.createdAt;

    if (updateData.deadline) {
      updateData.deadline = new Date(updateData.deadline);
    }

    const updatedBrief = await prisma.brief.update({
      where: { id },
      data: updateData,
      include: {
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
      data: updatedBrief
    });
  } catch (error) {
    console.error('Update brief error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const publishBrief = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    // Verify ownership
    const brief = await prisma.brief.findFirst({
      where: { 
        id,
        brand: { userId }
      }
    });

    if (!brief) {
      return res.status(404).json({ message: 'Brief not found or access denied' });
    }

    const updatedBrief = await prisma.brief.update({
      where: { id },
      data: { 
        status: 'PUBLISHED',
        isPublic: true
      },
      include: {
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
      data: updatedBrief
    });
  } catch (error) {
    console.error('Publish brief error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBrief = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    // Verify ownership
    const brief = await prisma.brief.findFirst({
      where: { 
        id,
        brand: { userId }
      }
    });

    if (!brief) {
      return res.status(404).json({ message: 'Brief not found or access denied' });
    }

    await prisma.brief.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Brief deleted successfully'
    });
  } catch (error) {
    console.error('Delete brief error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBriefApplications = async (req: Request, res: Response) => {
  try {
    const { briefId } = req.params;
    const userId = (req as any).user.id;

    // Verify ownership
    const brief = await prisma.brief.findFirst({
      where: { 
        id: briefId,
        brand: { userId }
      }
    });

    if (!brief) {
      return res.status(404).json({ message: 'Brief not found or access denied' });
    }

    const applications = await prisma.briefApplication.findMany({
      where: { briefId },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            bio: true,
            isVerified: true,
            socialLinks: {
              select: {
                platform: true,
                url: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Get brief applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
