import React, { useState } from "react";
import "./Auth.css";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore"; // Pour interroger Firestore
import { MdAdminPanelSettings } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminRef = collection(db, "admins"); // "admins" est le nom de la collection
      const q = query(adminRef, where("username", "==", username)); // Filtre par nom d'utilisateur
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Nom d'utilisateur incorrect.");
        return;
      }

      const adminData = querySnapshot.docs[0].data();
      if (adminData.password !== password) {
        setError("Mot de passe incorrect.");
        return;
      }

      console.log("Connexion réussie !");
      console.log("Username:", username);
      console.log("Password:", password);
      console.log("Error:", error);
      setError("");

      //navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="auth-container">
      <form action="" onSubmit={handleSubmit}>
        <h1>Connexion</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Afficher l'erreur si elle existe */}
        <div className="input-box">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <MdAdminPanelSettings className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <CiLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Se souvenir de moi
          </label>
          <a href="#">Mot de passe oublié ?</a>
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Auth;
