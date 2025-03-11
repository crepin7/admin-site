import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

function BuildingDetailsModal({ building, rooms, onClose }) {
  const buildingRooms = rooms.filter((room) => room.buildingId === building.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-bold text-indigo-500 mb-4">{building.name}</h2>
        {building.image ? (
          <img
            src={building.image}
            alt={building.name}
            className="w-full h-40 object-cover rounded mb-4"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
            Pas d'image
          </div>
        )}
        <div className="space-y-4">
          <p><strong>Description:</strong> {building.description || "Aucune description"}</p>
          <p><strong>Latitude:</strong> {building.latitude}</p>
          <p><strong>Longitude:</strong> {building.longitude}</p>
          <p><strong>Salles:</strong></p>
          {buildingRooms.length === 0 ? (
            <div className="flex items-center text-gray-500">
              <FaExclamationTriangle className="mr-2" />
              Aucune salle
            </div>
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <ul className="space-y-3">
                {buildingRooms.map((room) => (
                  <li
                    key={room.id}
                    className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-indigo-600">{room.name}</span>
                      <span className="text-sm text-gray-600 ml-2">
                        (Capacité: {room.capacity})
                      </span>
                      <p className="text-sm text-gray-500">
                        {room.description || "Aucune description"}
                      </p>
                    </div>
                    {room.image && (
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-12 h-12 object-cover rounded-full ml-2"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 w-full"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

export default BuildingDetailsModal;
