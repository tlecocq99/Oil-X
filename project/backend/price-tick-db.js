// MongoDB integration for live price ticks
import { MongoClient } from "mongodb";

const MONGO_URL = "mongodb://127.0.0.1:27017/";
const DB_NAME = "oilx";
const COLLECTION = "price_ticks";

let client;
let db;

export async function connectMongo() {
  if (!client) {
    client = new MongoClient(MONGO_URL);
    await client.connect();
    db = client.db(DB_NAME);
  }
  return db.collection(COLLECTION);
}

export async function savePriceTick(price, timestamp) {
  const col = await connectMongo();
  await col.insertOne({ price, timestamp });
}

export async function getRecentPriceTicks(limit = 100) {
  const col = await connectMongo();
  return await col.find({}, { sort: { timestamp: -1 }, limit }).toArray();
}
