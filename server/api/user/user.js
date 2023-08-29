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

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Funktion für die Registrierung und Anmeldung
const registerAndLoginUser = async () => {
  try {
    console.log("/register called");

    rl.question('Bitte geben Sie Ihre E-Mail-Adresse ein: ', async (email) => {
      rl.question('Bitte geben Sie Ihr Passwort ein: ', async (passwd) => {
        const myauth = auth.getAuth();
        const db = getFirestore();

        try {
          // Registrierung
          await auth.createUserWithEmailAndPassword(myauth, email, passwd);

          // Daten zum Firestore hinzufügen
          const userRef = collection(db, 'users');
          await addDoc(userRef, { email });

          // Registrierung und Daten erfolgreich hinzugefügt
          console.log("message: success");

          // Anmeldung nach erfolgreicher Registrierung
          try {
            // Anmeldung
            await auth.signInWithEmailAndPassword(myauth, email, passwd);

            // Authentifizierung erfolgreich
            console.log("message: login success");
            rl.close();
          } catch (loginError) {
            // Authentifizierung nicht erfolgreich
            console.log("message: login not successful; error", loginError.message);
            rl.close();
          }
        } catch (error) {
          // Registrierung nicht erfolgreich
          console.log("message: not successful; error", error.message);
          rl.close();
        }
      });
    });
  } catch (error) {
    console.error("Error during registration:", error);
  }
};

router.get('/history', (req, res) => {
  // TODO: Alle Links des eingeloggten Users zurückgeben
  res.send('History page'); // Hier können Sie die gewünschte Antwort für die History-Seite senden
});

router.get('/register', async (req, res) => {
  registerAndLoginUser(); // Aufruf der Funktion für Registrierung und Anmeldung
  res.send('Registration and login process initiated.');
});

router.get('/login', async (req, res) => {
  console.log("/login called");

  rl.question('Bitte geben Sie Ihre E-Mail-Adresse ein: ', async (email) => {
    rl.question('Bitte geben Sie Ihr Passwort ein: ', async (passwd) => {
      const myauth = auth.getAuth();

      try {
        // Anmeldung
        await auth.signInWithEmailAndPassword(myauth, email, passwd);

        // Authentifizierung erfolgreich
        console.log("message: login success");
        res.redirect('/history'); // Hier wird nach dem erfolgreichen Login zur /history Route weitergeleitet
      } catch (error) {
        // Authentifizierung nicht erfolgreich
        console.log("message: login not successful; error", error.message);
        res.status(401).send('Login failed'); // Hier wird die Nachricht "Login failed" an den Browser gesendet
      } finally {
        rl.close();
      }
    });
  });
});

// ... (weitere Routen und Export)

module.exports = router;
