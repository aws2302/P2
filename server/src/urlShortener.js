'use strict';
const base58 = require('./base58');
const addStats = require('./maintainStats');
const { getStats } = require('./db/database');

// const log = require('./log');

/**
 * Erstellt einen Kurzlink zur übergebenen URL
 * @param {string} url - Die zu kürzende URL
 * @returns {string} Kurz-URL
 * @author Markus Rennings <markus@rennings.net>
 */
function getShortUrl() {
  // ? DB-Operationen von hier aus? Wenn nein, wird user gebraucht? User Durchreichen?
  let date = Date.now()
    .toString()
    .slice(1,-2);
  const shortUrl = base58(parseInt(getRnd() + date));
  return shortUrl;
}

/**
 * 
 * @param {string} shortUrl - Die zu suchende Kurz-Url
 * @param {object} ua - DAs express.useragent-Objekt (für die Statistiken)
 * @returns {string} Long-Url
 */
function getLongUrl(shortUrl, ua) {
  let stats = getStats(shortUrl);
  addStats(ua, stats);
  return stats.longURL;
}

/**
 *
 * @returns {String} Zufallswert zwischen 0-99
 * @author Markus Rennings <markus@rennings.net>
 */
const getRnd = () => (Math.floor(Math.random() * (99))).toString();

module.exports = { getShortUrl, getLongUrl };
