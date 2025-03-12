import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { CampusProvider } from "./context/CampusContext";
import { AuthProvider } from "./context/AuthContext";
import Batiments from "./pages/Batiments";
import Salles from "./pages/Salles";
import AutreInfrastructures from "./pages/AutreInfrastructures";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Spinner from "./components/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" />;
  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <CampusProvider>
                  <Dashboard />
                </CampusProvider>
              </ProtectedRoute>
            }
          >
            <Route path="batiments" element={<Batiments />} />
            <Route path="salles" element={<Salles />} />
            <Route path="autre-infrastructures" element={<AutreInfrastructures />} />
            <Route index element={<Navigate to="batiments" />} /> {/* Redirection par défaut */}
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
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
      </AuthProvider>
    </Router>
  );
}

export default App;