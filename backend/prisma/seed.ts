import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@revelio.com',
      password: adminPassword,
      role: 'ADMIN'
    }
  });

  // Create sample creators
  const creatorPasswords = await Promise.all([
    bcrypt.hash('creator123', 10),
    bcrypt.hash('creator123', 10),
    bcrypt.hash('creator123', 10),
    bcrypt.hash('creator123', 10),
    bcrypt.hash('creator123', 10)
  ]);

  const creators = await Promise.all([
    prisma.user.create({
      data: {
        email: 'sarah@techwriter.com',
        password: creatorPasswords[0],
        role: 'CREATOR'
      }
    }),
    prisma.user.create({
      data: {
        email: 'mike@financeguru.com',
        password: creatorPasswords[1],
        role: 'CREATOR'
      }
    }),
    prisma.user.create({
      data: {
        email: 'lisa@healthcoach.com',
        password: creatorPasswords[2],
        role: 'CREATOR'
      }
    }),
    prisma.user.create({
      data: {
        email: 'alex@startupguy.com',
        password: creatorPasswords[3],
        role: 'CREATOR'
      }
    }),
    prisma.user.create({
      data: {
        email: 'emma@designer.com',
        password: creatorPasswords[4],
        role: 'CREATOR'
      }
    })
  ]);

  // Create creator profiles
  const creatorProfiles = await Promise.all([
    prisma.creator.create({
      data: {
        userId: creators[0].id,
        username: 'sarah_tech',
        displayName: 'Sarah Chen',
        bio: 'Tech writer and startup advisor with 10+ years in Silicon Valley. I help founders tell their stories.',
        website: 'https://sarahchen.tech',
        location: 'San Francisco, CA',
        isVerified: true,
        status: 'ACTIVE'
      }
    }),
    prisma.creator.create({
      data: {
        userId: creators[1].id,
        username: 'mike_finance',
        displayName: 'Mike Rodriguez',
        bio: 'Personal finance expert and former Wall Street analyst. Making money simple for everyone.',
        website: 'https://mikefinance.com',
        location: 'New York, NY',
        isVerified: true,
        status: 'ACTIVE'
      }
    }),
    prisma.creator.create({
      data: {
        userId: creators[2].id,
        username: 'lisa_wellness',
        displayName: 'Lisa Thompson',
        bio: 'Certified nutritionist and wellness coach. Helping people achieve their health goals.',
        website: 'https://lisawellness.com',
        location: 'Austin, TX',
        isVerified: true,
        status: 'ACTIVE'
      }
    }),
    prisma.creator.create({
      data: {
        userId: creators[3].id,
        username: 'alex_startups',
        displayName: 'Alex Kumar',
        bio: 'Serial entrepreneur and startup mentor. Sharing lessons from building 3 successful companies.',
        website: 'https://alexkumar.com',
        location: 'Seattle, WA',
        isVerified: true,
        status: 'ACTIVE'
      }
    }),
    prisma.creator.create({
      data: {
        userId: creators[4].id,
        username: 'emma_design',
        displayName: 'Emma Wilson',
        bio: 'UI/UX designer and design systems expert. Making beautiful, functional interfaces.',
        website: 'https://emmawilson.design',
        location: 'Portland, OR',
        isVerified: true,
        status: 'ACTIVE'
      }
    })
  ]);

  // Create sample brands
  const brandPasswords = await Promise.all([
    bcrypt.hash('brand123', 10),
    bcrypt.hash('brand123', 10),
    bcrypt.hash('brand123', 10)
  ]);

  const brands = await Promise.all([
    prisma.user.create({
      data: {
        email: 'marketing@techcorp.com',
        password: brandPasswords[0],
        role: 'BRAND'
      }
    }),
    prisma.user.create({
      data: {
        email: 'partnerships@fintech.com',
        password: brandPasswords[1],
        role: 'BRAND'
      }
    }),
    prisma.user.create({
      data: {
        email: 'growth@wellnessapp.com',
        password: brandPasswords[2],
        role: 'BRAND'
      }
    })
  ]);

  const brandProfiles = await Promise.all([
    prisma.brand.create({
      data: {
        userId: brands[0].id,
        name: 'TechCorp Solutions',
        description: 'Leading provider of enterprise software solutions',
        website: 'https://techcorp.com',
        industry: 'Technology',
        status: 'ACTIVE'
      }
    }),
    prisma.brand.create({
      data: {
        userId: brands[1].id,
        name: 'FinTech Innovations',
        description: 'Revolutionary financial technology platform',
        website: 'https://fintech.com',
        industry: 'Financial Services',
        status: 'ACTIVE'
      }
    }),
    prisma.brand.create({
      data: {
        userId: brands[2].id,
        name: 'WellnessApp',
        description: 'Your personal health and wellness companion',
        website: 'https://wellnessapp.com',
        industry: 'Health & Wellness',
        status: 'ACTIVE'
      }
    })
  ]);

  // Create social links for creators
  await Promise.all([
    prisma.socialLink.createMany({
      data: [
        { creatorId: creatorProfiles[0].id, platform: 'LinkedIn', url: 'https://linkedin.com/in/sarahchen' },
        { creatorId: creatorProfiles[0].id, platform: 'Twitter', url: 'https://twitter.com/sarah_tech' },
        { creatorId: creatorProfiles[1].id, platform: 'LinkedIn', url: 'https://linkedin.com/in/mikerodriguez' },
        { creatorId: creatorProfiles[1].id, platform: 'YouTube', url: 'https://youtube.com/mikefinance' },
        { creatorId: creatorProfiles[2].id, platform: 'Instagram', url: 'https://instagram.com/lisa_wellness' },
        { creatorId: creatorProfiles[2].id, platform: 'TikTok', url: 'https://tiktok.com/@lisawellness' },
        { creatorId: creatorProfiles[3].id, platform: 'LinkedIn', url: 'https://linkedin.com/in/alexkumar' },
        { creatorId: creatorProfiles[3].id, platform: 'Twitter', url: 'https://twitter.com/alex_startups' },
        { creatorId: creatorProfiles[4].id, platform: 'Dribbble', url: 'https://dribbble.com/emmawilson' },
        { creatorId: creatorProfiles[4].id, platform: 'Instagram', url: 'https://instagram.com/emma_design' }
      ]
    })
  ]);

  // Create sample content
  const content = await Promise.all([
    prisma.content.create({
      data: {
        creatorId: creatorProfiles[0].id,
        title: 'The Future of AI in Enterprise Software',
        content: 'Artificial Intelligence is transforming how businesses operate. In this comprehensive analysis, we explore the latest trends in enterprise AI adoption...',
        type: 'ARTICLE',
        status: 'PUBLISHED',
        isSponsored: false,
        tags: ['AI', 'Enterprise', 'Technology', 'Software'],
        publishedAt: new Date('2024-01-15')
      }
    }),
    prisma.content.create({
      data: {
        creatorId: creatorProfiles[0].id,
        title: 'TechCorp\'s New AI Platform: A Game Changer',
        content: 'TechCorp Solutions has launched their revolutionary AI platform that promises to transform enterprise operations...',
        type: 'ARTICLE',
        status: 'PUBLISHED',
        isSponsored: true,
        brandId: brandProfiles[0].id,
        tags: ['AI', 'Enterprise', 'TechCorp', 'Sponsored'],
        publishedAt: new Date('2024-01-20')
      }
    }),
    prisma.content.create({
      data: {
        creatorId: creatorProfiles[1].id,
        title: '5 Investment Strategies for 2024',
        content: 'As we enter 2024, investors need to adapt to changing market conditions. Here are five proven strategies...',
        type: 'ARTICLE',
        status: 'PUBLISHED',
        isSponsored: false,
        tags: ['Investing', 'Finance', '2024', 'Strategy'],
        publishedAt: new Date('2024-01-10')
      }
    }),
    prisma.content.create({
      data: {
        creatorId: creatorProfiles[2].id,
        title: 'Morning Routine for Better Health',
        content: 'Starting your day with the right routine can set you up for success. Here\'s my proven morning routine...',
        type: 'ARTICLE',
        status: 'PUBLISHED',
        isSponsored: false,
        tags: ['Health', 'Wellness', 'Morning Routine', 'Lifestyle'],
        publishedAt: new Date('2024-01-12')
      }
    }),
    prisma.content.create({
      data: {
        creatorId: creatorProfiles[3].id,
        title: 'Lessons from My Third Startup',
        content: 'After building three successful startups, I\'ve learned some valuable lessons about entrepreneurship...',
        type: 'ARTICLE',
        status: 'PUBLISHED',
        isSponsored: false,
        tags: ['Startup', 'Entrepreneurship', 'Lessons', 'Business'],
        publishedAt: new Date('2024-01-18')
      }
    })
  ]);

  // Create campaigns
  const campaigns = await Promise.all([
    prisma.campaign.create({
      data: {
        brandId: brandProfiles[0].id,
        creatorId: creatorProfiles[0].id,
        title: 'TechCorp AI Platform Launch',
        description: 'Create content about our new AI platform launch',
        budget: 5000.00,
        status: 'ACTIVE',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-02-15'),
        requirements: {
          platforms: ['LinkedIn', 'Twitter'],
          contentType: 'ARTICLE',
          minWordCount: 800
        }
      }
    }),
    prisma.campaign.create({
      data: {
        brandId: brandProfiles[1].id,
        creatorId: creatorProfiles[1].id,
        title: 'FinTech Investment Education',
        description: 'Educational content about modern investment strategies',
        budget: 3000.00,
        status: 'ACTIVE',
        startDate: new Date('2024-01-10'),
        endDate: new Date('2024-02-10'),
        requirements: {
          platforms: ['LinkedIn', 'YouTube'],
          contentType: 'ARTICLE',
          minWordCount: 600
        }
      }
    })
  ]);

  // Create content performance data
  await Promise.all([
    prisma.contentPerformance.createMany({
      data: [
        {
          contentId: content[0].id,
          platform: 'LinkedIn',
          views: 1250,
          clicks: 89,
          shares: 23,
          comments: 12,
          likes: 156,
          revenue: 25.50
        },
        {
          contentId: content[0].id,
          platform: 'Twitter',
          views: 890,
          clicks: 45,
          shares: 12,
          comments: 8,
          likes: 78,
          revenue: 18.20
        },
        {
          contentId: content[1].id,
          platform: 'LinkedIn',
          views: 2100,
          clicks: 156,
          shares: 45,
          comments: 23,
          likes: 234,
          revenue: 45.80
        },
        {
          contentId: content[2].id,
          platform: 'LinkedIn',
          views: 1800,
          clicks: 134,
          shares: 38,
          comments: 19,
          likes: 198,
          revenue: 38.90
        },
        {
          contentId: content[3].id,
          platform: 'Instagram',
          views: 3200,
          clicks: 89,
          shares: 67,
          comments: 45,
          likes: 456,
          revenue: 52.30
        }
      ]
    })
  ]);

  // Create content distributions
  await Promise.all([
    prisma.contentDistribution.createMany({
      data: [
        {
          contentId: content[0].id,
          platform: 'LinkedIn',
          platformId: 'linkedin_123',
          url: 'https://linkedin.com/posts/sarahchen_ai-enterprise-software-123',
          status: 'PUBLISHED',
          publishedAt: new Date('2024-01-15')
        },
        {
          contentId: content[0].id,
          platform: 'Twitter',
          platformId: 'twitter_456',
          url: 'https://twitter.com/sarah_tech/status/123456789',
          status: 'PUBLISHED',
          publishedAt: new Date('2024-01-15')
        },
        {
          contentId: content[1].id,
          platform: 'LinkedIn',
          platformId: 'linkedin_789',
          url: 'https://linkedin.com/posts/sarahchen_techcorp-ai-platform-456',
          status: 'PUBLISHED',
          publishedAt: new Date('2024-01-20')
        }
      ]
    })
  ]);

  // Create creator earnings
  await Promise.all([
    prisma.creatorEarning.createMany({
      data: [
        {
          creatorId: creatorProfiles[0].id,
          amount: 43.70,
          type: 'CPM',
          description: 'Earnings from AI article performance',
          contentId: content[0].id
        },
        {
          creatorId: creatorProfiles[0].id,
          amount: 45.80,
          type: 'CPM',
          description: 'Sponsored content earnings',
          contentId: content[1].id
        },
        {
          creatorId: creatorProfiles[1].id,
          amount: 38.90,
          type: 'CPM',
          description: 'Investment strategy article earnings',
          contentId: content[2].id
        },
        {
          creatorId: creatorProfiles[2].id,
          amount: 52.30,
          type: 'CPM',
          description: 'Health content earnings',
          contentId: content[3].id
        }
      ]
    })
  ]);

  console.log('Database seeded successfully!');
  console.log('');
  console.log('Sample accounts created:');
  console.log('Admin: admin@revelio.com / admin123');
  console.log('Creators:');
  console.log('   - sarah@techwriter.com / creator123');
  console.log('   - mike@financeguru.com / creator123');
  console.log('   - lisa@healthcoach.com / creator123');
  console.log('   - alex@startupguy.com / creator123');
  console.log('   - emma@designer.com / creator123');
  console.log('Brands:');
  console.log('   - marketing@techcorp.com / brand123');
  console.log('   - partnerships@fintech.com / brand123');
  console.log('   - growth@wellnessapp.com / brand123');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
