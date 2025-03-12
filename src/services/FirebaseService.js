import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

// Collection names
const BUILDINGS_COLLECTION = "batiments";
const ROOMS_COLLECTION = "salles";
const INFRASTRUCTURES_COLLECTION = "infrastructures";

// CRUD pour Buildings
export const addBuilding = async (buildingData) => {
  const docRef = await addDoc(collection(db, BUILDINGS_COLLECTION), buildingData);
  // Ajouter l'id dans les données du document
  await updateDoc(docRef, { id: docRef.id });
  return { id: docRef.id, ...buildingData };
};

export const getBuildings = async () => {
  const querySnapshot = await getDocs(collection(db, BUILDINGS_COLLECTION));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateBuilding = async (id, buildingData) => {
  const buildingRef = doc(db, BUILDINGS_COLLECTION, id);
  await updateDoc(buildingRef, buildingData);
  return { id, ...buildingData };
};

export const deleteBuilding = async (id) => {
  const buildingRef = doc(db, BUILDINGS_COLLECTION, id);
  await deleteDoc(buildingRef);

  const roomsQuery = query(collection(db, ROOMS_COLLECTION), where("buildingId", "==", id));
  const roomsSnapshot = await getDocs(roomsQuery);
  const deletePromises = roomsSnapshot.docs.map((roomDoc) => deleteDoc(roomDoc.ref));
  await Promise.all(deletePromises);
};

// CRUD pour Rooms
export const addRoom = async (roomData) => {
  const docRef = await addDoc(collection(db, ROOMS_COLLECTION), roomData);
  // Ajouter l'id dans les données du document
  await updateDoc(docRef, { id: docRef.id });
  return { id: docRef.id, ...roomData };
};

export const getRooms = async () => {
  const querySnapshot = await getDocs(collection(db, ROOMS_COLLECTION));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateRoom = async (id, roomData) => {
  const roomRef = doc(db, ROOMS_COLLECTION, id);
  await updateDoc(roomRef, roomData);
  return { id, ...roomData };
};

export const deleteRoom = async (id) => {
  const roomRef = doc(db, ROOMS_COLLECTION, id);
  await deleteDoc(roomRef);
};

// CRUD pour Infrastructures
export const addInfrastructure = async (infraData) => {
  const docRef = await addDoc(collection(db, INFRASTRUCTURES_COLLECTION), infraData);
  // Ajouter l'id dans les données du document
  await updateDoc(docRef, { id: docRef.id });
  return { id: docRef.id, ...infraData };
};

export const getInfrastructures = async () => {
  const querySnapshot = await getDocs(collection(db, INFRASTRUCTURES_COLLECTION));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateInfrastructure = async (id, infraData) => {
  const infraRef = doc(db, INFRASTRUCTURES_COLLECTION, id);
  await updateDoc(infraRef, infraData);
  return { id, ...infraData };
};

export const deleteInfrastructure = async (id) => {
  const infraRef = doc(db, INFRASTRUCTURES_COLLECTION, id);
  await deleteDoc(infraRef);
};