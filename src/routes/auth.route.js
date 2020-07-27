const express = require('express');
const router = express.Router();

const {sendErrorIfValidationFails} = require('../middlewares/validation.middleware');
const authController = require('../controllers/auth.controller');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuario
 * components:
 *   parameters:
 *      responseTypeParam:
 *          in: query
 *          name: responseType
 *          required: false
 *          default: json
 *          schema:
 *              type: string
 *              enum: [json, xml]
 *          description: Define el formato de la respuesta, si es responseType=xml, el servidor retornará un XML
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: El token no existe o es invalido
 */


/**
 * @swagger
 * path:
 *  /login/:
 *    post:
 *      summary: Ingreso de usuario
 *      tags: [Auth]
 *      parameters:
 *          - $ref: '#/components/parameters/responseTypeParam'
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginBody'
 *      responses:
 *        "200":
 *          description: Retorna un token y el usuario ingresado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LoginResponse'
 *        "400":
 *          description: Ocurre cuando el request body es incorrecto
 *        "404":
 *          description: Ocurre cuando el email no existe en la base de datos
 *
 */
router.post('/login', [
    ...authController.loginValidation,
    sendErrorIfValidationFails,
    authController.login
]);

/**
 * @swagger
 * path:
 *  /register/:
 *    post:
 *      summary: Registro de usuario
 *      tags: [Auth]
 *      parameters:
 *          - $ref: '#/components/parameters/responseTypeParam'
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "201":
 *          description: Crea un nuevo usuario en la base de datos
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        "400":
 *          description: Ocurre cuando el request body es incorrecto o el email ya existe
 *        "500":
 *          description: Error al crear usuario
 *
 */
router.post('/register', [
    ...authController.registerValidation,
    sendErrorIfValidationFails,
    authController.register
]);

module.exports = router;