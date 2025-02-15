const express = require('express');
const { getAllUsers, updateUser, deleteUser } = require('../../../controllers/userController');
const { updateValidate } = require('../../../middlewares/validateUserMiddleware');
const router = express.Router();

router.get('/users', getAllUsers);
router.put('/users/:id', updateValidate, updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;