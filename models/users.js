const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

function generateUniqueThreeDigitNumber() {
  return Math.floor(100 + Math.random() * 900);
}

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      unique: true,
      required: true,
      default: generateUniqueThreeDigitNumber,
    },
    firstName: {
      type: String,
      required: true,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    accessToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
