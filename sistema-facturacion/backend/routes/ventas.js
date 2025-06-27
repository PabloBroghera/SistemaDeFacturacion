const express = require('express');
const router = express.Router();
const Venta = require('../models/Venta');
const Producto = require('../models/Producto');

// Registrar venta con múltiples productos
router.post('/', async (req, res) => {
  try {
    const { productos, cliente, vendedor, moneda, sucursal } = req.body;

    if (!productos || productos.length === 0) {
      return res.status(400).json({ error: 'Debe incluir al menos un producto.' });
    }

    let total = 0;
    const detalle = [];

    for (let item of productos) {
      const producto = await Producto.findById(item.productoId);
      if (!producto) {
        return res.status(404).json({ error: `Producto no encontrado: ${item.productoId}` });
      }

      if (producto.stock < item.cantidad) {
        return res.status(400).json({ error: `Stock insuficiente para el producto: ${producto.nombre}` });
      }

      producto.stock -= item.cantidad;
      await producto.save();

      const subtotal = producto.precio * item.cantidad;
      total += subtotal;

      detalle.push({
        producto: producto._id,
        nombre: producto.nombre,
        cantidad: item.cantidad,
        precioUnitario: producto.precio,
        subtotal,
      });
    }

    const nuevaVenta = new Venta({
      productos: detalle,
      cliente,
      vendedor,
      moneda,
      sucursal,
      total,
      fecha: new Date(),
    });

    await nuevaVenta.save();
    res.status(201).json({ mensaje: 'Venta registrada con éxito', venta: nuevaVenta });
  } catch (error) {
    console.error('❌ Error al registrar la venta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener historial de ventas
router.get('/', async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate('cliente')
      .populate('vendedor')
      .sort({ fecha: -1 });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
});

// Eliminar venta (solo permitido para dueño con clave maestra en frontend)
router.delete('/:id', async (req, res) => {
  try {
    const venta = await Venta.findByIdAndDelete(req.params.id);
    if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });
    res.json({ mensaje: 'Venta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar venta' });
  }
});

module.exports = router;
