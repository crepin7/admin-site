import React, { useState } from "react";

function SalleForm({ onSubmit, initialData = {}, buildings, onClose }) {
  const [formData, setFormData] = useState({
    nom: initialData.nom || "",
    capacite: initialData.capacite || "",
    description: initialData.description || "",
    image: initialData.image || "",
    buildingId: initialData.buildingId || "", // Gardé comme string
  });

  const handleChange = (e) => {
    const { nom, value } = e.target;
    // Pas de conversion en entier pour buildingId, on garde la chaîne
    setFormData((prev) => ({ ...prev, [nom]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pas de parseInt, on soumet buildingId tel quel (string)
    const submittedData = {
      ...formData,
    };
    onSubmit(submittedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-bold text-indigo-500 mb-4">
          {initialData.id ? "Modifier la salle" : "Ajouter une salle"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacité</label>
            <input
              type="number"
              name="capacite"
              value={formData.capacite}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="url"
              name="image"
              value={formData.image.startsWith("data:") ? "" : formData.image}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="URL de l'image"
            />
            <p className="text-sm text-gray-500 mt-1">Ou importer une image :</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Prévisualisation"
                className="mt-2 w-24 h-24 object-cover rounded"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bâtiment</label>
            <select
              name="buildingId"
              value={formData.buildingId}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Sélectionner un bâtiment</option>
              {buildings.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.name}
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

export default SalleForm;