/**
 * @function
 * Erstellt einen Kurzlink zur übergebenen URL
 * @param {string} url - Die zu kürzende URL
 * @returns {string} Kurz-URL
 * @author Markus Rennings <markus@rennings.net>
 */
function getShortUrl(url) {
  let shortUrl = '';
  // TODO: Url umwandeln
  // TODO: Prüfen, ob shortURL schon existiert:
    // TODO: Wenn für gleiche URL? ShortUrl zurückgeben
    // TODO: Wenn für andere URL? Neue ShortUrl generieren und erneut prüfen
    // TODO: Wenn nein, ShortUrl in DB eintragen und ShortUrl zurückgeben
    return shortUrl;
};

function getLongUrl(shortUrl) {
  let id = ''; // ID des DB-Eintrags
  // TODO: Statistiken bedienen
  const longUrl = ''; // TODO: ersetzen durch Datenbankabruf
  return LongUrl;
}

module.exports = { getShortUrl,
  getLongUrl 
};
