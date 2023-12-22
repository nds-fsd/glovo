const mongoose = require("mongoose");

const restauranteSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  direccion: String,
  categoria: String,
  horarios: String,
  imagen: String,
  transporte: String,
  oferta: String,
  puntuacion: String,
  votos: String,
});

const Restaurante = mongoose.model("Restaurante", restauranteSchema);
module.exports = Restaurante;
