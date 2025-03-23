// src/models/Vehicle.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  make: DataTypes.STRING,
  model: DataTypes.STRING,
  year: DataTypes.INTEGER,
  standardKmPerLiter: DataTypes.FLOAT,
});

// Relationship: Vehicle belongs to a User
Vehicle.belongsTo(User);
User.hasMany(Vehicle);

module.exports = Vehicle;
