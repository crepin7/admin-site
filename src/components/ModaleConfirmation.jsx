import React from "react";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirmation</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModaleConfirmation;
