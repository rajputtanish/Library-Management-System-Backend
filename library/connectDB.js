const dns = require("node:dns");
const mongoose = require("mongoose");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://rajputtanish2006_db_user:iJphzl227PR7KayG@cluster0.kwmbunh.mongodb.net",
    );

    console.log("✅ MongoDB Atlas connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exitCode = 1;
  }
}

module.exports = connectDB;
