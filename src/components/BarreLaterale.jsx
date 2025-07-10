import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBuilding, FaDoorOpen, FaServer, FaSignOutAlt, FaBars, FaTimes, FaChartBar, FaCog } from "react-icons/fa";
import { seDeconnecter } from "../services/AuthService";

/**
 * Barre latérale de navigation pour le tableau de bord administrateur.
 */
function BarreLaterale() {
  const naviguer = useNavigate();
  const [menuOuvert, setMenuOuvert] = useState(false);

  /**
   * Gère la déconnexion de l'utilisateur.
   */
  const gererDeconnexion = async () => {
    try {
      await seDeconnecter();
      naviguer("/connexion");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const liensNavigation = [
    {
      to: "/batiments",
      icone: FaBuilding,
      label: "Bâtiments",
      description: "Gérer les bâtiments du campus"
    },
    {
      to: "/salles",
      icone: FaDoorOpen,
      label: "Salles",
      description: "Gérer les salles de cours"
    },
    {
      to: "/autres-infrastructures",
      icone: FaServer,
      label: "Infrastructures",
      description: "Autres équipements"
    }
  ];

  return (
    <>
      {/* Bouton menu mobile */}
      <button
        onClick={() => setMenuOuvert(!menuOuvert)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all duration-200"
      >
        {menuOuvert ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Overlay mobile */}
      {menuOuvert && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMenuOuvert(false)}
        />
      )}

      {/* Barre latérale */}
      <div className={`
        fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out
        ${menuOuvert ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-80 lg:w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
        border-r border-slate-700/50 shadow-2xl
      `}>
        <div className="flex flex-col h-full">
          {/* En-tête */}
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaChartBar className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Administration</h1>
                <p className="text-slate-400 text-sm">LocUL</p>
              </div>
            </div>
            
            {/* Statut en ligne */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-slate-300 text-sm">En ligne</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {liensNavigation.map((lien, index) => (
                <NavLink
                  key={lien.to}
                  to={lien.to}
                  className={({ isActive }) => `
                    group flex items-center p-4 rounded-xl transition-all duration-200 hover-lift
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                    }
                  `}
                  onClick={() => setMenuOuvert(false)}
                >
                  <div className={`
                    p-2 rounded-lg mr-3 transition-all duration-200
                    ${({ isActive }) => isActive 
                      ? 'bg-white/20' 
                      : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                    }
                  `}>
                    <lien.icone className="text-lg" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{lien.label}</div>
                    <div className="text-xs opacity-70">{lien.description}</div>
                  </div>
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-slate-700/50">

            {/* Déconnexion */}
            <button
              onClick={gererDeconnexion}
              className="w-full flex items-center p-3 rounded-xl text-slate-300 hover:bg-red-600/20 hover:text-red-300 hover:border-red-500/30 border border-transparent transition-all duration-200"
            >
              <div className="p-2 rounded-lg mr-3 bg-slate-700/50">
                <FaSignOutAlt className="text-lg" />
              </div>
              <span className="font-medium">Déconnexion</span>
            </button>

            {/* Version */}
            <div className="mt-4 text-center">
              <p className="text-slate-500 text-xs">v1.2.3</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BarreLaterale;
