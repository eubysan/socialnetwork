const express = require('express');
const { pageHome, login, signup } = require('../controllers/pageController');
const router = express.Router();

router.get('/', login);
router.get('/signup', signup);

module.exports = router;
