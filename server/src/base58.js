'use strict';

/**
 * Mögliche Chars für die base58-Kodierung. Ausgelassen wurden – zur besseren
 * Lesbarkeit – 0 (Null), I (Großbuchstabe i), O (Großbuchstabe o) und 
 * l (Kleinbuchstabe L)
 * 
 * @constant
 * @author Markus Rennings <markus@rennings.net>
 */
const CHARS58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

/**
 * 
 * @param {int} num - Zu kodierende Zahl, >0
 * @returns {string} Base58-kodierte Eingabe
 * @author Markus Rennings <markus@rennings.net>
 */
function encode(num) {
  if (isNaN(num) || num % 1 !== 0 || num < 0) {
    // Keine Zahl, oder Float, oder < 0
    return false;
  } else if (num === 0) {
    return '0';
  } else {
    let id = '';
    while (num > 0) {
      id = CHARS58[(num % 58)] + id;
      num = Math.floor(num / 58);
    }
    return id;
  }
}

function isValidBase58(short) {
  for (const c of short) {
    if (!CHARS58.includes(c)) {
      return false;
    }
  }
  return true;
}

module.exports = { base58: encode, isValidBase58 };
