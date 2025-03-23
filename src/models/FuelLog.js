// src/models/FuelLog.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Vehicle = require('./Vehicle');

const FuelLog = sequelize.define('FuelLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  gallonsFilled: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  kilometersDriven: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
});

// Relationship: FuelLog belongs to a Vehicle
FuelLog.belongsTo(Vehicle);
Vehicle.hasMany(FuelLog);

module.exports = FuelLog;
