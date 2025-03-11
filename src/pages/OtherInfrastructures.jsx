import React, { useState } from "react";
import { FaPlus, FaUserCircle, FaSearch } from "react-icons/fa";
import InfrastructureList from "../components/InfrastructureList";
import InfrastructureForm from "../components/InfrastructureForm";
import InfrastructureDetailsModal from "../components/InfrastructureDetailsModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { useCampus } from "../context/CampusContext";

function OtherInfrastructures() {
  const { infrastructures, addInfrastructure, updateInfrastructure, deleteInfrastructure } = useCampus();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingInfrastructure, setEditingInfrastructure] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [infraToDelete, setInfraToDelete] = useState(null);

  const filteredInfrastructures = infrastructures.filter((infra) =>
    infra.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddInfrastructure = (newInfrastructure) => {
    addInfrastructure(newInfrastructure);
    setShowAddModal(false);
  };

  const handleEditInfrastructure = (infra) => {
    setEditingInfrastructure(infra);
  };

  const handleUpdateInfrastructure = (updatedInfrastructure) => {
    updateInfrastructure({ ...updatedInfrastructure, id: editingInfrastructure.id });
    setEditingInfrastructure(null);
  };

  const handleDeleteInfrastructure = (id) => {
    setInfraToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDeleteInfrastructure = () => {
    if (infraToDelete) {
      deleteInfrastructure(infraToDelete);
      setInfraToDelete(null);
    }
    setShowConfirmModal(false);
  };

  const handleShowDetails = (infra) => {
    setShowDetailsModal(infra);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-500">Gestion des Autres Infrastructures</h1>
        <FaUserCircle className="text-indigo-500 text-3xl" title="Administrateur" />
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une infrastructure..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-500 text-white p-2 rounded-lg flex items-center hover:bg-indigo-600"
        >
          <FaPlus className="mr-2" /> Ajouter une infrastructure
        </button>
      </div>
      <InfrastructureList
        infrastructures={filteredInfrastructures}
        onEdit={handleEditInfrastructure}
        onDelete={handleDeleteInfrastructure}
        onShowDetails={handleShowDetails}
      />
      {showAddModal && (
        <InfrastructureForm onSubmit={handleAddInfrastructure} onClose={() => setShowAddModal(false)} />
      )}
      {editingInfrastructure && (
        <InfrastructureForm
          onSubmit={handleUpdateInfrastructure}
          initialData={editingInfrastructure}
          onClose={() => setEditingInfrastructure(null)}
        />
      )}
      {showDetailsModal && (
        <InfrastructureDetailsModal
          infrastructure={showDetailsModal}
          onClose={() => setShowDetailsModal(null)}
        />
      )}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDeleteInfrastructure}
        message="Voulez-vous vraiment supprimer cette infrastructure ?"
      />
    </div>
  );
}

export default OtherInfrastructures;
