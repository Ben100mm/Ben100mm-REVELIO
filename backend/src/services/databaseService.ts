import { PrismaClient } from '@prisma/client';

// Database connection configuration
const DATABASE_CONFIG = {
  // Connection pool settings
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '20'),
  acquireTimeoutMillis: parseInt(process.env.DB_ACQUIRE_TIMEOUT || '60000'),
  timeout: parseInt(process.env.DB_TIMEOUT || '10000'),
  
  // Query settings
  queryTimeout: parseInt(process.env.DB_QUERY_TIMEOUT || '30000'),
  
  // Logging
  logLevel: process.env.NODE_ENV === 'development' ? 'query' : 'error',
  
  // Error formatting
  errorFormat: 'pretty' as const,
  
  // Datasource configuration
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
};

class DatabaseService {
  private static instance: DatabaseService;
  private prisma: PrismaClient;
  private isConnected: boolean = false;
  private connectionRetries: number = 0;
  private maxRetries: number = 5;

  private constructor() {
    this.prisma = new PrismaClient({
      log: [
        { level: 'query', emit: 'event' },
        { level: 'error', emit: 'stdout' },
        { level: 'info', emit: 'stdout' },
        { level: 'warn', emit: 'stdout' },
      ],
      errorFormat: DATABASE_CONFIG.errorFormat,
      datasources: DATABASE_CONFIG.datasources,
    });

    this.setupEventHandlers();
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private setupEventHandlers(): void {
    // Query logging
    this.prisma.$on('query', (e) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Query: ' + e.query);
        console.log('Params: ' + e.params);
        console.log('Duration: ' + e.duration + 'ms');
      }
    });

    // Error handling
    this.prisma.$on('error', (e) => {
      console.error('Database error:', e);
      this.isConnected = false;
    });
  }

  /**
   * Initialize database connection with retry logic
   */
  public async connect(): Promise<void> {
    try {
      await this.prisma.$connect();
      this.isConnected = true;
      this.connectionRetries = 0;
      console.log('Database connected successfully');
    } catch (error) {
      this.connectionRetries++;
      console.error(`Database connection failed (attempt ${this.connectionRetries}):`, error);
      
      if (this.connectionRetries < this.maxRetries) {
        const delay = Math.pow(2, this.connectionRetries) * 1000; // Exponential backoff
        console.log(`Retrying connection in ${delay}ms...`);
        setTimeout(() => this.connect(), delay);
      } else {
        console.error('Max connection retries reached. Database connection failed.');
        throw error;
      }
    }
  }

  /**
   * Get Prisma client instance
   */
  public getClient(): PrismaClient {
    if (!this.isConnected) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.prisma;
  }

  /**
   * Execute a transaction with retry logic
   */
  public async transaction<T>(
    fn: (prisma: PrismaClient) => Promise<T>,
    maxRetries: number = 3
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.prisma.$transaction(fn, {
          maxWait: DATABASE_CONFIG.acquireTimeoutMillis,
          timeout: DATABASE_CONFIG.queryTimeout,
        });
      } catch (error) {
        lastError = error as Error;
        console.error(`Transaction attempt ${attempt} failed:`, error);
        
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 100; // Short delay for retries
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError!;
  }

  /**
   * Execute raw SQL query with timeout
   */
  public async rawQuery<T = any>(
    query: string,
    params: any[] = []
  ): Promise<T> {
    try {
      const result = await this.prisma.$queryRawUnsafe(query, ...params);
      return result as T;
    } catch (error) {
      console.error('Raw query error:', error);
      throw error;
    }
  }

  /**
   * Health check for database connection
   */
  public async healthCheck(): Promise<{
    connected: boolean;
    latency: number;
    error?: string;
  }> {
    const start = Date.now();
    
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      const latency = Date.now() - start;
      
      return {
        connected: true,
        latency
      };
    } catch (error) {
      return {
        connected: false,
        latency: Date.now() - start,
        error: (error as Error).message
      };
    }
  }

  /**
   * Get connection pool statistics
   */
  public async getPoolStats(): Promise<{
    isConnected: boolean;
    connectionRetries: number;
    maxRetries: number;
    config: typeof DATABASE_CONFIG;
  }> {
    return {
      isConnected: this.isConnected,
      connectionRetries: this.connectionRetries,
      maxRetries: this.maxRetries,
      config: DATABASE_CONFIG
    };
  }

  /**
   * Gracefully close database connection
   */
  public async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect();
      this.isConnected = false;
      console.log('Database disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting from database:', error);
      throw error;
    }
  }

  /**
   * Reconnect to database
   */
  public async reconnect(): Promise<void> {
    try {
      await this.disconnect();
      await this.connect();
    } catch (error) {
      console.error('Error reconnecting to database:', error);
      throw error;
    }
  }

  /**
   * Execute query with connection pooling optimization
   */
  public async executeQuery<T>(
    queryFn: (prisma: PrismaClient) => Promise<T>,
    options: {
      timeout?: number;
      retries?: number;
    } = {}
  ): Promise<T> {
    const { timeout = DATABASE_CONFIG.queryTimeout, retries = 3 } = options;
    
    let lastError: Error;
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        // Set query timeout
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Query timeout')), timeout);
        });
        
        const queryPromise = queryFn(this.prisma);
        
        return await Promise.race([queryPromise, timeoutPromise]);
      } catch (error) {
        lastError = error as Error;
        console.error(`Query attempt ${attempt} failed:`, error);
        
        if (attempt < retries) {
          const delay = Math.pow(2, attempt) * 100;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError!;
  }
}

// Export singleton instance
export const databaseService = DatabaseService.getInstance();
export default databaseService;
