import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBuilding, FaDoorOpen, FaTools, FaSignOutAlt } from "react-icons/fa";
import { seDeconnecter } from "../services/AuthService";

/**
 * Barre latérale de navigation pour le tableau de bord administrateur.
 */
function BarreLaterale() {
  const naviguer = useNavigate();

  /**
   * Gère la déconnexion de l'utilisateur.
   */
  const gererDeconnexion = async () => {
    await seDeconnecter();
    naviguer("/connexion");
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 fixed flex flex-col justify-between shadow-lg">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-indigo-400 tracking-wide">Tableau de bord Administrateur</h2>
        <nav>
          <ul className="space-y-3">
            <li>
              <NavLink
                to="/batiments"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-indigo-300"
                  }`
                }
              >
                <FaBuilding className="mr-3" /> Bâtiments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/salles"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-indigo-300"
                  }`
                }
              >
                <FaDoorOpen className="mr-3" /> Salles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/autres-infrastructures"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-indigo-300"
                  }`
                }
              >
                <FaTools className="mr-3" /> Autres Infrastructures
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <button
        onClick={gererDeconnexion}
        className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-200"
      >
        <FaSignOutAlt className="mr-3" /> Déconnexion
      </button>
    </div>
  );
}

export default BarreLaterale;
