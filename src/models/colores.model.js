const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db/connection');

class Colores extends Model {}

Colores.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    color: DataTypes.INTEGER,
    pantone: DataTypes.INTEGER,
    year: DataTypes.INTEGER
}, {
    tableName: 'colores',
    sequelize,
    timestamps: false
});

module.exports = Colores;
