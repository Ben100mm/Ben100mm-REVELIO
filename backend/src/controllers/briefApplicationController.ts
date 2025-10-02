import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createApplication = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { briefId } = req.params;
    const { proposal, budget, timeline, message } = req.body;

    // Get creator ID from user
    const creator = await prisma.creator.findUnique({
      where: { userId },
      select: { id: true }
    });

    if (!creator) {
      return res.status(404).json({ message: 'Creator profile not found' });
    }

    // Check if brief exists and is published
    const brief = await prisma.brief.findUnique({
      where: { id: briefId },
      select: { id: true, status: true, isPublic: true }
    });

    if (!brief) {
      return res.status(404).json({ message: 'Brief not found' });
    }

    if (brief.status !== 'PUBLISHED' || !brief.isPublic) {
      return res.status(400).json({ message: 'Brief is not available for applications' });
    }

    // Check if creator already applied
    const existingApplication = await prisma.briefApplication.findFirst({
      where: {
        briefId,
        creatorId: creator.id
      }
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied to this brief' });
    }

    const application = await prisma.briefApplication.create({
      data: {
        briefId,
        creatorId: creator.id,
        proposal,
        budget: Number(budget),
        timeline,
        message,
        status: 'PENDING'
      },
      include: {
        brief: {
          select: {
            id: true,
            title: true,
            brand: {
              select: {
                name: true,
                logo: true
              }
            }
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
      data: application
    });
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCreatorApplications = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { page = 1, limit = 10, status } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    // Get creator ID from user
    const creator = await prisma.creator.findUnique({
      where: { userId },
      select: { id: true }
    });

    if (!creator) {
      return res.status(404).json({ message: 'Creator profile not found' });
    }

    const where: any = {
      creatorId: creator.id
    };

    if (status) {
      where.status = status;
    }

    const [applications, total] = await Promise.all([
      prisma.briefApplication.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          brief: {
            select: {
              id: true,
              title: true,
              description: true,
              budget: true,
              deadline: true,
              status: true,
              brand: {
                select: {
                  name: true,
                  logo: true,
                  industry: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.briefApplication.count({ where })
    ]);

    res.json({
      success: true,
      data: applications,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get creator applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { applicationId } = req.params;
    const userId = (req as any).user.id;
    const { status } = req.body;

    // Verify ownership (brand)
    const application = await prisma.briefApplication.findFirst({
      where: {
        id: applicationId,
        brief: {
          brand: { userId }
        }
      },
      include: {
        brief: {
          select: {
            brandId: true
          }
        }
      }
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found or access denied' });
    }

    const updatedApplication = await prisma.briefApplication.update({
      where: { id: applicationId },
      data: { status },
      include: {
        brief: {
          select: {
            id: true,
            title: true,
            brand: {
              select: {
                name: true,
                logo: true
              }
            }
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
      data: updatedApplication
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const withdrawApplication = async (req: Request, res: Response) => {
  try {
    const { applicationId } = req.params;
    const userId = (req as any).user.id;

    // Verify ownership (creator)
    const application = await prisma.briefApplication.findFirst({
      where: {
        id: applicationId,
        creator: { userId }
      }
    });

    if (!application) {
      return res.status(404).json({ message: 'Application not found or access denied' });
    }

    if (application.status !== 'PENDING') {
      return res.status(400).json({ message: 'Cannot withdraw application that is not pending' });
    }

    const updatedApplication = await prisma.briefApplication.update({
      where: { id: applicationId },
      data: { status: 'WITHDRAWN' },
      include: {
        brief: {
          select: {
            id: true,
            title: true,
            brand: {
              select: {
                name: true,
                logo: true
              }
            }
          }
        }
      }
    });

    res.json({
      success: true,
      data: updatedApplication
    });
  } catch (error) {
    console.error('Withdraw application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
