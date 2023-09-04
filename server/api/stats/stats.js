'use strict';
/*
 * @file Routen/Endpunkte zur Statistik der einzelnen Shortlinks
 * @author Markus Rennings <markus@rennings.net>
 */

const router = require('express').Router();
const {getStats} = require('../../src/db/database');
// const log = require('../../src/log');

router.post('/:short', (req, res) => {
  const short = req.params.short;
  const passwd = req.body.password;

  const dbres = getStats(short);

  if (passwd !== dbres.Password) {
    res.status(401).json({error: 'Autorisierung fehlgeschlagen'});
  } else {
    // Password muss nicht unnötig über's Netz gesendet werden, der User kennt es bereits
    delete dbres.Password;
    res.json(dbres);
  }

});

module.exports = router;
