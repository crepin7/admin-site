import React, { useState } from "react";
import { FaPlus, FaUserCircle, FaSearch } from "react-icons/fa";
import ListeInfrastructures from "../components/ListeInfrastructures";
import FormulaireInfrastructure from "../components/FormulaireInfrastructure";
import ModaleDetailsInfrastructure from "../components/ModaleDetailsInfrastructure";
import ModaleConfirmation from "../components/ModaleConfirmation";
import IndicateurChargement from "../components/IndicateurChargement";
import { utiliserCampus } from "../context/CampusContext";
import { toast } from "react-toastify";

/**
 * Page de gestion des autres infrastructures.
 * Permet d'ajouter, modifier, supprimer et voir les détails des infrastructures.
 */
function AutresInfrastructures() {
  const { infrastructures, ajouterInfrastructure, mettreAJourInfrastructure, supprimerInfrastructure, chargement } = utiliserCampus();
  const [recherche, setRecherche] = useState("");
  const [filtreSituation, setFiltreSituation] = useState("Tous"); // Filtre par situation
  const [afficherModaleAjout, setAfficherModaleAjout] = useState(false);
  const [infrastructureEnEdition, setInfrastructureEnEdition] = useState(null);
  const [afficherModaleDetails, setAfficherModaleDetails] = useState(null);
  const [afficherModaleConfirmation, setAfficherModaleConfirmation] = useState(false);
  const [infrastructureASupprimer, setInfrastructureASupprimer] = useState(null);

  // Filtrer les infrastructures selon la recherche et la situation
  const infrastructuresFiltrees = infrastructures
    .filter((infra) => infra.nom.toLowerCase().includes(recherche.toLowerCase()))
    .filter((infra) => filtreSituation === "Tous" ? true : infra.situation === filtreSituation);

  /**
   * Ajoute une nouvelle infrastructure.
   * @param {Object} nouvelleInfrastructure - Données de la nouvelle infrastructure.
   */
  const gererAjoutInfrastructure = async (nouvelleInfrastructure) => {
    try {
      await ajouterInfrastructure(nouvelleInfrastructure);
      setAfficherModaleAjout(false);
      toast.success("Infrastructure ajoutée avec succès !", { position: "top-right", autoClose: 3000 });
    } catch (erreur) {
      toast.error("Erreur lors de l'ajout de l'infrastructure.", { position: "top-right", autoClose: 3000 });
    }
  };

  /**
   * Prépare l'édition d'une infrastructure.
   * @param {Object} infra - Infrastructure à éditer.
   */
  const gererEditionInfrastructure = (infra) => {
    setInfrastructureEnEdition(infra);
  };

  /**
   * Met à jour une infrastructure existante.
   * @param {Object} infrastructureMiseAJour - Données mises à jour de l'infrastructure.
   */
  const gererMiseAJourInfrastructure = async (infrastructureMiseAJour) => {
    try {
      await mettreAJourInfrastructure({ ...infrastructureMiseAJour, id: infrastructureEnEdition.id });
      setInfrastructureEnEdition(null);
      toast.success("Infrastructure modifiée avec succès !", { position: "top-right", autoClose: 3000 });
    } catch (erreur) {
      toast.error("Erreur lors de la modification de l'infrastructure.", { position: "top-right", autoClose: 3000 });
    }
  };

  /**
   * Prépare la suppression d'une infrastructure.
   * @param {string} id - ID de l'infrastructure à supprimer.
   */
  const gererSuppressionInfrastructure = (id) => {
    setInfrastructureASupprimer(id);
    setAfficherModaleConfirmation(true);
  };

  /**
   * Confirme la suppression d'une infrastructure.
   */
  const confirmerSuppressionInfrastructure = async () => {
    if (infrastructureASupprimer) {
      try {
        await supprimerInfrastructure(infrastructureASupprimer);
        setInfrastructureASupprimer(null);
        setAfficherModaleConfirmation(false);
        toast.success("Infrastructure supprimée avec succès !", { position: "top-right", autoClose: 3000 });
      } catch (erreur) {
        toast.error("Erreur lors de la suppression de l'infrastructure.", { position: "top-right", autoClose: 3000 });
      }
    }
  };

  /**
   * Affiche les détails d'une infrastructure.
   * @param {Object} infra - Infrastructure dont on veut voir les détails.
   */
  const gererAffichageDetails = (infra) => {
    setAfficherModaleDetails(infra);
  };

  if (chargement) {
    return <IndicateurChargement />;
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-500">Gestion des autres infrastructures</h1>
        <FaUserCircle className="text-indigo-500 text-3xl" title="Administrateur" />
      </div>
      <div className="flex justify-between items-center mb-6 space-x-4">
        <div className="relative w-1/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une infrastructure..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="w-1/3">
          <select
            value={filtreSituation}
            onChange={(e) => setFiltreSituation(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          <FaPlus className="mr-2" /> Ajouter une infrastructure
        </button>
      </div>
      <ListeInfrastructures
        infrastructures={infrastructuresFiltrees}
        onEdit={gererEditionInfrastructure}
        onDelete={gererSuppressionInfrastructure}
        onShowDetails={gererAffichageDetails}
      />
      {afficherModaleAjout && (
        <FormulaireInfrastructure onSubmit={gererAjoutInfrastructure} onClose={() => setAfficherModaleAjout(false)} />
      )}
      {infrastructureEnEdition && (
        <FormulaireInfrastructure
          onSubmit={gererMiseAJourInfrastructure}
          initialData={infrastructureEnEdition}
          onClose={() => setInfrastructureEnEdition(null)}
        />
      )}
      {afficherModaleDetails && (
        <ModaleDetailsInfrastructure
          infrastructure={afficherModaleDetails}
          onClose={() => setAfficherModaleDetails(null)}
        />
      )}
      <ModaleConfirmation
        estOuverte={afficherModaleConfirmation}
        onClose={() => setAfficherModaleConfirmation(false)}
        onConfirm={confirmerSuppressionInfrastructure}
        message="Voulez-vous vraiment supprimer cette infrastructure ?"
      />
    </div>
  );
}

export default AutresInfrastructures;
