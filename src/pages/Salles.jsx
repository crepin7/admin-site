import React, { useState } from "react";
import { FaPlus, FaUserCircle, FaSearch, FaFilter, FaChartBar, FaDoorOpen, FaBuilding } from "react-icons/fa";
import ListeSalles from "../components/ListeSalles";
import FormulaireSalle from "../components/FormulaireSalle";
import ModaleConfirmation from "../components/ModaleConfirmation";
import ModaleDetailsSalle from "../components/ModaleDetailsSalle";
import IndicateurChargement from "../components/IndicateurChargement";
import { utiliserCampus } from "../context/CampusContext";
import { toast } from "react-toastify";

/**
 * Page de gestion des salles.
 * Permet d'ajouter, modifier, supprimer, voir les détails des salles et trier par bâtiment avec pagination.
 */
function Salles() {
  const { batiments, salles, ajouterSalle, mettreAJourSalle, supprimerSalle, chargement } = utiliserCampus();
  const [recherche, setRecherche] = useState("");
  const [afficherModaleAjout, setAfficherModaleAjout] = useState(false);
  const [salleEnEdition, setSalleEnEdition] = useState(null);
  const [afficherModaleConfirmation, setAfficherModaleConfirmation] = useState(false);
  const [salleASupprimer, setSalleASupprimer] = useState(null);
  const [salleEnDetails, setSalleEnDetails] = useState(null);
  const [batimentFiltre, setBatimentFiltre] = useState("tous");
  const [pageActuelle, setPageActuelle] = useState(1);
  const elementsParPage = 6;

  // Filtrer les salles selon la recherche et le bâtiment sélectionné
  const sallesFiltrees = salles.filter((salle) => {
    const correspondRecherche = salle.nom.toLowerCase().includes(recherche.toLowerCase());
    const correspondBatiment = batimentFiltre === "tous" || salle.buildingId === batimentFiltre;
    return correspondRecherche && correspondBatiment;
  });

  // Statistiques
  const totalSalles = salles.length;
  const sallesOccupees = salles.filter(s => s.statut === "Occupée").length;
  const sallesDisponibles = salles.filter(s => s.statut === "Disponible").length;
  const sallesMaintenance = salles.filter(s => s.statut === "Maintenance").length;

  /**
   * Ajoute une nouvelle salle.
   * @param {Object} nouvelleSalle - Données de la nouvelle salle.
   */
  const gererAjoutSalle = async (nouvelleSalle) => {
    try {
      await ajouterSalle(nouvelleSalle);
      setAfficherModaleAjout(false);
      toast.success("Salle ajoutée avec succès !", { position: "top-right", autoClose: 3000 });
    } catch (erreur) {
      toast.error("Erreur lors de l'ajout de la salle.", { position: "top-right", autoClose: 3000 });
    }
  };

  /**
   * Prépare l'édition d'une salle.
   * @param {Object} salle - Salle à éditer.
   */
  const gererEditionSalle = (salle) => {
    setSalleEnEdition(salle);
  };

  /**
   * Affiche les détails d'une salle.
   * @param {Object} salle - Salle à afficher.
   */
  const gererDetailsSalle = (salle) => {
    setSalleEnDetails(salle);
  };

  /**
   * Met à jour une salle existante.
   * @param {Object} salleMiseAJour - Données mises à jour de la salle.
   */
  const gererMiseAJourSalle = async (salleMiseAJour) => {
    try {
      await mettreAJourSalle({ ...salleMiseAJour, id: salleEnEdition.id });
      setSalleEnEdition(null);
      toast.success("Salle modifiée avec succès !", { position: "top-right", autoClose: 3000 });
    } catch (erreur) {
      toast.error("Erreur lors de la modification de la salle.", { position: "top-right", autoClose: 3000 });
    }
  };

  /**
   * Prépare la suppression d'une salle.
   * @param {string} id - ID de la salle à supprimer.
   */
  const gererSuppressionSalle = (id) => {
    setSalleASupprimer(id);
    setAfficherModaleConfirmation(true);
  };

  /**
   * Confirme la suppression d'une salle.
   */
  const confirmerSuppressionSalle = async () => {
    if (salleASupprimer) {
      try {
        await supprimerSalle(salleASupprimer);
        setSalleASupprimer(null);
        setAfficherModaleConfirmation(false);
        toast.success("Salle supprimée avec succès !", { position: "top-right", autoClose: 3000 });
        // Revenir à la page précédente si la page actuelle devient vide
        const totalPages = Math.ceil((sallesFiltrees.length - 1) / elementsParPage);
        if (pageActuelle > totalPages && totalPages > 0) {
          setPageActuelle(totalPages);
        }
      } catch (erreur) {
        toast.error("Erreur lors de la suppression de la salle.", { position: "top-right", autoClose: 3000 });
      }
    }
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
            Gestion des Salles
          </h1>
          <p className="text-slate-600 mt-2">Administrez les salles de cours du campus</p>
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
            <FaPlus className="mr-2" /> Nouvelle Salle
          </button>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Salles</p>
              <p className="text-3xl font-bold text-slate-800">{totalSalles}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FaDoorOpen className="text-white text-xl" />
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
              placeholder="Rechercher une salle..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="input-modern pl-10"
            />
          </div>
          
          <div className="relative">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={batimentFiltre}
              onChange={(e) => setBatimentFiltre(e.target.value)}
              className="input-modern pl-10 appearance-none cursor-pointer"
            >
              <option value="tous">Tous les bâtiments</option>
              {batiments.map((batiment) => (
                <option key={batiment.id} value={batiment.id}>
                  {batiment.nom}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Liste des salles */}
      <ListeSalles
        salles={sallesFiltrees}
        batiments={batiments}
        onEdit={gererEditionSalle}
        onDelete={gererSuppressionSalle}
        onDetails={gererDetailsSalle}
        pageActuelle={pageActuelle}
        setPageActuelle={setPageActuelle}
        elementsParPage={elementsParPage}
      />

      {/* Modales */}
      {afficherModaleAjout && (
        <FormulaireSalle
          onSubmit={gererAjoutSalle}
          batiments={batiments}
          onClose={() => setAfficherModaleAjout(false)}
        />
      )}
      {salleEnEdition && (
        <FormulaireSalle
          onSubmit={gererMiseAJourSalle}
          initialData={salleEnEdition}
          batiments={batiments}
          onClose={() => setSalleEnEdition(null)}
        />
      )}
      {salleEnDetails && (
        <ModaleDetailsSalle
          salle={salleEnDetails}
          batiments={batiments}
          onClose={() => setSalleEnDetails(null)}
        />
      )}
      <ModaleConfirmation
        estOuverte={afficherModaleConfirmation}
        onClose={() => setAfficherModaleConfirmation(false)}
        onConfirm={confirmerSuppressionSalle}
        message="Voulez-vous vraiment supprimer cette salle ?"
      />
    </div>
  );
}

export default Salles;