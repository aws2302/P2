const { createConsola } = require("consola");
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
  log.error("Fehler beim Laden der .env-Datei; Beende …");
  process.exit(1);
}

const express = require("express");
const app = express();
const hostname = process.env.hostname;
const port = parseInt(process.env.port);

const api = require('./api/api.js');
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(api);

// ? Die Routen sind erstmal hier, können evtl. noch verschoben werden
app.get('/', (req, res) => {
  // TODO: Benötigt?
  res.send('NOT IMPLEMENTED: /');
});

/**
 * Erstellt einen neuen Kurz-Link
 */
app.put('/', (req, res) => {
  // TODO: prüfen, ob valide URL
  // TODO: Kurzlink erstellen
  // TODO: In DB eintragen
  res.send('NOT IMPLEMENTED: PUT /');
})

app.get('/:id', (req, res) => {
  // TODO: Long-Url aus DB abrufen
  // TODO: Statistiken aktualisieren
  // TODO: Daten zurückliefern
  res.send(`NOT IMPLEMENTED! ID: ${req.params.id}`);
});


app.listen(port, hostname, () => {
  log.info(`Server listening on ${hostname}:${port}`);
});
