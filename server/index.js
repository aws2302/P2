/*
 * Hauptdatei des Backends, Einstiegspunkt
 * @author Markus Rennings <markus@rennings.net>
 */

const { createConsola } = require("consola");
/**
 * Logging über log.info(), log.warn(), log.error()
 * Hierdurch kann das Logging später z.B. auf Winston umgestellt werden, so dass 
 * (auch) in eine Datei geloggt wird.
 */
const log = createConsola({
  fancy: true,
  formatOptions: {
    columns: 80,
    colors: true,
    date: true,
  },
});

const dotenv_result = require("dotenv").config();
if (dotenv_result.error) {
  log.fatal("Fehler beim Laden der .env-Datei; Beende …");
  process.exit(1);
}

const express = require("express");
const app = express();
const hostname = process.env.hostname;
const port = parseInt(process.env.port);

const cors = require("cors");
app.use(cors());
app.use(express.json());

const api = require('./api/api.js');
app.use('/api', api);

const isUrlHttp = require("is-url-http");
const { getShortUrl, getLongUrl } = require('./src/urlShortener.js');

// ? Die Routen sind erstmal hier, können evtl. noch verschoben werden
app.get('/', (req, res) => {
  // TODO: Benötigt? Erstmal 405 (Method not allowed)
  res.status(405)
    .send('NOT IMPLEMENTED: /');
});

/**
 * Erstellt einen neuen Kurz-Link, via http.put
 * @param {json} {longUrl,} - Die zu kürzende Url
 * @returns {json} {longUrl, shortUrl,}
 * @author Markus Rennings <markus@rennings.net>
 */
app.put('/', (req, res) => {
  const longUrl = req.body.longUrl;
  const user = req.body.user;
  if (!isUrlHttp(longUrl)) {
    log.warn(`Keine gültige URL übergeben: ${longUrl}`);
    res.status(400)
      .json({error: 'Ungültige URL übergeben'});
    
  } else {
    const shortUrl = getShortUrl(longUrl, user);
    res.status(201)
      .json({
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
app.get('/:id', (req, res) => {
  const shortUrl = req.params.id;
  const longUrl = getLongUrl(shortUrl);
  res.json({
    shortUrl: shortUrl,
    longUrl: longUrl,
  });
});


app.listen(port, hostname, () => {
  log.info(`Server listening on ${hostname}:${port}`);
});
