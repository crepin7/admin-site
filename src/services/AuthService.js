import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  await signOut(auth);
};