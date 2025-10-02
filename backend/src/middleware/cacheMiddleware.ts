import { Request, Response, NextFunction } from 'express';
import cacheService, { CACHE_KEYS, CACHE_TTL } from '@/services/cacheService';

interface CacheOptions {
  ttl?: number;
  keyGenerator?: (req: Request) => string;
  skipCache?: (req: Request) => boolean;
  skipCacheHeaders?: string[];
}

/**
 * Cache middleware factory
 */
export const createCacheMiddleware = (options: CacheOptions = {}) => {
  const {
    ttl = CACHE_TTL.MEDIUM,
    keyGenerator = defaultKeyGenerator,
    skipCache = () => false,
    skipCacheHeaders = ['authorization', 'x-api-key']
  } = options;

  return async (req: Request, res: Response, next: NextFunction) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Skip caching if specified
    if (skipCache(req)) {
      return next();
    }

    // Skip caching for requests with certain headers
    for (const header of skipCacheHeaders) {
      if (req.headers[header]) {
        return next();
      }
    }

    try {
      const cacheKey = keyGenerator(req);
      const cachedData = await cacheService.get(cacheKey);

      if (cachedData) {
        return res.json({
          success: true,
          data: cachedData,
          cached: true,
          timestamp: new Date().toISOString()
        });
      }

      // Store original res.json to intercept response
      const originalJson = res.json.bind(res);
      res.json = function(body: any) {
        // Only cache successful responses
        if (body.success && body.data) {
          cacheService.set(cacheKey, body.data, ttl).catch(console.error);
        }
        return originalJson(body);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

/**
 * Default cache key generator
 */
const defaultKeyGenerator = (req: Request): string => {
  const { path, query } = req;
  const queryString = Object.keys(query)
    .sort()
    .map(key => `${key}=${query[key]}`)
    .join('&');
  
  return `${path}:${queryString}`;
};

/**
 * Specific cache key generators for different endpoints
 */
export const cacheKeyGenerators = {
  creators: (req: Request) => {
    const { page = 1, limit = 10, search, status, verified } = req.query;
    const filters = `${search || ''}:${status || ''}:${verified || ''}`;
    return CACHE_KEYS.CREATORS_LIST(Number(page), Number(limit), filters);
  },

  creator: (req: Request) => {
    const { id } = req.params;
    return CACHE_KEYS.CREATOR(id);
  },

  creatorContent: (req: Request) => {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    return CACHE_KEYS.CREATOR_CONTENT(id, Number(page), Number(limit));
  },

  creatorEarnings: (req: Request) => {
    const { id } = req.params;
    const { startDate, endDate } = req.query;
    return CACHE_KEYS.CREATOR_EARNINGS(id, startDate as string, endDate as string);
  },

  creatorPerformance: (req: Request) => {
    const { id } = req.params;
    const { startDate, endDate } = req.query;
    return CACHE_KEYS.CREATOR_PERFORMANCE(id, startDate as string, endDate as string);
  },

  content: (req: Request) => {
    const { id } = req.params;
    return CACHE_KEYS.CONTENT(id);
  },

  contentList: (req: Request) => {
    const { page = 1, limit = 10, search, type, status, creatorId } = req.query;
    const filters = `${search || ''}:${type || ''}:${status || ''}:${creatorId || ''}`;
    return CACHE_KEYS.CONTENT_LIST(Number(page), Number(limit), filters);
  },

  contentPerformance: (req: Request) => {
    const { id } = req.params;
    const { startDate, endDate } = req.query;
    return CACHE_KEYS.CONTENT_PERFORMANCE(id, startDate as string, endDate as string);
  },

  brands: (req: Request) => {
    const { page = 1, limit = 10, search, status, industry } = req.query;
    const filters = `${search || ''}:${status || ''}:${industry || ''}`;
    return CACHE_KEYS.BRANDS_LIST(Number(page), Number(limit), filters);
  },

  brand: (req: Request) => {
    const { id } = req.params;
    return CACHE_KEYS.BRAND(id);
  },

  campaigns: (req: Request) => {
    const { page = 1, limit = 10, status, brandId, creatorId } = req.query;
    const filters = `${status || ''}:${brandId || ''}:${creatorId || ''}`;
    return CACHE_KEYS.CAMPAIGNS_LIST(Number(page), Number(limit), filters);
  },

  campaign: (req: Request) => {
    const { id } = req.params;
    return CACHE_KEYS.CAMPAIGN(id);
  },

  briefs: (req: Request) => {
    const { page = 1, limit = 10, status, isPublic, contentType } = req.query;
    const filters = `${status || ''}:${isPublic || ''}:${contentType || ''}`;
    return CACHE_KEYS.BRIEFS_LIST(Number(page), Number(limit), filters);
  },

  brief: (req: Request) => {
    const { id } = req.params;
    return CACHE_KEYS.BRIEF(id);
  },

  briefApplications: (req: Request) => {
    const { briefId } = req.params;
    return CACHE_KEYS.BRIEF_APPLICATIONS(briefId);
  },

  contracts: (req: Request) => {
    const { page = 1, limit = 10, status, brandId, creatorId } = req.query;
    const filters = `${status || ''}:${brandId || ''}:${creatorId || ''}`;
    return CACHE_KEYS.CONTRACTS_LIST(Number(page), Number(limit), filters);
  },

  contract: (req: Request) => {
    const { id } = req.params;
    return CACHE_KEYS.CONTRACT(id);
  },

  platformAnalytics: (req: Request) => {
    const { startDate, endDate } = req.query;
    return CACHE_KEYS.PLATFORM_ANALYTICS(startDate as string, endDate as string);
  },

  creatorAnalytics: (req: Request) => {
    const { id } = req.params;
    const { startDate, endDate } = req.query;
    return CACHE_KEYS.CREATOR_ANALYTICS(id, startDate as string, endDate as string);
  },

  brandAnalytics: (req: Request) => {
    const { id } = req.params;
    const { startDate, endDate } = req.query;
    return CACHE_KEYS.BRAND_ANALYTICS(id, startDate as string, endDate as string);
  },

  revenueAnalytics: (req: Request) => {
    const { startDate, endDate, type } = req.query;
    return CACHE_KEYS.REVENUE_ANALYTICS(startDate as string, endDate as string, type as string);
  }
};

/**
 * Cache invalidation middleware
 */
export const createCacheInvalidationMiddleware = (invalidationKeys: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Store original res.json to intercept response
    const originalJson = res.json.bind(res);
    res.json = function(body: any) {
      // Only invalidate cache for successful responses
      if (body.success) {
        Promise.all(
          invalidationKeys.map(key => cacheService.invalidatePattern(key))
        ).catch(console.error);
      }
      return originalJson(body);
    };

    next();
  };
};

/**
 * Predefined cache middleware for common endpoints
 */
export const cacheMiddleware = {
  // Short-term cache for frequently accessed data
  short: createCacheMiddleware({ ttl: CACHE_TTL.SHORT }),
  
  // Medium-term cache for moderately changing data
  medium: createCacheMiddleware({ ttl: CACHE_TTL.MEDIUM }),
  
  // Long-term cache for stable data
  long: createCacheMiddleware({ ttl: CACHE_TTL.LONG }),
  
  // Very long-term cache for static data
  veryLong: createCacheMiddleware({ ttl: CACHE_TTL.VERY_LONG }),
  
  // Custom cache with specific key generator
  custom: (keyGenerator: (req: Request) => string, ttl: number = CACHE_TTL.MEDIUM) =>
    createCacheMiddleware({ keyGenerator, ttl }),
  
  // Skip cache for certain conditions
  conditional: (skipCondition: (req: Request) => boolean, ttl: number = CACHE_TTL.MEDIUM) =>
    createCacheMiddleware({ skipCache: skipCondition, ttl })
};
