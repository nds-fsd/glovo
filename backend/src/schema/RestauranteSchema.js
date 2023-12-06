const mongoose = require("mongoose");

const restauranteSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  direccion: String,
  categoria: String,
  horarios: String,
});

const Restaurante = mongoose.model("Restaurante", restauranteSchema);
module.exports = Restaurante;
