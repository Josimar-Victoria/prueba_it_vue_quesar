// src/boot/firebase.js
import { boot } from "quasar/wrappers";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSTnRzAzceuom1PEX-wMzeIi4e-xboIJA",
  authDomain: "prueba-quasar-d36b4.firebaseapp.com",
  projectId: "prueba-quasar-d36b4",
  storageBucket: "prueba-quasar-d36b4.appspot.com",
  messagingSenderId: "133524459445",
  appId: "1:133524459445:web:ad930f345dd09fc53c93fc",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export default boot(({ app }) => {
  // Inyectar la instancia de Firestore y Auth en Vue
  app.config.globalProperties.$db = db;
  app.config.globalProperties.$auth = auth;
  app.config.globalProperties.$storage = storage;
});

export { db, auth, storage };
