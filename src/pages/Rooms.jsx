import React, { useState } from "react";
import { FaPlus, FaUserCircle, FaSearch } from "react-icons/fa";
import RoomList from "../components/RoomList";
import RoomForm from "../components/RoomForm";
import { useCampus } from "../context/CampusContext";

/**
 * Page pour gérer les salles avec recherche améliorée.
 */
function Rooms() {
  const { buildings, rooms, addRoom, updateRoom, deleteRoom } = useCampus();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const allRooms = buildings.flatMap((b) => b.rooms);
  const filteredRooms = allRooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddRoom = (newRoom) => {
    addRoom(newRoom);
    setShowAddModal(false);
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
  };

  const handleUpdateRoom = (updatedRoom) => {
    updateRoom({ ...updatedRoom, id: editingRoom.id });
    setEditingRoom(null);
  };

  const handleDeleteRoom = (id, buildingId) => {
    deleteRoom(id, buildingId);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-500">Gestion des Salles</h1>
        <FaUserCircle className="text-indigo-500 text-3xl" title="Administrateur" />
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-1/2">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une salle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-500 text-white p-2 rounded-lg flex items-center hover:bg-indigo-600"
        >
          <FaPlus className="mr-2" /> Ajouter une salle
        </button>
      </div>
      <RoomList
        rooms={filteredRooms}
        buildings={buildings}
        onEdit={handleEditRoom}
        onDelete={handleDeleteRoom}
      />
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
