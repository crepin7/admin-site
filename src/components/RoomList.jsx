import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

/**
 * Composant pour lister les salles.
 * Lié aux bâtiments (buildingId).
 */
function RoomList({ rooms, onEdit, onDelete }) {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">Liste des Salles</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Nom</th>
            <th className="p-2 text-left">Bâtiment</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} className="border-b">
              <td className="p-2">{room.name}</td>
              <td className="p-2">{room.buildingId}</td>
              <td className="p-2 flex space-x-2">
                <button onClick={() => onEdit(room)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(room.id)} className="text-red-500 hover:text-red-700">
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

export default RoomList;
