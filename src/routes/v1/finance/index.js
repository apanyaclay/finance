const express = require('express');
const router = express.Router();
const account = require('./accountRoute');
const transaction = require('./transactionRoute');

router.use('/accounts', account);
router.use('/transactions', transaction);

module.exports = router;