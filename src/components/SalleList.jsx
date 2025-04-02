import React from "react";
import { FaEdit, FaTrash, FaExclamationTriangle } from "react-icons/fa";

function SalleList({ rooms, buildings, onEdit, onDelete }) {
  return (
    <div className="mt-6">
      {rooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-12">
          <FaExclamationTriangle className="text-5xl mb-4 text-yellow-400" />
          <p className="text-lg font-medium">Aucune salle trouvée</p>
        </div>
      ) : (
        <div className="max-h-[calc(100vh-175px)] overflow-y-auto space-y-6 p-2">
          {rooms.map((room) => {
            const building = buildings.find((b) => b.id === room.buildingId);
            return (
              <div
                key={room.id}
                className="bg-white shadow-sm rounded-xl p-5 flex items-center space-x-6 hover:shadow-md transition-shadow duration-200 border border-gray-100"
              >
                {room.image ? (
                  <img
                    src={room.image}
                    alt={room.nom}
                    className="w-28 h-28 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                    Pas d'image
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-indigo-600">{room.nom}</h3>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-medium">Bâtiment:</span>{" "}
                    {building ? building.nom : "Inconnu"}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Capacité:</span> {room.capacite}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Description:</span>{" "}
                    {room.description || "Aucune"}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => onEdit(room)}
                    className="text-indigo-500 hover:text-indigo-700 p-2 rounded-full hover:bg-indigo-100 transition-colors duration-200"
                    title="Modifier"
                  >
                    <FaEdit className="text-lg" />
                  </button>
                  <button
                    onClick={() => onDelete(room.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors duration-200"
                    title="Supprimer"
                  >
                    <FaTrash className="text-lg" />
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

export default SalleList;