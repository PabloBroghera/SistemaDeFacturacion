// src/routes/RouterApp.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Productos from "../pages/Productos";
import Ventas from "../pages/Ventas";

const RouterApp = () => {
  return (
    <Router>
      <nav className="bg-blue-700 text-white p-4 flex gap-4 justify-center">
        <Link to="/productos" className="hover:underline">Productos</Link>
        <Link to="/ventas" className="hover:underline">Ventas</Link>
      </nav>

      <Routes>
        <Route path="/productos" element={<Productos />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="*" element={<Productos />} />
      </Routes>
    </Router>
  );
};

export default RouterApp;
