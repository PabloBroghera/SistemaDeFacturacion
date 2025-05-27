import React, { useEffect, useState } from "react";
import axios from "axios";

function HistorialVentas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/ventas");
        setVentas(res.data);
      } catch (err) {
        console.error("Error al obtener historial de ventas:", err);
      }
    };
    fetchVentas();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Historial de Ventas</h2>
      {ventas.length === 0 ? (
        <p className="text-gray-500">No hay ventas registradas.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Producto</th>
              <th className="px-4 py-2">Cantidad</th>
              <th className="px-4 py-2">Moneda</th>
              <th className="px-4 py-2">Precio Unitario</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Sucursal</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta._id} className="border-t">
                <td className="px-4 py-2">{new Date(venta.fecha).toLocaleDateString()}</td>
                <td className="px-4 py-2">{venta.producto?.nombre || "—"}</td>
                <td className="px-4 py-2">{venta.cantidad}</td>
                <td className="px-4 py-2">{venta.moneda}</td>
                <td className="px-4 py-2">{venta.precioUnitario}</td>
                <td className="px-4 py-2">{venta.total}</td>
                <td className="px-4 py-2">{venta.sucursal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HistorialVentas;
