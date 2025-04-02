import React from "react";

/**
 * Modale affichant les détails d'une infrastructure.
 * @param {Object} props - Propriétés du composant.
 * @param {Object} props.infrastructure - Données de l'infrastructure.
 * @param {Function} props.onClose - Fonction pour fermer la modale.
 */
function ModaleDetailsInfrastructure({ infrastructure, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-bold text-indigo-500 mb-4">{infrastructure.nom}</h2>
        {infrastructure.image ? (
          <img
            src={infrastructure.image}
            alt={infrastructure.nom}
            className="w-full h-80 object-cover rounded mb-4"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
            Pas d'image
          </div>
        )}
        <div className="space-y-2">
          <p><strong>Type:</strong> {infrastructure.type || "Non spécifié"}</p>
          <p><strong>Situation:</strong> {infrastructure.situation || "Non spécifiée"}</p>
          <p><strong>Description:</strong> {infrastructure.description || "Aucune description"}</p>
          <p><strong>Latitude:</strong> {infrastructure.latitude}</p>
          <p><strong>Longitude:</strong> {infrastructure.longitude}</p>
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

export default ModaleDetailsInfrastructure;
