// frontend/src/components/FormularioCliente.jsx
import React, { useState } from "react";
import axios from "axios";

function FormularioCliente() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    celular: "",
    mail: "",
    tipoCliente: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/clientes", formData);
      alert("✅ Cliente guardado");
      setFormData({
        nombre: "",
        apellido: "",
        dni: "",
        celular: "",
        email: "",
        tipo: ""
      });
    } catch (err) {
      console.error("❌ Error al guardar cliente", err);
      alert("❌ Error al guardar cliente");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">Alta de Cliente</h2>
      <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
      <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
      <input type="text" name="dni" placeholder="DNI (opcional)" value={formData.dni} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
      <input type="text" name="celular" placeholder="Celular" value={formData.celular} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
      <input type="email" name="mail" placeholder="Email" value={formData.mail} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
      <input type="text" name="tipoCliente" placeholder="Tipo de cliente" value={formData.tipoCliente} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">Guardar Cliente</button>
    </form>
  );
}

export default FormularioCliente;
