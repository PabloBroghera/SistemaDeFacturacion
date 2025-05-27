const mongoose = require("mongoose");

const VentaSchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
  cantidad: { type: Number, required: true },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" },
  vendedor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendedor" },
  moneda: { type: String, enum: ["ARS", "USD"], default: "ARS" },
  sucursal: { type: String },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Venta", VentaSchema);
