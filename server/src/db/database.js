const sqlite3 = require('sqlite3').verbose();

// Verbindung zur SQLite-Datenbank herstellen
const db = new sqlite3.Database('../../src/db/url.db');

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
      timestamp INTEGER,
      expireDate INTEGER
    )
  `);
});

// Datenbankinformationen werden aktualisiert
const writeStats = (shortURL, stats) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE url SET browser_chrome = ?, browser_firefox = ?, browser_edge = ?, browser_safari = ?, browser_opera = ?, browser_sonstige = ?, os_win = ?, os_mac = ?, os_linux = ?, lastClick = ?, clicks = ? WHERE shortURL = ?',
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
  const currentTime = Date.now();
  const expireDate = currentTime + 90 * 24 * 60 * 60 * 1000; 

  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO url (longURL, shortURL, passwd, timestamp, expireDate) VALUES (?, ?, ?, ?, ?)',
      [result.longUrl, result.shortUrl, result.passwd, currentTime, expireDate],
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
    db.get('SELECT * FROM url WHERE shortURL = ?', [shortURL], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};



module.exports = { saveURL, getStats, writeStats, getURLbyShortURL };
