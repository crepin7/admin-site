import React from "react";
import { FaEdit, FaTrash, FaInfoCircle, FaExclamationTriangle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * Liste des bâtiments avec options d'édition, suppression, détails et pagination.
 * @param {Object} props - Propriétés du composant.
 * @param {Array} props.batiments - Liste des bâtiments à afficher.
 * @param {Function} props.onEdit - Fonction appelée pour éditer un bâtiment.
 * @param {Function} props.onDelete - Fonction appelée pour supprimer un bâtiment.
 * @param {Function} props.onShowDetails - Fonction appelée pour voir les détails.
 * @param {number} props.pageActuelle - Page actuelle.
 * @param {Function} props.setPageActuelle - Fonction pour changer la page actuelle.
 * @param {number} props.elementsParPage - Nombre d'éléments par page.
 */
function ListeBatiments({ batiments, onEdit, onDelete, onShowDetails, pageActuelle, setPageActuelle, elementsParPage }) {
  // Calculer les bâtiments à afficher pour la page actuelle
  const indexDebut = (pageActuelle - 1) * elementsParPage;
  const indexFin = indexDebut + elementsParPage;
  const batimentsPaginees = batiments.slice(indexDebut, indexFin);
  const totalPages = Math.ceil(batiments.length / elementsParPage);

  // Changer de page
  const changerPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPageActuelle(page);
    }
  };

  return (
    <div className="mt-6">
      {batiments.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 py-12">
          <FaExclamationTriangle className="text-5xl mb-4 text-yellow-400" />
          <p>Aucun bâtiment trouvé</p>
        </div>
      ) : (
        <>
          <div className="max-h-[calc(100vh-175px)] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {batimentsPaginees.map((batiment) => (
                <div
                  key={batiment.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {batiment.images && batiment.images.length > 0 ? (
                    <img
                      src={batiment.images[0]}
                      alt={batiment.nom}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-200 rounded-t-lg flex items-center justify-center text-gray-500">
                      Pas d'image
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-indigo-500">{batiment.nom}</h3>
                    <p className="text-gray-600 text-sm truncate">{batiment.description}</p>
                    <p className="text-gray-500 text-sm">Type: {batiment.type || "Non spécifié"}</p>
                    <p className="text-gray-500 text-sm">Situation: {batiment.situation}</p>
                    <div className="flex justify-end space-x-3 mt-3">
                      <button
                        onClick={() => onShowDetails(batiment)}
                        className="text-indigo-500 hover:text-indigo-700"
                        title="Détails"
                      >
                        <FaInfoCircle />
                      </button>
                      <button
                        onClick={() => onEdit(batiment)}
                        className="text-indigo-500 hover:text-indigo-700"
                        title="Modifier"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete(batiment.id)}
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

export default ListeBatiments;