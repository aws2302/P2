/**
 * Routen/Endpunkte zur User-Verwaltung
 */

require("../../src/firebase");
const auth = require("firebase/auth");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

const express = require('express');
const cookieParser = require('cookie-parser'); // Added for cookie handling
const router = express.Router();

// Middleware zum Parsen von JSON-Daten im Request-Body
router.use(express.json());
router.use(cookieParser()); // Use cookie parser middleware

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
            res.cookie('loggedInUser', email, { httpOnly: true });
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

  const loggedInUser = req.cookies.loggedInUser;

  if (user && loggedInUser === user.email) {
    console.log(`User ${user.email} is logged in`);
    req.currentUser = user;
    next();
  } else {
    if (req.originalUrl === '/history') {
      res.redirect('/user/login');
    } else {
      res.status(401).send('Authentication required');
    }
  }
};

router.get('/history', authenticateUser, (req, res) => {
  // TODO: Alle Links des eingeloggten Users zurückgeben
  res.send(`
    <h1>History page</h1>
    <p>Logged in as: ${req.currentUser.email}</p>
    <form action="/user/logout" method="post">
      <button type="submit">Logout</button>
    </form>
  `);
});

router.post('/logout', (req, res) => {
  const myauth = auth.getAuth();
  auth.signOut(myauth).then(() => {
    console.log("User logged out");
    res.clearCookie('loggedInUser'); // Clear the loggedInUser cookie
    res.redirect('/user/login');
  }).catch((error) => {
    console.error("Logout error:", error);
    res.status(500).send('Logout failed');
  });
});

router.get('/register', async (req, res) => {
  registerAndLoginUser(res);
});

router.get('/login', async (req, res) => {
  console.log("/login called");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Bitte geben Sie Ihre E-Mail-Adresse ein: ', async (email) => {
    rl.question('Bitte geben Sie Ihr Passwort ein: ', async (passwd) => {
      const myauth = auth.getAuth();

      try {
        // Anmeldung
        await auth.signInWithEmailAndPassword(myauth, email, passwd);

        // Authentifizierung erfolgreich
        console.log("message: login success");

        // Set a browser-specific cookie upon successful login
        res.cookie('loggedInUser', email, { httpOnly: true });

        res.redirect('/user/history');
      } catch (error) {
        // Authentifizierung nicht erfolgreich
        console.log("message: login not successful; error", error.message);
        res.status(401).send('Login failed');
      } finally {
        rl.close();
      }
    });
  });
});

// ... (weitere Routen und Export)

module.exports = router;
