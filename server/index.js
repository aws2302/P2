/*
 * Hauptdatei des Backends, Einstiegspunkt
 * @author Markus Rennings <markus@rennings.net>
 */

const log = require('./src/log');

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
const root = require("./api/root");
const api = require('./api/api.js');

app.use(cors());
app.use(express.json());

// ! Routen
app.use('/', root);
app.use('/api', api);

app.listen(port, hostname, () => {
  log.info(`Server listening on ${hostname}:${port}`);
});
