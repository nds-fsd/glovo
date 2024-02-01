const bcrypt = require("bcryptjs");
const User = require("../schema/usersSchema");
const { encryptValue } = require("../utils");

exports.createUser = async (req, res) => {
  console.log("Datos recibidos:", req.body);
  try {
    if (!req.body.password) {
      return res.status(400).json({ error: "La contraseña no está definida" });
    }

    const encryptedPassword = await encryptValue(req.body.password);
    const newUser = await User.create({
      firstname,
      password,
      created_date,
      email,
      phone,
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error al crear usuario:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (updatedUser) {
      res.json({
        message: "Usuario Actualizado Correctamente",
        updatedUser,
      });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.encrypted_password
    );
    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña actual incorrecta" });
    }

    user.encrypted_password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Contraseña actualizada con éxito" });
  } catch (err) {
    console.error("Error al cambiar la contraseña:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario por correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // Comparar la contraseña proporcionada con la almacenada
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    // Generar un token JWT
    const token = user.generateJWT();
    res.json({ message: "Login exitoso", token });
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
