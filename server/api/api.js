'use strict';
const router = require('express').Router();
const stats = require('./stats/stats');
const user = require('./user/user');

router.use('/stats', stats);
router.use('/user', user);

module.exports = router;
