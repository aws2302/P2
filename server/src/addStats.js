'use strict';
// const log = require('./log');
const { writeStats } = require('./db/database');

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
        stats['browser_sonstige']++;
        break;
      case 'isOpera':
        stats['browser_opera']++;
        break;
      case 'isFirefox':
      case 'isSeaMonkey':
        stats['browser_firefox']++;
        break;
      case 'isEdge':
      case 'isIECompatibiltyMode':
        stats['browser_edge']++;
        break;
      case 'isSafari':
        stats['browser_safari']++;
        break;
      case 'isChrome':
        stats['browser_chrome']++;
        break;
      case 'isLinux' || 'isLinux64':
        stats['os_linux']++;
        break;
      case 'isMac':
        stats['os_mac']++;
        break;
      case 'isWindows':
        stats['os_win']++;
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
  writeStats(stats.shortURL, stats);
}

module.exports = addStats;
