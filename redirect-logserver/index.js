'use strict';
const { createConsola } = require('consola');
const log = createConsola({
  fancy: true,
  formatOptions: {
    columns: 80,
    colors: true,
    date: true,
  },
});

const express = require('express');
const app = express();
const hostname = 'localhost';
const port = 8081;
const cors = require('cors');

app.use(cors());

app.all('*', (req, res) => {
  log.warn(`${req.method}-Anfrage an ${req.path} empfangen von ${req.socket.remoteAddress} `);
  res.send(
    `${req.method}-Anfrage an ${req.path} empfangen von ${req.socket.remoteAddress} `
  );
});

app.listen(port, hostname, () => {
  log.info(`Server listening on ${hostname}:${port}`);
});
