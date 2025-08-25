// NOTE: This service only fetches data from GeckoTerminal's public API.
// It is NOT a scraper and complies with their Terms of Service.
import express from "express";
import cors from "cors";
import axios from "axios";
import { savePriceTick, getRecentPriceTicks } from "./price-tick-db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Simple health check (helps diagnose ECONNREFUSED quickly)
app.get("/api/health", async (_req, res) => {
  res.json({ ok: true, timestamp: Date.now() });
});

const PORT = process.env.PORT || 4000;
const GECKO_BASE = "https://api.geckoterminal.com/api/v2";
const DEFAULT_NETWORK = process.env.GT_NETWORK || "solana";
const DEFAULT_POOL =
  process.env.GT_POOL || "9h7GAGU8T75jdD2uHhFGEMHzCLLDXdgireWZho8jgnKp";
const GECKO_URL = `${GECKO_BASE}/networks/${DEFAULT_NETWORK}/pools/${DEFAULT_POOL}`; // pool details endpoint
const POOL_ID = DEFAULT_POOL; // backwards compat

// Env configurable values (fallbacks keep existing UI feel)
const TOTAL_SUPPLY = Number(process.env.TOTAL_SUPPLY || 100_000_000); // 100M
const HOLDERS_COUNT = Number(process.env.HOLDERS_COUNT || 8432);

function formatNumber(num, { decimals = 2, compact = true, prefix = "" } = {}) {
  if (num === null || num === undefined || isNaN(num)) return null;
  let n = Number(num);
  if (compact) {
    if (n >= 1_000_000_000)
      return prefix + (n / 1_000_000_000).toFixed(decimals) + "B";
    if (n >= 1_000_000) return prefix + (n / 1_000_000).toFixed(decimals) + "M";
    if (n >= 1_000) return prefix + (n / 1_000).toFixed(decimals) + "K";
  }
  return (
    prefix +
    n.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
}

async function fetchPoolStats(network = DEFAULT_NETWORK, pool = DEFAULT_POOL) {
  try {
    const { data } = await axios.get(
      `${GECKO_BASE}/networks/${network}/pools/${pool}`,
      {
        headers: { accept: "application/json" },
        timeout: 10000,
      }
    );
    const attrs = data?.data?.attributes || {};
    const pickFirstNumber = (arr) =>
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
  } catch (e) {
    return {
      marketCapUsd: null,
      fdvUsd: null,
      lockedLiquidityPercentage: null,
      raw: null,
    };
  }
}

async function fetchTrades(network, pool, limit) {
  const url = `${GECKO_BASE}/networks/${network}/pools/${pool}/trades?limit=${limit}`;
  const { data } = await axios.get(url, {
    headers: { accept: "application/json" },
    timeout: 10000,
  });
  return data.data || [];
}

app.get("/api/price", async (req, res) => {
  try {
    const { data } = await axios.get(GECKO_URL, {
      headers: { accept: "application/json" },
      timeout: 10000,
    });
    const price = data.data?.attributes?.base_token_price_usd;
    res.json({ price: price ? `$${Number(price).toFixed(7)}` : "N/A" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch price", details: err.message });
  }
});

// Save a live price tick to MongoDB
app.post("/api/price-tick", async (req, res) => {
  try {
    const { price } = req.body;
    const timestamp = Date.now();
    await savePriceTick(price, timestamp);
    res.json({ success: true });
  } catch (err) {
    console.error("/api/price-tick error", err);
    res
      .status(500)
      .json({ error: "Failed to save price tick", details: err.message });
  }
});

// Get recent price ticks for chart
app.get("/api/price-ticks", async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 100;
    const ticks = await getRecentPriceTicks(limit);
    res.json({
      ticks: ticks
        .reverse()
        .map((t) => ({ price: t.price, timestamp: t.timestamp })),
    });
  } catch (err) {
    console.error("/api/price-ticks error", err);
    res
      .status(500)
      .json({ error: "Failed to fetch price ticks", details: err.message });
  }
});

app.get("/api/chart", async (req, res) => {
  try {
    const chartUrl =
      "https://api.geckoterminal.com/api/v2/networks/solana/pools/FEhpt1a5HVmD5LKyGAju4vJ9NTbCMdkAQitEF5D3nFqz/ohlcv/minute";
    const { data } = await axios.get(chartUrl, {
      headers: { accept: "application/json" },
      timeout: 10000,
    });
    const ohlcvList = data.data?.attributes?.ohlcv_list || [];
    const prices = ohlcvList.map(([timestamp, , , , close]) => [
      timestamp,
      close,
    ]);
    res.json({
      series: { prices },
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch chart data", details: err.message });
  }
});

// Lightweight stats combining pool (market cap) + trades (volume)
// Query params: ?network=&pool=&hours= (default 24) &limit= (trades limit, default 200)
app.get("/api/stats", async (req, res) => {
  const network = (req.query.network || DEFAULT_NETWORK).toString();
  const pool = (req.query.pool || DEFAULT_POOL).toString();
  const hours = Math.min(Number(req.query.hours) || 24, 168); // cap at 7 days
  const limit = Math.min(Number(req.query.limit) || 200, 500); // trade fetch cap
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
    const response = {
      marketCapUsd: poolStats.marketCapUsd,
      fdvUsd: poolStats.fdvUsd,
      lockedLiquidityPercentage: poolStats.lockedLiquidityPercentage,
      holders: HOLDERS_COUNT || null, // Placeholder (needs on-chain source for live value)
      tradingVolumeUsdPeriod: volumePeriod,
      periodHours: hours,
      tradesConsidered: considered,
      limitRequested: limit,
      sources: {
        marketCap: "pool",
        volume: "trades_sum",
        holders: "env",
      },
    };
    res.json(response);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to compute stats", details: err.message });
  }
});

// Latest trades endpoint - surfaces raw trade objects shaped per spec
app.get("/api/trades", async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 50, 200);
  const network = (req.query.network || DEFAULT_NETWORK).toString();
  const pool = (req.query.pool || DEFAULT_POOL).toString();
  try {
    const tradesUrl = `${GECKO_BASE}/networks/${network}/pools/${pool}/trades?limit=${limit}`;
    const { data } = await axios.get(tradesUrl, {
      headers: { accept: "application/json" },
      timeout: 10000,
    });
    const trades = (data.data || []).map((t) => {
      const a = t.attributes || {};
      return {
        id: t.id,
        type: t.type,
        attributes: {
          block_number: a.block_number,
          block_timestamp: a.block_timestamp,
          tx_hash: a.tx_hash,
          tx_from_address: a.tx_from_address,
          from_token_amount: a.from_token_amount,
          to_token_amount: a.to_token_amount,
          price_from_in_currency_token: a.price_from_in_currency_token,
          price_to_in_currency_token: a.price_to_in_currency_token,
          price_from_in_usd: a.price_from_in_usd,
          price_to_in_usd: a.price_to_in_usd,
          kind: a.kind,
          volume_in_usd: a.volume_in_usd,
          from_token_address: a.from_token_address,
          to_token_address: a.to_token_address,
        },
      };
    });
    const aggregatedVolumeUsd = trades.reduce((acc, t) => {
      const v = parseFloat(t.attributes.volume_in_usd || "0");
      return acc + (isNaN(v) ? 0 : v);
    }, 0);
    res.json({ trades, aggregatedVolumeUsd });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch trades", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Price API (fetcher) running on port ${PORT}`);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION", reason);
});
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION", err);
});
