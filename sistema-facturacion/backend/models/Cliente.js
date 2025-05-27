const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  dni: String,
  celular: String,
  mail: String,
  tipoCliente: String
});

module.exports = mongoose.model("Cliente", ClienteSchema);
