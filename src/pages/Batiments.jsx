import React, { useState } from "react";
import { FaPlus, FaUserCircle, FaSearch } from "react-icons/fa";
import ListeBatiments from "../components/ListeBatiments";
import FormulaireBatiment from "../components/FormulaireBatiment";
import ModaleDetailsBatiment from "../components/ModaleDetailsBatiment";
import ModaleConfirmation from "../components/ModaleConfirmation";
import IndicateurChargement from "../components/IndicateurChargement";
import { utiliserCampus } from "../context/CampusContext";
import { toast } from "react-toastify";

/**
 * Page de gestion des bâtiments.
 * Permet d'ajouter, modifier, supprimer et voir les détails des bâtiments.
 */
function Batiments() {
  const { batiments, salles, ajouterBatiment, mettreAJourBatiment, supprimerBatiment, chargement } = utiliserCampus();
  const [recherche, setRecherche] = useState("");
  const [filtreSituation, setFiltreSituation] = useState("Tous"); // Filtre par situation
  const [afficherModaleAjout, setAfficherModaleAjout] = useState(false);
  const [batimentEnEdition, setBatimentEnEdition] = useState(null);
  const [afficherModaleDetails, setAfficherModaleDetails] = useState(null);
  const [afficherModaleConfirmation, setAfficherModaleConfirmation] = useState(false);
  const [batimentASupprimer, setBatimentASupprimer] = useState(null);

  // Filtrer les bâtiments selon la recherche et la situation
  const batimentsFiltres = batiments
    .filter((batiment) => batiment.nom.toLowerCase().includes(recherche.toLowerCase()))
    .filter((batiment) => filtreSituation === "Tous" ? true : batiment.situation === filtreSituation);

  /**
   * Ajoute un nouveau bâtiment.
   * @param {Object} nouveauBatiment - Données du nouveau bâtiment.
   */
  const gererAjoutBatiment = async (nouveauBatiment) => {
    try {
      await ajouterBatiment(nouveauBatiment);
      setAfficherModaleAjout(false);
      toast.success("Bâtiment ajouté avec succès !", { position: "top-right", autoClose: 3000 });
    } catch (erreur) {
      toast.error("Erreur lors de l'ajout du bâtiment.", { position: "top-right", autoClose: 3000 });
    }
  };

  /**
   * Prépare l'édition d'un bâtiment.
   * @param {Object} batiment - Bâtiment à éditer.
   */
  const gererEditionBatiment = (batiment) => {
    setBatimentEnEdition(batiment);
  };

  /**
   * Met à jour un bâtiment existant.
   * @param {Object} batimentMisAJour - Données mises à jour du bâtiment.
   */
  const gererMiseAJourBatiment = async (batimentMisAJour) => {
    try {
      await mettreAJourBatiment({ ...batimentMisAJour, id: batimentEnEdition.id });
      setBatimentEnEdition(null);
      toast.success("Bâtiment modifié avec succès !", { position: "top-right", autoClose: 3000 });
    } catch (erreur) {
      toast.error("Erreur lors de la modification du bâtiment.", { position: "top-right", autoClose: 3000 });
    }
  };

  /**
   * Prépare la suppression d'un bâtiment.
   * @param {string} id - ID du bâtiment à supprimer.
   */
  const gererSuppressionBatiment = (id) => {
    setBatimentASupprimer(id);
    setAfficherModaleConfirmation(true);
  };

  /**
   * Confirme la suppression d'un bâtiment.
   */
  const confirmerSuppressionBatiment = async () => {
    if (batimentASupprimer) {
      try {
        await supprimerBatiment(batimentASupprimer);
        setBatimentASupprimer(null);
        setAfficherModaleConfirmation(false);
        toast.success("Bâtiment supprimé avec succès !", { position: "top-right", autoClose: 3000 });
      } catch (erreur) {
        toast.error("Erreur lors de la suppression du bâtiment.", { position: "top-right", autoClose: 3000 });
      }
    }
  };

  /**
   * Affiche les détails d'un bâtiment.
   * @param {Object} batiment - Bâtiment dont on veut voir les détails.
   */
  const gererAffichageDetails = (batiment) => {
    setAfficherModaleDetails(batiment);
  };

  if (chargement) {
    return <IndicateurChargement />;
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-500">Gestion des bâtiments</h1>
        <FaUserCircle className="text-indigo-500 text-3xl" title="Administrateur" />
      </div>
      <div className="flex justify-between items-center mb-6 space-x-4">
        <div className="relative w-1/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un bâtiment..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="w-1/3">
          <select
            value={filtreSituation}
            onChange={(e) => setFiltreSituation(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Tous">Tous</option>
            <option value="Campus nord">Campus nord</option>
            <option value="Campus sud">Campus sud</option>
          </select>
        </div>
        <button
          onClick={() => setAfficherModaleAjout(true)}
          className="bg-indigo-500 text-white p-2 rounded-lg flex items-center hover:bg-indigo-600"
        >
          <FaPlus className="mr-2" /> Ajouter un bâtiment
        </button>
      </div>
      <ListeBatiments
        batiments={batimentsFiltres}
        onEdit={gererEditionBatiment}
        onDelete={gererSuppressionBatiment}
        onShowDetails={gererAffichageDetails}
      />
      {afficherModaleAjout && (
        <FormulaireBatiment onSubmit={gererAjoutBatiment} onClose={() => setAfficherModaleAjout(false)} />
      )}
      {batimentEnEdition && (
        <FormulaireBatiment
          onSubmit={gererMiseAJourBatiment}
          initialData={batimentEnEdition}
          onClose={() => setBatimentEnEdition(null)}
        />
      )}
      {afficherModaleDetails && (
        <ModaleDetailsBatiment
          batiment={afficherModaleDetails}
          salles={salles}
          onClose={() => setAfficherModaleDetails(null)}
        />
      )}
      <ModaleConfirmation
        estOuverte={afficherModaleConfirmation}
        onClose={() => setAfficherModaleConfirmation(false)}
        onConfirm={confirmerSuppressionBatiment}
        message="Voulez-vous vraiment supprimer ce bâtiment et toutes ses salles associées ?"
      />
    </div>
  );
}

export default Batiments;
