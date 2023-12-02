const Restaurante = require("../schema/RestauranteSchema");

exports.createRestaurante = async (req, res) => {
  try {
    const { nombre, descripcion, direccion, categoria, horarios } = req.body;
    const newRestaurante = await Restaurante.create({
      nombre,
      descripcion,
      direccion,
      categoria,
      horarios,
    });
    res.status(201).json(newRestaurante);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRestaurantes = async (req, res) => {
  try {
    const restaurantes = await Restaurante.find();
    res.json(restaurantes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRestauranteById = async (req, res) => {
  const restauranteId = req.params.id;
  try {
    const foundRestaurante = await Restaurante.findById(restauranteId);

    if (foundRestaurante) {
      res.json(foundRestaurante);
    } else {
      res.status(404).json({ error: "Restaurante not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRestaurante = async (req, res) => {
  const restauranteId = req.params.id;

  try {
    const deletedRestaurante = await Restaurante.findByIdAndDelete(
      restauranteId
    );
    if (deletedRestaurante) {
      res.json({
        message: "Restaurante deleted successfully",
        deletedRestaurante,
      });
    } else res.status(500).json({ error: "Product not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRestaurante = async (req, res) => {
  const restauranteId = req.params.id;
  const updates = req.body;

  try {
    const updatedRestaurante = await Restaurante.findByIdAndUpdate(
      restauranteId,
      updates,
      { new: true }
    );

    if (updatedRestaurante) {
      res.json({
        message: "Restaurante updated successfully",
        updatedRestaurante,
      });
    } else {
      res.status(404).json({ error: "Restaurante not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
