const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  moneda: { type: String, enum: ['ARS', 'USD'], default: 'ARS' }
});

module.exports = mongoose.model('Producto', ProductoSchema);
