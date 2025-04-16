import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

/**
 * Modale affichant les détails d'une salle et son bâtiment associé.
 * @param {Object} props - Propriétés du composant.
 * @param {Object} props.salle - Données de la salle.
 * @param {Array} props.batiments - Liste des bâtiments pour associer la salle.
 * @param {Function} props.onClose - Fonction pour fermer la modale.
 */
function ModaleDetailsSalle({ salle, batiments, onClose }) {
  const batiment = batiments.find((b) => b.id === salle.buildingId);

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-bold text-indigo-500 mb-4">{salle.nom}</h2>
        {salle.images && salle.images.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {salle.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${salle.nom} ${index + 1}`}
                className="w-full h-40 object-cover rounded"
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
            Pas d'image
          </div>
        )}
        <div className="space-y-4">
          <p>
            <strong>Bâtiment:</strong>{" "}
            {batiment ? batiment.nom : "Aucun bâtiment associé"}
          </p>
          <p>
            <strong>Capacité:</strong> {salle.capacite || "Non spécifiée"}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {salle.description || "Aucune description"}
          </p>
          <p>
            <strong>Latitude:</strong> {salle.latitude || "Non spécifiée"}
          </p>
          <p>
            <strong>Longitude:</strong> {salle.longitude || "Non spécifiée"}
          </p>
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

export default ModaleDetailsSalle;