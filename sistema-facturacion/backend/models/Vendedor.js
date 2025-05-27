const mongoose = require("mongoose");

const VendedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ["duenio", "empleado"], default: "empleado" },
});

module.exports = mongoose.model("Vendedor", VendedorSchema);
