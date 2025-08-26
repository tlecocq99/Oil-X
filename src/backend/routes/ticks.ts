import { Router } from "express";
import { fetchTrades, fetchChart } from "../services/gecko.js";
import { pickString, pickNumber } from "../lib/validate.js";

const router = Router();
const DEFAULT_NETWORK = process.env.GT_NETWORK || "solana";
const DEFAULT_POOL =
  process.env.GT_POOL || "9h7GAGU8T75jdD2uHhFGEMHzCLLDXdgireWZho8jgnKp";

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

router.get("/price", async (req, res) => {
  const network = pickString(req, "network", DEFAULT_NETWORK);
  const pool = pickString(req, "pool", DEFAULT_POOL);
  try {
    const stats = await fetchTrades(network, pool, 1); // just to derive latest price proxy if desired (placeholder)
    const latest = stats[0];
    const price = latest?.attributes?.price_from_in_usd;
    res.json({
      price: price ? `$${Number(price).toFixed(7)}` : "N/A",
      meta: buildMeta(network, pool),
    });
  } catch (e: any) {
    res
      .status(500)
      .json({
        error: "Failed to fetch price",
        details: e.message,
        meta: buildMeta(network, pool),
      });
  }
});

router.get("/trades", async (req, res) => {
  const network = pickString(req, "network", DEFAULT_NETWORK);
  const pool = pickString(req, "pool", DEFAULT_POOL);
  const limit = pickNumber(req, "limit", 50, { min: 1, max: 200 });
  try {
    const raw = await fetchTrades(network, pool, limit);
    const trades = raw.map((t: any) => ({
      id: t.id,
      type: t.type,
      attributes: t.attributes || {},
    }));
    const aggregatedVolumeUsd = trades.reduce(
      (acc: number, t: any) =>
        acc + (parseFloat(t.attributes.volume_in_usd || "0") || 0),
      0
    );
    res.json({
      trades,
      aggregatedVolumeUsd,
      meta: buildMeta(network, pool, { limit }),
    });
  } catch (e: any) {
    res
      .status(500)
      .json({
        error: "Failed to fetch trades",
        details: e.message,
        meta: buildMeta(network, pool, { limit }),
      });
  }
});

router.get("/chart", async (req, res) => {
  const network = pickString(req, "network", DEFAULT_NETWORK);
  const pool = pickString(req, "pool", DEFAULT_POOL);
  const timeframe = pickString(req, "timeframe", "minute");
  try {
    const ohlcv = await fetchChart(network, pool, timeframe);
    const prices = ohlcv.map(([ts, , , , close]: any) => [ts, close]);
    res.json({
      series: { prices },
      network,
      pool,
      timeframe,
      meta: buildMeta(network, pool, { timeframe }),
    });
  } catch (e: any) {
    res
      .status(500)
      .json({
        error: "Failed to fetch chart data",
        details: e.message,
        meta: buildMeta(network, pool, { timeframe }),
      });
  }
});

export default router;
