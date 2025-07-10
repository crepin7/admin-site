import React from "react";
import { FaEdit, FaTrash, FaExclamationTriangle, FaInfoCircle, FaChevronLeft, FaChevronRight, FaDoorOpen, FaBuilding, FaUsers } from "react-icons/fa";

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
  const indexDebut = (pageActuelle - 1) * elementsParPage;
  const indexFin = indexDebut + elementsParPage;
  const sallesPaginees = salles.slice(indexDebut, indexFin);
  const totalPages = Math.ceil(salles.length / elementsParPage);

  const changerPage = (page) => {
    if (page >= 1 && page <= totalPages) setPageActuelle(page);
  };

  return (
    <div className="space-y-6">
      {salles.length === 0 ? (
        <div className="card p-12 text-center animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaExclamationTriangle className="text-white text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">Aucune salle trouvée</h3>
          <p className="text-slate-500">Ajoutez votre première salle</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sallesPaginees.map((salle, index) => {
              const batiment = batiments.find((b) => b.id === salle.buildingId);
              return (
                <div key={salle.id} className="card hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative h-32 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-xl">
                    {salle.images && salle.images.length > 0 ? (
                      <img src={salle.images[0]} alt={salle.nom} className="w-full h-full object-cover rounded-t-xl" />
                    ) : (
                      <FaDoorOpen className="text-4xl text-slate-300" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-1 flex items-center gap-2">
                      <FaDoorOpen className="text-blue-400" /> {salle.nom}
                    </h3>
                    <div className="flex items-center text-slate-500 text-xs mb-2">
                      <FaBuilding className="mr-1" />
                      {batiment ? batiment.nom : "Bâtiment inconnu"}
                    </div>
                    <div className="flex items-center text-slate-500 text-xs mb-2">
                      <FaUsers className="mr-1" /> Capacité : {salle.capacite}
                    </div>
                    <p className="text-slate-600 text-sm mb-2 line-clamp-2">{salle.description || "Aucune description"}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                      <span>Lat: {salle.latitude || "-"}</span>
                      <span>Lng: {salle.longitude || "-"}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button onClick={() => onDetails(salle)} className="btn-secondary text-xs px-3 py-2">
                        <FaInfoCircle className="mr-1" /> Détails
                      </button>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => onEdit(salle)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" title="Modifier">
                          <FaEdit />
                        </button>
                        <button onClick={() => onDelete(salle.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200" title="Supprimer">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button onClick={() => changerPage(pageActuelle - 1)} disabled={pageActuelle === 1} className={`p-3 rounded-xl transition-all duration-200 ${pageActuelle === 1 ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-white text-slate-600 hover:bg-slate-50 hover-lift"}`}>
                <FaChevronLeft />
              </button>
              {[...Array(totalPages).keys()].map((index) => (
                <button key={index + 1} onClick={() => changerPage(index + 1)} className={`px-4 py-3 rounded-xl transition-all duration-200 ${pageActuelle === index + 1 ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" : "bg-white text-slate-600 hover:bg-slate-50 hover-lift"}`}>
                  {index + 1}
                </button>
              ))}
              <button onClick={() => changerPage(pageActuelle + 1)} disabled={pageActuelle === totalPages} className={`p-3 rounded-xl transition-all duration-200 ${pageActuelle === totalPages ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-white text-slate-600 hover:bg-slate-50 hover-lift"}`}>
                <FaChevronRight />
              </button>
            </div>
          )}
          <div className="text-center text-slate-500 text-sm">
            Affichage de {indexDebut + 1} à {Math.min(indexFin, salles.length)} sur {salles.length} salles
          </div>
        </>
      )}
    </div>
  );
}

export default ListeSalles;