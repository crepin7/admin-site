import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

/**
 * Modale de confirmation pour les suppressions.
 * @param {Object} props - Propriétés du composant.
 * @param {boolean} props.estOuverte - Indique si la modale est ouverte.
 * @param {Function} props.onClose - Fonction pour fermer la modale.
 * @param {Function} props.onConfirm - Fonction pour confirmer l'action.
 * @param {string} props.message - Message à afficher dans la modale.
 */
function ModaleConfirmation({ estOuverte, onClose, onConfirm, message }) {
  if (!estOuverte) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="glass p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-red-200 animate-scale-in">
        <div className="flex flex-col items-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mb-3 shadow-lg">
            <FaExclamationTriangle className="text-white text-3xl" />
          </div>
          <h3 className="text-lg font-bold text-red-700 mb-2">Confirmation</h3>
        </div>
        <p className="text-white text-center mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="btn-danger"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModaleConfirmation;
