import React, { useState } from "react";

/**
 * Formulaire pour ajouter ou modifier un bâtiment.
 * Utilisé dans un modal personnalisé.
 */
function BuildingForm({ onSubmit, initialData = {}, onClose }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    latitude: initialData.latitude || "",
    longitude: initialData.longitude || "",
    imageUrl: initialData.imageUrl || "",
    rooms: initialData.rooms || [],
  });
  const [roomInput, setRoomInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRoom = () => {
    if (roomInput.trim()) {
      setFormData((prev) => ({ ...prev, rooms: [...prev.rooms, roomInput.trim()] }));
      setRoomInput("");
    }
  };

  const handleRemoveRoom = (index) => {
    setFormData((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-indigo-700 mb-4">
          {initialData.id ? "Modifier le bâtiment" : "Ajouter un bâtiment"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
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
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Latitude</label>
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
            <label className="block text-sm font-medium text-gray-700">Longitude</label>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">URL de l'image</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Salles</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={roomInput}
                onChange={(e) => setRoomInput(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Nom de la salle"
              />
              <button
                type="button"
                onClick={handleAddRoom}
                className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600"
              >
                +
              </button>
            </div>
            <ul className="mt-2 space-y-1">
              {formData.rooms.map((room, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                  {room}
                  <button
                    type="button"
                    onClick={() => handleRemoveRoom(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
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

export default BuildingForm;
