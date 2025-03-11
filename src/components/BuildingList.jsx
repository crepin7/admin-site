import React, { useState } from "react";
import { FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";

/**
 * Composant pour afficher la liste des bâtiments sous forme de cartes.
 * Les détails s’affichent dans un modal.
 */
function BuildingList({ buildings, onEdit, onDelete, onShowDetails }) {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {buildings.map((building) => (
        <div
          key={building.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <img
            src={building.imageUrl || "https://via.placeholder.com/300x150"}
            alt={building.name}
            className="w-full h-32 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-indigo-500">{building.name}</h3>
            <p className="text-gray-600 text-sm">{building.description.slice(0, 50)}...</p>
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={() => onShowDetails(building)}
                className="text-indigo-500 hover:text-indigo-700"
              >
                <FaInfoCircle />
              </button>
              <button
                onClick={() => onEdit(building)}
                className="text-indigo-500 hover:text-indigo-700"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(building.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BuildingList;
