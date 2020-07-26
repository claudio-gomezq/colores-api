const express = require('express');
const router = express.Router();

const passport = require('../auth/auth');
const {isUserAdmin} = require('../middlewares/auth.middleware');
const {sendErrorIfValidationFails} = require('../middlewares/validation.middleware');
const coloresController = require('../controllers/colores.controller');

/**
 * Listar todos los colores
 */
router.get('/', [
    ...coloresController.findAllValidations,
    sendErrorIfValidationFails,
    coloresController.findAll
]);

/**
 * Retorna un color por :id
 */
router.get('/:id', coloresController.findById);

/**
 * Crea un color
 */
router.post('/', [
    passport.authenticate('jwt', {session: false}),
    isUserAdmin,
    ...coloresController.saveValidations,
    sendErrorIfValidationFails,
    coloresController.create
]);

/**
 * Modifica un color por :id
 */
router.put('/:id', [
    passport.authenticate('jwt', {session: false}),
    isUserAdmin,
    ...coloresController.saveValidations,
    sendErrorIfValidationFails,
    coloresController.update
]);

/**
 * Elimina un color por :id
 */
router.delete('/:id', [
    passport.authenticate('jwt', {session: false}),
    isUserAdmin,
    coloresController.delete
]);

module.exports = router;
