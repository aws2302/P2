const PouchDB = require('pouchdb');
const db = new PouchDB('urls');

const displayAllURLs = async () => {
  try {
    const allDocs = await db.allDocs({ include_docs: true });
    allDocs.rows.forEach(row => {
      const doc = row.doc;
      if (doc.timestamp) {
        const timestamp = new Date(doc.timestamp);
        console.log(`Timestamp: ${timestamp.toLocaleString()}`);
      }
      console.log(`ID: ${doc._id}`);
      console.log(`Long URL: ${doc.longURL}`);
      console.log(`Short URL: ${doc.shortURL}`);
      console.log(`Browser: ${doc.browser}`)
      console.log(`OS: ${doc.os}`)
      console.log(`Statistik: ${doc.statistic}`)


      console.log('------------------------');
    });
  } catch (error) {
    console.error('Error displaying URLs:', error);
  }
};

displayAllURLs();
