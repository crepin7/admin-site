import React from "react";
import { FaEdit, FaTrash, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";

/**
 * Composant pour afficher la liste des bâtiments sous forme de cartes.
 */
function BuildingList({ buildings, onEdit, onDelete, onShowDetails }) {
  return (
    <div className="mt-6">
      {buildings.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <FaExclamationTriangle className="text-4xl mb-2" />
          <p>Aucun bâtiment trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildings.map((building) => (
            <div
              key={building.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={building.imageUrl || "https://via.placeholder.com/300x150"}
                alt={building.name}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-indigo-500">{building.name}</h3>
                <p className="text-gray-600 text-sm truncate">{building.description}</p>
                <div className="flex justify-end space-x-3 mt-3">
                  <button
                    onClick={() => onShowDetails(building)}
                    className="text-indigo-500 hover:text-indigo-700"
                    title="Détails"
                  >
                    <FaInfoCircle />
                  </button>
                  <button
                    onClick={() => onEdit(building)}
                    className="text-indigo-500 hover:text-indigo-700"
                    title="Modifier"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(building.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Supprimer"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BuildingList;
