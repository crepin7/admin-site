
import React, { createContext, useState, useEffect, useContext } from "react";
import Spinner from "../components/Spinner";
import {
  addBuilding,
  getBuildings,
  updateBuilding,
  deleteBuilding,
  addRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  addInfrastructure,
  getInfrastructures,
  updateInfrastructure,
  deleteInfrastructure,
} from "../services/FirebaseService";

const CampusContext = createContext();

export function CampusProvider({ children }) {
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [infrastructures, setInfrastructures] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les données initiales depuis Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const buildingsData = await getBuildings();
        const roomsData = await getRooms();
        const infrastructuresData = await getInfrastructures();

        setBuildings(buildingsData);
        setRooms(roomsData);
        setInfrastructures(infrastructuresData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fonctions CRUD synchronisées avec Firestore
  const handleAddBuilding = async (newBuilding) => {
    const addedBuilding = await addBuilding(newBuilding);
    setBuildings((prev) => [addedBuilding, ...prev]);
  };

  const handleUpdateBuilding = async (updatedBuilding) => {
    const result = await updateBuilding(updatedBuilding.id, updatedBuilding);
    setBuildings((prev) =>
      prev.map((b) => (b.id === result.id ? result : b))
    );
  };

  const handleDeleteBuilding = async (id) => {
    await deleteBuilding(id);
    setBuildings((prev) => prev.filter((b) => b.id !== id));
    setRooms((prev) => prev.filter((r) => r.buildingId !== id));
  };

  const handleAddRoom = async (newRoom) => {
    const addedRoom = await addRoom(newRoom);
    setRooms((prev) => [addedRoom, ...prev]);
  };

  const handleUpdateRoom = async (updatedRoom) => {
    const result = await updateRoom(updatedRoom.id, updatedRoom);
    setRooms((prev) => prev.map((r) => (r.id === result.id ? result : r)));
  };

  const handleDeleteRoom = async (id) => {
    await deleteRoom(id);
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddInfrastructure = async (newInfrastructure) => {
    const addedInfra = await addInfrastructure(newInfrastructure);
    setInfrastructures((prev) => [addedInfra, ...prev]);
  };

  const handleUpdateInfrastructure = async (updatedInfrastructure) => {
    const result = await updateInfrastructure(updatedInfrastructure.id, updatedInfrastructure);
    setInfrastructures((prev) =>
      prev.map((i) => (i.id === result.id ? result : i))
    );
  };

  const handleDeleteInfrastructure = async (id) => {
    await deleteInfrastructure(id);
    setInfrastructures((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <CampusContext.Provider
      value={{
        buildings,
        rooms,
        infrastructures,
        addBuilding: handleAddBuilding,
        updateBuilding: handleUpdateBuilding,
        deleteBuilding: handleDeleteBuilding,
        addRoom: handleAddRoom,
        updateRoom: handleUpdateRoom,
        deleteRoom: handleDeleteRoom,
        addInfrastructure: handleAddInfrastructure,
        updateInfrastructure: handleUpdateInfrastructure,
        deleteInfrastructure: handleDeleteInfrastructure,
        loading,
      }}
    >
      {loading ? <Spinner /> : children}
    </CampusContext.Provider>
  );
}

export const useCampus = () => useContext(CampusContext);
