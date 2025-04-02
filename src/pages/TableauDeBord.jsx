import React from "react";
import { Outlet } from "react-router-dom";
import BarreLaterale from "../components/BarreLaterale";

/**
 * Page principale du tableau de bord.
 * Inclut la barre latérale et un espace pour afficher les sous-pages.
 */
function TableauDeBord() {
  return (
    <div className="flex">
      <BarreLaterale />
      <div className="ml-64 flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default TableauDeBord;
