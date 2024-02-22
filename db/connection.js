const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://punit:punit2023@cluster0.urv5xe0.mongodb.net/FashionFlareDB?retryWrites=true&w=majority"
    );
    console.log("Database Connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectDB;
