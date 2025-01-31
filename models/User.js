const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
class User extends Model { }
User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isEmailverified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Users',
        timestamps: true,

    });

module.exports = User