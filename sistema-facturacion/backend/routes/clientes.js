const express = require("express");
const router = express.Router();
const Cliente = require("../models/Cliente");

// Crear cliente
router.post("/", async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    await nuevoCliente.save();
    res.status(201).json(nuevoCliente);
  } catch (err) {
    console.error("❌ Error al guardar cliente:", err);
    res.status(500).json({ error: err.message });
  }
});

// Obtener todos los clientes
router.get("/", async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    console.error("❌ Error al obtener clientes:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
