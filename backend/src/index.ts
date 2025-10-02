import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { errorHandler } from '@/middleware/errorHandler';
import { notFoundHandler } from '@/middleware/notFoundHandler';
import databaseService from '@/services/databaseService';
import cacheService from '@/services/cacheService';
import performanceService from '@/services/performanceService';
import {
  performanceMiddleware,
  queryPerformanceMiddleware,
  cachePerformanceMiddleware,
  responseTimeMiddleware,
  memoryUsageMiddleware,
  apiRateLimitMiddleware,
  performanceStatsMiddleware
} from '@/middleware/performanceMiddleware';
import authRoutes from '@/routes/auth';
import creatorRoutes from '@/routes/creators';
import brandRoutes from '@/routes/brands';
import contentRoutes from '@/routes/content';
import campaignRoutes from '@/routes/campaigns';
import analyticsRoutes from '@/routes/analytics';
import paymentRoutes from '@/routes/payments';
import briefRoutes from '@/routes/briefs';
import briefApplicationRoutes from '@/routes/briefApplications';
import contractRoutes from '@/routes/contracts';
import escrowRoutes from '@/routes/escrow';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 6002;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:6001',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined'));

// Performance monitoring middleware
app.use(performanceMiddleware);
app.use(queryPerformanceMiddleware);
app.use(cachePerformanceMiddleware);
app.use(responseTimeMiddleware);
app.use(memoryUsageMiddleware);
app.use(apiRateLimitMiddleware);
app.use(performanceStatsMiddleware);

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const [dbHealth, cacheStats, performanceStats] = await Promise.all([
      databaseService.healthCheck(),
      cacheService.getStats(),
      performanceService.getStats()
    ]);

    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbHealth,
      cache: cacheStats,
      performance: performanceStats
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      error: (error as Error).message
    });
  }
});

// Performance stats endpoint
app.get('/api/performance/stats', (req, res) => {
  const stats = performanceService.getStats();
  const slowRequests = performanceService.getSlowRequests(10);
  
  res.json({
    success: true,
    data: {
      ...stats,
      slowRequests
    }
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/creators', creatorRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/briefs', briefRoutes);
app.use('/api/brief-applications', briefApplicationRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/escrow', escrowRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Initialize services and start server
const startServer = async () => {
  try {
    // Initialize database connection
    await databaseService.connect();
    console.log('Database service initialized');

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...');
  try {
    await databaseService.disconnect();
    await cacheService.close();
    console.log('Services disconnected successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  try {
    await databaseService.disconnect();
    await cacheService.close();
    console.log('Services disconnected successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

// Start the server
startServer();

export default app;
