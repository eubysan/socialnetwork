const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();
const authController = new AuthController();

router.get('/', authController.getLoginView);
router.get('/signup', authController.getSignupView);
router.post('/signup', authController.signUp);
<<<<<<< HEAD
router.get('/imbox', authController.getImboxView);
=======
router.get('/imbox',authController.getImboxView);
router.get('/newpost', authController.getNewPost);
>>>>>>> 6e53eddb69762b5db977a274007bd66d75542389
module.exports = router;
