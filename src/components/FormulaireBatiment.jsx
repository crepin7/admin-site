import React, { useState } from "react";

/**
 * Formulaire pour ajouter ou modifier un bâtiment.
 * @param {Object} props - Propriétés du composant.
 * @param {Function} props.onSubmit - Fonction appelée lors de la soumission.
 * @param {Object} props.initialData - Données initiales pour l'édition.
 * @param {Function} props.onClose - Fonction pour fermer le formulaire.
 */
function FormulaireBatiment({ onSubmit, initialData = {}, onClose }) {
  const [donneesFormulaire, setDonneesFormulaire] = useState({
    nom: initialData.nom || "",
    description: initialData.description || "",
    latitude: initialData.latitude || "",
    longitude: initialData.longitude || "",
    image: initialData.image || "",
    type: initialData.type || "",
    situation: initialData.situation || "Campus nord",
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
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg relative z-50">
        <h2 className="text-xl font-bold text-indigo-500 mb-4">
          {initialData.id ? "Modifier le bâtiment" : "Ajouter un bâtiment"}
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
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              name="type"
              value={donneesFormulaire.type}
              onChange={gererChangement}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Situation</label>
            <select
              name="situation"
              value={donneesFormulaire.situation}
              onChange={gererChangement}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="Campus nord">Campus nord</option>
              <option value="Campus sud">Campus sud</option>
            </select>
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
            <label className="block text-sm font-medium text-gray-700">Latitude</label>
            <input
              type="number"
              name="latitude"
              value={donneesFormulaire.latitude}
              onChange={gererChangement}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              step="any"
              required
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
              required
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
            <label className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg cursor-pointer hover:bg-indigo-600 transition-colors mt-1">
              <span>Choisir un fichier</span>
              <input
              type="file"
              accept="image/*"
              onChange={gererUploadImage}
              className="absolute opacity-0 w-0 h-0"
            />
            </label>
            {donneesFormulaire.image && (
              <img
                src={donneesFormulaire.image}
                alt="Prévisualisation"
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
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

export default FormulaireBatiment;
