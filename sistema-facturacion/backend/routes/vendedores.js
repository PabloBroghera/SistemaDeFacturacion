const express = require("express");
const router = express.Router();
const Vendedor = require("../models/Vendedor");

router.post("/", async (req, res) => {
  try {
    const nuevo = new Vendedor(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const vendedores = await Vendedor.find();
    res.json(vendedores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
