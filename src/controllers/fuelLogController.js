// src/controllers/fuelLogController.js
const FuelLog = require('../models/FuelLog');

exports.createFuelLog = async (req, res) => {
  try {
    console.log('Received request to create fuel log:', req.body);
    const { gallonsFilled, kilometersDriven, cost, VehicleId } = req.body;
    const fuelLog = await FuelLog.create({ gallonsFilled, kilometersDriven, cost, VehicleId });
    res.status(201).json(fuelLog);
  } catch (error) {
    res.status(500).json({ error: error.parent.detail });
    console.log('Error creating fuel log:', error.parent.detail);
  }
};

exports.getFuelLogs = async (req, res) => {
  try {
    // Optionally filter by VehicleId
    const fuelLogs = await FuelLog.findAll({ where: { VehicleId: req.query.VehicleId } });
    res.json(fuelLogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add update and delete methods as needed
