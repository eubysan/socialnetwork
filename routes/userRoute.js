const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

// Definiendo el controlador
const userController = new UserController();
// Vista home muestra todos los usuarios
router.get('/home', userController.getUsersView);

module.exports = router;
