import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

/**
 * Modale affichant les détails d'un bâtiment et ses salles associées.
 * @param {Object} props - Propriétés du composant.
 * @param {Object} props.batiment - Données du bâtiment.
 * @param {Array} props.salles - Liste des salles associées.
 * @param {Function} props.onClose - Fonction pour fermer la modale.
 */
function ModaleDetailsBatiment({ batiment, salles, onClose }) {
  // Filtrer les salles associées au bâtiment
  const sallesDuBatiment = salles.filter((salle) => salle.buildingId === batiment.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-bold text-indigo-500 mb-4">{batiment.nom}</h2>
        {batiment.image ? (
          <img
            src={batiment.image}
            alt={batiment.nom}
            className="w-full h-80 object-cover rounded mb-4"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-500">
            Pas d'image
          </div>
        )}
        <div className="space-y-4">
          <p><strong>Type:</strong> {batiment.type || "Non spécifié"}</p>
          <p><strong>Situation:</strong> {batiment.situation || "Non spécifiée"}</p>
          <p><strong>Description:</strong> {batiment.description || "Aucune description"}</p>
          <p><strong>Latitude:</strong> {batiment.latitude}</p>
          <p><strong>Longitude:</strong> {batiment.longitude}</p>
          <p><strong>Salles:</strong></p>
          {sallesDuBatiment.length === 0 ? (
            <div className="flex items-center text-gray-500">
              <FaExclamationTriangle className="mr-2" />
              Aucune salle
            </div>
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
              <ul className="space-y-3">
                {sallesDuBatiment.map((salle) => (
                  <li
                    key={salle.id}
                    className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-indigo-600">{salle.nom}</span>
                      <span className="text-sm text-gray-600 ml-2">
                        (Capacité: {salle.capacite})
                      </span>
                      <p className="text-sm text-gray-500">
                        {salle.description || "Aucune description"}
                      </p>
                    </div>
                    {salle.image && (
                      <img
                        src={salle.image}
                        alt={salle.nom}
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

export default ModaleDetailsBatiment;
