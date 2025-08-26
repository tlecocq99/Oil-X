import { Router } from "express";
import { fetchPoolStats, fetchTrades } from "../services/gecko.js";
import { pickString, pickNumber } from "../lib/validate.js";

const router = Router();
const DEFAULT_NETWORK = process.env.GT_NETWORK || "solana";
const DEFAULT_POOL =
  process.env.GT_POOL || "9h7GAGU8T75jdD2uHhFGEMHzCLLDXdgireWZho8jgnKp";
const HOLDERS_COUNT = Number(process.env.HOLDERS_COUNT || 8432);

function buildMeta(
  network: string,
  pool: string,
  extra: Record<string, any> = {}
) {
  return {
    network,
    pool,
    defaultNetwork: network === DEFAULT_NETWORK,
    defaultPool: pool === DEFAULT_POOL,
    ...extra,
  };
}

router.get("/stats", async (req, res) => {
  const network = pickString(req, "network", DEFAULT_NETWORK);
  const pool = pickString(req, "pool", DEFAULT_POOL);
  const hours = pickNumber(req, "hours", 24, { min: 1, max: 168 });
  const limit = pickNumber(req, "limit", 200, { min: 1, max: 500 });
  try {
    const [poolStats, tradesRaw] = await Promise.all([
      fetchPoolStats(network, pool),
      fetchTrades(network, pool, limit),
    ]);
    const cutoff = Date.now() - hours * 60 * 60 * 1000;
    let volumePeriod = 0;
    let considered = 0;
    for (const t of tradesRaw) {
      const tsStr = t.attributes?.block_timestamp;
      const volStr = t.attributes?.volume_in_usd;
      const ts = tsStr ? Date.parse(tsStr) : null;
      if (ts && ts >= cutoff) {
        const v = parseFloat(volStr || "0");
        if (!isNaN(v)) volumePeriod += v;
        considered++;
      }
    }
    res.json({
      marketCapUsd: poolStats.marketCapUsd,
      fdvUsd: poolStats.fdvUsd,
      lockedLiquidityPercentage: poolStats.lockedLiquidityPercentage,
      holders: HOLDERS_COUNT || null,
      tradingVolumeUsdPeriod: volumePeriod,
      periodHours: hours,
      tradesConsidered: considered,
      limitRequested: limit,
      sources: { marketCap: "pool", volume: "trades_sum", holders: "env" },
      meta: buildMeta(network, pool, { hours, limit }),
    });
  } catch (e: any) {
    res
      .status(500)
      .json({
        error: "Failed to compute stats",
        details: e.message,
        meta: buildMeta(network, pool, { hours, limit }),
      });
  }
});

export default router;
