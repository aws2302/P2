'use strict';
/**
 * @file Routen des Root-Verzeichnisses (host/)
 * @author Markus Rennings <markus@rennings.net>
 */

const router = require('express').Router();
const httpUrl = require('url-http');
const generator = require('generate-password');
const { getShortUrl } = require('./../src/urlShortener.js');
const { saveURL, getStats } = require('../src/db/database');
const addStats = require('../src/addStats');
const log = require('../src/log');

/**
 * Überprüfung, ob die Long-Url valide ist
 * @param {string} url - Die zu prüfende URL
 * @returns {bool} 
 */
const isValidUrl = (url) => !!httpUrl(url);

router.get('/', (req, res) => {
  res.status(405).send('INVALID');
});

/**
 * Erstellt einen neuen Kurz-Link, via http.put
 * @param {json} {longUrl,} - Die zu kürzende Url
 * @returns {json} {longUrl, shortUrl,} oder {error: Fehlermeldung}; Return via express.res()
 * @author Markus Rennings <markus@rennings.net>
 */
router.post('/', (req, res) => {
  const longUrl = req.body.longUrl;
  if (!isValidUrl(longUrl)) {
    log.warn(`Keine gültige URL übergeben: ${longUrl}`);
    res.status(400).json({ error: 'Ungültige URL übergeben' });
  } else {
    const shortUrl = getShortUrl();
    const passwd = generator.generate({
      length:12,
      numbers: true
    });
    const entry = {
      passwd,
      longUrl,
      shortUrl
    };

    const dbresult = saveURL(entry);
    dbresult
      // eslint-disable-next-line no-unused-vars
      .then((_) => {
        res.status(201).json(entry);
      })
      .catch((err) => {
        log.error('POST / (URL-Generierung: DB-Fehler: ', err);
        res.status(500).json({error: 'Datenbankfehler aufgetreten'});
      });
  }
});

/**
 * Ruft eine LongUrl zur übergebenen ShortUrl ab
 * @param {string} longUrl - longUrl als URL/Pfad-Parameter
 * @returns {json} {shortUrl, longUrl, }
 * @author Markus Rennings <markus@rennings.net>
 */
router.all('/:short', (req, res) => {
  const shortUrl = req.params.short;
  const statsGet = getStats(shortUrl);
  statsGet
    .then((result) => {
      if (result === undefined) {
        throw new Error('404');
      }
      addStats(req.useragent, result);
      res.redirect(307, result.longURL);
    })
    .catch((e) => {
      if (e == 'Error: 404') {
        log.error('Falsche Kurz-Url');
        res.status(404).json({error: 'Falsche Kurz-URL? ', e});
      } else {
        log.error('ALL /{shortURL}: Fehler: ', e);
        res.status(500).json({error: 'Fehler aufgetreten'});
      }
    });
});

module.exports = router;
