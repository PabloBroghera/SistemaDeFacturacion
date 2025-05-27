import React from "react";
import FormularioCliente from "../components/FormularioCliente";

function Clientes() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Alta de Clientes</h2>
      <FormularioCliente />
    </div>
  );
}

export default Clientes;
