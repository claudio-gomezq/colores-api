const express = require('express');
const router = express.Router();

const {sendErrorIfValidationFails} = require('../middlewares/validation.middleware');
const authController = require('../controllers/auth.controller');

router.post('/login', [
    ...authController.loginValidation,
    sendErrorIfValidationFails,
    authController.login
]);

router.post('/register', [
    ...authController.registerValidation,
    sendErrorIfValidationFails,
    authController.register
]);

module.exports = router;