import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Buildings from "./pages/Buildings";
import Rooms from "./pages/Rooms";
import OtherInfrastructures from "./pages/OtherInfrastructures";

/**
 * Composant principal de l'application.
 * Configure les routes pour le dashboard et les différentes sections.
 */
function App() {
  return (
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
  );
}

export default App;
