import React, { useState } from "react";
import { FaPlus, FaUserCircle, FaSearch } from "react-icons/fa";
import ListeSalles from "../components/ListeSalles";
import FormulaireSalle from "../components/FormulaireSalle";
import ModaleConfirmation from "../components/ModaleConfirmation";
import ModaleDetailsSalle from "../components/ModaleDetailsSalle";
import IndicateurChargement from "../components/IndicateurChargement";
import { utiliserCampus } from "../context/CampusContext";
import { toast } from "react-toastify";

/**
 * Page de gestion des salles.
 * Permet d'ajouter, modifier, supprimer, voir les détails des salles et trier par bâtiment.
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

  // Filtrer les salles selon la recherche et le bâtiment sélectionné
  const sallesFiltrees = salles.filter((salle) => {
    const correspondRecherche = salle.nom.toLowerCase().includes(recherche.toLowerCase());
    const correspondBatiment = batimentFiltre === "tous" || salle.buildingId === batimentFiltre;
    return correspondRecherche && correspondBatiment;
  });

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
      } catch (erreur) {
        toast.error("Erreur lors de la suppression de la salle.", { position: "top-right", autoClose: 3000 });
      }
    }
  };

  if (chargement) {
    return <IndicateurChargement />;
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-500">Gestion des salles</h1>
        <FaUserCircle className="text-indigo-500 text-3xl" title="Administrateur" />
      </div>
      <div className="flex justify-between items-center mb-6 space-x-4">
        <div className="relative w-1/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une salle..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="w-1/3">
          <select
            value={batimentFiltre}
            onChange={(e) => setBatimentFiltre(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="tous">Tous les bâtiments</option>
            {batiments.map((batiment) => (
              <option key={batiment.id} value={batiment.id}>
                {batiment.nom}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setAfficherModaleAjout(true)}
          className="bg-indigo-500 text-white p-2 rounded-lg flex items-center hover:bg-indigo-600"
        >
          <FaPlus className="mr-2" /> Ajouter une salle
        </button>
      </div>
      <ListeSalles
        salles={sallesFiltrees}
        batiments={batiments}
        onEdit={gererEditionSalle}
        onDelete={gererSuppressionSalle}
        onDetails={gererDetailsSalle}
      />
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