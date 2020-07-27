const {Model, DataTypes} = require('sequelize');

const sequelize = require('../db/connection');

class User extends Model {
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('admin', 'normal'),
        allowNull: false
    }
}, {
    tableName: 'user',
    sequelize,
    timestamps: false,
});

User.prototype.toJSON = function () {
    const user = {...this.get()};
    delete user.password;
    return user;
}

module.exports = User;

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *          - type
 *        properties:
 *          id:
 *            type: number
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email del usuario, debe ser unico.
 *          password:
 *            type: string
 *          type:
 *            type: string
 *            enum: [admin, normal]
 *            description: El tipo de usuario debe ser entre "admin" o "normal"
 *        example:
 *           name: Juan
 *           email: juan@mail.com
 *           password: contraseña
 *           type: admin
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      LoginResponse:
 *        type: object
 *        properties:
 *          token:
 *            type: string
 *          user:
 *            type: User
 *        example:
 *           token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *           user:
 *              id: 1
 *              name: Juan
 *              email: juan@mail.com
 *              type: admin
 *
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      LoginBody:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *          - type
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *          password:
 *            type: string
 *        example:
 *          email: juan@mail.com
 *          password: contraseña
 *
 */
