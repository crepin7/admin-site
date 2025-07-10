import React from "react";
import { FaEdit, FaTrash, FaInfoCircle, FaExclamationTriangle, FaChevronLeft, FaChevronRight, FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

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

  // Obtenir la couleur du badge selon le campus
  const getCampusColor = (situation) => {
    switch (situation) {
      case "Campus nord":
        return "badge-info";
      case "Campus sud":
        return "badge-warning";
      default:
        return "badge-success";
    }
  };

  return (
    <div className="space-y-6">
      {batiments.length === 0 ? (
        <div className="card p-12 text-center animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaExclamationTriangle className="text-white text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Aucun bâtiment trouvé</h3>
          <p className="text-slate-500">Commencez par ajouter votre premier bâtiment</p>
        </div>
      ) : (
        <>
          {/* Grille des bâtiments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batimentsPaginees.map((batiment, index) => (
              <div
                key={batiment.id}
                className="card hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image du bâtiment */}
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  {batiment.images && batiment.images.length > 0 ? (
                    <img
                      src={batiment.images[0]}
                      alt={batiment.nom}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                      <FaBuilding className="text-slate-400 text-4xl" />
                    </div>
                  )}
                  
                  {/* Badge campus */}
                  <div className="absolute top-3 right-3">
                    <span className={`badge ${getCampusColor(batiment.situation)}`}>
                      {batiment.situation}
                    </span>
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">
                    {batiment.nom}
                  </h3>
                  
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {batiment.description || "Aucune description disponible"}
                  </p>

                  {/* Informations du bâtiment */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-slate-500 text-sm">
                      <FaBuilding className="mr-2 text-slate-400" />
                      <span>Type: {batiment.type || "Non spécifié"}</span>
                    </div>
                    <div className="flex items-center text-slate-500 text-sm">
                      <FaMapMarkerAlt className="mr-2 text-slate-400" />
                      <span>{batiment.situation}</span>
                    </div>
                    {batiment.dateConstruction && (
                      <div className="flex items-center text-slate-500 text-sm">
                        <FaCalendarAlt className="mr-2 text-slate-400" />
                        <span>Construit en {batiment.dateConstruction}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      onClick={() => onShowDetails(batiment)}
                      className="btn-secondary text-sm px-3 py-2"
                    >
                      <FaInfoCircle className="mr-1" />
                      Détails
                    </button>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEdit(batiment)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="Modifier"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete(batiment.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Supprimer"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => changerPage(pageActuelle - 1)}
                disabled={pageActuelle === 1}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  pageActuelle === 1
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-white text-slate-600 hover:bg-slate-50 hover-lift"
                }`}
              >
                <FaChevronLeft />
              </button>
              
              {[...Array(totalPages).keys()].map((index) => (
                <button
                  key={index + 1}
                  onClick={() => changerPage(index + 1)}
                  className={`px-4 py-3 rounded-xl transition-all duration-200 ${
                    pageActuelle === index + 1
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "bg-white text-slate-600 hover:bg-slate-50 hover-lift"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => changerPage(pageActuelle + 1)}
                disabled={pageActuelle === totalPages}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  pageActuelle === totalPages
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-white text-slate-600 hover:bg-slate-50 hover-lift"
                }`}
              >
                <FaChevronRight />
              </button>
            </div>
          )}

          {/* Informations de pagination */}
          <div className="text-center text-slate-500 text-sm">
            Affichage de {indexDebut + 1} à {Math.min(indexFin, batiments.length)} sur {batiments.length} bâtiments
          </div>
        </>
      )}
    </div>
  );
}

export default ListeBatiments;