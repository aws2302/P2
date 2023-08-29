'use strict';
/**
 * Routen des Root-Verzeichnisses (host/)
 * @author Markus Rennings <markus@rennings.net>
 */

const router = require('express').Router();
const { getShortUrl, getLongUrl } = require('./../src/urlShortener.js');
const log = require('../src/log');

const httpUrl = require('url-http');
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
 * @returns {json} {longUrl, shortUrl,}
 * @author Markus Rennings <markus@rennings.net>
 */
router.post('/', (req, res) => {
  const longUrl = req.body.longUrl;
  const user = req.body.user;
  if (!isValidUrl(longUrl)) {
    log.warn(`Keine gültige URL übergeben: ${longUrl}`);
    res.status(400).json({ error: 'Ungültige URL übergeben' });
  } else {
    const shortUrl = getShortUrl(longUrl, user);
    res.status(201).json({
      longUrl: longUrl,
      shortUrl: shortUrl
    });
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
  res.json({
    shortUrl: shortUrl,
    longUrl: longUrl
  });
});

module.exports = router;
