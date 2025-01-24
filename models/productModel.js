const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: { type: String, required: true },
  brandName: { type: String, required: true },
  category: { type: String, required: true }, // Enforce category as string
  productImage: { type: [String] }, // Enforce array of strings
  description: String,
  price: { type: Number, required: true },
  sellingPrice: Number,
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
