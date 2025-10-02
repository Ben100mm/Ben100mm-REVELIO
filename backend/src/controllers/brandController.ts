import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBrands = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search, industry, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }
    
    if (industry) {
      where.industry = industry;
    }
    
    if (status) {
      where.status = status;
    }

    const [brands, total] = await Promise.all([
      prisma.brand.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          user: {
            select: { email: true }
          },
          _count: {
            select: { campaigns: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.brand.count({ where })
    ]);

    res.json({
      success: true,
      data: brands,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get brands error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const brand = await prisma.brand.findUnique({
      where: { id },
      include: {
        user: {
          select: { email: true }
        },
        campaigns: {
          take: 10,
          orderBy: { createdAt: 'desc' },
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
        },
        _count: {
          select: { campaigns: true }
        }
      }
    });

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.json({
      success: true,
      data: brand
    });
  } catch (error) {
    console.error('Get brand error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const userRole = (req as any).user.role;

    // Check if user can update this brand
    const brand = await prisma.brand.findUnique({
      where: { id },
      select: { userId: true }
    });

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    if (userRole !== 'ADMIN' && brand.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedBrand = await prisma.brand.update({
      where: { id },
      data: req.body,
      include: {
        user: {
          select: { email: true }
        }
      }
    });

    res.json({
      success: true,
      data: updatedBrand
    });
  } catch (error) {
    console.error('Update brand error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.brand.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Brand deleted successfully'
    });
  } catch (error) {
    console.error('Delete brand error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBrandCampaigns = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const where: any = { brandId: id };
    
    if (status) {
      where.status = status;
    }

    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
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
    console.error('Get brand campaigns error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
