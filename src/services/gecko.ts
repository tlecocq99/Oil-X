import axios from "axios";

const GECKO_BASE = "https://api.geckoterminal.com/api/v2";
const DEFAULT_NETWORK = "solana";
const DEFAULT_POOL = "9h7GAGU8T75jdD2uHhFGEMHzCLLDXdgireWZho8jgnKp";
const HOLDERS_COUNT = 8432; // Placeholder - would need on-chain source for live value

export interface PoolStats {
  marketCapUsd: string;
  fdvUsd: string;
  lockedLiquidityPercentage: string;
  price: string;
  priceChange24h: string;
  volume24h: string;
}

export interface Trade {
  timestamp: string;
  amount: string;
  price: string;
  type: "buy" | "sell";
}

export interface StatsResponse {
  marketCapUsd: string;
  fdvUsd: string;
  lockedLiquidityPercentage: string;
  holders: number;
  tradingVolumeUsdPeriod: number;
  periodHours: number;
  tradesConsidered: number;
  limitRequested: number;
  sources: {
    marketCap: string;
    volume: string;
  };
}

export const fetchPoolStats = async (
  network: string = DEFAULT_NETWORK,
  pool: string = DEFAULT_POOL
) => {
  try {
    const { data } = await axios.get(
      `${GECKO_BASE}/networks/${network}/pools/${pool}`,
      {
        headers: { accept: "application/json" },
        timeout: 10000,
      }
    );
    const attrs = data?.data?.attributes || {};
    const pickFirstNumber = (
      arr: (string | number | null | undefined)[]
    ): number | null =>
      arr.map((v) => Number(v)).find((v) => Number.isFinite(v) && v > 0) ??
      null;

    // Extract 24-hour volume from volume_usd.h24
    const volume24h = attrs.volume_usd?.h24
      ? Number(attrs.volume_usd.h24)
      : null;

    return {
      marketCapUsd: pickFirstNumber([
        attrs.market_cap_usd,
        attrs.market_cap,
        attrs.fdv_usd,
      ]),
      fdvUsd: pickFirstNumber([
        attrs.fdv_usd,
        attrs.fdv,
        attrs.fully_diluted_valuation_usd,
        attrs.fully_diluted_valuation,
      ]),
      lockedLiquidityPercentage:
        attrs.locked_liquidity_percentage != null
          ? Number(attrs.locked_liquidity_percentage)
          : null,
      volume24h: volume24h,
      raw: attrs,
    };
  } catch (e) {
    return {
      marketCapUsd: null,
      fdvUsd: null,
      lockedLiquidityPercentage: null,
      volume24h: null,
      raw: null,
    };
  }
};

export const fetchTrades = async (
  network: string = DEFAULT_NETWORK,
  pool: string = DEFAULT_POOL,
  limit: number = 200
): Promise<any[]> => {
  try {
    const cappedLimit = Math.min(limit, 500); // cap at 500
    const response = await axios.get(
      `${GECKO_BASE}/networks/${network}/pools/${pool}/trades`,
      {
        params: { limit: cappedLimit },
      }
    );

    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching trades:", error);
    return [];
  }
};

export const getStats = async (
  network: string = DEFAULT_NETWORK,
  pool: string = DEFAULT_POOL,
  hours: number = 24,
  limit: number = 200
): Promise<StatsResponse | null> => {
  try {
    const cappedHours = Math.min(hours, 168); // cap at 7 days
    const cappedLimit = Math.min(limit, 500); // trade fetch cap

    const [poolStats, tradesRaw] = await Promise.all([
      fetchPoolStats(network, pool),
      fetchTrades(network, pool, cappedLimit),
    ]);

    if (!poolStats) {
      return null;
    }

    // Use the 24-hour volume directly from pool data for 24h periods
    // For other periods, calculate from trades
    let volumePeriod = 0;
    let considered = 0;

    if (cappedHours === 24 && poolStats.volume24h) {
      // Use the API's 24-hour volume data
      volumePeriod = poolStats.volume24h;
      considered = tradesRaw.length; // Count all fetched trades
    } else {
      // Calculate volume for custom time periods
      const cutoff = Date.now() - cappedHours * 60 * 60 * 1000;

      for (const t of tradesRaw) {
        const tsStr = t.attributes?.block_timestamp;
        const volStr = t.attributes?.volume_in_usd;
        const ts = tsStr ? Date.parse(tsStr) : null;

        if (ts && ts >= cutoff) {
          const v = parseFloat(volStr || "0");
          if (!isNaN(v)) {
            volumePeriod += v;
          }
          considered++;
        }
      }
    }

    return {
      marketCapUsd: poolStats.marketCapUsd?.toString() || "0",
      fdvUsd: poolStats.fdvUsd?.toString() || "0",
      lockedLiquidityPercentage:
        poolStats.lockedLiquidityPercentage?.toString() || "0",
      holders: HOLDERS_COUNT,
      tradingVolumeUsdPeriod: volumePeriod,
      periodHours: cappedHours,
      tradesConsidered: considered,
      limitRequested: cappedLimit,
      sources: {
        marketCap: "pool",
        volume:
          cappedHours === 24 && poolStats.volume24h ? "pool_24h" : "trades_sum",
      },
    };
  } catch (error) {
    console.error("Error getting stats:", error);
    return null;
  }
};

export const formatCurrency = (value: string | number): string => {
  const num = typeof value === "string" ? parseFloat(value) : value;

  if (num >= 1000000000) {
    return `$${(num / 1000000000).toFixed(1)}B`;
  } else if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(1)}K`;
  } else {
    return `$${num.toFixed(2)}`;
  }
};

export const formatPercentage = (value: string | number): string => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  const sign = num >= 0 ? "+" : "";
  return `${sign}${num.toFixed(1)}%`;
};
