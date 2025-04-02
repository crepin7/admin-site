import React, { createContext, useState, useEffect, useContext } from "react";
import IndicateurChargement from "../components/IndicateurChargement";
import {
  ajouterBatiment,
  recupererBatiments,
  mettreAJourBatiment,
  supprimerBatiment,
  ajouterSalle,
  recupererSalles,
  mettreAJourSalle,
  supprimerSalle,
  ajouterInfrastructure,
  recupererInfrastructures,
  mettreAJourInfrastructure,
  supprimerInfrastructure,
} from "../services/FirebaseService";

// Création du contexte du campus
const ContexteCampus = createContext();

/**
 * Fournisseur de contexte pour gérer les données du campus (bâtiments, salles, infrastructures).
 * @param {Object} props - Propriétés du composant.
 * @param {ReactNode} props.children - Composants enfants à encapsuler.
 * @returns {ReactNode} - Fournisseur avec les valeurs du contexte.
 */
export function FournisseurCampus({ children }) {
  const [batiments, setBatiments] = useState([]);
  const [salles, setSalles] = useState([]);
  const [infrastructures, setInfrastructures] = useState([]);
  const [chargement, setChargement] = useState(true);

  // Charger les données initiales depuis Firestore
  useEffect(() => {
    const chargerDonnees = async () => {
      try {
        const donneesBatiments = await recupererBatiments();
        const donneesSalles = await recupererSalles();
        const donneesInfrastructures = await recupererInfrastructures();

        setBatiments(donneesBatiments);
        setSalles(donneesSalles);
        setInfrastructures(donneesInfrastructures);
      } catch (erreur) {
        console.error("Erreur lors du chargement des données:", erreur);
      } finally {
        setChargement(false);
      }
    };

    chargerDonnees();
  }, []);

  // === Fonctions CRUD synchronisées avec Firestore ===

  /**
   * Ajoute un nouveau bâtiment et met à jour l'état local.
   * @param {Object} nouveauBatiment - Données du nouveau bâtiment.
   */
  const gererAjoutBatiment = async (nouveauBatiment) => {
    const batimentAjoute = await ajouterBatiment(nouveauBatiment);
    setBatiments((prev) => [batimentAjoute, ...prev]);
  };

  /**
   * Met à jour un bâtiment existant et synchronise l'état local.
   * @param {Object} batimentMisAJour - Données mises à jour du bâtiment.
   */
  const gererMiseAJourBatiment = async (batimentMisAJour) => {
    const resultat = await mettreAJourBatiment(batimentMisAJour.id, batimentMisAJour);
    setBatiments((prev) =>
      prev.map((b) => (b.id === resultat.id ? resultat : b))
    );
  };

  /**
   * Supprime un bâtiment et ses salles associées, met à jour l'état local.
   * @param {string} id - ID du bâtiment à supprimer.
   */
  const gererSuppressionBatiment = async (id) => {
    await supprimerBatiment(id);
    setBatiments((prev) => prev.filter((b) => b.id !== id));
    setSalles((prev) => prev.filter((r) => r.buildingId !== id));
  };

  /**
   * Ajoute une nouvelle salle et met à jour l'état local.
   * @param {Object} nouvelleSalle - Données de la nouvelle salle.
   */
  const gererAjoutSalle = async (nouvelleSalle) => {
    const salleAjoutee = await ajouterSalle(nouvelleSalle);
    setSalles((prev) => [salleAjoutee, ...prev]);
  };

  /**
   * Met à jour une salle existante et synchronise l'état local.
   * @param {Object} salleMiseAJour - Données mises à jour de la salle.
   */
  const gererMiseAJourSalle = async (salleMiseAJour) => {
    const resultat = await mettreAJourSalle(salleMiseAJour.id, salleMiseAJour);
    setSalles((prev) => prev.map((r) => (r.id === resultat.id ? resultat : r)));
  };

  /**
   * Supprime une salle et met à jour l'état local.
   * @param {string} id - ID de la salle à supprimer.
   */
  const gererSuppressionSalle = async (id) => {
    await supprimerSalle(id);
    setSalles((prev) => prev.filter((r) => r.id !== id));
  };

  /**
   * Ajoute une nouvelle infrastructure et met à jour l'état local.
   * @param {Object} nouvelleInfrastructure - Données de la nouvelle infrastructure.
   */
  const gererAjoutInfrastructure = async (nouvelleInfrastructure) => {
    const infraAjoutee = await ajouterInfrastructure(nouvelleInfrastructure);
    setInfrastructures((prev) => [infraAjoutee, ...prev]);
  };

  /**
   * Met à jour une infrastructure existante et synchronise l'état local.
   * @param {Object} infrastructureMiseAJour - Données mises à jour de l'infrastructure.
   */
  const gererMiseAJourInfrastructure = async (infrastructureMiseAJour) => {
    const resultat = await mettreAJourInfrastructure(infrastructureMiseAJour.id, infrastructureMiseAJour);
    setInfrastructures((prev) =>
      prev.map((i) => (i.id === resultat.id ? resultat : i))
    );
  };

  /**
   * Supprime une infrastructure et met à jour l'état local.
   * @param {string} id - ID de l'infrastructure à supprimer.
   */
  const gererSuppressionInfrastructure = async (id) => {
    await supprimerInfrastructure(id);
    setInfrastructures((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <ContexteCampus.Provider
      value={{
        batiments,
        salles,
        infrastructures,
        ajouterBatiment: gererAjoutBatiment,
        mettreAJourBatiment: gererMiseAJourBatiment,
        supprimerBatiment: gererSuppressionBatiment,
        ajouterSalle: gererAjoutSalle,
        mettreAJourSalle: gererMiseAJourSalle,
        supprimerSalle: gererSuppressionSalle,
        ajouterInfrastructure: gererAjoutInfrastructure,
        mettreAJourInfrastructure: gererMiseAJourInfrastructure,
        supprimerInfrastructure: gererSuppressionInfrastructure,
        chargement,
      }}
    >
      {chargement ? <IndicateurChargement /> : children}
    </ContexteCampus.Provider>
  );
}

