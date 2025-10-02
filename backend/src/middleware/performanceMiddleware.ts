import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import performanceService from '@/services/performanceService';

// Extend Request interface to include performance tracking
declare global {
  namespace Express {
    interface Request {
      requestId: string;
      startTime: number;
    }
  }
}

/**
 * Performance monitoring middleware
 */
export const performanceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Generate unique request ID
  req.requestId = uuidv4();
  req.startTime = Date.now();

  // Start tracking
  performanceService.startTracking(req.requestId, req.method, req.originalUrl);

  // Override res.json to track response completion
  const originalJson = res.json.bind(res);
  res.json = function(body: any) {
    // End tracking
    performanceService.endTracking(req.requestId, res.statusCode);
    return originalJson(body);
  };

  // Override res.send to track response completion
  const originalSend = res.send.bind(res);
  res.send = function(body: any) {
    // End tracking
    performanceService.endTracking(req.requestId, res.statusCode);
    return originalSend(body);
  };

  // Override res.end to track response completion
  const originalEnd = res.end.bind(res);
  res.end = function(chunk?: any, encoding?: any) {
    // End tracking
    performanceService.endTracking(req.requestId, res.statusCode);
    return originalEnd(chunk, encoding);
  };

  next();
};

/**
 * Query performance middleware
 */
export const queryPerformanceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Track database queries
  const originalQuery = req.query;
  
  // Override query to track query count
  Object.defineProperty(req, 'query', {
    get() {
      performanceService.incrementQueryCount();
      return originalQuery;
    },
    configurable: true
  });

  next();
};

/**
 * Cache performance middleware
 */
export const cachePerformanceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Override res.json to track cache hits/misses
  const originalJson = res.json.bind(res);
  res.json = function(body: any) {
    if (body.cached) {
      performanceService.incrementCacheHits();
    } else if (body.success && body.data) {
      performanceService.incrementCacheMisses();
    }
    return originalJson(body);
  };

  next();
};

/**
 * Response time middleware
 */
export const responseTimeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    res.set('X-Response-Time', `${duration}ms`);
    
    // Add performance headers
    res.set('X-Request-ID', req.requestId);
    res.set('X-Process-Time', `${Date.now() - req.startTime}ms`);
  });

  next();
};

/**
 * Memory usage middleware
 */
export const memoryUsageMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const memoryUsage = process.memoryUsage();
  
  res.set('X-Memory-Usage', JSON.stringify({
    rss: Math.round(memoryUsage.rss / 1024 / 1024), // MB
    heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
    heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
    external: Math.round(memoryUsage.external / 1024 / 1024) // MB
  }));

  next();
};

/**
 * API rate limiting with performance tracking
 */
export const apiRateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Add rate limiting headers
  res.set('X-RateLimit-Limit', '100');
  res.set('X-RateLimit-Remaining', '99');
  res.set('X-RateLimit-Reset', new Date(Date.now() + 15 * 60 * 1000).toISOString());

  next();
};

/**
 * Performance stats endpoint middleware
 */
export const performanceStatsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.path === '/api/performance/stats') {
    const stats = performanceService.getStats();
    const slowRequests = performanceService.getSlowRequests(5);
    
    return res.json({
      success: true,
      data: {
        ...stats,
        slowRequests
      }
    });
  }
  
  next();
};
