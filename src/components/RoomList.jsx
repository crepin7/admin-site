import React from "react";
import { FaEdit, FaTrash, FaExclamationTriangle } from "react-icons/fa";

/**
 * Composant pour lister les salles avec le nom du bâtiment.
 */
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
                className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-indigo-500">{room.name}</h3>
                  <p className="text-sm text-gray-600">
                    Bâtiment: {building ? building.name : "Inconnu"}
                  </p>
                  <p className="text-sm text-gray-600">Capacité: {room.capacity}</p>
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
