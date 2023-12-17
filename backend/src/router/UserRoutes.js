const express = require('express');
const router = express.Router();
const userController = require('../controller/usersController');

router.post('/users', userController.createUser); 
router.get('/users', userController.getAllUsers);         
router.get('/users/:id', userController.getUserById);     
router.patch('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.patch('/users/change-password/:id', userController.changePassword);




module.exports = router;
