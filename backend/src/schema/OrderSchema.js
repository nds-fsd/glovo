const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productList: Array,
  restaurante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurante",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
