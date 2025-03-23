// src/routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authenticate = require('../middleware/auth');

router.use(authenticate); // Protect all routes

router.post('/', vehicleController.createVehicle);
router.get('/', vehicleController.getVehicles);
// Add routes for update (PUT/PATCH) and delete (DELETE)

module.exports = router;
