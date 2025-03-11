import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

/**
 * Page principale du dashboard.
 * Inclut la sidebar et un espace pour afficher les sous-pages.
 */
function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
