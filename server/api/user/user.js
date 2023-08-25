/**
 * Routen/Endpunkte zur User-Verwaltung
 */

require("../../src/firebase")
const auth = require("firebase/auth");

const express = require('express');
const router = express.Router();

router.get('/history', (req, res) => {
  // TODO: Alle Links des eingeloggten Users zurückgeben
  res.send('NOT IMPLEMENTED! user/history');
})

router.get('/login', async (req, res) => {
  console.log("/login called");
  // TODO: abholen der POST data
  let email = "test@test.test"
  let passwd = "test1234"
  console.log("user", email, "passwd", passwd);

  const myauth = auth.getAuth();
  try {
    // login
    await auth.signInWithEmailAndPassword(
      myauth,
      email,
      passwd
    );
    // auth successful
    console.log("message: success");
    res.send({ 'message': 'success', 'email': email, 'password': passwd })
  } catch (error) {
    // auth not successful
    console.log("message: not successful; error", error.message);
    res.send({ 'message': 'error', 'error': error.message })
  }
});

module.exports = router;
