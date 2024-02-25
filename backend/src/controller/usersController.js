const bcrypt = require("bcryptjs");
const User = require("../schema/usersSchema");
const {sendWelcomeEmail} = require("../service/index");

exports.createUser = async (req, res) => {
  try {
    const { password, firstname, created_date, email, phone } = req.body;
    if (!password) {
      return res.status(400).json({ error: "La contraseña no está definida" });
    }

    
    const newUser = await User.create({
      firstName: firstname,
      password,
      created_date,
      email,
      phone,
    });

    const createdUser = await newUser.save()
  
    // if (createdUser) {
    //   const user = { email: "josegarcia1006@gmail.com", name: createdUser.name };
    //   // ahora continuo que esta el boss. xD 
    //   await sendWelcomeEmail(user);
    //   return res.statys(201).json({
    //     message: "Tu usuario ha sido creado con éxito",
    //     user: createdUser
    //   })
    // } else {
    //   res.status(400).send()
    // }

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
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

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
  const { id } = req.params; 
  const { currentPassword, newPassword } = req.body; 
  
  try {
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // Verificar la contraseña actual
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
          return res.status(400).json({ error: "La contraseña actual es incorrecta" });
      }
      console.log("esta es la contraseña antes de ser cambiada " + user.password);
      // Actualizar la contraseña con la nueva contraseña hasheada
      // const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = newPassword;
      await user.save(); // Guarda el usuario con la contraseña actualizada
      console.log("esta es la contraseña actualizada " + user.password);
      res.json({ message: "La contraseña ha sido actualizada con éxito" });
  } catch (err) {
      console.error("Error al cambiar la contraseña:", err);
      res.status(500).json({ error: "Error interno del servidor" });
  }
};


// exports.changePassword = async (req, res) => {
//   console.log("este es el req" + req);
//   const { id } = req.params;
//   const { currentPassword, newPassword, confirmNewPassword } = req.body;

//   try {
//     const user = await User.findById( id );
//     if (!user) {
//       return res.status(404).json({ error: "Usuario no encontrado" });
//     }

    
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: "Contraseña actual incorrecta" });
//     }

//     console.log("esta es la contraseña antes de cambiarla" + user.password);
//     user.password = await bcrypt.hash(newPassword, 10);
   
//     await user.save();
//     console.log("esta es la contraseña despues de cambiarla" + user.password);
//     res.json({ message: "Contraseña actualizada con éxito " + user.password });
   
//   } catch (err) {
//     console.error("Error al cambiar la contraseña:", err);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };

// const encryptedPassword = await bcrypt.hash(password, 10);
// const newUser = await User.create({
//   firstName: firstname, 
//   password: encryptedPassword, // Usar 'password' para coincidir con el esquema
//   created_date,
//   email,
//   phone,
// });


// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ error: "Credenciales incorrectas" });
//     }

    
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: "Credenciales incorrectas" });
//     }

//     const token = user.generateJWT(); 
//     res.json({ message: "Login exitoso", token });
//   } catch (err) {
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    
    const isMatch = user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = user.generateJWT(); 
    res.json({ message: "Login exitoso", token });
  } catch (err) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

