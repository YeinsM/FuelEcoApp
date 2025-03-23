// src/routes/fuelLogRoutes.js
const express = require('express');
const router = express.Router();
const fuelLogController = require('../controllers/fuelLogController');
const authenticate = require('../middleware/auth');

router.use(authenticate);

router.post('/', fuelLogController.createFuelLog);
router.get('/', fuelLogController.getFuelLogs);
// Additional routes for update and delete

module.exports = router;
