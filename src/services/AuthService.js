import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

/**
 * Connecte un utilisateur avec son email et mot de passe.
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} motDePasse - Le mot de passe de l'utilisateur.
 * @returns {Object} - Les informations de l'utilisateur connecté.
 * @throws {Error} - Si la connexion échoue.
 */
export const seConnecter = async (email, motDePasse) => {
  try {
    const credentialUtilisateur = await signInWithEmailAndPassword(auth, email, motDePasse);
    return credentialUtilisateur.user;
  } catch (erreur) {
    throw new Error(erreur.message);
  }
};

/**
 * Déconnecte l'utilisateur actuel.
 */
export const seDeconnecter = async () => {
  await signOut(auth);
};
