const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://sdew2sdew0592855602:1234512345@cluster0.mwxbd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("AR MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // إنهاء العملية في حالة وجود خطأ
  }
}

module.exports = connectDB;
