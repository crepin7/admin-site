import React, { useState } from "react";
import { FaPlus, FaUserCircle, FaSearch, FaFilter, FaChartBar, FaBuilding } from "react-icons/fa";
import ListeBatiments from "../components/ListeBatiments";
import FormulaireBatiment from "../components/FormulaireBatiment";
import ModaleDetailsBatiment from "../components/ModaleDetailsBatiment";
import ModaleConfirmation from "../components/ModaleConfirmation";
import IndicateurChargement from "../components/IndicateurChargement";
import { utiliserCampus } from "../context/CampusContext";
import { toast } from "react-toastify";

/**
 * Page de gestion des bâtiments.
 * Permet d'ajouter, modifier, supprimer et voir les détails des bâtiments avec pagination.
 */
function Batiments() {
  const { batiments, salles, ajouterBatiment, mettreAJourBatiment, supprimerBatiment, chargement } = utiliserCampus();
  const [recherche, setRecherche] = useState("");
  const [filtreSituation, setFiltreSituation] = useState("Tous");
  const [afficherModaleAjout, setAfficherModaleAjout] = useState(false);
  const [batimentEnEdition, setBatimentEnEdition] = useState(null);
  const [afficherModaleDetails, setAfficherModaleDetails] = useState(null);
  const [afficherModaleConfirmation, setAfficherModaleConfirmation] = useState(false);
  const [batimentASupprimer, setBatimentASupprimer] = useState(null);
  const [pageActuelle, setPageActuelle] = useState(1);
  const elementsParPage = 6;

  // Filtrer les bâtiments selon la recherche et la situation
  const batimentsFiltres = batiments
    .filter((batiment) => batiment.nom.toLowerCase().includes(recherche.toLowerCase()))
    .filter((batiment) => filtreSituation === "Tous" ? true : batiment.situation === filtreSituation);

  // Statistiques
  const totalBatiments = batiments.length;
  const totalSalles = salles.length;
  const batimentsNord = batiments.filter(b => b.situation === "Campus nord").length;
  const batimentsSud = batiments.filter(b => b.situation === "Campus sud").length;

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
        // Revenir à la page précédente si la page actuelle devient vide
        const totalPages = Math.ceil((batimentsFiltres.length - 1) / elementsParPage);
        if (pageActuelle > totalPages && totalPages > 0) {
          setPageActuelle(totalPages);
        }
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
    <div className="space-y-6 animate-fade-in">
      {/* En-tête avec statistiques */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            Gestion des Bâtiments
          </h1>
          <p className="text-slate-600 mt-2">Administrez les bâtiments du campus</p>
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
            <FaPlus className="mr-2" /> Nouveau Bâtiment
          </button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Bâtiments</p>
              <p className="text-3xl font-bold text-slate-800">{totalBatiments}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FaBuilding className="text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Campus Nord</p>
              <p className="text-3xl font-bold text-slate-800">{batimentsNord}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FaBuilding className="text-white text-xl" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Campus Sud</p>
              <p className="text-3xl font-bold text-slate-800">{batimentsSud}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <FaBuilding className="text-white text-xl" />
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
              placeholder="Rechercher un bâtiment..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="input-modern pl-10"
            />
          </div>
          
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={filtreSituation}
              onChange={(e) => setFiltreSituation(e.target.value)}
              className="input-modern pl-10 appearance-none cursor-pointer"
            >
              <option value="Tous">Tous les campus</option>
              <option value="Campus nord">Campus nord</option>
              <option value="Campus sud">Campus sud</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des bâtiments */}
      <ListeBatiments
        batiments={batimentsFiltres}
        onEdit={gererEditionBatiment}
        onDelete={gererSuppressionBatiment}
        onShowDetails={gererAffichageDetails}
        pageActuelle={pageActuelle}
        setPageActuelle={setPageActuelle}
        elementsParPage={elementsParPage}
      />

      {/* Modales */}
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