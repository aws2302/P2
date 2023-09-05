'use strict';
/*
 * @file Hauptdatei des Backends, Einstiegspunkt
 * @author Markus Rennings <markus@rennings.net>
 */

'use strict';

const log = require('./src/log');

const dotenvResult = require('dotenv').config();
if (dotenvResult.error) {
  log.fatal('Fehler beim Laden der .env-Datei; Beende …');
  process.exit(1);
}

const express = require('express');
const app = express();
const hostname = process.env.HOSTNAME;
const port = parseInt(process.env.PORT);
const cors = require('cors');
const ua = require('express-useragent');
const root = require('./api/root');
const api = require('./api/api.js');

app.use(cors());
app.use(express.json());
app.use(ua.express());
app.disable('x-powered-by');

app.use('/', root);
app.use('/api', api);

app.listen(port, hostname, () => {
  log.info(`Server listening on ${hostname}:${port}`);
});
