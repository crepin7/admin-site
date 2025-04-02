import React, { useState } from "react";
import { FaPlus, FaUserCircle, FaSearch } from "react-icons/fa";
import InfrastructureList from "../components/InfrastructureList";
import InfrastructureForm from "../components/InfrastructureForm";
import InfrastructureDetailsModal from "../components/InfrastructureDetailsModal";
import ConfirmationModal from "../components/ConfirmationModal";
import Spinner from "../components/Spinner";
import { useCampus } from "../context/CampusContext";
import { toast } from "react-toastify";

function AutreInfrastructures() {
  const { infrastructures, addInfrastructure, updateInfrastructure, deleteInfrastructure, loading } = useCampus();
  const [searchQuery, setSearchQuery] = useState("");
  const [situationFilter, setSituationFilter] = useState("Tous"); // Nouveau filtre
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingInfrastructure, setEditingInfrastructure] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [infraToDelete, setInfraToDelete] = useState(null);

  const filteredInfrastructures = infrastructures
    .filter((infra) =>
      infra.nom.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((infra) =>
      situationFilter === "Tous" ? true : infra.situation === situationFilter
    );

  const handleAddInfrastructure = async (newInfrastructure) => {
    try {
      await addInfrastructure(newInfrastructure);
      setShowAddModal(false);
      toast.success("Infrastructure ajoutée avec succès !", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Erreur lors de l'ajout de l'infrastructure.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleEditInfrastructure = (infra) => {
    setEditingInfrastructure(infra);
  };

  const handleUpdateInfrastructure = async (updatedInfrastructure) => {
    try {
      await updateInfrastructure({ ...updatedInfrastructure, id: editingInfrastructure.id });
      setEditingInfrastructure(null);
      toast.success("Infrastructure modifiée avec succès !", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Erreur lors de la modification de l'infrastructure.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleDeleteInfrastructure = (id) => {
    setInfraToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDeleteInfrastructure = async () => {
    if (infraToDelete) {
      try {
        await deleteInfrastructure(infraToDelete);
        setInfraToDelete(null);
        setShowConfirmModal(false);
        toast.success("Infrastructure supprimée avec succès !", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Erreur lors de la suppression de l'infrastructure.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handleShowDetails = (infra) => {
    setShowDetailsModal(infra);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-500">Gestion des autres infrastructures</h1>
        <FaUserCircle className="text-indigo-500 text-3xl" title="Administrateur" />
      </div>
      <div className="flex justify-between items-center mb-6 space-x-4">
        <div className="relative w-1/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une infrastructure..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="w-1/3">
          <select
            value={situationFilter}
            onChange={(e) => setSituationFilter(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Tous">Tous</option>
            <option value="Campus nord">Campus nord</option>
            <option value="Campus sud">Campus sud</option>
          </select>
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

export default AutreInfrastructures;
