const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  picture: String,
  status: Boolean,
  ingredients: [String],
});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;

