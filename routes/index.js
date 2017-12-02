const express = require('express');
const userRoutes = require('./users');
const adminRoutes = require('./admin');
const appRoutes = require('./appRoute');

const router = express.Router();
router.use('/', appRoutes);
router.use('/user', userRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
