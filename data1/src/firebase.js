import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyDVra6fwiLT_yFAUgtd0HudrvMijCp-kuU",
  authDomain: "p2-url-shortener.firebaseapp.com",
  projectId: "p2-url-shortener",
  storageBucket: "p2-url-shortener.appspot.com",
  messagingSenderId: "459064015967",
  appId: "1:459064015967:web:8475e2b7bee9fb2dcbefea",
  measurementId: "G-VHGYLZTDPT"
};

const app = initializeApp(firebaseConfig);
const firestore_database = getFirestore(app);
const auth = getAuth(app);

export { app, firestore_database, auth };
