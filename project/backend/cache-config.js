/**
 * Cache configuration
 * Adjust these values based on your needs and rate limits
 */

export const CACHE_CONFIG = {
  // TTL values in milliseconds
  TTL: {
    // Price data - most frequent updates needed
    price: process.env.CACHE_TTL_PRICE ? parseInt(process.env.CACHE_TTL_PRICE) : 30 * 1000, // 30 seconds
    
    // Chart data - can be cached longer as it's historical
    chart: process.env.CACHE_TTL_CHART ? parseInt(process.env.CACHE_TTL_CHART) : 2 * 60 * 1000, // 2 minutes
    
    // Stats data - balance between freshness and API calls
    stats: process.env.CACHE_TTL_STATS ? parseInt(process.env.CACHE_TTL_STATS) : 60 * 1000, // 1 minute
    
    // Trades data - fairly dynamic
    trades: process.env.CACHE_TTL_TRADES ? parseInt(process.env.CACHE_TTL_TRADES) : 30 * 1000, // 30 seconds
    
    // Pool stats - less frequently changing
    poolStats: process.env.CACHE_TTL_POOL_STATS ? parseInt(process.env.CACHE_TTL_POOL_STATS) : 5 * 60 * 1000, // 5 minutes
  },
  
  // Cache cleanup interval
  CLEANUP_INTERVAL: process.env.CACHE_CLEANUP_INTERVAL ? parseInt(process.env.CACHE_CLEANUP_INTERVAL) : 60 * 1000, // 1 minute
  
  // Enable/disable cache entirely
  ENABLED: process.env.CACHE_ENABLED !== 'false', // Default to true unless explicitly disabled
  
  // Enable cache hit/miss logging
  LOGGING: process.env.CACHE_LOGGING === 'true', // Default to false unless explicitly enabled
};

export default CACHE_CONFIG;
