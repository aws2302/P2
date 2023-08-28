const base58 = require('./base58');

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
  // TODO: Prüfen, ob shortURL schon existiert:
    // TODO: Wenn für gleiche URL? ShortUrl zurückgeben
    // TODO: Wenn für andere URL? Neue ShortUrl generieren und erneut prüfen
    // TODO: Wenn nein, ShortUrl in DB eintragen und ShortUrl zurückgeben
    return shortUrl;
}

function getLongUrl(shortUrl) {
  let id = ''; // ID des DB-Eintrags
  // TODO: Statistiken bedienen
  const longUrl = ''; // TODO: ersetzen durch Datenbankabruf
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
