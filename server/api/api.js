'use strict';
const router = require('express').Router();
const stats = require('./stats/stats');
const doc = require('./doc/doc');
// const user = require('./user/user');

router.use('/stats', stats);
router.use('/doc', doc);
// router.use('/user', user);

module.exports = router;
