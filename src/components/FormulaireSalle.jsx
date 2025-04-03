import React, { useState } from "react";

/**
 * Formulaire pour ajouter ou modifier une salle.
 * @param {Object} props - Propriétés du composant.
 * @param {Function} props.onSubmit - Fonction appelée lors de la soumission.
 * @param {Object} props.initialData - Données initiales pour l'édition.
 * @param {Array} props.batiments - Liste des bâtiments disponibles.
 * @param {Function} props.onClose - Fonction pour fermer le formulaire.
 */
function FormulaireSalle({ onSubmit, initialData = {}, batiments, onClose }) {
  const [donneesFormulaire, setDonneesFormulaire] = useState({
    nom: initialData.nom || "",
    capacite: initialData.capacite || "",
    description: initialData.description || "",
    image: initialData.image || "",
    buildingId: initialData.buildingId || "",
    latitude: initialData.latitude || "",
    longitude: initialData.longitude || "",
  });

  /**
   * Gère les changements dans les champs du formulaire.
   * @param {Event} e - Événement de changement.
   */
  const gererChangement = (e) => {
    const { name, value } = e.target;
    setDonneesFormulaire((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Gère l'upload d'une image.
   * @param {Event} e - Événement de changement de fichier.
   */
  const gererUploadImage = (e) => {
    const fichier = e.target.files[0];
    if (fichier) {
      const lecteur = new FileReader();
      lecteur.onloadend = () => {
        setDonneesFormulaire((prev) => ({ ...prev, image: lecteur.result }));
      };
      lecteur.readAsDataURL(fichier);
    }
  };

  /**
   * Gère la soumission du formulaire.
   * @param {Event} e - Événement de soumission.
   */
  const gererSoumission = (e) => {
    e.preventDefault();
    onSubmit(donneesFormulaire);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-bold text-indigo-500 mb-4">
          {initialData.id ? "Modifier la salle" : "Ajouter une salle"}
        </h2>
        <form onSubmit={gererSoumission} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="nom"
              value={donneesFormulaire.nom}
              onChange={gererChangement}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacité</label>
            <input
              type="number"
              name="capacite"
              value={donneesFormulaire.capacite}
              onChange={gererChangement}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={donneesFormulaire.description}
              onChange={gererChangement}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="url"
              name="image"
              value={donneesFormulaire.image.startsWith("data:") ? "" : donneesFormulaire.image}
              onChange={gererChangement}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="URL de l'image"
            />
            <p className="text-sm text-gray-500 mt-1">Ou importer une image :</p>
            <input
              type="file"
              accept="image/*"
              onChange={gererUploadImage}
              className="w-full p-2"
            />
            {donneesFormulaire.image && (
              <img
                src={donneesFormulaire.image}
                alt="Prévisualisation"
                className="mt-2 w-24 h-24 object-cover rounded"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Latitude</label>
            <input
              type="number"
              name="latitude"
              value={donneesFormulaire.latitude}
              onChange={gererChangement}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              step="any"
              placeholder="Optionnel"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Longitude</label>
            <input
              type="number"
              name="longitude"
              value={donneesFormulaire.longitude}
              onChange={gererChangement}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              step="any"
              placeholder="Optionnel"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bâtiment</label>
            <select
              name="buildingId"
              value={donneesFormulaire.buildingId}
              onChange={gererChangement}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Sélectionner un bâtiment</option>
              {batiments.map((batiment) => (
                <option key={batiment.id} value={batiment.id}>
                  {batiment.nom}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600"
            >
              {initialData.id ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormulaireSalle;
