import express from "express";
import cors from "cors";
import priceRouter from "./routes/price.js";
import statsRouter from "./routes/stats.js";
import ticksRouter from "./routes/ticks.js";
import { logger, logStartupBanner } from "./lib/logger.js";

const app = express();
app.use(cors());
app.use(express.json());

// Mount modular routers under /api
app.use("/api", priceRouter);
app.use("/api", statsRouter);
app.use("/api", ticksRouter);

// Fallback
app.use((req, res) => {
  res.status(404).json({ error: "Not Found", path: req.path });
});

// Error handler
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    logger.error("Unhandled error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
);

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => logStartupBanner(PORT));

process.on("unhandledRejection", (r) => logger.error("unhandledRejection", r));
process.on("uncaughtException", (e) => logger.error("uncaughtException", e));
