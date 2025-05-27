import React, { useState, useEffect } from "react";
import axios from "axios";

const FormularioVenta = ({ productos, fetchProductos }) => {
  const [formData, setFormData] = useState({
    producto: "",
    cantidad: "",
    cliente: "",
    vendedor: "",
    moneda: "ARS",
    sucursal: "Sucursal 1"
  });

  const [clientes, setClientes] = useState([]);
  const [vendedores, setVendedores] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/clientes");
        setClientes(res.data);
      } catch (err) {
        console.error("❌ Error al cargar clientes", err);
      }
    };

    const fetchVendedores = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/vendedores");
        setVendedores(res.data);
      } catch (err) {
        console.error("❌ Error al cargar vendedores", err);
      }
    };

    fetchClientes();
    fetchVendedores();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/ventas", formData);
      alert("✅ Venta registrada");
      setFormData({
        producto: "",
        cantidad: "",
        cliente: "",
        vendedor: "",
        moneda: "ARS",
        sucursal: "Sucursal 1"
      });
      fetchProductos();
    } catch (err) {
      console.error("❌ Error al registrar venta", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md mx-auto mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">Registrar Venta</h2>

      <select name="producto" value={formData.producto} onChange={handleChange} required className="w-full mb-2 p-2 border rounded">
        <option value="">Seleccionar producto</option>
        {productos.map((p) => (
          <option key={p._id} value={p._id}>
            {p.nombre}
          </option>
        ))}
      </select>

      <input type="number" name="cantidad" placeholder="Cantidad" value={formData.cantidad} onChange={handleChange} required className="w-full mb-2 p-2 border rounded" />

      <select name="cliente" value={formData.cliente} onChange={handleChange} required className="w-full mb-2 p-2 border rounded">
        <option value="">Seleccionar cliente</option>
        {clientes.map((c) => (
          <option key={c._id} value={c._id}>
            {c.nombre} {c.apellido}
          </option>
        ))}
      </select>

      <select name="vendedor" value={formData.vendedor} onChange={handleChange} required className="w-full mb-2 p-2 border rounded">
        <option value="">Seleccionar vendedor</option>
        {vendedores.map((v) => (
          <option key={v._id} value={v._id}>
            {v.nombre} {v.apellido}
          </option>
        ))}
      </select>

      <select name="moneda" value={formData.moneda} onChange={handleChange} className="w-full mb-2 p-2 border rounded">
        <option value="ARS">ARS</option>
        <option value="USD">USD</option>
      </select>

      <input type="text" name="sucursal" placeholder="Sucursal" value={formData.sucursal} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
        Guardar Venta
      </button>
    </form>
  );
};

export default FormularioVenta;
