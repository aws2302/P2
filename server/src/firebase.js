require('dotenv').config({ path: '../.env' })
console.log(process.env.FB_AUTH_DOMAIN)
const app = require("firebase/app");
const store = require("firebase/firestore");
const auth = require("firebase/auth");

// TODO: .env file!
const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID
};

const myapp = app.initializeApp(firebaseConfig);
const firestore_database = store.getFirestore(myapp);
const myauth = auth.getAuth(myapp);

module.exports = {myapp, firestore_database, myauth}
