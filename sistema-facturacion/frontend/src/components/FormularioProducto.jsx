import React, { useState } from "react";
import axios from "axios";

const FormularioProducto = ({ fetchProductos }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    moneda: "ARS"
  });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/productos", formData);
      fetchProductos();
      setFormData({ nombre: "", descripcion: "", precio: "", stock: "", moneda: "ARS" });
    } catch (err) {
      console.error("Error al crear producto", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Nuevo Producto</h2>
      <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" required />
      <input name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" />
      <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" required />
      <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" required />
      <select name="moneda" value={formData.moneda} onChange={handleChange} className="block w-full mb-4 p-2 border rounded">
        <option value="ARS">ARS</option>
        <option value="USD">USD</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
    </form>
  );
};

export default FormularioProducto;
