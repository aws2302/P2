'use strict';
const log = require('./log');

/**
 * 
 * @param {object} ua - Express.UserAgent-Object
 * @param {object} stats - Statistik-Object aus der DB
 */
function addStats(ua, stats) {
  for (const key of Object.keys(ua)) {
    if (key === 'isAuthoritative') {
      continue;
    }

    if (ua[key]) {
      stats[key] ? stats[key]++ : stats[key] = 1;
    }
  }
  log.warn('//FIXME: Daten in DB schreiben');
}

module.exports = addStats;
