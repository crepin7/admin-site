import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { seConnecter } from "../services/AuthService";

/**
 * Page de connexion pour les administrateurs.
 */
function Connexion() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState(null);
  const naviguer = useNavigate();

  /**
   * Gère la soumission du formulaire de connexion.
   * @param {Event} e - Événement de soumission.
   */
  const gererSoumission = async (e) => {
    e.preventDefault();
    try {
      await seConnecter(email, motDePasse);
      naviguer("/batiments"); // Redirige vers la page des bâtiments après connexion
    } catch (err) {
      setErreur("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-500 mb-6 text-center">Connexion</h1>
        <form onSubmit={gererSoumission} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          {erreur && <p className="text-red-500 text-sm">{erreur}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Connexion;
