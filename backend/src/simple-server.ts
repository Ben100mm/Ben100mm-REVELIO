import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 6002;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'Revelio Creator Marketplace API is running!'
  });
});

// Sample API endpoints
app.get('/api/creators', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        username: 'sarah_tech',
        displayName: 'Sarah Chen',
        bio: 'Tech writer and startup advisor with 10+ years in Silicon Valley.',
        isVerified: true,
        status: 'ACTIVE'
      },
      {
        id: '2',
        username: 'mike_finance',
        displayName: 'Mike Rodriguez',
        bio: 'Personal finance expert and former Wall Street analyst.',
        isVerified: true,
        status: 'ACTIVE'
      }
    ]
  });
});

app.get('/api/content', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: '1',
        title: 'The Future of AI in Enterprise Software',
        type: 'ARTICLE',
        status: 'PUBLISHED',
        isSponsored: false,
        publishedAt: '2024-01-15T00:00:00Z'
      },
      {
        id: '2',
        title: 'TechCorp\'s New AI Platform: A Game Changer',
        type: 'ARTICLE',
        status: 'PUBLISHED',
        isSponsored: true,
        publishedAt: '2024-01-20T00:00:00Z'
      }
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Revelio API Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`👥 Creators API: http://localhost:${PORT}/api/creators`);
  console.log(`📝 Content API: http://localhost:${PORT}/api/content`);
});

export default app;
