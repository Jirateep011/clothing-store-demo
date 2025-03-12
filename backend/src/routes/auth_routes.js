const express = require('express');
const authController = require('../controllers/auth_controller');
const router = express.Router();

router.post('/register', authController.register);
router.post('/signin', authController.signin);
router.post('/logout', authController.logout);
router.post('/check-username', authController.checkUsername);
router.post('/check-email', authController.checkEmail);

module.exports = router;