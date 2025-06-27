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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/productos", formData);
      alert("✅ Producto registrado");
      setFormData({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        moneda: "ARS"
      });
      fetchProductos();
    } catch (err) {
      console.error("❌ Error al registrar producto", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md mx-auto mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">Registrar Producto</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
        className="w-full mb-2 p-2 border rounded"
      />

      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={formData.precio}
        onChange={handleChange}
        required
        className="w-full mb-2 p-2 border rounded"
      />

      <select
        name="moneda"
        value={formData.moneda}
        onChange={handleChange}
        required
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="ARS">ARS</option>
        <option value="USD">USD</option>
      </select>

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        required
        className="w-full mb-4 p-2 border rounded"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
        Guardar Producto
      </button>
    </form>
  );
};

export default FormularioProducto;
