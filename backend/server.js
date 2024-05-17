const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const userRoute = require('./routes/user');
const maintenanceRequestRoute = require('./routes/maintenanceRequest');
const notificationRoute = require('./routes/notification');

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: ["https://faculty-maintenance-system-frontend.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"]
}));

app.use('/api', userRoute);
app.use('/api', maintenanceRequestRoute);
app.use('/api', notificationRoute);

// Default route for root path
app.get('/', (req, res) => {
    res.send('Welcome to the Faculty Maintenance System API');
});

const DB_URL = 'mongodb+srv://facultymaintenance:fmms123@fmms.zwouah7.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_URL)
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => console.log('DB connection error', err));

module.exports = app;
