import React from "react";

const ListadoProductos = ({ productos }) => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-lg font-semibold mb-2">Listado de Productos</h2>
    {productos.length === 0 ? (
      <p>No hay productos cargados.</p>
    ) : (
      <ul className="divide-y divide-gray-300">
        {productos.map((p) => (
          <li key={p._id} className="py-2">
            <strong>{p.nombre}</strong> – {p.precio} {p.moneda} ({p.stock} en stock)
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default ListadoProductos;
