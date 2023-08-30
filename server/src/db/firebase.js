require('dotenv').config({ path: '../.env' })

const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID
};

const myapp = initializeApp(firebaseConfig);
const firestore_database = getFirestore(myapp);
// const myauth = getAuth(myapp);

// Exportieren der Funktion collection aus firebase.js
const { collection } = require("firebase/firestore");

module.exports = { firestore_database, collection };

