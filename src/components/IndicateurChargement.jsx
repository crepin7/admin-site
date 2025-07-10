import React from "react";
import { FaBuilding, FaSpinner } from "react-icons/fa";

/**
 * Composant d'indicateur de chargement animé.
 */
function IndicateurChargement() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="text-center animate-fade-in">
        {/* Logo animé */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl animate-pulse-slow">
            <FaBuilding className="text-white text-3xl" />
          </div>
          
          {/* Particules animées autour du logo */}
          <div className="absolute inset-0">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-75" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-indigo-400 rounded-full animate-ping opacity-75" style={{animationDelay: '1s'}}></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-75" style={{animationDelay: '1.5s'}}></div>
          </div>
        </div>

        {/* Spinner */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-slate-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Texte de chargement */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-700">Chargement en cours...</h3>
          <p className="text-slate-500 text-sm">Veuillez patienter pendant que nous préparons votre tableau de bord</p>
        </div>

        {/* Barre de progression animée */}
        <div className="mt-8 w-64 mx-auto">
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse-slow" style={{width: '60%'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndicateurChargement;
