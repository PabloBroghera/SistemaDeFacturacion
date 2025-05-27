const express = require("express");
const router = express.Router();
const Cliente = require("../models/Cliente");

// Obtener clientes
router.get("/", async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
