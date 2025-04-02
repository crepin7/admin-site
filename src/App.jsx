import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { utiliserAuth } from "./context/AuthContext";
import { FournisseurCampus } from "./context/CampusContext";
import { FournisseurAuth } from "./context/AuthContext";
import Batiments from "./pages/Batiments";
import Salles from "./pages/Salles";
import AutresInfrastructures from "./pages/AutresInfrastructures";
import Connexion from "./pages/Connexion";
import TableauDeBord from "./pages/TableauDeBord";
import IndicateurChargement from "./components/IndicateurChargement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Composant pour protéger les routes nécessitant une authentification.
 * @param {Object} props - Propriétés du composant.
 * @param {ReactNode} props.children - Contenu à protéger.
 * @returns {ReactNode} - Redirection ou contenu protégé.
 */
function RouteProtegee({ children }) {
  const { utilisateur, chargement } = utiliserAuth();

  if (chargement) return <IndicateurChargement />;
  if (!utilisateur) return <Navigate to="/connexion" />;
  return children;
}

/**
 * Composant principal de l'application.
 * Gère le routage et les fournisseurs de contexte.
 */
function App() {
  return (
    <Router>
      <FournisseurAuth>
        <Routes>
          <Route path="/connexion" element={<Connexion />} />
          <Route
            path="/"
            element={
              <RouteProtegee>
                <FournisseurCampus>
                  <TableauDeBord />
                </FournisseurCampus>
              </RouteProtegee>
            }
          >
            <Route path="batiments" element={<Batiments />} />
            <Route path="salles" element={<Salles />} />
            <Route path="autres-infrastructures" element={<AutresInfrastructures />} />
            <Route index element={<Navigate to="batiments" />} /> {/* Redirection par défaut */}
          </Route>
          <Route path="*" element={<Navigate to="/connexion" />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </FournisseurAuth>
    </Router>
  );
}

export default App;
