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

// Funktion für die Registrierung und Anmeldung
const registerAndLoginUser = async (res) => {
  try {
    console.log("/register called");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Bitte geben Sie Ihre E-Mail-Adresse ein: ', async (email) => { //Ans Frontend: Hier bitte den Input realisieren!
      rl.question('Bitte geben Sie Ihr Passwort ein: ', async (passwd) => {  //Ans Frontend: Hier bitte den Input realisieren, plus Button zum Abschicken!
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
            res.redirect('/user/history'); // Weiterleitung zur /history-Route nach erfolgreichem Login
          } catch (loginError) {
            // Authentifizierung nicht erfolgreich
            console.log("message: login not successful; error", loginError.message);
            res.status(401).send('Login failed'); // Nachricht "Login failed" senden
          } finally {
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

// Middleware zur Authentifizierungsüberprüfung
const authenticateUser = (req, res, next) => {
  const myauth = auth.getAuth();
  const user = myauth.currentUser;

  if (user) {
    // Benutzer ist eingeloggt, führen Sie die nächste Middleware oder Route aus
    next();
  } else {
    // Benutzer ist nicht eingeloggt, leiten Sie ihn zur Anmeldeseite weiter
    if (req.originalUrl === '/history') {
      // Nur wenn der Benutzer die /history-Route aufruft
      res.redirect('/user/login'); // Weiterleitung zur /user/login-Route
    } else {
      res.status(401).send('Authentication required'); // Nachricht "Authentication required" senden
    }
  }
};

router.get('/history', authenticateUser, (req, res) => {
  // TODO: Alle Links des eingeloggten Users zurückgeben
  res.send('History page'); // Hier können Sie die gewünschte Antwort für die History-Seite senden
});

router.get('/history', (req, res) => {
  res.send('Logged in'); // Hier wird "Logged in" im Browser angezeigt
});

router.get('/register', async (req, res) => {
  registerAndLoginUser(res); // Aufruf der Funktion für Registrierung und Anmeldung und Übergabe von res
});

router.get('/login', async (req, res) => {
  console.log("/login called");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Bitte geben Sie Ihre E-Mail-Adresse ein: ', async (email) => { //Ans Frontend: Hier bitte den Input realisieren!
    rl.question('Bitte geben Sie Ihr Passwort ein: ', async (passwd) => { //Ans Frontend: Hier bitte den Input realisieren, plus Button zum Abschicken!
      const myauth = auth.getAuth();

      try {
        // Anmeldung
        await auth.signInWithEmailAndPassword(myauth, email, passwd);

        // Authentifizierung erfolgreich
        console.log("message: login success");
        res.redirect('/user/history'); // Weiterleitung zur /history-Route nach erfolgreichem Login
      } catch (error) {
        // Authentifizierung nicht erfolgreich
        console.log("message: login not successful; error", error.message);
        res.status(401).send('Login failed'); // Nachricht "Login failed" senden
      } finally {
        rl.close();
      }
    });
  });
});

// ... (weitere Routen und Export)

module.exports = router;
