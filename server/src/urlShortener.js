'use strict';
const base58 = require('./base58');
const addStats = require('./maintainStats');
const log = require('./log');

/**
 * Erstellt einen Kurzlink zur übergebenen URL
 * @param {string} url - Die zu kürzende URL
 * @returns {string} Kurz-URL
 * @author Markus Rennings <markus@rennings.net>
 */
function getShortUrl(url, user) {
  // ? DB-Operationen von hier aus? Wenn nein, wird user gebraucht? User Durchreichen?
  let date = Date.now()
    .toString()
    .slice(1,-2);
  const shortUrl = base58(parseInt(getRnd() + date));
  log.warn('//FIXME: Prüfen ob Eintrag existiert und andere DB-Operationen');
  // TODO: Wenn für gleiche URL und gleicher User? ShortUrl zurückgeben, created neu setzen?
  // TODO: Wenn für andere URL/anderer User? Neue ShortUrl generieren und erneut prüfen
  // TODO: Wenn nein, ShortUrl in DB eintragen und ShortUrl zurückgeben
  return shortUrl;
}

/**
 * 
 * @param {string} shortUrl - Die zu suchende Kurz-Url
 * @param {object} ua - DAs express.useragent-Objekt (für die Statistiken)
 * @returns {string} Long-Url
 */
function getLongUrl(shortUrl, ua) {
  let id = ''; // ID des DB-Eintrags, wenn nicht ID=Short-Url
  // TODO: Datenbankabruf für die Short-Url
  const longUrl='// FIXME: Ersetzen durch DB-Rückgabe'; 
  const stats = {FIXME: 'Ersetzen durch DB-Werte'};  // FIXME
  // TODO: Statistiken bedienen
  addStats(ua, stats);
  return longUrl;
}

/**
 *
 * @returns {String} Zufallswert zwischen 0-99
 * @author Markus Rennings <markus@rennings.net>
 */
const getRnd = () => (Math.floor(Math.random() * (99))).toString();

module.exports = { getShortUrl,
  getLongUrl 
};
