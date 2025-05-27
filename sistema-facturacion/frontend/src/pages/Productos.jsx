import React, { useState, useEffect } from "react";
import axios from "axios";
import FormularioProducto from "../components/FormularioProducto";
import ListadoProductos from "../components/ListadoProductos";

function Productos() {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/productos");
      setProductos(res.data);
    } catch (err) {
      console.error("Error al obtener productos", err);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestión de Productos</h2>
      <FormularioProducto fetchProductos={fetchProductos} />
      <ListadoProductos productos={productos} />
    </div>
  );
}

export default Productos;
