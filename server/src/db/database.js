/* eslint-disable no-unused-vars */
const log = require('../log');
function saveURL(short, long) {log.warn('saveURL: ', short, long); return true;}

function writeURL(obj) {log.warn('writeURL: ', obj); return true;}

function getURL(short) {return 'http://long.url/';}

function writeStats(short, obj) {
  log.warn('writeStats: ', obj);
  return true;
}

function getStats(short) {
  return {
    clicks: 0,
    lastClick: Date.now(),
    OS: {
      Linux: 0,
      Windows: 0,
      MacOs: 0,
    },
    Browser: {
      Chrome: 0,
      Edge: 0,
      Firefox: 0,
      Opera: 0,
      Safari: 0,
      Sonstige: 0,
    },
    createDate: 1693485952988,
    expireDate: 1696079966598,
    longURL: 'http://www.google.de/',
    shortURL: '1234567',
    Password: 'password'
  };
}

module.exports = { saveURL, writeURL, getURL, writeStats, getStats };
