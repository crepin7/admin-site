import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDD1D9D2ioapdsaXjKZGqeJ_riXVJXZX6E",
  authDomain: "admin-site-4b122.firebaseapp.com",
  projectId: "admin-site-4b122",
  storageBucket: "admin-site-4b122.firebasestorage.app",
  messagingSenderId: "599549183484",
  appId: "1:599549183484:web:1936f77ceea123c1d6de79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };