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
  const { key } = req.query; // Changé de auth à key
  if (key !== "admin") {
    return res.status(401).json({ error: "Non autorisé : Clé d'authentification invalide" });
  }

  try {
    const infraSnapshot = await db.collection("infrastructures").get();
    const infrastructures = infraSnapshot.docs.map((doc) => doc.data());
    res.status(200).json(infrastructures);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des infrastructures" });
  }
};