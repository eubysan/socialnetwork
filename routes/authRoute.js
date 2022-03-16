const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();
const authController = new AuthController();

router.get('/', authController.getLoginView);
router.post('/login', authController.logIn); 
router.get('/signup', authController.getSignupView);
router.post('/signup', authController.signUp);
router.post('/', authController.logOut);
router.get('/imbox', authController.getImboxView);
router.get('/imbox',authController.getImboxView);
router.get('/newpost', authController.getNewPost);
module.exports = router;
