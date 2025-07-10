import React from "react";
import { FaExclamationTriangle, FaBuilding, FaDoorOpen, FaUsers } from "react-icons/fa";

/**
 * Modale affichant les détails d'un bâtiment et ses salles associées.
 * @param {Object} props - Propriétés du composant.
 * @param {Object} props.batiment - Données du bâtiment.
 * @param {Array} props.salles - Liste des salles associées.
 * @param {Function} props.onClose - Fonction pour fermer la modale.
 */
function ModaleDetailsBatiment({ batiment, salles, onClose }) {
  const sallesDuBatiment = salles.filter((salle) => salle.buildingId === batiment.id);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="glass p-8 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Images */}
          <div className="flex-1 flex flex-col gap-2">
            {batiment.images && batiment.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {batiment.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${batiment.nom} ${index + 1}`}
                    className="w-full h-32 object-cover rounded-xl shadow"
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-32 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center text-slate-400">
                <FaBuilding className="text-4xl" />
              </div>
            )}
          </div>
          {/* Infos */}
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">
              <FaBuilding /> {batiment.nom}
            </h2>
            <div className="text-white text-sm mb-2">{batiment.description || "Aucune description"}</div>
            <div className="flex items-center gap-2 text-xs text-white">
              <span>Type: {batiment.type || "Non spécifié"}</span>
              <span>Situation: {batiment.situation || "Non spécifiée"}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Lat: {batiment.latitude || "-"}</span>
              <span>Lng: {batiment.longitude || "-"}</span>
            </div>
          </div>
        </div>
        {/* Salles associées */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-slate-700 mb-2 flex items-center gap-2">
            <FaDoorOpen /> Salles associées
          </h3>
          {sallesDuBatiment.length === 0 ? (
            <div className="flex items-center text-slate-400">
              <FaExclamationTriangle className="mr-2" />
              Aucune salle
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sallesDuBatiment.map((salle) => (
                <div key={salle.id} className="bg-white/80 rounded-xl p-4 flex items-center gap-4 shadow hover-lift">
                  <div className="flex-1">
                    <div className="font-semibold text-blue-700 flex items-center gap-2">
                      <FaDoorOpen /> {salle.nom}
                    </div>
                    <div className="text-xs text-slate-500 mb-1">Capacité : {salle.capacite}</div>
                    <div className="text-xs text-slate-400 mb-1">{salle.description || "Aucune description"}</div>
                  </div>
                  {salle.image && (
                    <img src={salle.image} alt={salle.nom} className="w-12 h-12 object-cover rounded-full ml-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-8 btn-primary w-full justify-center"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

export default ModaleDetailsBatiment;
