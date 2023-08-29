/**
 * Routen/Endpunkte zur User-Verwaltung
 */

require("../../src/firebase");
const auth = require("firebase/auth");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

const express = require('express');
const router = express.Router();

// Middleware zum Parsen von JSON-Daten im Request-Body
router.use(express.json());

router.get('/history', (req, res) => {
  // TODO: Alle Links des eingeloggten Users zurückgeben
  res.send('NOT IMPLEMENTED! user/history');
});

router.get('/register', async (req, res) => {
  console.log("/register called");
  
  let email = "Hallo43210@Dummy.test"; //req.body.email;
  let passwd = "Start!1234!"; //req.body.password;
  console.log("user", email, "passwd", passwd);

  const myauth = auth.getAuth();
  const db = getFirestore();

  try {
    // Registrierung
    await auth.createUserWithEmailAndPassword(
      myauth,
      email,
      passwd
    );

    // Daten zum Firestore hinzufügen
    const userRef = collection(db, 'users');
    await addDoc(userRef, { email });

    // Registrierung und Daten erfolgreich hinzugefügt
    console.log("message: success");
    res.send({ 'message': 'success', 'email': email });
  } catch (error) {
    // Registrierung nicht erfolgreich
    console.log("message: not successful; error", error.message);
    res.send({ 'message': 'error', 'error': error.message });
  }
});

router.get('/login', async (req, res) => {
  console.log("/login called");
  // TODO: Abholen der POST Daten
  let email = "test@test.test";
  let passwd = "test1234";
  console.log("user", email, "passwd", passwd);

  const myauth = auth.getAuth();
  try {
    // Anmeldung
    await auth.signInWithEmailAndPassword(
      myauth,
      email,
      passwd
    );
    // Authentifizierung erfolgreich
    console.log("message: success");
    res.send({ 'message': 'success', 'email': email, "passwd": passwd });
  } catch (error) {
    // Authentifizierung nicht erfolgreich
    console.log("message: not successful; error", error.message);
    res.send({ 'message': 'error', 'error': error.message });
  }
});

module.exports = router;
