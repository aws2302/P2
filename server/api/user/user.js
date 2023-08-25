/*
 * Routen/Endpunkte zur User-Verwaltung
 */

const express = require('express');
const router = express.Router();

router.get('/history', (req, res) => {
  // TODO: Alle Links des eingeloggten Users zurückgeben
  res.send('NOT IMPLEMENTED! user/hiostory');
})

module.exports = router;
