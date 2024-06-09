import { defineStore } from "pinia";
import { auth } from "../boot/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null, // Cargar usuario desde localStorage
    loading: false,
    error: null,
  }),
  actions: {
    async register(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = userCredential.user;
        this.saveUserToLocalStorage(); // Guardar usuario en localStorage después del registro
      } catch (error) {
        this.error = error.message;
        switch (error.code) {
          case "auth/email-already-in-use":
            this.error = "Email already in use. Please use a different email.";
            break;
          default:
            this.error = error.message;
        }
      } finally {
        this.loading = false;
      }
    },
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.user = userCredential.user;
        this.saveUserToLocalStorage(); // Guardar usuario en localStorage después del inicio de sesión
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            this.error = "User not found. Please check your email.";
            break;
          case "auth/wrong-password":
            this.error = "Wrong password. Please try again.";
            break;
          case "auth/invalid-credential":
            this.error = "Invalid credential. Please check your credentials.";
            break;
          default:
            this.error = error.message;
        }
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      this.loading = true;
      this.error = null;
      try {
        await signOut(auth);
        this.user = null;
        this.clearUserFromLocalStorage(); // Limpiar usuario de localStorage después de cerrar sesión
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    saveUserToLocalStorage() {
      localStorage.setItem("Email", this.user.email);
      localStorage.setItem("uid", this.user.uid);
    },
    clearUserFromLocalStorage() {
      localStorage.removeItem("Email");
      localStorage.removeItem("uid");
    },
  },
});
