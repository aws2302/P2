/**
 * Routen des Root-Verzeichnisses (host/)
 * @author Markus Rennings <markus@rennings.net>
 */

const router = require('express').Router();
const isUrlHttp = require('is-url-http');
const { getShortUrl, getLongUrl } = require('./../src/urlShortener.js');
const log = require('../src/log');

router.get('/', (req, res) => {
  res.status(405).send('INVALID');
});

/**
 * Erstellt einen neuen Kurz-Link, via http.put
 * @param {json} {longUrl,} - Die zu kürzende Url
 * @returns {json} {longUrl, shortUrl,}
 * @author Markus Rennings <markus@rennings.net>
 */
router.put('/', (req, res) => {
  const longUrl = req.body.longUrl;
  const user = req.body.user;
  if (!isUrlHttp(longUrl)) {
    log.warn(`Keine gültige URL übergeben: ${longUrl}`);
    res.status(400).json({ error: 'Ungültige URL übergeben' });
  } else {
    const shortUrl = getShortUrl(longUrl, user);
    res.status(201).json({
      longUrl: longUrl,
      shortUrl: shortUrl,
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
  const longUrl = getLongUrl(shortUrl);
  res.json({
    shortUrl: shortUrl,
    longUrl: longUrl,
  });
});

module.exports = router;
