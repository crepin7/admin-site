import React, { useState } from "react";
import { FaPlus, FaUserCircle, FaSearch, FaFilter, FaChartBar, FaServer } from "react-icons/fa";
import ListeInfrastructures from "../components/ListeInfrastructures";
import FormulaireInfrastructure from "../components/FormulaireInfrastructure";
import ModaleDetailsInfrastructure from "../components/ModaleDetailsInfrastructure";
import ModaleConfirmation from "../components/ModaleConfirmation";
import IndicateurChargement from "../components/IndicateurChargement";
import { utiliserCampus } from "../context/CampusContext";
import { toast } from "react-toastify";

/**
 * Page de gestion des autres infrastructures.
 * Permet d'ajouter, modifier, supprimer et voir les détails des infrastructures avec pagination.
 */
function AutresInfrastructures() {
  const { infrastructures, ajouterInfrastructure, mettreAJourInfrastructure, supprimerInfrastructure, chargement } = utiliserCampus();
  const [recherche, setRecherche] = useState("");
  const [filtreSituation, setFiltreSituation] = useState("Tous");
  const [afficherModaleAjout, setAfficherModaleAjout] = useState(false);
  const [infrastructureEnEdition, setInfrastructureEnEdition] = useState(null);
  const [afficherModaleDetails, setAfficherModaleDetails] = useState(null);
  const [afficherModaleConfirmation, setAfficherModaleConfirmation] = useState(false);
  const [infrastructureASupprimer, setInfrastructureASupprimer] = useState(null);
  const [pageActuelle, setPageActuelle] = useState(1);
  const elementsParPage = 6;

  // Filtrer les infrastructures selon la recherche et la situation
  const infrastructuresFiltrees = infrastructures
    .filter((infra) => infra.nom.toLowerCase().includes(recherche.toLowerCase()))
    .filter((infra) => filtreSituation === "Tous" ? true : infra.situation === filtreSituation);

  // Statistiques
  const totalInfrastructures = infrastructures.length;
  const infrastructuresNord = infrastructures.filter(i => i.situation === "Campus nord").length;
  const infrastructuresSud = infrastructures.filter(i => i.situation === "Campus sud").length;
  const infrastructuresActives = infrastructures.filter(i => i.statut === "Actif").length;

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
        // Revenir à la page précédente si la page actuelle devient vide
        const totalPages = Math.ceil((infrastructuresFiltrees.length - 1) / elementsParPage);
        if (pageActuelle > totalPages && totalPages > 0) {
          setPageActuelle(totalPages);
        }
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
    <div className="space-y-6 animate-fade-in">
      {/* En-tête avec statistiques */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            Gestion des Infrastructures
          </h1>
          <p className="text-slate-600 mt-2">Administrez les équipements et autres infrastructures du campus</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-2 text-slate-600">
            <FaUserCircle className="text-2xl text-blue-500" />
            <span className="font-medium">Administrateur</span>
          </div>
          <button
            onClick={() => setAfficherModaleAjout(true)}
            className="btn-primary"
          >
            <FaPlus className="mr-2" /> Nouvelle Infrastructure
          </button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Infrastructures</p>
              <p className="text-3xl font-bold text-slate-800">{totalInfrastructures}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FaServer className="text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Campus Nord</p>
              <p className="text-3xl font-bold text-slate-800">{infrastructuresNord}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FaServer className="text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Campus Sud</p>
              <p className="text-3xl font-bold text-slate-800">{infrastructuresSud}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <FaServer className="text-white text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher une infrastructure..."
              value={recherche}
              onChange={(e) => {
                setRecherche(e.target.value);
                setPageActuelle(1);
              }}
              className="input-modern pl-10"
            />
          </div>
          
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={filtreSituation}
              onChange={(e) => {
                setFiltreSituation(e.target.value);
                setPageActuelle(1);
              }}
              className="input-modern pl-10 appearance-none cursor-pointer"
            >
              <option value="Tous">Tout le campus</option>
              <option value="Campus nord">Campus nord</option>
              <option value="Campus sud">Campus sud</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des infrastructures */}
      <ListeInfrastructures
        infrastructures={infrastructuresFiltrees}
        onEdit={gererEditionInfrastructure}
        onDelete={gererSuppressionInfrastructure}
        onShowDetails={gererAffichageDetails}
        pageActuelle={pageActuelle}
        setPageActuelle={setPageActuelle}
        elementsParPage={elementsParPage}
      />

      {/* Modales */}
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