# Admin Site - Gestion des Campus

Application d'administration pour la gestion des bâtiments, salles et infrastructures d'un campus universitaire.

## Fonctionnalités

- **Gestion des Bâtiments** : Ajout, modification et suppression de bâtiments avec géolocalisation
- **Gestion des Salles** : Gestion des salles de cours avec capacité et association aux bâtiments
- **Gestion des Infrastructures** : Gestion des autres infrastructures du campus
- **Import d'Images** : Upload d'images multiples avec validation et gestion d'erreurs avancée
- **Interface Moderne** : Design responsive avec animations et notifications toast

## Import d'Images

### Fonctionnalités d'Import

L'application supporte l'import d'images avec les fonctionnalités suivantes :

- **Upload Multiple** : Sélection de plusieurs images simultanément
- **Validation Avancée** :
  - Taille maximale : 5MB par image
  - Types acceptés : Tous les formats d'image (JPEG, PNG, GIF, etc.)
  - Validation côté client et serveur
- **Gestion d'Erreurs Détaillée** :
  - Messages d'erreur spécifiques selon le type de problème
  - Notifications toast modernes
  - Logs détaillés dans la console
- **Indicateur de Chargement** : Animation pendant l'upload
- **Notifications de Succès** : Confirmation du nombre d'images uploadées

### Types d'Erreurs Gérées

- **401** : Erreur d'authentification Appwrite
- **413** : Fichier trop volumineux
- **415** : Type de fichier non supporté
- **429** : Trop de requêtes (rate limiting)
- **503** : Service temporairement indisponible

### Utilisation

1. Ouvrir un formulaire (Bâtiment, Salle ou Infrastructure)
2. Cliquer sur le bouton "Importer" dans la section Images
3. Sélectionner une ou plusieurs images
4. Attendre la confirmation d'upload
5. Les images apparaissent en prévisualisation
6. Possibilité de supprimer des images individuelles

## Technologies Utilisées

- **Frontend** : React 19, Vite, Tailwind CSS
- **Backend** : Appwrite (Base de données et stockage)
- **Notifications** : React Toastify
- **Icônes** : React Icons

## Installation

```bash
npm install
npm run dev
```

## Configuration

L'application utilise Appwrite comme backend. Assurez-vous que les variables suivantes sont configurées dans `src/services/AppwriteService.js` :

- `endpoint` : URL de votre instance Appwrite
- `projectId` : ID de votre projet Appwrite
- `bucketId` : ID du bucket de stockage pour les images
