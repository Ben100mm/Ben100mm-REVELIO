import Redis from 'ioredis';

// Cache configuration
const CACHE_TTL = {
  SHORT: 300,      // 5 minutes
  MEDIUM: 1800,    // 30 minutes
  LONG: 3600,      // 1 hour
  VERY_LONG: 86400 // 24 hours
};

// Cache keys
export const CACHE_KEYS = {
  // User related
  USER: (id: string) => `user:${id}`,
  USER_BY_EMAIL: (email: string) => `user:email:${email}`,
  
  // Creator related
  CREATOR: (id: string) => `creator:${id}`,
  CREATORS_LIST: (page: number, limit: number, filters: string) => `creators:list:${page}:${limit}:${filters}`,
  CREATOR_CONTENT: (id: string, page: number, limit: number) => `creator:${id}:content:${page}:${limit}`,
  CREATOR_EARNINGS: (id: string, startDate?: string, endDate?: string) => 
    `creator:${id}:earnings:${startDate || 'all'}:${endDate || 'all'}`,
  CREATOR_PERFORMANCE: (id: string, startDate?: string, endDate?: string) => 
    `creator:${id}:performance:${startDate || 'all'}:${endDate || 'all'}`,
  
  // Content related
  CONTENT: (id: string) => `content:${id}`,
  CONTENT_LIST: (page: number, limit: number, filters: string) => `content:list:${page}:${limit}:${filters}`,
  CONTENT_PERFORMANCE: (id: string, startDate?: string, endDate?: string) => 
    `content:${id}:performance:${startDate || 'all'}:${endDate || 'all'}`,
  
  // Brand related
  BRAND: (id: string) => `brand:${id}`,
  BRANDS_LIST: (page: number, limit: number, filters: string) => `brands:list:${page}:${limit}:${filters}`,
  
  // Campaign related
  CAMPAIGN: (id: string) => `campaign:${id}`,
  CAMPAIGNS_LIST: (page: number, limit: number, filters: string) => `campaigns:list:${page}:${limit}:${filters}`,
  
  // Analytics
  PLATFORM_ANALYTICS: (startDate?: string, endDate?: string) => 
    `analytics:platform:${startDate || 'all'}:${endDate || 'all'}`,
  CREATOR_ANALYTICS: (id: string, startDate?: string, endDate?: string) => 
    `analytics:creator:${id}:${startDate || 'all'}:${endDate || 'all'}`,
  BRAND_ANALYTICS: (id: string, startDate?: string, endDate?: string) => 
    `analytics:brand:${id}:${startDate || 'all'}:${endDate || 'all'}`,
  REVENUE_ANALYTICS: (startDate?: string, endDate?: string, type?: string) => 
    `analytics:revenue:${startDate || 'all'}:${endDate || 'all'}:${type || 'all'}`,
  
  // Brief related
  BRIEF: (id: string) => `brief:${id}`,
  BRIEFS_LIST: (page: number, limit: number, filters: string) => `briefs:list:${page}:${limit}:${filters}`,
  BRIEF_APPLICATIONS: (briefId: string) => `brief:${briefId}:applications`,
  
  // Contract related
  CONTRACT: (id: string) => `contract:${id}`,
  CONTRACTS_LIST: (page: number, limit: number, filters: string) => `contracts:list:${page}:${limit}:${filters}`,
  CONTRACT_MILESTONES: (contractId: string) => `contract:${contractId}:milestones`,
};

class CacheService {
  private redis: Redis;
  private memoryCache: Map<string, { data: any; expires: number }> = new Map();
  private memoryCacheMaxSize = 1000; // Maximum number of items in memory cache

  constructor() {
    // Initialize Redis connection
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      retryDelayOnFailover: 100,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      connectTimeout: 10000,
      commandTimeout: 5000,
    });

    // Handle Redis connection events
    this.redis.on('connect', () => {
      console.log('Redis connected successfully');
    });

    this.redis.on('error', (error) => {
      console.error('Redis connection error:', error);
    });

    // Clean up memory cache periodically
    setInterval(() => {
      this.cleanMemoryCache();
    }, 60000); // Clean every minute
  }

  /**
   * Get data from cache (Redis first, then memory)
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      // Try Redis first
      const redisData = await this.redis.get(key);
      if (redisData) {
        return JSON.parse(redisData);
      }

      // Fallback to memory cache
      const memoryData = this.memoryCache.get(key);
      if (memoryData && memoryData.expires > Date.now()) {
        return memoryData.data;
      }

      // Clean expired memory cache entry
      if (memoryData) {
        this.memoryCache.delete(key);
      }

      return null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  /**
   * Set data in cache (both Redis and memory)
   */
  async set(key: string, data: any, ttl: number = CACHE_TTL.MEDIUM): Promise<void> {
    try {
      const serializedData = JSON.stringify(data);
      
      // Set in Redis
      await this.redis.setex(key, ttl, serializedData);
      
      // Set in memory cache
      this.setMemoryCache(key, data, ttl);
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  /**
   * Delete data from cache
   */
  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
      this.memoryCache.delete(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  /**
   * Delete multiple keys with pattern
   */
  async delPattern(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
      
      // Also clean memory cache
      for (const key of this.memoryCache.keys()) {
        if (key.includes(pattern.replace('*', ''))) {
          this.memoryCache.delete(key);
        }
      }
    } catch (error) {
      console.error('Cache delete pattern error:', error);
    }
  }

  /**
   * Check if key exists in cache
   */
  async exists(key: string): Promise<boolean> {
    try {
      const redisExists = await this.redis.exists(key);
      if (redisExists) return true;
      
      const memoryData = this.memoryCache.get(key);
      return memoryData ? memoryData.expires > Date.now() : false;
    } catch (error) {
      console.error('Cache exists error:', error);
      return false;
    }
  }

  /**
   * Get or set data with cache-aside pattern
   */
  async getOrSet<T>(
    key: string,
    fetchFunction: () => Promise<T>,
    ttl: number = CACHE_TTL.MEDIUM
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const data = await fetchFunction();
    await this.set(key, data, ttl);
    return data;
  }

  /**
   * Invalidate cache by pattern
   */
  async invalidatePattern(pattern: string): Promise<void> {
    await this.delPattern(pattern);
  }

  /**
   * Invalidate user-related cache
   */
  async invalidateUser(userId: string): Promise<void> {
    const patterns = [
      `user:${userId}`,
      `user:email:*`,
      `creator:*`,
      `brand:*`,
      `analytics:*`
    ];
    
    for (const pattern of patterns) {
      await this.invalidatePattern(pattern);
    }
  }

  /**
   * Invalidate content-related cache
   */
  async invalidateContent(contentId: string): Promise<void> {
    const patterns = [
      `content:${contentId}`,
      `content:list:*`,
      `content:*:performance:*`,
      `analytics:*`
    ];
    
    for (const pattern of patterns) {
      await this.invalidatePattern(pattern);
    }
  }

  /**
   * Invalidate creator-related cache
   */
  async invalidateCreator(creatorId: string): Promise<void> {
    const patterns = [
      `creator:${creatorId}`,
      `creator:${creatorId}:*`,
      `creators:list:*`,
      `analytics:*`
    ];
    
    for (const pattern of patterns) {
      await this.invalidatePattern(pattern);
    }
  }

  /**
   * Set data in memory cache
   */
  private setMemoryCache(key: string, data: any, ttl: number): void {
    // If memory cache is full, remove oldest entries
    if (this.memoryCache.size >= this.memoryCacheMaxSize) {
      const oldestKey = this.memoryCache.keys().next().value;
      this.memoryCache.delete(oldestKey);
    }

    this.memoryCache.set(key, {
      data,
      expires: Date.now() + (ttl * 1000)
    });
  }

  /**
   * Clean expired entries from memory cache
   */
  private cleanMemoryCache(): void {
    const now = Date.now();
    for (const [key, value] of this.memoryCache.entries()) {
      if (value.expires <= now) {
        this.memoryCache.delete(key);
      }
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<{
    redisConnected: boolean;
    memoryCacheSize: number;
    memoryCacheMaxSize: number;
  }> {
    return {
      redisConnected: this.redis.status === 'ready',
      memoryCacheSize: this.memoryCache.size,
      memoryCacheMaxSize: this.memoryCacheMaxSize
    };
  }

  /**
   * Close Redis connection
   */
  async close(): Promise<void> {
    await this.redis.quit();
  }
}

// Export singleton instance
export const cacheService = new CacheService();
export default cacheService;
