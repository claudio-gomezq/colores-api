const express = require('express');
const router = express.Router();

const passport = require('../auth/auth');
const {isUserAdmin} = require('../middlewares/auth.middleware');
const {sendErrorIfValidationFails} = require('../middlewares/validation.middleware');
const coloresController = require('../controllers/colores.controller');


/**
 * @swagger
 * tags:
 *   name: Colores
 *   description: Administración de colores
 */


/**
 * @swagger
 * path:
 *  /colores/:
 *    get:
 *      summary: Obtiene todos los colores paginados
 *      tags: [Colores]
 *      parameters:
 *        - $ref: '#/components/parameters/responseTypeParam'
 *        - sizeParam:
 *          in: query
 *          name: size
 *          required: false
 *          default: 6
 *          schema:
 *              type: number
 *          description: Define el tamaño de la paginación
 *
 *        - pageParam:
 *          in: query
 *          name: page
 *          required: false
 *          default: 1
 *          schema:
 *              type: number
 *          description: Define la posicion en la paginación
 *      responses:
 *        "200":
 *          description: Retorna valores importantes de paginacion y la lista de colores
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ColorPaginationResponse'
 *        "500":
 *          description: Error del servidor
 *
 */
router.get('/', [
    ...coloresController.findAllValidations,
    sendErrorIfValidationFails,
    coloresController.findAll
]);

/**
 * @swagger
 * path:
 *  /colores/{id}:
 *    get:
 *      summary: Obtiene un color segun el id
 *      tags: [Colores]
 *      parameters:
 *          - $ref: '#/components/parameters/responseTypeParam'
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *            description: Identificador numerico para cada color
 *      responses:
 *        "200":
 *          description: Retorna el color segun el id
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Color'
 *        "404":
 *          description: Ocurre cuando el id no existe en la base de datos
 *        "500":
 *          description: Error del servidor
 *
 */
router.get('/:id', coloresController.findById);

/**
 * @swagger
 * path:
 *  /colores:
 *    post:
 *      summary: Crea un nuevo Color en la base de datos
 *      tags: [Colores]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - $ref: '#/components/parameters/responseTypeParam'
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SaveColorBody'
 *      responses:
 *        "200":
 *          description: Retorna el Color creado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Color'
 *        "400":
 *          description: Ocurre cuando el formato del body es incorrecto
 *        "401":
 *          $ref: '#/components/responses/UnauthorizedError'
 *        "500":
 *          description: Error del servidor
 *
 */
router.post('/', [
    passport.authenticate('jwt', {session: false}),
    isUserAdmin,
    ...coloresController.saveValidations,
    sendErrorIfValidationFails,
    coloresController.create
]);

/**
 * @swagger
 * path:
 *  /colores/{id}:
 *    put:
 *      summary: Actualiza un color segun el id
 *      tags: [Colores]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - $ref: '#/components/parameters/responseTypeParam'
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *            description: Identificador numerico para cada color
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SaveColorBody'
 *      responses:
 *        "200":
 *          description: Retorna el color actualizado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Color'
 *        "400":
 *          description: Ocurre cuando el body es incorrecto
 *        "401":
 *          $ref: '#/components/responses/UnauthorizedError'
 *        "404":
 *          description: Ocurre cuando el id no existe en la base de datos
 *        "500":
 *          description: Error del servidor
 *
 */
router.put('/:id', [
    passport.authenticate('jwt', {session: false}),
    isUserAdmin,
    ...coloresController.saveValidations,
    sendErrorIfValidationFails,
    coloresController.update
]);

/**
 * @swagger
 * path:
 *  /colores/{id}:
 *    delete:
 *      summary: Elimina un color segun el id
 *      tags: [Colores]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - $ref: '#/components/parameters/responseTypeParam'
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *            description: Identificador numerico para cada color
 *      responses:
 *        "204":
 *          description: El color se elimino correctamente
 *        "401":
 *          $ref: '#/components/responses/UnauthorizedError'
 *        "404":
 *          description: Ocurre cuando el id no existe en la base de datos
 *        "500":
 *          description: Error del servidor
 *
 */
router.delete('/:id', [
    passport.authenticate('jwt', {session: false}),
    isUserAdmin,
    coloresController.delete
]);

module.exports = router;
