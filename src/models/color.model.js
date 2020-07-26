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
