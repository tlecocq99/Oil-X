// NOTE: This service only fetches data from GeckoTerminal's public API.
// It is NOT a scraper and complies with their Terms of Service.
import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // npm install node-fetch
import { savePriceTick, getRecentPriceTicks } from "./price-tick-db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Simple health check (helps diagnose ECONNREFUSED quickly)
app.get("/api/health", async (_req, res) => {
  res.json({ ok: true, timestamp: Date.now() });
});

const PORT = process.env.PORT || 4000;
const GECKO_URL =
  "https://api.geckoterminal.com/api/v2/networks/solana/pools/9h7GAGU8T75jdD2uHhFGEMHzCLLDXdgireWZho8jgnKp";

app.get("/api/price", async (req, res) => {
  try {
    const response = await fetch(GECKO_URL, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const data = await response.json();
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
    const response = await fetch(chartUrl, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const data = await response.json();
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

app.listen(PORT, () => {
  console.log(`Price API (fetcher) running on port ${PORT}`);
});

process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION", reason);
});
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION", err);
});
