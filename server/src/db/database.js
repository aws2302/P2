const sqlite3 = require('sqlite3').verbose();

// Verbindung zur SQLite-Datenbank herstellen
const db = new sqlite3.Database('./url.db');

// Tabellenschema erstellen (nur einmal ausführen)
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

// Datenbankinformationen werden aktualisiert
const writeStats = (shortURL, stats) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE url SET browser_chrome = ?, browser_firefox = ?, browser_edge = ?, browser_safari = ?, browser_opera = ?, browser_sonstige = ?, os_win = ?, os_mac = ?, os_linux = ?, lastClick = ?, clicks = ? WHERE shortURL = ?',
      [
        stats.browser_chrome,
        stats.browser_firefox,
        stats.browser_edge,
        stats.browser_safari,
        stats.browser_opera,
        stats.browser_sonstige,
        stats.os_win,
        stats.os_mac,
        stats.os_linux,
        stats.lastClick,
        stats.clicks,
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


// URL in Datenbank speichern mit LongURL, ShortURL, Passwort und Zeitstempel
const saveURL = async (result) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO url (longURL, shortURL, passwd, timestamp) VALUES (?, ?, ?, ?)',
      [result.longUrl, result.shortUrl, result.passwd, Date.now()],
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


// LongURL anhand der ShortURL aus der Datenbank auslesen
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


// Statistiken anhand der ShortURL aus der Datenbank auslesen
const getStats = async (shortURL) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM url WHERE shortURL = ?',
      [shortURL],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
  });
};

// console.warn(getStats('6hXAgve'));

module.exports = { saveURL, getStats, writeStats, getURLbyShortURL };
