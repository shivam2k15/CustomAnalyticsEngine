const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to db.");
  } catch (error) {
    console.log("Not connected to db", error);
  }
};

module.exports = { connectToDatabase };
