const mongoose = require("mongoose");

const StockMovimientoSchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
  tipo: { type: String, enum: ["venta", "ajuste", "ingreso"], required: true },
  cantidad: { type: Number, required: true },
  descripcion: { type: String },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Vendedor" },
  fecha: { type: Date, default: Date.now },
  sucursal: { type: String }
});

module.exports = mongoose.model("StockMovimiento", StockMovimientoSchema);
