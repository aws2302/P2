'use strict';
/*
 * Routen/Endpunkte zur User-Verwaltung
 */

const router = require('express').Router();

router.get('/history', (req, res) => {
  // TODO: Alle Links des eingeloggten Users zurückgeben
  res.send('NOT IMPLEMENTED! user/history');
});

// TODO: Everything

module.exports = router;
