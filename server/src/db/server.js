const express = require('express');
const PouchDB = require('pouchdb');
const db = new PouchDB('urls');

const app = express();
const port = 3000; // Wählen Sie einen freien Port

app.get('/:shortURL', async (req, res) => {
  const shortURL = req.params.shortURL;
  try {
    const doc = await db.get(shortURL);
    if (doc && doc.longURL) {
      res.redirect(doc.longURL);
    } else {
      res.status(404).send('Short URL not found.');
    }
  } catch (error) {
    res.status(500).send('Error fetching short URL.');
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
