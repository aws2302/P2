

'use strict';
const {writeStats} = require('./db/database');
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

addStats({isChrome: true, isWindows: true}, {shortURL: 'abcde', clicks: 0, lastClick: 0, timestamp: 0, Browser: {Chrome: 0, Firefox: 0, Edge: 0, Opera: 0, Safari: 0, Sonstige: 0}, OS: {Linux: 0, MacOs: 0, Windows: 0}}
)


module.exports = addStats;
