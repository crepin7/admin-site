import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { seConnecter } from "../services/AuthService";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaBuilding } from "react-icons/fa";

/**
 * Page de connexion pour les administrateurs.
 */
function Connexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
  const naviguer = useNavigate();

  /**
   * Gère la soumission du formulaire de connexion.
   * @param {Event} e - Événement de soumission.
   */
  const gererSoumission = async (e) => {
    e.preventDefault();
    setChargement(true);
    setErreur(null);
    
    try {
      await seConnecter(email, motDePasse);
      naviguer("/batiments");
    } catch (err) {
      setErreur("Email ou mot de passe incorrect");
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 relative overflow-hidden">
      {/* Particules animées en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-white rounded-full opacity-30 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full opacity-40 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full opacity-25 animate-pulse-slow" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="card-glass p-8 animate-scale-in">
          {/* En-tête */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <FaBuilding className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Administration</h1>
            <p className="text-blue-100 text-sm">Connectez-vous à votre tableau de bord</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={gererSoumission} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-100">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-blue-300 text-sm" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-modern pl-10 bg-white/90 backdrop-blur-sm border-blue-200 focus:border-blue-400"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-100">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-blue-300 text-sm" />
                </div>
                <input
                  type={afficherMotDePasse ? "text" : "password"}
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  className="input-modern pl-10 pr-10 bg-white/90 backdrop-blur-sm border-blue-200 focus:border-blue-400"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setAfficherMotDePasse(!afficherMotDePasse)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-600 transition-colors"
                >
                  {afficherMotDePasse ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            {erreur && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 animate-fade-in">
                <p className="text-red-200 text-sm text-center">{erreur}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={chargement}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {chargement ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connexion en cours...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-blue-200 text-xs">
              © 2025 Administration LocUL. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connexion;
