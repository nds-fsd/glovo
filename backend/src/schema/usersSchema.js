const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  password: String,
  created_date: { type: Date, default: Date.now },
  email: String,
  phone: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
