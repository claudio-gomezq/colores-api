const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/connection');

class Color extends Model {}

Color.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING(7),
        allowNull: false,
    },
    pantone: DataTypes.STRING,
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'color',
    sequelize,
    timestamps: false
});

module.exports = Color;


/**
 * @swagger
 *  components:
 *    schemas:
 *      Color:
 *        type: object
 *        required:
 *          - name
 *          - color
 *          - year
 *        properties:
 *          id:
 *            type: number
 *          name:
 *            type: string
 *          color:
 *            type: string
 *            description: Color en formato hexadecimal por ejemplo '#000000'.
 *          year:
 *            type: number
 *        example:
 *           id: 1
 *           name: sand dollar
 *           color: #decdbe
 *           year: 2006
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      SaveColorBody:
 *        type: object
 *        required:
 *          - name
 *          - color
 *          - year
 *        properties:
 *          name:
 *            type: string
 *          color:
 *            type: string
 *            description: Color en formato hexadecimal por ejemplo '#000000'.
 *          year:
 *            type: number
 *        example:
 *           name: sand dollar
 *           color: #decdbe
 *           year: 2006
 */


/**
 * @swagger
 *  components:
 *    schemas:
 *      ColorPaginationResponse:
 *        type: object
 *        properties:
 *          totalPages:
 *            type: number
 *            description: Total de paginas.
 *          currentPage:
 *            type: number
 *            description: Pagina actual.
 *          totalItems:
 *            type: number
 *            description: Cantidad total de elementos.
 *          items:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Color'
 *        example:
 *           totalPages: 2
 *           currentPage: 1
 *           totalItems: 8,
 *           items: [...]
 */
