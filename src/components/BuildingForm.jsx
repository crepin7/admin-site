import React, { useState } from "react";

/**
 * Formulaire pour ajouter ou modifier un bâtiment avec importation d'image.
 */
function BuildingForm({ onSubmit, initialData = {}, onClose }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    latitude: initialData.latitude || "",
    longitude: initialData.longitude || "",
    image: initialData.image || "", // URL ou base64
    rooms: initialData.rooms || [],
  });
  const [roomInput, setRoomInput] = useState({
    name: "",
    capacity: "",
    description: "",
    image: "", // URL ou base64
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setRoomInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoomImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRoomInput((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddRoom = () => {
    if (roomInput.name.trim()) {
      setFormData((prev) => ({
        ...prev,
        rooms: [...prev.rooms, { id: Date.now(), ...roomInput }],
      }));
      setRoomInput({ name: "", capacity: "", description: "", image: "" });
    }
  };

  const handleRemoveRoom = (id) => {
    setFormData((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((r) => r.id !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-bold text-indigo-500 mb-4">
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
            <label className="block text-sm font-medium text-gray-700">Latitude</label>
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
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
              value={formData.longitude}
              onChange={handleChange}
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
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Salles</label>
            <div className="space-y-2">
              <input
                type="text"
                name="name"
                value={roomInput.name}
                onChange={handleRoomChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Nom de la salle"
              />
              <input
                type="number"
                name="capacity"
                value={roomInput.capacity}
                onChange={handleRoomChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Capacité"
              />
              <textarea
                name="description"
                value={roomInput.description}
                onChange={handleRoomChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Description"
                rows="2"
              />
              <input
                type="url"
                name="image"
                value={roomInput.image.startsWith("data:") ? "" : roomInput.image}
                onChange={handleRoomChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="URL de l'image"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleRoomImageUpload}
                className="w-full p-2"
              />
              {roomInput.image && (
                <img
                  src={roomInput.image}
                  alt="Prévisualisation salle"
                  className="mt-2 w-24 h-24 object-cover rounded"
                />
              )}
              <button
                type="button"
                onClick={handleAddRoom}
                className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 w-full"
              >
                Ajouter la salle
              </button>
            </div>
            <ul className="mt-2 space-y-2 max-h-40 overflow-y-auto">
              {formData.rooms.map((room) => (
                <li key={room.id} className="flex justify-between items-center text-sm bg-gray-100 p-2 rounded">
                  <span>{room.name} (Capacité: {room.capacity})</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRoom(room.id)}
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
