const express = require('express');
const router = express.Router();
const account = require('./accountRoutes');

router.use('/accounts', account);

module.exports = router;