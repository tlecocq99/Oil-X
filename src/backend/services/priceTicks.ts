// Mongo backed price tick storage with graceful in-memory fallback
import { MongoClient, Collection } from "mongodb";
import { logger } from "../lib/logger.js";

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/";
const DB_NAME = process.env.MONGO_DB || "oilx";
const COLLECTION = process.env.MONGO_COLLECTION || "price_ticks";

let client: MongoClient | null = null;
let col: Collection | null = null;
const memory: { price: number; timestamp: number }[] = [];

async function ensure() {
  if (col) return col;
  try {
    client = new MongoClient(MONGO_URL);
    await client.connect();
    col = client.db(DB_NAME).collection(COLLECTION);
    logger.info("Connected to Mongo for price ticks");
  } catch (e: any) {
    logger.warn("Mongo unavailable, using in-memory tick store", e.message);
  }
  return col;
}

export async function savePriceTick(price: number, timestamp: number) {
  const collection = await ensure();
  if (collection) {
    await collection.insertOne({ price, timestamp });
    const count = await collection.countDocuments();
    if (count > 500) {
      const toDelete = await collection
        .find({}, { sort: { timestamp: 1 } as any })
        .limit(count - 500)
        .toArray();
      const ids = toDelete.map((d: any) => d._id);
      await collection.deleteMany({ _id: { $in: ids } });
    }
  } else {
    memory.push({ price, timestamp });
    while (memory.length > 500) memory.shift();
  }
}

export async function getRecentPriceTicks(limit = 100) {
  const collection = await ensure();
  if (collection) {
    return await collection
      .find({}, { sort: { timestamp: -1 } as any, limit })
      .toArray();
  }
  return [...memory].slice(-limit).reverse();
}
