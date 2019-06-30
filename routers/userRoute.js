const express = require('express');
const userController = require('../controllers/userControllers');

const router = express.Router();

router.route('/').get(userController.getAllUsers).post(userController.CreateUser);
router.route('/:id').get(userController.getUser).patch(userController.UpdateUser).delete(userController.DeleteUser);


module.exports = router;