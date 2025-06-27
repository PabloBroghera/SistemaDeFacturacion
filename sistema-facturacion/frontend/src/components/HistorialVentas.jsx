import React, { useEffect, useState } from "react";
import axios from "axios";

const HistorialVentas = () => {
  const [ventas, setVentas] = useState([]);

  const fetchVentas = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ventas");
      setVentas(res.data);
    } catch (err) {
      console.error("❌ Error al cargar ventas", err);
    }
  };

  const eliminarVenta = async (id) => {
    if (!window.confirm("¿Eliminar esta venta?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/ventas/${id}`);
      fetchVentas();
    } catch (err) {
      console.error("❌ Error al eliminar venta", err);
    }
  };

  useEffect(() => {
    fetchVentas();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Historial de Ventas</h2>

      {ventas.length === 0 ? (
        <p className="text-center text-gray-500">No hay ventas registradas.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Cliente</th>
              <th className="p-2 border">Vendedor</th>
              <th className="p-2 border">Productos</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Moneda</th>
              <th className="p-2 border">Sucursal</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta._id} className="text-center">
                <td className="p-2 border">{new Date(venta.fecha).toLocaleDateString()}</td>
                <td className="p-2 border">{venta.cliente?.nombre || "-"}</td>
                <td className="p-2 border">{venta.vendedor?.nombre || "-"}</td>
                <td className="p-2 border">
                  {venta.productos.map((p, i) => (
                    <div key={i}>{p.nombre} x {p.cantidad}</div>
                  ))}
                </td>
                <td className="p-2 border">{venta.total}</td>
                <td className="p-2 border">{venta.moneda}</td>
                <td className="p-2 border">{venta.sucursal}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => eliminarVenta(venta._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistorialVentas;
