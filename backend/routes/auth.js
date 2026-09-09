const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authControllers');
const isLoggedIn = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', passport.authenticate('local'), authController.login);
router.post('/logout', authController.logout);

router.get('/me', isLoggedIn, authController.getMe);

module.exports = router;