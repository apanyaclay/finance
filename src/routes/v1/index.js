const express = require('express');
const router = express.Router();
const user = require('./user');
const finance = require('./finance');

router.use('', user);
router.use('', finance);

module.exports = router;
