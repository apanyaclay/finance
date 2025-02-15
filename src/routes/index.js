const express = require('express');
const router = express.Router();
const v1 = require('./v1');

router.get('/', (req, res, next) => {
    res.status(200).json({'message': 'Server Running !!'});
});

router.use('/v1', v1);

module.exports = router;