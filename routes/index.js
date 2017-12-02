const express = require('express');
const userRoutes = require('./users');
const appRoutes = require('./appRoute');

const router = express.Router();
router.use('/', appRoutes);
router.use('/user', userRoutes);

module.exports = router;
