import React from "react";
import { FaEdit, FaTrash, FaExclamationTriangle, FaInfoCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * Liste des salles avec options de détails, d'édition, de suppression et pagination.
 * @param {Object} props - Propriétés du composant.
 * @param {Array} props.salles - Liste des salles à afficher.
 * @param {Array} props.batiments - Liste des bâtiments pour associer les salles.
 * @param {Function} props.onEdit - Fonction appelée pour éditer une salle.
 * @param {Function} props.onDelete - Fonction appelée pour supprimer une salle.
 * @param {Function} props.onDetails - Fonction appelée pour afficher les détails d'une salle.
 * @param {number} props.pageActuelle - Page actuelle.
 * @param {Function} props.setPageActuelle - Fonction pour changer la page actuelle.
 * @param {number} props.elementsParPage - Nombre d'éléments par page.
 */
function ListeSalles({ salles, batiments, onEdit, onDelete, onDetails, pageActuelle, setPageActuelle, elementsParPage }) {
  // Calculer les salles à afficher pour la page actuelle
  const indexDebut = (pageActuelle - 1) * elementsParPage;
  const indexFin = indexDebut + elementsParPage;
  const sallesPaginees = salles.slice(indexDebut, indexFin);
  const totalPages = Math.ceil(salles.length / elementsParPage);

  // Changer de page
  const changerPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPageActuelle(page);
    }
  };

  return (
    <div className="mt-6">
      {salles.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-12">
          <FaExclamationTriangle className="text-5xl mb-4 text-yellow-400" />
          <p className="text-lg font-medium">Aucune salle trouvée</p>
        </div>
      ) : (
        <>
          <div className="max-h-[calc(100vh-175px)] overflow-y-auto space-y-6 p-2">
            {sallesPaginees.map((salle) => {
              const batiment = batiments.find((b) => b.id === salle.buildingId);
              return (
                <div
                  key={salle.id}
                  className="bg-white shadow-sm rounded-xl p-5 flex items-center space-x-6 hover:shadow-md transition-shadow duration-200 border border-gray-100"
                >
                  {salle.images && salle.images.length > 0 ? (
                    <img
                      src={salle.images[0]}
                      alt={salle.nom}
                      className="w-28 h-28 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-28 h-28 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                      Pas d'image
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-indigo-600">{salle.nom}</h3>
                    <p className="text-sm text-gray-700 mt-1">
                      <span className="font-medium">Bâtiment:</span>{" "}
                      {batiment ? batiment.nom : "Inconnu"}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Capacité:</span> {salle.capacite}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Description:</span>{" "}
                      {salle.description || "Aucune"}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Latitude:</span>{" "}
                      {salle.latitude || "Non spécifiée"}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Longitude:</span>{" "}
                      {salle.longitude || "Non spécifiée"}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => onDetails(salle)}
                      className="text-indigo-500 hover:text-indigo-700 p-2 rounded-full hover:bg-indigo-100 transition-colors duration-200"
                      title="Détails"
                    >
                      <FaInfoCircle className="text-lg" />
                    </button>
                    <button
                      onClick={() => onEdit(salle)}
                      className="text-indigo-500 hover:text-indigo-700 p-2 rounded-full hover:bg-indigo-100 transition-colors duration-200"
                      title="Modifier"
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button
                      onClick={() => onDelete(salle.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors duration-200"
                      title="Supprimer"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                onClick={() => changerPage(pageActuelle - 1)}
                disabled={pageActuelle === 1}
                className={`p-2 rounded-lg ${
                  pageActuelle === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-500 text-white hover:bg-indigo-600"
                }`}
              >
                <FaChevronLeft />
              </button>
              {[...Array(totalPages).keys()].map((index) => (
                <button
                  key={index + 1}
                  onClick={() => changerPage(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    pageActuelle === index + 1
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => changerPage(pageActuelle + 1)}
                disabled={pageActuelle === totalPages}
                className={`p-2 rounded-lg ${
                  pageActuelle === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-500 text-white hover:bg-indigo-600"
                }`}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ListeSalles;