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
