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
  orderBy
} from "firebase/firestore";

// Noms des collections dans Firestore
const COLLECTION_BATIMENTS = "batiments";
const COLLECTION_SALLES = "salles";
const COLLECTION_INFRASTRUCTURES = "infrastructures";

// === CRUD pour les bâtiments ===
/**
 * Ajoute un nouveau bâtiment dans Firestore.
 * @param {Object} donneesBatiment - Les données du bâtiment à ajouter.
 * @returns {Object} - Les données du bâtiment avec son ID généré.
 */
export const ajouterBatiment = async (donneesBatiment) => {
  const refDoc = await addDoc(collection(db, COLLECTION_BATIMENTS), donneesBatiment);
  // Ajoute l'ID généré dans les données du document
  await updateDoc(refDoc, { id: refDoc.id });
  return { id: refDoc.id, ...donneesBatiment };
};

/**
 * Récupère tous les bâtiments depuis Firestore.
 * @returns {Array} - Liste des bâtiments avec leurs données.
 */
export const recupererBatiments = async () => {
  const q = query(collection(db, COLLECTION_BATIMENTS), orderBy("nom"));
  const instantane = await getDocs(q);
  return instantane.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Met à jour un bâtiment existant dans Firestore.
 * @param {string} id - L'ID du bâtiment à mettre à jour.
 * @param {Object} donneesBatiment - Les nouvelles données du bâtiment.
 * @returns {Object} - Les données mises à jour avec l'ID.
 */
export const mettreAJourBatiment = async (id, donneesBatiment) => {
  const refBatiment = doc(db, COLLECTION_BATIMENTS, id);
  await updateDoc(refBatiment, donneesBatiment);
  return { id, ...donneesBatiment };
};

/**
 * Supprime un bâtiment et toutes ses salles associées dans Firestore.
 * @param {string} id - L'ID du bâtiment à supprimer.
 */
export const supprimerBatiment = async (id) => {
  const refBatiment = doc(db, COLLECTION_BATIMENTS, id);
  await deleteDoc(refBatiment);

  // Supprime les salles associées au bâtiment
  const requeteSalles = query(collection(db, COLLECTION_SALLES), where("buildingId", "==", id));
  const instantaneSalles = await getDocs(requeteSalles);
  const promessesSuppression = instantaneSalles.docs.map((docSalle) => deleteDoc(docSalle.ref));
  await Promise.all(promessesSuppression);
};

// === CRUD pour les salles ===
/**
 * Ajoute une nouvelle salle dans Firestore.
 * @param {Object} donneesSalle - Les données de la salle à ajouter.
 * @returns {Object} - Les données de la salle avec son ID généré.
 */
export const ajouterSalle = async (donneesSalle) => {
  const refDoc = await addDoc(collection(db, COLLECTION_SALLES), donneesSalle);
  await updateDoc(refDoc, { id: refDoc.id });
  return { id: refDoc.id, ...donneesSalle };
};

/**
 * Récupère toutes les salles depuis Firestore.
 * @returns {Array} - Liste des salles avec leurs données.
 */
export const recupererSalles = async () => {
  // 1. Charger les bâtiments pour avoir leur nom
  const batimentsSnap = await getDocs(collection(db, COLLECTION_BATIMENTS));
  const batimentMap = {};
  batimentsSnap.docs.forEach((doc) => {
    batimentMap[doc.id] = doc.data().nom || "";
  });

  // 2. Charger les salles
  const sallesSnap = await getDocs(collection(db, COLLECTION_SALLES));
  const salles = sallesSnap.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      situation: batimentMap[data.buildingId] || "Bâtiment inconnu",
    };
  });

  // 3. Tri EXACT comme l'app mobile
  const sallesTriees = salles.sort((a, b) => {
    const s1 = a.situation.toLowerCase();
    const s2 = b.situation.toLowerCase();
    if (s1 < s2) return -1;
    if (s1 > s2) return 1;

    const n1 = a.nom.toLowerCase();
    const n2 = b.nom.toLowerCase();
    return n1.localeCompare(n2);
  });

  return sallesTriees;
};

/**
 * Met à jour une salle existante dans Firestore.
 * @param {string} id - L'ID de la salle à mettre à jour.
 * @param {Object} donneesSalle - Les nouvelles données de la salle.
 * @returns {Object} - Les données mises à jour avec l'ID.
 */
export const mettreAJourSalle = async (id, donneesSalle) => {
  const refSalle = doc(db, COLLECTION_SALLES, id);
  await updateDoc(refSalle, donneesSalle);
  return { id, ...donneesSalle };
};

/**
 * Supprime une salle dans Firestore.
 * @param {string} id - L'ID de la salle à supprimer.
 */
export const supprimerSalle = async (id) => {
  const refSalle = doc(db, COLLECTION_SALLES, id);
  await deleteDoc(refSalle);
};

// === CRUD pour les infrastructures ===
/**
 * Ajoute une nouvelle infrastructure dans Firestore.
 * @param {Object} donneesInfra - Les données de l'infrastructure à ajouter.
 * @returns {Object} - Les données de l'infrastructure avec son ID généré.
 */
export const ajouterInfrastructure = async (donneesInfra) => {
  const refDoc = await addDoc(collection(db, COLLECTION_INFRASTRUCTURES), donneesInfra);
  await updateDoc(refDoc, { id: refDoc.id });
  return { id: refDoc.id, ...donneesInfra };
};

/**
 * Récupère toutes les infrastructures depuis Firestore.
 * @returns {Array} - Liste des infrastructures avec leurs données.
 */
export const recupererInfrastructures = async () => {
  const q = query(collection(db, COLLECTION_INFRASTRUCTURES), orderBy("nom"));
  const instantane = await getDocs(q);
  return instantane.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Met à jour une infrastructure existante dans Firestore.
 * @param {string} id - L'ID de l'infrastructure à mettre à jour.
 * @param {Object} donneesInfra - Les nouvelles données de l'infrastructure.
 * @returns {Object} - Les données mises à jour avec l'ID.
 */
export const mettreAJourInfrastructure = async (id, donneesInfra) => {
  const refInfra = doc(db, COLLECTION_INFRASTRUCTURES, id);
  await updateDoc(refInfra, donneesInfra);
  return { id, ...donneesInfra };
};

/**
 * Supprime une infrastructure dans Firestore.
 * @param {string} id - L'ID de l'infrastructure à supprimer.
 */
export const supprimerInfrastructure = async (id) => {
  const refInfra = doc(db, COLLECTION_INFRASTRUCTURES, id);
  await deleteDoc(refInfra);
};
