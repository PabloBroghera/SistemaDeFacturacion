import React, { useState, useEffect } from "react";
import axios from "axios";
import FormularioVenta from "../components/FormularioVenta";

function Ventas() {
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
      <h2 className="text-2xl font-bold mb-4">Registrar Venta</h2>
      <FormularioVenta productos={productos} fetchProductos={fetchProductos} />
    </div>
  );
}

export default Ventas;
