// src/controllers/fuelLogController.js
const FuelLog = require('../models/FuelLog');

exports.createFuelLog = async (req, res) => {
  try {
    const { gallonsFilled, kilometersDriven, cost, VehicleId } = req.body;
    const fuelLog = await FuelLog.create({ gallonsFilled, kilometersDriven, cost, VehicleId });
    res.status(201).json(fuelLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
