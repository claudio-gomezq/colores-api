const express = require('express');
const router = express.Router();
const coloresController = require('../controllers/colores.controller');

/**
 * Listar todos los colores
 */
router.get('/', coloresController.findAll);

/**
 * Retorna un color por :id
 */
router.get('/:id', coloresController.findById);

/**
 * Crea un color
 */
router.post('/', coloresController.create);

/**
 * Modifica un color por :id
 */
router.put('/:id', coloresController.update);

/**
 * Elimina un color por :id
 */
router.delete('/:id', coloresController.delete);

module.exports = router;
