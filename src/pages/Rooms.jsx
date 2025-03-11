import React, { useState } from "react";
import RoomList from "../components/RoomList";
import RoomForm from "../components/RoomForm";
import { FaPlus } from "react-icons/fa";

/**
 * Page pour gérer les salles avec thème indigo.
 */
function Rooms() {
  const [rooms, setRooms] = useState([
    { id: 1, name: "Salle 101", buildingId: 1 },
    { id: 2, name: "Salle 102", buildingId: 1 },
  ]);
  const buildings = [
    { id: 1, name: "Bâtiment A" },
    { id: 2, name: "Bâtiment B" },
  ]; // À synchroniser avec Buildings
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddRoom = (newRoom) => {
    setRooms((prev) => [...prev, { id: Date.now(), ...newRoom }]);
    setShowAddModal(false);
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
  };

  const handleUpdateRoom = (updatedRoom) => {
    setRooms((prev) => prev.map((r) => (r.id === editingRoom.id ? { ...r, ...updatedRoom } : r)));
    setEditingRoom(null);
  };

  const handleDeleteRoom = (id) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">Gestion des Salles</h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Rechercher une salle..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-500 text-white p-2 rounded-lg flex items-center hover:bg-indigo-600"
        >
          <FaPlus className="mr-2" /> Ajouter une salle
        </button>
      </div>
      <RoomList rooms={filteredRooms} onEdit={handleEditRoom} onDelete={handleDeleteRoom} />
      {showAddModal && (
        <RoomForm
          onSubmit={handleAddRoom}
          buildings={buildings}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {editingRoom && (
        <RoomForm
          onSubmit={handleUpdateRoom}
          initialData={editingRoom}
          buildings={buildings}
          onClose={() => setEditingRoom(null)}
        />
      )}
    </div>
  );
}

export default Rooms;
