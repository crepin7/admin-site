import React from "react";
import { FaEdit, FaTrash, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";

function InfrastructureList({ infrastructures, onEdit, onDelete, onShowDetails }) {
  return (
    <div className="mt-6">
      {infrastructures.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-12">
          <FaExclamationTriangle className="text-5xl mb-4 text-yellow-400" />
          <p>Aucune infrastructure trouvée</p>
        </div>
      ) : (
        <div className="max-h-[calc(100vh-175px)] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infrastructures.map((infra) => (
              <div
                key={infra.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {infra.image ? (
                  <img
                    src={infra.image}
                    alt={infra.nom}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 rounded-t-lg flex items-center justify-center text-gray-500">
                    Pas d'image
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-indigo-500">{infra.nom}</h3>
                  <p className="text-gray-600 text-sm truncate">{infra.description}</p>
                  <p className="text-gray-500 text-sm">Type: {infra.type || "Non spécifié"}</p>
                  <p className="text-gray-500 text-sm">Situation: {infra.situation}</p>
                  <div className="flex justify-end space-x-3 mt-3">
                    <button
                      onClick={() => onShowDetails(infra)}
                      className="text-indigo-500 hover:text-indigo-700"
                      title="Détails"
                    >
                      <FaInfoCircle />
                    </button>
                    <button
                      onClick={() => onEdit(infra)}
                      className="text-indigo-500 hover:text-indigo-700"
                      title="Modifier"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDelete(infra.id)}
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
        </div>
      )}
    </div>
  );
}

export default InfrastructureList;
