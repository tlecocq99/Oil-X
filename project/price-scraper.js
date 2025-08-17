const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;
const CMC_URL =
  "https://dex.coinmarketcap.com/token/solana/PqXub2t6A2vvUb3Mevk4uhj339rMhhmxq2HQzYNmoon/";

app.get("/api/price", async (req, res) => {
  try {
    const { data } = await axios.get(CMC_URL);
    const $ = cheerio.load(data);
    // The selector below may need to be updated if CMC changes their layout
    const priceText = $("[class*=priceValue]").first().text();
    res.json({ price: priceText || "N/A" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch price", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Price scraper running on port ${PORT}`);
});
