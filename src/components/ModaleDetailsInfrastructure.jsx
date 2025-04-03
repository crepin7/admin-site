import React from "react";

/**
 * Modale affichant les détails d'une infrastructure.
 * @param {Object} props - Propriétés du composant.
 * @param {Object} props.infrastructure - Données de l'infrastructure.
 * @param {Function} props.onClose - Fonction pour fermer la modale.
 */
function ModaleDetailsInfrastructure({ infrastructure, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-bold text-indigo-500 mb-4">{infrastructure.nom}</h2>

        {infrastructure.images && infrastructure.images.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {infrastructure.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${infrastructure.nom} ${index + 1}`}
                className="w-full h-40 object-cover rounded"
              />
            ))}
          </div>
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
