const sqlite3 = require('sqlite3').verbose();
const { getLongUrl, getShortUrl } = require('../urlShortener');

// Verbindung zur SQLite-Datenbank herstellen
const db = new sqlite3.Database('../../src/db/url.db');

// Tabellenschema erstellen (nur einmal ausführen)

//ToDo: festen Speicherort URL DB
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS url (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      longURL TEXT NOT NULL,
      shortURL TEXT NOT NULL,
      passwd TEXT NOT NULL,
      browser_chrome INTEGER NOT NULL default 0,
      browser_firefox INTEGER NOT NULL default 0,
      browser_edge INTEGER NOT NULL default 0,
      browser_safari INTEGER NOT NULL default 0,
      browser_opera INTEGER NOT NULL default 0,
      browser_sonstige INTEGER NOT NULL default 0,
      os_win INTEGER NOT NULL default 0,
      os_mac INTEGER NOT NULL default 0,
      os_linux INTEGER NOT NULL default 0,
      lastClick INTEGER NOT NULL default 0,
      clicks INTEGER NOT NULL default 0,
      timestamp INTEGER
    )
  `);
});

const writeStats = (shortURL, stats) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE url SET browser_chrome = ?, browser_firefox = ?, browser_edge = ?, browser_safari = ?, browser_opera = ?, browser_sonstige = ?, os_win = ?, os_mac = ?, os_linux = ?, lastClick = ?, clicks = ?, timestamp = ? WHERE shortURL = ?',
      [
        stats.Browser.Chrome,
        stats.Browser.Firefox,
        stats.Browser.Edge,
        stats.Browser.Safari,
        stats.Browser.Opera,
        stats.Browser.Sonstige,
        stats.OS.Windows,
        stats.OS.MacOs,
        stats.OS.Linux,
        stats.lastClick,
        stats.clicks,
        new Date().toLocaleString(), // Konvertiere das Datum in ein menschenlesbares Format
        shortURL,
      ],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};


// const writeStats = (stats.shortURL, stats) => {
//   return new Promise((resolve, reject) => {
//     db.run(
//       'UPDATE url SET browser_chrome = ?, browser_firefox = ?, browser_edge = ?, browser_safari = ?, browser_opera = ?, browser_sonstige = ?, os_win = ?, os_mac = ?, os_linux = ?, lastClick = ?, clicks = ? WHERE shortURL = ?',
//       [stats.Browser.Chrome, stats.Browser.Firefox, stats.Browser.Edge, stats.Browser.Safari, stats.Browser.Opera, stats.Browser.Sonstige, stats.OS.Windows, stats.OS.MacOs, stats.OS.Linux, stats.lastClick, stats.clicks, shortURL],
//       (err) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve();
//         }
//       }
//     );
//   });
// };


  const saveURL = async (result) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO url (longURL, shortURL, passwd, timestamp) VALUES (?, ?, ?, ?)',
      [result.longUrl, result.shortUrl, result.passwd, Math.floor(new Date().getTime() / 1000)],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

saveURL({longUrl: 'https://www.google.de', shortUrl: 'abcde', passwd: '123456789012', timestamp: 1234567890})

function getURLbyShortURL(shortURL) {
  return new Promise((resolve, reject) => {
    db.get('SELECT longURL FROM url WHERE shortURL = ?', [shortURL], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

getURLbyShortURL('abcde').then((row) => console.log(row));

const getStats = async (shortURL) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM url WHERE shortURL = ?', [shortURL], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

getStats('abcde').then((row) => console.log(row));

const saveDatatoDB = async (shortURL, stats) => {
  return new Promise((resolve, reject) => {
    db.run(
      // 'UPDATE urls SET statistic = ? WHERE shortURL = ?',
      [JSON.stringify(stats), shortURL],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

module.exports = { saveURL, getStats, saveDatatoDB, writeStats };
