const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 
const clienteRoutes = require("./routes/clientes");
const vendedorRoutes = require("./routes/vendedores");
const ventasRoutes = require('./routes/ventas');



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Rutas
const productosRoutes = require('./routes/productos');


app.use('/api/productos', productosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/vendedores", vendedorRoutes);
// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/facturacion')
  .then(() => {
    console.log('✅ MongoDB conectado');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar MongoDB:', err);
  });
