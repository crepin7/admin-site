import React, { useState } from "react";
import OtherInfraList from "../components/OtherInfraList";
import OtherInfraForm from "../components/OtherInfraForm";

/**
 * Page pour gérer les autres infrastructures.
 */
function OtherInfrastructures() {
  const [infras, setInfras] = useState([]); // Données simulées
  const [editingInfra, setEditingInfra] = useState(null);

  const handleAddInfra = (newInfra) => {
    setInfras((prev) => [...prev, { id: Date.now(), ...newInfra }]);
  };

  const handleEditInfra = (infra) => {
    setEditingInfra(infra);
  };

  const handleUpdateInfra = (updatedInfra) => {
    setInfras((prev) => prev.map((i) => (i.id === editingInfra.id ? { ...i, ...updatedInfra } : i)));
    setEditingInfra(null);
  };

  const handleDeleteInfra = (id) => {
    setInfras((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestion des Autres Infrastructures</h1>
      <OtherInfraForm onSubmit={editingInfra ? handleUpdateInfra : handleAddInfra} initialData={editingInfra || {}} />
      <OtherInfraList infras={infras} onEdit={handleEditInfra} onDelete={handleDeleteInfra} />
    </div>
  );
}

export default OtherInfrastructures;
