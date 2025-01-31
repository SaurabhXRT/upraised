const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
class Gadgets extends Model {}
Gadgets.init(
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
        codename: {
            type: DataTypes.STRING,
            unique: true,
        },
        status: {
            type: DataTypes.ENUM('Available', 'Deployed', 'Destroyed', 'Decommissioned'),
            defaultValue: 'Available',
        },
        decommissionedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Gadgets',
        timestamps: true,
    }
);

module.exports = Gadgets;