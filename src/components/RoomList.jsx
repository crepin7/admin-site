import React from "react";
import { FaEdit, FaTrash, FaExclamationTriangle } from "react-icons/fa";

function RoomList({ rooms, buildings, onEdit, onDelete }) {
  return (
    <div className="mt-6">
      {rooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <FaExclamationTriangle className="text-4xl mb-2" />
          <p>Aucune salle trouvée</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rooms.map((room) => {
            const building = buildings.find((b) => b.id === room.buildingId);
            return (
              <div
                key={room.id}
                className="bg-white shadow-md rounded-lg p-4 flex items-start space-x-4"
              >
                {room.image ? (
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                    Pas d'image
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-indigo-500">{room.name}</h3>
                  <p className="text-sm text-gray-600">
                    Bâtiment: {building ? building.name : "Inconnu"}
                  </p>
                  <p className="text-sm text-gray-600">Capacité: {room.capacity}</p>
                  <p className="text-sm text-gray-600">Description: {room.description || "Aucune"}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => onEdit(room)}
                    className="text-indigo-500 hover:text-indigo-700"
                    title="Modifier"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(room.id, room.buildingId)}
                    className="text-red-500 hover:text-red-700"
                    title="Supprimer"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RoomList;
