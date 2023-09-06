'use strict';
/**
 * @file Routen des Root-Verzeichnisses (host/)
 * @author Markus Rennings <markus@rennings.net>
 */

const router = require('express').Router();
const { createNewShortUrl, redirectToShortUrl } = require('../controller/rootContr');



router.get('/', (req, res) => {
  res.status(405).send('INVALID');
});

router.post('/', createNewShortUrl);
router.all('/:short', redirectToShortUrl);

module.exports = router;
