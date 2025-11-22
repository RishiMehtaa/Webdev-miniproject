const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI not set in .env");

  await mongoose.connect(uri, {
    dbName: process.env.DB_NAME || undefined,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB (Mongoose) connected");
  return mongoose;
}

module.exports = connectDB;
