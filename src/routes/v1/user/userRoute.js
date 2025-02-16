const express = require('express');
const { getAllUsers, updateUser, deleteUser } = require('../../../controllers/userController');
const { updateValidate } = require('../../../middlewares/validateUserMiddleware');
const { authMiddleware } = require('../../../middlewares/authMiddleware');
const router = express.Router();

router.get('/users', authMiddleware, getAllUsers);
router.put('/users', authMiddleware, updateValidate, updateUser);
router.delete('/users', authMiddleware, deleteUser);

module.exports = router;