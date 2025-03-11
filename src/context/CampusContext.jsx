import React, { createContext, useState, useContext } from "react";

const CampusContext = createContext();

export function CampusProvider({ children }) {
  const [buildings, setBuildings] = useState([
    {
      id: 1,
      name: "Bâtiment A",
      description: "Bâtiment principal de sciences",
      latitude: 6.1725,
      longitude: 1.2133,
      image: "https://via.placeholder.com/300x150",
    },
    {
      id: 2,
      name: "Bâtiment B",
      description: "Bâtiment des arts",
      latitude: 6.1730,
      longitude: 1.2140,
      image: "https://via.placeholder.com/300x150",
    },
  ]);

  const [rooms, setRooms] = useState([
    { id: 1, name: "Salle 101", capacity: 50, description: "Salle de cours", image: "", buildingId: 1 },
    { id: 2, name: "Salle 102", capacity: 30, description: "Salle de TD", image: "", buildingId: 1 },
    { id: 3, name: "Salle 201", capacity: 40, description: "Salle polyvalente", image: "", buildingId: 2 },
  ]);

  const [infrastructures, setInfrastructures] = useState([
    {
      id: 1,
      name: "Bibliothèque",
      description: "Bibliothèque centrale",
      latitude: 6.1720,
      longitude: 1.2120,
      image: "https://via.placeholder.com/300x150",
    },
  ]);

  const addBuilding = (newBuilding) => {
    setBuildings((prev) => [{ id: Date.now(), ...newBuilding }, ...prev]);
  };

  const updateBuilding = (updatedBuilding) => {
    setBuildings((prev) =>
      prev.map((b) => (b.id === updatedBuilding.id ? updatedBuilding : b))
    );
  };

  const deleteBuilding = (id) => {
    setBuildings((prev) => prev.filter((b) => b.id !== id));
    setRooms((prev) => prev.filter((r) => r.buildingId !== id));
  };

  const addRoom = (newRoom) => {
    setRooms((prev) => [{ id: Date.now(), ...newRoom }, ...prev]);
  };

  const updateRoom = (updatedRoom) => {
    setRooms((prev) => prev.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)));
  };

  const deleteRoom = (id) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const addInfrastructure = (newInfrastructure) => {
    setInfrastructures((prev) => [{ id: Date.now(), ...newInfrastructure }, ...prev]);
  };

  const updateInfrastructure = (updatedInfrastructure) => {
    setInfrastructures((prev) =>
      prev.map((i) => (i.id === updatedInfrastructure.id ? updatedInfrastructure : i))
    );
  };

  const deleteInfrastructure = (id) => {
    setInfrastructures((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <CampusContext.Provider
      value={{
        buildings,
        rooms,
        infrastructures,
        addBuilding,
        updateBuilding,
        deleteBuilding,
        addRoom,
        updateRoom,
        deleteRoom,
        addInfrastructure,
        updateInfrastructure,
        deleteInfrastructure,
      }}
    >
      {children}
    </CampusContext.Provider>
  );
}

export const useCampus = () => useContext(CampusContext);
