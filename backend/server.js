const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Import routes
const userRoute = require('./routes/user');
const maintenanceRequestRoute = require('./routes/maintenanceRequest');
const notificationRoute = require('./routes/notification');
const reviewRoutes = require('./routes/review');

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: ["https://faculty-maintenance-system-frontend.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"]
}));

// Routes
app.use('/api', userRoute);
app.use('/api', maintenanceRequestRoute);
app.use('/api', notificationRoute);
app.use('/api', reviewRoutes);

// Default route for root path
app.get('/', (req, res) => {
    res.send('Welcome to the Faculty Maintenance System API');
});

// Database connection
const DB_URL = process.env.DB_URL || 'mongodb+srv://facultymaintenance:fmms123@fmms.zwouah7.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.error('DB connection error', err);
        process.exit(1);
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error' });
});

module.exports = app;
