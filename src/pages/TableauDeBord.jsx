import React from "react";
import { Outlet } from "react-router-dom";
import BarreLaterale from "../components/BarreLaterale";

/**
 * Page principale du tableau de bord.
 * Inclut la barre latérale et un espace pour afficher les sous-pages.
 */
function TableauDeBord() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <BarreLaterale />
      
      {/* Contenu principal */}
      <div className="flex-1 lg:ml-72 transition-all duration-300">
        <div className="p-6 lg:p-8">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableauDeBord;
