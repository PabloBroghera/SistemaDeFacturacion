import React, { useState } from "react";
import axios from "axios";

const FormularioVendedor = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    rol: "empleado", // por defecto
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email) {
      alert("Nombre y email son obligatorios");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/vendedores", formData);
      alert("✅ Vendedor guardado correctamente");
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        rol: "empleado",
      });
    } catch (err) {
      console.error("❌ Error al guardar vendedor", err);
      alert("Error al guardar vendedor");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Alta de Vendedor</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="text"
        name="apellido"
        placeholder="Apellido"
        value={formData.apellido}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={formData.email}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        required
      />

      <select
        name="rol"
        value={formData.rol}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="empleado">Empleado</option>
        <option value="duenio">Dueño</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Guardar Vendedor
      </button>
    </form>
  );
};

export default FormularioVendedor;
