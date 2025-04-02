import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import IndicateurChargement from "../components/IndicateurChargement";

// Création du contexte d'authentification
const ContexteAuth = createContext();

/**
 * Fournisseur de contexte pour gérer l'état d'authentification de l'utilisateur.
 * @param {Object} props - Propriétés du composant.
 * @param {ReactNode} props.children - Composants enfants à encapsuler.
 * @returns {ReactNode} - Fournisseur avec les valeurs du contexte.
 */
export function FournisseurAuth({ children }) {
  const [utilisateur, setUtilisateur] = useState(null);
  const [chargement, setChargement] = useState(true);

  // Écoute les changements d'état d'authentification
  useEffect(() => {
    const desinscription = onAuthStateChanged(auth, (utilisateurActuel) => {
      setUtilisateur(utilisateurActuel);
      setChargement(false);
    });
    // Nettoyage de l'écouteur lors du démontage
    return () => desinscription();
  }, []);

  return (
    <ContexteAuth.Provider value={{ utilisateur, chargement }}>
      {!chargement ? children : <IndicateurChargement />}
    </ContexteAuth.Provider>
  );
}

/**
 * Hook personnalisé pour accéder au contexte d'authentification.
 * @returns {Object} - Les valeurs du contexte (utilisateur, chargement).
 */
export const utiliserAuth = () => useContext(ContexteAuth);
