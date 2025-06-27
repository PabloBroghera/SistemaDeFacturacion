import React, { useState, useEffect } from "react";
import axios from "axios";

const FormularioVenta = ({ fetchProductos }) => {
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [vendedores, setVendedores] = useState([]);

  const [formData, setFormData] = useState({
    productos: [],
    cliente: "",
    vendedor: "",
    moneda: "ARS",
    sucursal: "Sucursal 1"
  });

  const fetchData = async () => {
    try {
      const [resProductos, resClientes, resVendedores] = await Promise.all([
        axios.get("http://localhost:5000/api/productos"),
        axios.get("http://localhost:5000/api/clientes"),
        axios.get("http://localhost:5000/api/vendedores"),
      ]);
      setProductos(resProductos.data);
      setClientes(resClientes.data);
      setVendedores(resVendedores.data);
    } catch (err) {
      console.error("❌ Error al cargar datos", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProductoChange = (index, field, value) => {
    const nuevosProductos = [...formData.productos];
    nuevosProductos[index][field] = value;
    setFormData({ ...formData, productos: nuevosProductos });
  };

  const agregarProducto = () => {
    setFormData({
      ...formData,
      productos: [...formData.productos, { productoId: "", cantidad: 1 }]
    });
  };

  const quitarProducto = (index) => {
    const nuevosProductos = [...formData.productos];
    nuevosProductos.splice(index, 1);
    setFormData({ ...formData, productos: nuevosProductos });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/ventas", formData);
      alert("✅ Venta registrada");
      setFormData({
        productos: [],
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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-xl mx-auto mb-8">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">Registrar Venta</h2>

      {formData.productos.map((item, index) => (
        <div key={index} className="mb-4 border p-3 rounded bg-gray-100">
          <select
            value={item.productoId}
            onChange={(e) => handleProductoChange(index, "productoId", e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            required
          >
            <option value="">Seleccionar producto</option>
            {productos.map((p) => (
              <option key={p._id} value={p._id}>
                {p.nombre} — Stock: {p.stock}
              </option>
            ))}
          </select>

          <input
            type="number"
            min={1}
            value={item.cantidad}
            onChange={(e) => handleProductoChange(index, "cantidad", e.target.value)}
            className="w-full mb-2 p-2 border rounded"
            placeholder="Cantidad"
            required
          />

          <button type="button" onClick={() => quitarProducto(index)} className="text-red-600 text-sm">
            🗑 Quitar producto
          </button>
        </div>
      ))}

      <button type="button" onClick={agregarProducto} className="bg-blue-200 px-2 py-1 rounded mb-4">
        ➕ Agregar producto
      </button>

      <select name="cliente" value={formData.cliente} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required>
        <option value="">Seleccionar cliente</option>
        {clientes.map((c) => (
          <option key={c._id} value={c._id}>
            {c.nombre} {c.apellido}
          </option>
        ))}
      </select>

      <select name="vendedor" value={formData.vendedor} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required>
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

      <input
        type="text"
        name="sucursal"
        placeholder="Sucursal"
        value={formData.sucursal}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
        Guardar Venta
      </button>
    </form>
  );
};

export default FormularioVenta;
