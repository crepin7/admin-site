import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

/**
 * Composant pour lister les bâtiments.
 * Permet de modifier ou supprimer un bâtiment.
 * Données simulées pour l'instant (à remplacer par Firebase).
 */
function OtherInfraList({ infras, onEdit, onDelete }) {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Liste des Bâtiments</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Nom</th>
            <th className="p-2 text-left">Latitude</th>
            <th className="p-2 text-left">Longitude</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {infras.map((building) => (
            <tr key={building.id} className="border-b">
              <td className="p-2">{building.name}</td>
              <td className="p-2">{building.latitude}</td>
              <td className="p-2">{building.longitude}</td>
              <td className="p-2 flex space-x-2">
                <button onClick={() => onEdit(building)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(building.id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OtherInfraList;
