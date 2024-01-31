const mongoose = require("mongoose");

const restauranteSchema = new mongoose.Schema({
  email: String,
  password: String,
  country: String,
  city: String,
  brandName: String,
  firstName: String,
  lastName: String,
  phone: String,
  category: String,
  whatsapp: Boolean,
  privacy: Boolean,
  incluirCodigo: Boolean,
});

const Restaurante = mongoose.model("Restaurante", restauranteSchema);
module.exports = Restaurante;
