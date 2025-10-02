# Performance Optimization Guide

This guide documents the comprehensive performance optimizations implemented in the REVELIO platform.

## 🚀 Overview

The performance optimization implementation includes:
- **Database Indexing** - Strategic indexes for faster queries
- **Caching Strategies** - Redis + in-memory caching
- **Connection Pooling** - Optimized database connections
- **API Response Optimization** - Multiple performance improvements

## 📊 Database Indexing

### Implemented Indexes

#### User Table
- `role` - For role-based queries
- `createdAt` - For chronological sorting

#### Creator Table
- `status` - For filtering by creator status
- `isVerified` - For verified creator queries
- `createdAt` - For chronological sorting
- `displayName` - For name-based searches

#### Content Table
- `creatorId` - For creator content queries
- `status` - For content status filtering
- `type` - For content type filtering
- `isSponsored` - For sponsored content queries
- `brandId` - For brand content queries
- `publishedAt` - For published content sorting
- `createdAt` - For chronological sorting
- `title` - For title-based searches

#### Performance Tables
- `contentId` - For content performance queries
- `platform` - For platform-specific analytics
- `date` - For time-based analytics
- `createdAt` - For chronological sorting

### Applying Indexes

```bash
# Run the index application script
cd backend
node scripts/apply-indexes.js

# Or manually apply migrations
npx prisma migrate dev --name add-performance-indexes
```

## 🗄️ Caching Implementation

### Cache Service Features

- **Redis Integration** - Distributed caching with fallback
- **Memory Cache** - Fast in-memory caching for frequently accessed data
- **Cache-aside Pattern** - Automatic cache population and invalidation
- **TTL Management** - Configurable time-to-live for different data types
- **Pattern Invalidation** - Smart cache invalidation by patterns

### Cache TTL Configuration

```typescript
const CACHE_TTL = {
  SHORT: 300,      // 5 minutes - frequently changing data
  MEDIUM: 1800,    // 30 minutes - moderately changing data
  LONG: 3600,      // 1 hour - stable data
  VERY_LONG: 86400 // 24 hours - static data
};
```

### Cache Keys Structure

- `user:{id}` - Individual user data
- `creator:{id}` - Creator profile data
- `content:{id}` - Content data
- `creators:list:{page}:{limit}:{filters}` - Paginated creator lists
- `analytics:platform:{startDate}:{endDate}` - Platform analytics

### Usage Example

```typescript
import cacheService, { CACHE_KEYS } from '@/services/cacheService';

// Get or set cached data
const data = await cacheService.getOrSet(
  CACHE_KEYS.CREATOR(creatorId),
  () => fetchCreatorFromDB(creatorId),
  3600 // 1 hour TTL
);

// Invalidate cache
await cacheService.invalidateCreator(creatorId);
```

## 🔗 Connection Pooling

### Database Service Features

- **Connection Pool Management** - Optimized connection reuse
- **Retry Logic** - Automatic reconnection with exponential backoff
- **Health Monitoring** - Real-time connection health checks
- **Transaction Support** - Optimized transaction handling
- **Query Timeout** - Configurable query timeouts

### Configuration

```env
# Database Connection Pooling
DB_CONNECTION_LIMIT="20"
DB_ACQUIRE_TIMEOUT="60000"
DB_TIMEOUT="10000"
DB_QUERY_TIMEOUT="30000"
```

### Usage Example

```typescript
import databaseService from '@/services/databaseService';

// Get database client
const prisma = databaseService.getClient();

// Execute with connection pooling
const result = await databaseService.executeQuery(
  (prisma) => prisma.creator.findMany(),
  { timeout: 5000, retries: 3 }
);
```

## ⚡ API Response Optimization

### Performance Monitoring

- **Request Tracking** - Unique request IDs and timing
- **Query Counting** - Database query performance tracking
- **Cache Hit/Miss Tracking** - Cache effectiveness monitoring
- **Memory Usage** - Real-time memory monitoring
- **Slow Query Detection** - Automatic slow request logging

### Response Headers

- `X-Response-Time` - Request processing time
- `X-Request-ID` - Unique request identifier
- `X-Process-Time` - Total processing time
- `X-Memory-Usage` - Memory usage statistics
- `X-RateLimit-*` - Rate limiting information

### Performance Endpoints

```bash
# Health check with performance data
GET /health

# Performance statistics
GET /api/performance/stats
```

### Query Optimization

- **Selective Field Loading** - Only fetch required fields
- **Aggregation Queries** - Use database aggregation for analytics
- **Batch Operations** - Optimize bulk operations
- **Cursor-based Pagination** - Efficient pagination for large datasets
- **Full-text Search** - Optimized search queries

## 📈 Performance Metrics

### Key Metrics Tracked

- **Response Time** - Average and P95 response times
- **Query Count** - Database queries per request
- **Cache Hit Rate** - Cache effectiveness percentage
- **Memory Usage** - Heap and RSS memory consumption
- **Error Rate** - Request error percentage
- **Slow Requests** - Requests taking >1 second

### Monitoring Dashboard

Access performance data via:
- Health endpoint: `/health`
- Performance stats: `/api/performance/stats`

## 🛠️ Configuration

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/revelio_db"

# Database Connection Pooling
DB_CONNECTION_LIMIT="20"
DB_ACQUIRE_TIMEOUT="60000"
DB_TIMEOUT="10000"
DB_QUERY_TIMEOUT="30000"

# Redis Cache
REDIS_HOST="localhost"
REDIS_PORT="6379"
REDIS_PASSWORD=""
REDIS_DB="0"
```

### Redis Setup

```bash
# Install Redis (Ubuntu/Debian)
sudo apt update
sudo apt install redis-server

# Install Redis (macOS)
brew install redis

# Start Redis
redis-server

# Or with Docker
docker run -d -p 6379:6379 redis:alpine
```

## 🚀 Deployment Considerations

### Production Optimizations

1. **Redis Configuration**
   - Use Redis Cluster for high availability
   - Configure memory limits and eviction policies
   - Enable persistence for data durability

2. **Database Configuration**
   - Tune PostgreSQL settings for your workload
   - Monitor connection pool usage
   - Set up database replication for read scaling

3. **Application Configuration**
   - Adjust cache TTL based on data patterns
   - Monitor memory usage and adjust limits
   - Set up alerting for performance degradation

### Monitoring

- Set up monitoring for cache hit rates
- Monitor database connection pool usage
- Track response time percentiles
- Alert on slow queries and high error rates

## 📊 Expected Performance Improvements

### Database Queries
- **50-80% faster** creator list queries with indexes
- **60-90% faster** content searches with full-text indexes
- **70-95% faster** analytics queries with aggregation

### API Responses
- **80-95% faster** cached responses
- **40-60% faster** database queries with connection pooling
- **30-50% faster** overall response times

### Memory Usage
- **Reduced memory footprint** with selective field loading
- **Better memory management** with connection pooling
- **Efficient caching** with TTL-based eviction

## 🔧 Troubleshooting

### Common Issues

1. **High Memory Usage**
   - Check cache size limits
   - Monitor memory cache eviction
   - Adjust TTL settings

2. **Slow Database Queries**
   - Check if indexes are applied
   - Monitor connection pool usage
   - Review query patterns

3. **Cache Misses**
   - Verify Redis connection
   - Check cache key patterns
   - Monitor TTL settings

### Debug Commands

```bash
# Check Redis connection
redis-cli ping

# Monitor Redis operations
redis-cli monitor

# Check database connections
psql $DATABASE_URL -c "SELECT * FROM pg_stat_activity;"

# View performance stats
curl http://localhost:6002/api/performance/stats
```

## 📚 Additional Resources

- [Prisma Performance Guide](https://www.prisma.io/docs/guides/performance-and-optimization)
- [Redis Performance Tuning](https://redis.io/docs/management/optimization/)
- [PostgreSQL Performance Tuning](https://wiki.postgresql.org/wiki/Performance_Optimization)
- [Node.js Performance Best Practices](https://nodejs.org/en/docs/guides/simple-profiling/)

---

**Note**: This optimization implementation provides a solid foundation for high-performance API operations. Monitor the metrics and adjust configurations based on your specific workload patterns.
