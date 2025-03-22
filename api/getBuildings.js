import admin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

try {
  if (!admin.apps.length) {
    const credentialsPath = new URL("./firebase-credentials.json", import.meta.url);
    console.log("Tentative de chargement des credentials depuis :", credentialsPath);
    const credentials = (await import("./firebase-credentials.json", { assert: { type: "json" } })).default;
    console.log("Contenu des credentials :", credentials);
    admin.initializeApp({
      credential: cert(credentials),
    });
  }
} catch (error) {
  console.error("Erreur lors de l’initialisation de Firebase Admin :", error);
}

const db = getFirestore();

export default async function handler(req, res) {
  const { key } = req.query;
  if (key !== "admin") {
    return res.status(401).json({ error: "Non autorisé : Clé d'authentification invalide" });
  }

  try {
    const buildingsSnapshot = await db.collection("batiments").get();
    const buildings = buildingsSnapshot.docs.map((doc) => doc.data());
    res.status(200).json(buildings);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des bâtiments" });
  }
};