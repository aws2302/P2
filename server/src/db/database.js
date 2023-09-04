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
      Linux: 42,
      Windows: 23,
      MacOs: 20,
    },
    Browser: {
      Chrome: 23,
      Edge: 1,
      Firefox: 42,
      Opera: 11,
      Safari: 5,
      Sonstige: 3,
    },
    createDate: 1693485952988,
    expireDate: 1696079966598,
    longURL: 'http://localhost:8081/',
    shortURL: '1234567',
    Password: 'password'
  };
}

module.exports = { saveURL, writeURL, getURL, writeStats, getStats };
