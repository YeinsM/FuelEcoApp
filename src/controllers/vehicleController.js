// src/controllers/vehicleController.js
const Vehicle = require('../models/Vehicle');

exports.createVehicle = async (req, res) => {
  try {
    // Assuming user id is available from authentication middleware
    const { make, model, year, standardKmPerLiter } = req.body;
    const vehicle = await Vehicle.create({ 
      make, model, year, standardKmPerLiter, UserId: req.user.id 
    });
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ where: { UserId: req.user.id } });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Similarly, add update and delete functions
