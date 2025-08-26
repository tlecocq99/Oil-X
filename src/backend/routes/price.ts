import { Router } from "express";
import { fetchPoolStats, fetchChart, fetchTrades } from "../services/gecko.js"; // re-export convenience if needed
import { savePriceTick, getRecentPriceTicks } from "../services/priceTicks.js";
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

router.get("/health", (req, res) => {
  const network = pickString(req, "network", DEFAULT_NETWORK);
  const pool = pickString(req, "pool", DEFAULT_POOL);
  res.json({ ok: true, timestamp: Date.now(), meta: buildMeta(network, pool) });
});

router.post("/price-tick", async (req, res) => {
  const network = pickString(req, "network", DEFAULT_NETWORK);
  const pool = pickString(req, "pool", DEFAULT_POOL);
  try {
    const price = Number(req.body?.price);
    if (!Number.isFinite(price))
      return res
        .status(400)
        .json({ error: "Invalid price", meta: buildMeta(network, pool) });
    const timestamp = Date.now();
    await savePriceTick(price, timestamp);
    res.json({
      success: true,
      price,
      timestamp,
      meta: buildMeta(network, pool),
    });
  } catch (e: any) {
    res
      .status(500)
      .json({
        error: "Failed to save price tick",
        details: e.message,
        meta: buildMeta(network, pool),
      });
  }
});

router.get("/price-ticks", async (req, res) => {
  const network = pickString(req, "network", DEFAULT_NETWORK);
  const pool = pickString(req, "pool", DEFAULT_POOL);
  try {
    const limit = pickNumber(req, "limit", 100, { min: 1, max: 500 });
    const ticks = await getRecentPriceTicks(limit);
    res.json({
      ticks: ticks
        .reverse()
        .map((t: any) => ({ price: t.price, timestamp: t.timestamp })),
      meta: buildMeta(network, pool, { limit, count: ticks.length }),
    });
  } catch (e: any) {
    res
      .status(500)
      .json({
        error: "Failed to fetch price ticks",
        details: e.message,
        meta: buildMeta(network, pool),
      });
  }
});

export default router;
