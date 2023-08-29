const express = require('express');
const router = express.Router();
const stats = require('./stats/stats');
const user = require ('./user/user');

router.use('/stats', stats);
router.use('/user', user);

module.exports = router;
