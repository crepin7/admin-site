import { Client, Storage, ID } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67ecc872001fb50c48ea'); // Project ID

const storage = new Storage(client);
const bucketId = '67ede2af0013839174ad';

export async function uploadImageToAppwrite(file) {
  try {
    // Génère un ID unique pour le fichier
    const fileId = ID.unique();
    // Upload du fichier
    const response = await storage.createFile(bucketId, fileId, file);
    // Construction de l'URL publique
    const url = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${response.$id}/view?project=67ecc872001fb50c48ea`;
    return url;
  } catch (error) {
    console.error('Erreur lors de l\'upload Appwrite:', error);
    throw error;
  }
} 