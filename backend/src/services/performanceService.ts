import { Request, Response, NextFunction } from 'express';

interface PerformanceMetrics {
  requestId: string;
  method: string;
  url: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  statusCode?: number;
  memoryUsage?: NodeJS.MemoryUsage;
  queryCount?: number;
  cacheHits?: number;
  cacheMisses?: number;
}

class PerformanceService {
  private static instance: PerformanceService;
  private metrics: Map<string, PerformanceMetrics> = new Map();
  private queryCount: number = 0;
  private cacheHits: number = 0;
  private cacheMisses: number = 0;

  private constructor() {
    // Clean up old metrics every 5 minutes
    setInterval(() => {
      this.cleanupOldMetrics();
    }, 5 * 60 * 1000);
  }

  public static getInstance(): PerformanceService {
    if (!PerformanceService.instance) {
      PerformanceService.instance = new PerformanceService();
    }
    return PerformanceService.instance;
  }

  /**
   * Start tracking a request
   */
  public startTracking(requestId: string, method: string, url: string): void {
    this.metrics.set(requestId, {
      requestId,
      method,
      url,
      startTime: Date.now(),
      memoryUsage: process.memoryUsage()
    });
  }

  /**
   * End tracking a request
   */
  public endTracking(requestId: string, statusCode: number): PerformanceMetrics | null {
    const metric = this.metrics.get(requestId);
    if (!metric) return null;

    const endTime = Date.now();
    const duration = endTime - metric.startTime;

    const finalMetric: PerformanceMetrics = {
      ...metric,
      endTime,
      duration,
      statusCode,
      memoryUsage: process.memoryUsage(),
      queryCount: this.queryCount,
      cacheHits: this.cacheHits,
      cacheMisses: this.cacheMisses
    };

    this.metrics.set(requestId, finalMetric);
    
    // Log slow requests
    if (duration > 1000) { // Log requests taking more than 1 second
      console.warn(`Slow request detected: ${method} ${url} took ${duration}ms`);
    }

    return finalMetric;
  }

  /**
   * Increment query count
   */
  public incrementQueryCount(): void {
    this.queryCount++;
  }

  /**
   * Increment cache hits
   */
  public incrementCacheHits(): void {
    this.cacheHits++;
  }

  /**
   * Increment cache misses
   */
  public incrementCacheMisses(): void {
    this.cacheMisses++;
  }

  /**
   * Get performance statistics
   */
  public getStats(): {
    totalRequests: number;
    averageResponseTime: number;
    slowRequests: number;
    errorRate: number;
    memoryUsage: NodeJS.MemoryUsage;
    queryCount: number;
    cacheHitRate: number;
  } {
    const metrics = Array.from(this.metrics.values());
    const completedMetrics = metrics.filter(m => m.duration !== undefined);
    
    const totalRequests = completedMetrics.length;
    const averageResponseTime = totalRequests > 0 
      ? completedMetrics.reduce((sum, m) => sum + (m.duration || 0), 0) / totalRequests 
      : 0;
    
    const slowRequests = completedMetrics.filter(m => (m.duration || 0) > 1000).length;
    const errorRate = totalRequests > 0 
      ? completedMetrics.filter(m => (m.statusCode || 0) >= 400).length / totalRequests 
      : 0;

    const totalCacheRequests = this.cacheHits + this.cacheMisses;
    const cacheHitRate = totalCacheRequests > 0 ? this.cacheHits / totalCacheRequests : 0;

    return {
      totalRequests,
      averageResponseTime: Math.round(averageResponseTime),
      slowRequests,
      errorRate: Math.round(errorRate * 100) / 100,
      memoryUsage: process.memoryUsage(),
      queryCount: this.queryCount,
      cacheHitRate: Math.round(cacheHitRate * 100) / 100
    };
  }

  /**
   * Get recent slow requests
   */
  public getSlowRequests(limit: number = 10): PerformanceMetrics[] {
    return Array.from(this.metrics.values())
      .filter(m => m.duration !== undefined && m.duration > 1000)
      .sort((a, b) => (b.duration || 0) - (a.duration || 0))
      .slice(0, limit);
  }

  /**
   * Clean up old metrics (older than 1 hour)
   */
  private cleanupOldMetrics(): void {
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    for (const [requestId, metric] of this.metrics.entries()) {
      if (metric.startTime < oneHourAgo) {
        this.metrics.delete(requestId);
      }
    }
  }

  /**
   * Reset counters
   */
  public resetCounters(): void {
    this.queryCount = 0;
    this.cacheHits = 0;
    this.cacheMisses = 0;
  }
}

// Export singleton instance
export const performanceService = PerformanceService.getInstance();
export default performanceService;
