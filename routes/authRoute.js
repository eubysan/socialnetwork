const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();
const authController = new AuthController();

router.get('/', authController.getLoginView);
router.get('/signup', authController.getSignupView);
router.post('/signup', authController.signUp);
router.get('/imbox', authController.getImboxView);
module.exports = router;
