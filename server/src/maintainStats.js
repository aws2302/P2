'use strict';
const fs = require('fs');
const path = require('path');
const { writeStats } = require('./db/database');
const sqlite3 = require('sqlite3').verbose(); // Importieren des SQLite-Moduls

// Verwenden Sie den absoluten Pfad zur 'url.db'-Datei
const dbFilePath = path.join(__dirname, 'db', 'url.db');

// Check if the 'url.db' file exists in the '/db' folder
if (!fs.existsSync(dbFilePath)) {
  // If it doesn't exist, create the 'url.db' file
  fs.writeFileSync(dbFilePath, '');

  // Initialize SQLite database with tables as defined in 'database.js'
  const db = new sqlite3.Database(dbFilePath);

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

  db.close();
}

/**
 *
 * @param {object} ua - Express.UserAgent-Object
 * @param {object} stats - Statistik-Object aus der DB
 * @param {function} writeStats - Eine Funktion, um die Statistikdaten in die DB zu schreiben
 * @author Markus Rennings <markus@rennings.net>
 */
function addStats(ua, stats) {
  for (const [key, value] of Object.entries(ua)) {
    if (!key.startsWith('is') || !value) {
      continue;
    }

    switch (key) {
      case 'isFacebook':
      case 'isAlamoFire':
      case 'isElectron':
      case 'isIE':
      case 'isKonqueror':
      case 'isWebkit':
      case 'isPhantomJS':
      case 'isEpiphany':
      case 'isWinJS':
      case 'isCurl':
      case 'isBlackberry':
      case 'isKindleFire':
      case 'isSilk':
      case 'isSilkAccelerated':
      case 'isBot':
        stats['Browser']['Sonstige']++;
        break;
      case 'isOpera':
        stats['Browser']['Opera']++;
        break;
      case 'isFirefox':
      case 'isSeaMonkey':
        stats['Browser']['Firefox']++;
        break;
      case 'isEdge':
      case 'isIECompatibiltyMode':
        stats['Browser']['Edge']++;
        break;
      case 'isSafari':
        stats['Browser']['Safari']++;
        break;
      case 'isChrome':
        stats['Browser']['Chrome']++;
        break;
      case 'isLinux' || 'isLinux64':
        stats['OS']['Linux']++;
        break;
      case 'isMac':
        stats['OS']['MacOs']++;
        break;
      case 'isWindows':
        stats['OS']['Windows']++;
        break;
    }
  }
  stats['lastClick'] = Date.now();
  stats['clicks']++;
  writeStats(stats.shortURL, stats);
}

addStats({ isChrome: true, isWindows: true }, { shortURL: 'abcde', clicks: 0, lastClick: 0, timestamp: 0, Browser: { Chrome: 0, Firefox: 0, Edge: 0, Opera: 0, Safari: 0, Sonstige: 0 }, OS: { Linux: 0, MacOs: 0, Windows: 0 } });

module.exports = addStats;
