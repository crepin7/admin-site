import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

/**
 * Composant pour afficher la liste des bâtiments sous forme de cartes.
 * Chaque carte montre les détails et les salles associées.
 */
function BuildingList({ buildings, onEdit, onDelete }) {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {buildings.map((building) => (
        <div
          key={building.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => setSelectedBuilding(selectedBuilding?.id === building.id ? null : building)}
        >
          <img
            src={building.imageUrl || "https://via.placeholder.com/300x150"}
            alt={building.name}
            className="w-full h-32 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-indigo-700">{building.name}</h3>
            <p className="text-gray-600 text-sm">{building.description.slice(0, 50)}...</p>
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(building); }}
                className="text-indigo-500 hover:text-indigo-700"
              >
                <FaEdit />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(building.id); }}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
            {selectedBuilding?.id === building.id && (
              <div className="mt-4">
                <p><strong>Latitude:</strong> {building.latitude}</p>
                <p><strong>Longitude:</strong> {building.longitude}</p>
                <p><strong>Salles:</strong></p>
                <ul className="list-disc pl-5">
                  {building.rooms.map((room, index) => (
                    <li key={index} className="text-sm text-gray-700">{room}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BuildingList;
