import React from "react";
import FormularioVendedor from "../components/FormularioVendedor";

function Vendedores() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Alta de Vendedores</h2>
      <FormularioVendedor />
    </div>
  );
}

export default Vendedores;
