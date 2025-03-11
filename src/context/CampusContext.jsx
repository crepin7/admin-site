import React, { createContext, useState, useContext } from "react";

/**
 * Contexte pour partager les bâtiments et salles entre composants.
 * Compatible avec une future intégration Firebase.
 */
const CampusContext = createContext();

export function CampusProvider({ children }) {
  const [buildings, setBuildings] = useState([
    {
      id: 1,
      name: "Bâtiment A",
      description: "Bâtiment principal de sciences",
      latitude: 6.1725,
      longitude: 1.2133,
      imageUrl: "https://via.placeholder.com/300x150",
      rooms: [
        { id: 1, name: "Salle 101", capacity: 50, description: "Salle de cours", imageUrl: "" },
        { id: 2, name: "Salle 102", capacity: 30, description: "Salle de TD", imageUrl: "" },
      ],
    },
    {
      id: 2,
      name: "Bâtiment B",
      description: "Bâtiment des arts",
      latitude: 6.1730,
      longitude: 1.2140,
      imageUrl: "https://via.placeholder.com/300x150",
      rooms: [{ id: 3, name: "Salle 201", capacity: 40, description: "Salle polyvalente", imageUrl: "" }],
    },
  ]);

  const [rooms, setRooms] = useState([]); // Salles indépendantes pour Rooms.js

  const addBuilding = (newBuilding) => {
    setBuildings((prev) => [...prev, { id: Date.now(), ...newBuilding }]);
  };

  const updateBuilding = (updatedBuilding) => {
    setBuildings((prev) =>
      prev.map((b) => (b.id === updatedBuilding.id ? updatedBuilding : b))
    );
  };

  const deleteBuilding = (id) => {
    setBuildings((prev) => prev.filter((b) => b.id !== id));
  };

  const addRoom = (newRoom) => {
    setBuildings((prev) =>
      prev.map((b) =>
        b.id === newRoom.buildingId
          ? { ...b, rooms: [...b.rooms, { id: Date.now(), ...newRoom }] }
          : b
      )
    );
    setRooms((prev) => [...prev, { id: Date.now(), ...newRoom }]);
  };

  const updateRoom = (updatedRoom) => {
    setBuildings((prev) =>
      prev.map((b) =>
        b.id === updatedRoom.buildingId
          ? {
              ...b,
              rooms: b.rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)),
            }
          : b
      )
    );
    setRooms((prev) => prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
  };

  const deleteRoom = (id, buildingId) => {
    setBuildings((prev) =>
      prev.map((b) =>
        b.id === buildingId ? { ...b, rooms: b.rooms.filter((r) => r.id !== id) } : b
      )
    );
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <CampusContext.Provider
      value={{
        buildings,
        rooms,
        addBuilding,
        updateBuilding,
        deleteBuilding,
        addRoom,
        updateRoom,
        deleteRoom,
      }}
    >
      {children}
    </CampusContext.Provider>
  );
}

export const useCampus = () => useContext(CampusContext);
