import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // npm install node-fetch
import { savePriceTick, getRecentPriceTicks } from "./price-tick-db.js";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;
const GECKO_URL =
  "https://api.geckoterminal.com/api/v2/networks/solana/pools/FEhpt1a5HVmD5LKyGAju4vJ9NTbCMdkAQitEF5D3nFqz";

app.get("/api/price", async (req, res) => {
  try {
    const response = await fetch(GECKO_URL, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const data = await response.json();
    // This gets the price in USD for the token
    const price = data.data?.attributes?.base_token_price_usd;
    res.json({ price: price ? `$${Number(price).toFixed(7)}` : "N/A" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch price", details: err.message });
  }
});

// Save a live price tick to MongoDB
app.post("/api/price-tick", express.json(), async (req, res) => {
  try {
    const { price } = req.body;
    const timestamp = Date.now();
    await savePriceTick(price, timestamp);
    res.json({ success: true });
  } catch (err) {
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
    // Return sorted oldest to newest
    res.json({
      ticks: ticks
        .reverse()
        .map((t) => ({ price: t.price, timestamp: t.timestamp })),
    });
  } catch (err) {
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
    // Parse ohlcv_list: [timestamp, open, high, low, close, volume]
    const ohlcvList = data.data?.attributes?.ohlcv_list || [];
    // Map to [timestamp, close] pairs
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
  console.log(`Price API running on port ${PORT}`);
});
