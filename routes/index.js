const express = require('express');
const { pageHome, login, register } = require('../controllers/pageController');
const router = express.Router();

router.get('/', login);
router.get('/register', register);

module.exports = router;
