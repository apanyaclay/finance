const express = require('express');
const { registerUser, loginUser } = require('../../../controllers/userController');
const { registerValidate, loginValidate } = require('../../../middlewares/validateUserMiddleware');
const router = express.Router();

router.post('/register', registerValidate, registerUser);
router.post('/login', loginValidate, loginUser);

module.exports = router;