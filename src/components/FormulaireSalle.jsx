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
    images: initialData.images || [],
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
   * Gère l'upload de plusieurs images.
   * @param {Event} e - Événement de changement de fichier.
   */
  const gererUploadImage = (e) => {
    const fichiers = Array.from(e.target.files);
    if (fichiers.length > 0) {
      const nouvellesImages = [];
      fichiers.forEach((fichier) => {
        const lecteur = new FileReader();
        lecteur.onloadend = () => {
          nouvellesImages.push(lecteur.result);
          if (nouvellesImages.length === fichiers.length) {
            setDonneesFormulaire((prev) => ({
              ...prev,
              images: [...prev.images, ...nouvellesImages],
            }));
          }
        };
        lecteur.readAsDataURL(fichier);
      });
    }
  };

  /**
   * Supprime une image du tableau images.
   * @param {number} index - Index de l'image à supprimer.
   */
  const supprimerImage = (index) => {
    setDonneesFormulaire((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
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
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
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
            <label className="block text-sm font-medium text-gray-700">Images</label>
            <input
              type="url"
              name="imageUrl"
              onChange={(e) =>
                setDonneesFormulaire((prev) => ({
                  ...prev,
                  images: [...prev.images, e.target.value].filter(Boolean),
                }))
              }
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Coller l'URL des images"
            />
            <p className="text-sm text-gray-500 mt-1">Ou importer des images :</p>
            <label className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg cursor-pointer hover:bg-indigo-600 transition-colors mt-1">
              <span>Choisir des fichiers</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={gererUploadImage}
                className="absolute opacity-0 w-0 h-0"
              />
            </label>
            {donneesFormulaire.images.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {donneesFormulaire.images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Prévisualisation ${index + 1}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      onClick={() => supprimerImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      title="Supprimer cette image"
                    >
                      <span className="text-xs">X</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
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
