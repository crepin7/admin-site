import React, { useState } from "react";
import { FaPlus, FaUserCircle, FaSearch } from "react-icons/fa";
import BuildingList from "../components/BuildingList";
import BuildingForm from "../components/BuildingForm";
import BuildingDetailsModal from "../components/BuildingDetailsModal";
import { useCampus } from "../context/CampusContext";

/**
 * Page pour gérer les bâtiments avec recherche améliorée.
 */
function Buildings() {
  const { buildings, addBuilding, updateBuilding, deleteBuilding } = useCampus();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(null);

  const filteredBuildings = buildings.filter((building) =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBuilding = (newBuilding) => {
    addBuilding(newBuilding);
    setShowAddModal(false);
  };

  const handleEditBuilding = (building) => {
    setEditingBuilding(building);
  };

  const handleUpdateBuilding = (updatedBuilding) => {
    updateBuilding({ ...updatedBuilding, id: editingBuilding.id });
    setEditingBuilding(null);
  };

  const handleDeleteBuilding = (id) => {
    deleteBuilding(id);
  };

  const handleShowDetails = (building) => {
    setShowDetailsModal(building);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-500">Gestion des Bâtiments</h1>
        <FaUserCircle className="text-indigo-500 text-3xl" title="Administrateur" />
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un bâtiment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
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
        <BuildingDetailsModal building={showDetailsModal} onClose={() => setShowDetailsModal(null)} />
      )}
    </div>
  );
}

export default Buildings;
