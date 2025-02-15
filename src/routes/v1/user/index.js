const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const user = require('./userRoute');

router.use('/auth', authRoute);
router.use('', user);

module.exports = router;