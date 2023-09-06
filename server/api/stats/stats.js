'use strict';
/*
 * @file Routen/Endpunkte zur Statistik der einzelnen Shortlinks
 * @author Markus Rennings <markus@rennings.net>
 */

const router = require('express').Router();
const {getStats} = require('../../src/db/database');
const log = require('../../src/log');

router.post('/', (req, res) => {
  // const short = req.params.short;
  const short = req.body.shortURL;
  const passwd = req.body.password;

  const statsGet = getStats(short);
  statsGet
    .then((result) => {
      if (result === undefined) {
        throw new Error('404');
      } else if (passwd !== result.passwd) {
        throw new Error('401');
      } else {
        // delete result.passwd;
        // res.json(result);
        res.json({
          shortURL: result.shortURL,
          longURL: result.longURL,
          clicks: result.clicks,
          lastClick: result.lastClick,
          createDate: result.timestamp,
          expireDate: result.expireDate,
          OS: {
            Linux: result.os_linux,
            Windows: result.os_win,
            MacOs: result.os_mac
          },
          Browser: {
            Chrome: result.browser_chrome,
            Edge: result.browser_edge,
            Firefox: result.browser_firefox,
            Opera: result.browser_opera,
            Safari: result.browser_safari,
            Sonstige: result.browser_sonstige
          }
        });
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
