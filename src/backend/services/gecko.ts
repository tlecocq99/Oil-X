import axios from "axios";
import { logger } from "../lib/logger.js";

const GECKO_BASE = "https://api.geckoterminal.com/api/v2";

export interface PoolStats {
  marketCapUsd: number | null;
  fdvUsd: number | null;
  lockedLiquidityPercentage: number | null;
  raw: any;
}

export async function fetchPoolStats(
  network: string,
  pool: string
): Promise<PoolStats> {
  try {
    const { data } = await axios.get(
      `${GECKO_BASE}/networks/${network}/pools/${pool}`,
      {
        headers: { accept: "application/json" },
        timeout: 10_000,
      }
    );
    const attrs = data?.data?.attributes || {};
    const pickFirstNumber = (arr: any[]) =>
      arr.map((v) => Number(v)).find((v) => Number.isFinite(v) && v > 0) ??
      null;
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
      raw: attrs,
    };
  } catch (e: any) {
    logger.warn("fetchPoolStats failed", e.message);
    return {
      marketCapUsd: null,
      fdvUsd: null,
      lockedLiquidityPercentage: null,
      raw: null,
    };
  }
}

export async function fetchTrades(
  network: string,
  pool: string,
  limit: number
) {
  const url = `${GECKO_BASE}/networks/${network}/pools/${pool}/trades?limit=${limit}`;
  const { data } = await axios.get(url, {
    headers: { accept: "application/json" },
    timeout: 10_000,
  });
  return data.data || [];
}

export async function fetchChart(
  network: string,
  pool: string,
  timeframe: string
) {
  const url = `${GECKO_BASE}/networks/${network}/pools/${pool}/ohlcv/${timeframe}`;
  const { data } = await axios.get(url, {
    headers: { accept: "application/json" },
    timeout: 10_000,
  });
  return data.data?.attributes?.ohlcv_list || [];
}
