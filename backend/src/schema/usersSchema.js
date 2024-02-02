const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.JWT_SECRET;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  email: { type: String },
  password: String,
  phone: { type: String },
  address: { type: String },
  role: { type: String, enum: ["USER", "RESTAURANT"] },
});

//esta funcion se ejecuta "antes" de guardar cualquier usuario en Mongo
userSchema.pre("save", function (next) {
  const user = this;

  //si no se ha cambiado la contraseña, seguimos
  if (!user.isModified("password")) return next();

  //brcypt es una libreria que genera "hashes", encriptamos la contraseña
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // si no ha habido error en el encryptado, guardamos
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// * Method to generate the JWT
userSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date();

  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    firstName: this.firstName,
    email: this.email,
    role: this.role,
  };
  // * This method is from the json-web-token library (who is in charge to generate the JWT
  return jwt.sign(payload, secret, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};

const User = model("user", userSchema);

module.exports = User;
