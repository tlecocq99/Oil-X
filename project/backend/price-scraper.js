import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // npm install node-fetch

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
    console.log("GeckoTerminal API response:", JSON.stringify(data, null, 2));
    // This gets the price in USD for the token
    const price = data.data?.attributes?.base_token_price_usd;
    res.json({ price: price ? `$${Number(price).toFixed(6)}` : "N/A" });
  } catch (err) {
    console.error("API error:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch price", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Price API running on port ${PORT}`);
});
