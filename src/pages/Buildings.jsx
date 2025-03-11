import React, { useState } from "react";
import BuildingList from "../components/BuildingList";
import BuildingForm from "../components/BuildingForm";
import { FaPlus } from "react-icons/fa";

/**
 * Page pour gérer les bâtiments avec barre de recherche et modals.
 */
function Buildings() {
  const [buildings, setBuildings] = useState([
    // Données simulées pour tester
    {
      id: 1,
      name: "Bâtiment A",
      description: "Bâtiment principal de sciences",
      latitude: 6.1725,
      longitude: 1.2133,
      imageUrl: "https://via.placeholder.com/300x150",
      rooms: ["Salle 101", "Salle 102"],
    },
    {
      id: 2,
      name: "Bâtiment B",
      description: "Bâtiment des arts",
      latitude: 6.1730,
      longitude: 1.2140,
      imageUrl: "https://via.placeholder.com/300x150",
      rooms: ["Salle 201"],
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState(null);

  const filteredBuildings = buildings.filter((building) =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBuilding = (newBuilding) => {
    // Placeholder pour Firebase: ajouter un bâtiment
    setBuildings((prev) => [...prev, { id: Date.now(), ...newBuilding }]);
    setShowAddModal(false);
  };

  const handleEditBuilding = (building) => {
    setEditingBuilding(building);
  };

  const handleUpdateBuilding = (updatedBuilding) => {
    // Placeholder pour Firebase: mettre à jour un bâtiment
    setBuildings((prev) =>
      prev.map((b) => (b.id === editingBuilding.id ? { ...b, ...updatedBuilding } : b))
    );
    setEditingBuilding(null);
  };

  const handleDeleteBuilding = (id) => {
    // Placeholder pour Firebase: supprimer un bâtiment
    setBuildings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Gestion des Bâtiments</h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Rechercher un bâtiment..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
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
    </div>
  );
}

export default Buildings;
