// Simple caching system with TTL support
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class Cache {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T, ttlMs: number = 300000): void { // Default 5 minutes
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const now = Date.now();
    const isExpired = (now - entry.timestamp) > entry.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return false;
    }

    const now = Date.now();
    const isExpired = (now - entry.timestamp) > entry.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Get cache statistics
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

// Create a singleton cache instance
export const cache = new Cache();

// Helper function to create cache keys
export function createCacheKey(prefix: string, ...params: (string | number)[]): string {
  return `${prefix}:${params.join(':')}`;
}

// Cache TTL constants
export const CACHE_TTL = {
  SHORT: 60000,      // 1 minute
  MEDIUM: 300000,    // 5 minutes
  LONG: 1800000,     // 30 minutes
  VERY_LONG: 3600000 // 1 hour
} as const;

// Helper function to wrap async functions with caching
export function withCache<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  keyGenerator: (...args: T) => string,
  ttl: number = CACHE_TTL.MEDIUM
) {
  return async (...args: T): Promise<R> => {
    const key = keyGenerator(...args);
    
    // Try to get from cache first
    const cached = cache.get<R>(key);
    if (cached !== null) {
      return cached;
    }

    // If not in cache, execute function and cache result
    const result = await fn(...args);
    cache.set(key, result, ttl);
    
    return result;
  };
}

// TODO: Add more sophisticated caching features
// - LRU eviction policy
// - Memory usage monitoring
// - Cache warming strategies
// - Distributed caching support (Redis, etc.)
// - Cache invalidation patterns
