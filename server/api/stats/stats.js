'use strict';
/*
 * @file Routen/Endpunkte zur Statistik der einzelnen Shortlinks
 * @author Markus Rennings <markus@rennings.net>
 */

const router = require('express').Router();
const {getStats} = require('../../src/db/database');
const log = require('../../src/log');

router.post('/:short', (req, res) => {
  const short = req.params.short;
  const passwd = req.body.password;

  const statsGet = getStats(short);
  statsGet
    .then((result) => {
      if (result === undefined) {
        throw new Error('404');
      } else if (passwd !== result.passwd) {
        throw new Error('401');
      } else {
        delete result.passwd;
        res.json(result);
      }
    })
    .catch((e) => {
      if (e == 'Error: 401') {
        log.error('api/stats/ Autorisierung fehlgeschlagen', e);
        res.status(401).json({error: 'Autorisierung fehlgeschlagen'});
      } else if (e == 'Error: 404') {
        log.error('api/stats/ Kurz-URL nicht gefunden', e);
        res.status(404).json({error: 'Kurz-URL nicht gefunden'});
      } else {
        log.error('api/stats Fehler: ', e);
        res.status(500).json({error: 'Fehler aufgetreten'});
      }
    });
});

module.exports = router;
