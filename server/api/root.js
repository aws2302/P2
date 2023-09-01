'use strict';
/**
 * @file Routen des Root-Verzeichnisses (host/)
 * @author Markus Rennings <markus@rennings.net>
 */

const router = require('express').Router();
const httpUrl = require('url-http');
const { getShortUrl, getLongUrl } = require('./../src/urlShortener.js');
const { saveURL } = require('../src/db/database');
const generator = require('generate-password');
const log = require('../src/log');

/**
 * Überprüfung, ob die Long-Url valide ist
 * @param {string} url - Die zu prüfende URL
 * @returns {bool} 
 */
const isValidUrl = (url) => !!httpUrl(url);

router.get('/', (req, res) => {
  console.warn(req.useragent);
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
    const result = {
      passwd,
      longUrl,
      shortUrl
    };

    const dbresult = saveURL(result);
    if (dbresult) {
      res.status(201).json(result);
    } else {
      res.status(500).json({'error': 'Datenbankfehler aufgetreten'});
      log.error('POST / (URL-Generierung): DB-Fehler: ', dbresult);
    }
  }
});

/**
 * Ruft eine LongUrl zur übergebenen ShortUrl ab
 * @param {string} longUrl - longUrl als URL/Pfad-Parameter
 * @returns {json} {shortUrl, longUrl, }
 * @author Markus Rennings <markus@rennings.net>
 */
router.get('/:id', (req, res) => {
  const shortUrl = req.params.id;
  const longUrl = getLongUrl(shortUrl, req.useragent);
  // res.json({
  //   shortUrl: shortUrl,
  //   longUrl: longUrl
  // });
  res.redirect(307, longUrl);
});

module.exports = router;
