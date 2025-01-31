const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Verfication extends Model { }
Verfication.init(
    {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
    sequelize,
    modelName: 'Verifications',
    timestamps: true,
}
);
module.exports = Verfication;