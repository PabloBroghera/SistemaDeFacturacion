import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-2 flex gap-4">
      <Link to="/" className="hover:underline">Inicio</Link>
      <Link to="/productos" className="hover:underline">Productos</Link>
      <Link to="/ventas" className="hover:underline">Ventas</Link>
      <Link to="/clientes" className="hover:underline">Clientes</Link>
      <Link to="/vendedores" className="hover:underline">Vendedores</Link>
    </nav>
  );
}

export default Navbar;
