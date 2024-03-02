const mongoose = require("mongoose");

function generateUniqueThreeDigitNumber() {
  return Math.floor(100 + Math.random() * 900);
}

const productSchema = new mongoose.Schema(
  {
    client_id: {
      type: String,
      unique: true,
      required: true,
    },
    prod_id: {
      type: Number,
      unique: true,
      required: true,
      default: generateUniqueThreeDigitNumber,
    },
    prod_category: {
      type: String,
      required: true,
      max: 20,
    },
    product_name: {
      type: String,
      required: true,
      max: 20,
    },
    product_price: {
      type: String,
      required: true,
      max: 20,
    },
    product_desc: {
      type: String,
      required: true,
      max: 20,
    },
    user_type: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
