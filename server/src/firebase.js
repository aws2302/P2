const app = require("firebase/app");
const store = require("firebase/firestore");
const auth = require("firebase/auth");

// TODO: .env file!
const firebaseConfig = {
  apiKey: "AIzaSyDVra6fwiLT_yFAUgtd0HudrvMijCp-kuU",
  authDomain: "p2-url-shortener.firebaseapp.com",
  projectId: "p2-url-shortener",
  storageBucket: "p2-url-shortener.appspot.com",
  messagingSenderId: "459064015967",
  appId: "1:459064015967:web:8475e2b7bee9fb2dcbefea",
  measurementId: "G-VHGYLZTDPT"
};

const myapp = app.initializeApp(firebaseConfig);
const firestore_database = store.getFirestore(myapp);
const myauth = auth.getAuth(myapp);

module.exports = {myapp, firestore_database, myauth}