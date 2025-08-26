/**
 * In-memory cache with TTL (Time To Live) for API responses
 * Helps avoid rate limiting on external APIs like GeckoTerminal
 */

import CACHE_CONFIG from './cache-config.js';

class MemoryCache {
  constructor() {
    this.cache = new Map();
    this.timers = new Map();
    this.config = CACHE_CONFIG;
    
    // Default TTL values in milliseconds
    this.defaultTTL = this.config.TTL;
    
    // Start periodic cleanup
    this.startCleanup();
  }

  /**
   * Generate a cache key from endpoint and parameters
   */
  generateKey(endpoint, params = {}) {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    return `${endpoint}${sortedParams ? '?' + sortedParams : ''}`;
  }

  /**
   * Get data from cache
   */
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    // Check if expired
    if (Date.now() > item.expiry) {
      this.delete(key);
      return null;
    }
    
    return item.data;
  }

  /**
   * Set data in cache with TTL
   */
  set(key, data, ttl) {
    const expiry = Date.now() + ttl;
    
    // Clear existing timer if any
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
    }
    
    // Set the cache item
    this.cache.set(key, { data, expiry });
    
    // Set timer to auto-delete when expired
    const timer = setTimeout(() => {
      this.delete(key);
    }, ttl);
    
    this.timers.set(key, timer);
  }

  /**
   * Delete item from cache
   */
  delete(key) {
    this.cache.delete(key);
    
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(key);
    }
  }

  /**
   * Clear all cache
   */
  clear() {
    // Clear all timers
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    
    this.cache.clear();
    this.timers.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }

  /**
   * Periodic cleanup of expired items
   */
  startCleanup() {
    setInterval(() => {
      const now = Date.now();
      const expiredKeys = [];
      
      for (const [key, item] of this.cache.entries()) {
        if (now > item.expiry) {
          expiredKeys.push(key);
        }
      }
      
      expiredKeys.forEach(key => this.delete(key));
      
      if (expiredKeys.length > 0 && this.config.LOGGING) {
        console.log(`Cache cleanup: removed ${expiredKeys.length} expired items`);
      }
    }, this.config.CLEANUP_INTERVAL);
  }

  /**
   * Cached HTTP request wrapper
   */
  async cachedRequest(axios, url, options = {}, cacheType = 'default', customTTL = null) {
    // Check if caching is enabled
    if (!this.config.ENABLED) {
      if (this.config.LOGGING) {
        console.log(`Cache DISABLED - Direct request to: ${url}`);
      }
      return await axios.get(url, options);
    }

    const key = this.generateKey(url, options.params || {});
    
    // Try to get from cache first
    const cached = this.get(key);
    if (cached) {
      if (this.config.LOGGING) {
        console.log(`Cache HIT for: ${key}`);
      }
      return cached;
    }
    
    if (this.config.LOGGING) {
      console.log(`Cache MISS for: ${key}`);
    }
    
    try {
      // Make the actual HTTP request
      const response = await axios.get(url, options);
      
      // Determine TTL
      const ttl = customTTL || this.defaultTTL[cacheType] || this.defaultTTL.price;
      
      // Cache the response
      this.set(key, response, ttl);
      
      return response;
    } catch (error) {
      // Don't cache errors, just throw them
      throw error;
    }
  }
}

// Create a singleton instance
const cache = new MemoryCache();

export default cache;
