const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {
  if (db) return db;

  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("MongoDB connected to", process.env.DB_NAME);
    return db;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { connectDB, ObjectId };
