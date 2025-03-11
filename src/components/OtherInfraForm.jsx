import React, { useState } from "react";

/**
 * Formulaire pour ajouter ou modifier un bâtiment.
 * Placeholder pour l'intégration Firebase.
 */
function OtherIntraForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    latitude: initialData.latitude || "",
    longitude: initialData.longitude || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", latitude: "", longitude: "" }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nom</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Latitude</label>
        <input
          type="number"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          step="any"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Longitude</label>
        <input
          type="number"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          step="any"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        {initialData.id ? "Modifier" : "Ajouter"}
      </button>
    </form>
  );
}

export default OtherIntraForm;
