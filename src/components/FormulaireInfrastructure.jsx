import React, { useState } from "react";
import { FaServer, FaTimes, FaUpload } from "react-icons/fa";

/**
 * Formulaire pour ajouter ou modifier une infrastructure.
 * @param {Object} props - Propriétés du composant.
 * @param {Function} props.onSubmit - Fonction appelée lors de la soumission.
 * @param {Object} props.initialData - Données initiales pour l'édition.
 * @param {Function} props.onClose - Fonction pour fermer le formulaire.
 */
function FormulaireInfrastructure({ onSubmit, initialData = {}, onClose }) {
  const [donneesFormulaire, setDonneesFormulaire] = useState({
    nom: initialData.nom || "",
    description: initialData.description || "",
    latitude: initialData.latitude || "",
    longitude: initialData.longitude || "",
    images: initialData.images || [],
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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm animate-fade-in">
      <div className="glass p-8 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 text-xl focus:outline-none">
          <FaTimes />
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <FaServer className="text-white text-lg" />
          </div>
          <h2 className="text-xl font-bold text-blue-700">
            {initialData.id ? "Modifier l'infrastructure" : "Ajouter une infrastructure"}
          </h2>
        </div>
        <form onSubmit={gererSoumission} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Nom</label>
            <input type="text" name="nom" value={donneesFormulaire.nom} onChange={gererChangement} className="input-modern" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Type</label>
            <input type="text" name="type" value={donneesFormulaire.type} onChange={gererChangement} className="input-modern" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Situation</label>
            <select name="situation" value={donneesFormulaire.situation} onChange={gererChangement} className="input-modern" required>
              <option value="Campus nord">Campus nord</option>
              <option value="Campus sud">Campus sud</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Description</label>
            <textarea name="description" value={donneesFormulaire.description} onChange={gererChangement} className="input-modern" rows="3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Latitude</label>
              <input type="number" name="latitude" value={donneesFormulaire.latitude} onChange={gererChangement} className="input-modern" step="any" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Longitude</label>
              <input type="number" name="longitude" value={donneesFormulaire.longitude} onChange={gererChangement} className="input-modern" step="any" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Images</label>
            <div className="flex gap-2 mb-2">
              <label className="btn-secondary cursor-pointer">
                <FaUpload className="mr-2" /> Importer
                <input type="file" accept="image/*" multiple onChange={gererUploadImage} className="hidden" />
              </label>
              <input type="url" name="imageUrl" onChange={(e) => setDonneesFormulaire((prev) => ({ ...prev, images: [...prev.images, e.target.value].filter(Boolean), }))} className="input-modern" placeholder="Coller l'URL d'une image" />
            </div>
            {donneesFormulaire.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {donneesFormulaire.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img src={img} alt={`Prévisualisation ${index + 1}`} className="w-24 h-24 object-cover rounded shadow" />
                    <button type="button" onClick={() => supprimerImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors text-xs opacity-80 group-hover:opacity-100" title="Supprimer cette image">
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="btn-secondary">Annuler</button>
            <button type="submit" className="btn-primary">{initialData.id ? "Modifier" : "Ajouter"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormulaireInfrastructure;
