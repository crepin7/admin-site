import { Client, Storage, ID } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67ecc872001fb50c48ea'); // Project ID

const storage = new Storage(client);
const bucketId = '67ede2af0013839174ad';

export async function uploadImageToAppwrite(file) {
  try {
    // Validation supplémentaire côté service
    if (!file) {
      throw new Error('Aucun fichier fourni');
    }
    
    if (file.size === 0) {
      throw new Error('Le fichier est vide');
    }
    
    // Génère un ID unique pour le fichier
    const fileId = ID.unique();
    // Upload du fichier
    const response = await storage.createFile(bucketId, fileId, file);
    // Construction de l'URL publique
    const url = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${response.$id}/view?project=67ecc872001fb50c48ea`;
    return url;
  } catch (error) {
    console.error('Erreur lors de l\'upload Appwrite:', error);
    
    // Amélioration des messages d'erreur
    if (error.code === 401) {
      throw new Error('Erreur d\'authentification. Vérifiez vos permissions Appwrite.');
    } else if (error.code === 413) {
      throw new Error('Fichier trop volumineux pour le serveur.');
    } else if (error.code === 415) {
      throw new Error('Type de fichier non supporté par le serveur.');
    } else if (error.code === 429) {
      throw new Error('Trop de requêtes. Veuillez réessayer plus tard.');
    } else if (error.code === 503) {
      throw new Error('Service temporairement indisponible. Veuillez réessayer.');
    } else if (error.message) {
      throw new Error(`Erreur Appwrite: ${error.message}`);
    } else {
      throw new Error('Erreur inconnue lors de l\'upload vers Appwrite.');
    }
  }
} 