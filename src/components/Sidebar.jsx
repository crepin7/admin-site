import React from "react";
import { NavLink } from "react-router-dom";
import { FaBuilding, FaDoorOpen, FaTools } from "react-icons/fa";

/**
 * Composant Sidebar pour la navigation avec thème indigo.
 */
function Sidebar() {
  return (
    <div className="w-64 h-screen bg-indigo-500 text-white p-4 fixed">
      <h2 className="text-2xl font-bold mb-6">Admin Campus</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/buildings"
              className={({ isActive }) =>
                isActive ? "flex items-center text-indigo-300" : "flex items-center hover:text-indigo-200"
              }
            >
              <FaBuilding className="mr-2" /> Bâtiments
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                isActive ? "flex items-center text-indigo-300" : "flex items-center hover:text-indigo-200"
              }
            >
              <FaDoorOpen className="mr-2" /> Salles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/other-infrastructures"
              className={({ isActive }) =>
                isActive ? "flex items-center text-indigo-300" : "flex items-center hover:text-indigo-200"
              }
            >
              <FaTools className="mr-2" /> Autres Infrastructures
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
