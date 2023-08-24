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

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("NOT IMPLEMENTED: /");
});

app.get("/:id", (req, res) => {
  res.send(`NOT IMPLEMENTED! ID: ${req.params.id}`);
});

app.listen(port, hostname, () => {
  log.info(`Server listening on ${hostname}:${port}`);
});
