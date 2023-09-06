'use strict';
/*
 * @file Routen/Endpunkte zur Statistik der einzelnen Shortlinks
 * @author Markus Rennings <markus@rennings.net>
 */

const router = require('express').Router();
const statsForShortUrl = require('../../controller/statsContr');

router.post('/', statsForShortUrl);

module.exports = router;
