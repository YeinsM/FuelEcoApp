// src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to GasRecord Backend!');
});

// Import and use routes (to be defined in next steps)
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const fuelLogRoutes = require('./routes/fuelLogRoutes');
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/fuel-logs', fuelLogRoutes);

// Start the server after connecting to the DB
const PORT = process.env.PORT || 3000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => console.error('DB connection error:', err));

// At the bottom of src/app.js
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);


module.exports = app;
