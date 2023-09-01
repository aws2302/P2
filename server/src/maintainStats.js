'use strict';
// const log = require('./log');
const { dataSave } = require('./db/database');

/**
 *
 * @param {object} ua - Express.UserAgent-Object
 * @param {object} stats - Statistik-Object aus der DB
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
      // ? Für mögliche Erweiterung der Statistik
      // case 'isMobile':
      // case 'isMobileNative':
      //   break;
      // case 'isiPhone':
      // case 'isiPhoneNative':
      //   break;
      // case 'isTablet':
      // case 'isiPad':
      //   // Tablet
      //   break;
      // case 'isDesktop':
      //   break;
      // case 'isSmartTV':
      //   // SmartTV
      //   break;
      // case 'isChromeOS':
      // ChromeOS
      // break;
      // case 'isAndroid':
      // case 'isAndroidNative':
      // case 'isAndroidTablet':
      //   // Android
      //   break;
      // case 'isSamsung':
      //   // Samsung
      //   break;
      // default:
      //   log.warn('Unknown key', key);
    }
  }
  stats['lastClick'] = Date.now();
  stats['clicks']++;
  dataSave(stats.shortURL, stats);
}

module.exports = addStats;
