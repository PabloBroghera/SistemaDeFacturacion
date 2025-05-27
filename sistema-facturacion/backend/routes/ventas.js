const express = require("express");
const router = express.Router();
const Venta = require("../models/Venta");
const Producto = require("../models/Producto");

// Registrar venta y descontar stock
router.post("/", async (req, res) => {
  try {
    const { producto, cantidad, cliente, vendedor, moneda, sucursal } = req.body;

    // Verificar que el producto exista
    const prod = await Producto.findById(producto);
    if (!prod) return res.status(404).json({ error: "Producto no encontrado" });

    if (prod.stock < cantidad) return res.status(400).json({ error: "Stock insuficiente" });

    // Descontar stock
    prod.stock -= cantidad;
    await prod.save();

    // Crear venta
    const nuevaVenta = new Venta({
      producto,
      cantidad,
      cliente,
      vendedor,
      moneda,
      sucursal,
      fecha: new Date()
    });

    await nuevaVenta.save();
    res.status(201).json(nuevaVenta);
  } catch (err) {
    console.error("❌ Error al registrar venta:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
