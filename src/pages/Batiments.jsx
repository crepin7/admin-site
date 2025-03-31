import React, { useState } from "react";
import { FaPlus, FaUserCircle, FaSearch } from "react-icons/fa";
import BuildingList from "../components/BatimentList";
import BuildingForm from "../components/BatimentForm";
import BuildingDetailsModal from "../components/BatimentDetailsModal";
import ConfirmationModal from "../components/ConfirmationModal";
import Spinner from "../components/Spinner";
import { useCampus } from "../context/CampusContext";
import { toast } from "react-toastify";

function Batiments() {
  const { buildings, rooms, addBuilding, updateBuilding, deleteBuilding, loading } = useCampus();
  const [searchQuery, setSearchQuery] = useState("");
  const [situationFilter, setSituationFilter] = useState("Tous"); // Nouveau filtre
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [buildingToDelete, setBuildingToDelete] = useState(null);

  const filteredBuildings = buildings
    .filter((building) =>
      building.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((building) =>
      situationFilter === "Tous" ? true : building.situation === situationFilter
    );

  const handleAddBuilding = async (newBuilding) => {
    try {
      await addBuilding(newBuilding);
      setShowAddModal(false);
      toast.success("Bâtiment ajouté avec succès !", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Erreur lors de l'ajout du bâtiment.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleEditBuilding = (building) => {
    setEditingBuilding(building);
  };

  const handleUpdateBuilding = async (updatedBuilding) => {
    try {
      await updateBuilding({ ...updatedBuilding, id: editingBuilding.id });
      setEditingBuilding(null);
      toast.success("Bâtiment modifié avec succès !", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Erreur lors de la modification du bâtiment.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleDeleteBuilding = (id) => {
    setBuildingToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDeleteBuilding = async () => {
    if (buildingToDelete) {
      try {
        await deleteBuilding(buildingToDelete);
        setBuildingToDelete(null);
        setShowConfirmModal(false);
        toast.success("Bâtiment supprimé avec succès !", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Erreur lors de la suppression du bâtiment.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handleShowDetails = (building) => {
    setShowDetailsModal(building);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-500">Gestion des bâtiments</h1>
        <FaUserCircle className="text-indigo-500 text-3xl" title="Administrateur" />
      </div>
      <div className="flex justify-between items-center mb-6 space-x-4">
        <div className="relative w-1/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un bâtiment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="w-1/3">
          <select
            value={situationFilter}
            onChange={(e) => setSituationFilter(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Tous">Tous les campus</option>
            <option value="Campus nord">Campus nord</option>
            <option value="Campus sud">Campus sud</option>
          </select>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-500 text-white p-2 rounded-lg flex items-center hover:bg-indigo-600"
        >
          <FaPlus className="mr-2" /> Ajouter un bâtiment
        </button>
      </div>
      <BuildingList
        buildings={filteredBuildings}
        onEdit={handleEditBuilding}
        onDelete={handleDeleteBuilding}
        onShowDetails={handleShowDetails}
      />
      {showAddModal && (
        <BuildingForm onSubmit={handleAddBuilding} onClose={() => setShowAddModal(false)} />
      )}
      {editingBuilding && (
        <BuildingForm
          onSubmit={handleUpdateBuilding}
          initialData={editingBuilding}
          onClose={() => setEditingBuilding(null)}
        />
      )}
      {showDetailsModal && (
        <BuildingDetailsModal
          building={showDetailsModal}
          rooms={rooms}
          onClose={() => setShowDetailsModal(null)}
        />
      )}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDeleteBuilding}
        message="Voulez-vous vraiment supprimer ce bâtiment et toutes ses salles associées ?"
      />
    </div>
  );
}

export default Batiments;
