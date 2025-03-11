import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CampusProvider } from "./context/CampusContext";
import Dashboard from "./pages/Dashboard";
import Buildings from "./pages/Buildings";
import Rooms from "./pages/Rooms";
import OtherInfrastructures from "./pages/OtherInfrastructures";

/**
 * Composant principal avec le contexte CampusProvider.
 */
function App() {
  return (
    <CampusProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Buildings />} />
            <Route path="buildings" element={<Buildings />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="other-infrastructures" element={<OtherInfrastructures />} />
          </Route>
        </Routes>
      </Router>
    </CampusProvider>
  );
}

export default App;
