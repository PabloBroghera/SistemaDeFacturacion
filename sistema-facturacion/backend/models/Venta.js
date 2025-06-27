const mongoose = require("mongoose");

const VentaSchema = new mongoose.Schema({
  productos: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
      cantidad: { type: Number, required: true }
    }
  ],
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  vendedor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendedor", required: true },
  moneda: { type: String, enum: ["ARS", "USD"], default: "ARS" },
  sucursal: String,
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Venta", VentaSchema);
