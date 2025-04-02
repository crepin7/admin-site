import React from "react";

/**
 * Composant d'indicateur de chargement animé.
 */
function IndicateurChargement() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default IndicateurChargement;
