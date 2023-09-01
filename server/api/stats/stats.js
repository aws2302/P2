'use strict';
/*
 * @file Routen/Endpunkte zur Statistik der einzelnen Shortlinks
 * @author Markus Rennings <markus@rennings.net>
 */

const router = require('express').Router();

router.get('/:short', (req, res) => {
  const short = req.params.short;
  const passwd = req.body.password;
  const cred = {
    shorturl: short,
    password: passwd
  };
  console.warn('// TODO: Datenbankabruf: ', cred);
  res.send('OK');
});

module.exports = router;
