import React, { useState } from "react";
import BuildingList from "../components/BuildingList";
import BuildingForm from "../components/BuildingForm";
import { FaPlus, FaUserCircle } from "react-icons/fa";

/**
 * Page pour gérer les bâtiments avec barre de recherche, modals et icône utilisateur.
 */
function Buildings() {
  const [buildings, setBuildings] = useState([
    {
      id: 1,
      name: "Bâtiment A",
      description: "Bâtiment principal de sciences",
      latitude: 6.1725,
      longitude: 1.2133,
      imageUrl: "https://via.placeholder.com/300x150",
      rooms: [
        { name: "Salle 101", capacity: 50, description: "Salle de cours" },
        { name: "Salle 102", capacity: 30, description: "Salle de TD" },
      ],
    },
    {
      id: 2,
      name: "Bâtiment B",
      description: "Bâtiment des arts",
      latitude: 6.1730,
      longitude: 1.2140,
      imageUrl: "https://via.placeholder.com/300x150",
      rooms: [{ name: "Salle 201", capacity: 40, description: "Salle polyvalente" }],
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(null);

  const filteredBuildings = buildings.filter((building) =>
    building.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBuilding = (newBuilding) => {
    setBuildings((prev) => [...prev, { id: Date.now(), ...newBuilding }]);
    setShowAddModal(false);
  };

  const handleEditBuilding = (building) => {
    setEditingBuilding(building);
  };

  const handleUpdateBuilding = (updatedBuilding) => {
    setBuildings((prev) =>
      prev.map((b) => (b.id === editingBuilding.id ? { ...b, ...updatedBuilding } : b))
    );
    setEditingBuilding(null);
  };

  const handleDeleteBuilding = (id) => {
    setBuildings((prev) => prev.filter((b) => b.id !== id));
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
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-indigo-500 mb-4">{showDetailsModal.name}</h2>
            <img
              src={showDetailsModal.imageUrl || "https://via.placeholder.com/300x150"}
              alt={showDetailsModal.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <p><strong>Description:</strong> {showDetailsModal.description}</p>
            <p><strong>Latitude:</strong> {showDetailsModal.latitude}</p>
            <p><strong>Longitude:</strong> {showDetailsModal.longitude}</p>
            <p><strong>Salles:</strong></p>
            <ul className="list-disc pl-5 space-y-2">
              {showDetailsModal.rooms.map((room, index) => (
                <li key={index}>
                  {room.name} (Capacité: {room.capacity}) - {room.description}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowDetailsModal(null)}
              className="mt-4 bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 w-full"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Buildings;
