import React, { useEffect, useState } from "react";
import axios from "axios";

const HistorialVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [ventaAbierta, setVentaAbierta] = useState(null);

  const toggleDetalle = (id) => {
    setVentaAbierta(ventaAbierta === id ? null : id);
  };

  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const res = await axios.get("/api/ventas");
        setVentas(res.data);
      } catch (err) {
        console.error("❌ Error al obtener ventas:", err);
      } finally {
        setCargando(false);
      }
    };

    obtenerVentas();
  }, []);

  if (cargando) return <p>Cargando historial de ventas...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Historial de Ventas</h2>
      {ventas.length === 0 ? (
        <p className="text-gray-500">No hay ventas registradas.</p>
      ) : (
        <table className="w-full table-auto border border-collapse border-gray-400 text-sm">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Cliente</th>
              <th className="px-4 py-2">Vendedor</th>
              <th className="px-4 py-2">Sucursal</th>
              <th className="px-4 py-2">Moneda</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Detalle</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <React.Fragment key={venta._id}>
                <tr className="border-t text-center">
                  <td className="px-4 py-2">{new Date(venta.fecha).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{venta.cliente?.nombre || "-"}</td>
                  <td className="px-4 py-2">{venta.vendedor?.nombre || "-"}</td>
                  <td className="px-4 py-2">{venta.sucursal}</td>
                  <td className="px-4 py-2">{venta.moneda}</td>
                  <td className="px-4 py-2">{venta.total}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                      onClick={() => toggleDetalle(venta._id)}
                    >
                      {ventaAbierta === venta._id ? "Ocultar" : "Ver"}
                    </button>
                  </td>
                </tr>
                {ventaAbierta === venta._id && (
                  <tr>
                    <td colSpan="7" className="p-2 bg-gray-50">
                      <table className="w-full text-sm border border-gray-300 bg-white">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="p-2 text-left">Producto</th>
                            <th className="p-2 text-left">Cantidad</th>
                            <th className="p-2 text-left">Precio Unitario</th>
                            <th className="p-2 text-left">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {venta.productos.map((p, i) => (
                            <tr key={i} className="border-t text-sm text-center">
                              <td className="p-2">{p.nombre || p.producto || "-"}</td>
                              <td className="p-2">{p.cantidad}</td>
                              <td className="p-2">{p.precioUnitario}</td>
                              <td className="p-2">{p.subtotal}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistorialVentas;
