const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

const app = express();

// Import routes
const userRoute = require('./routes/user');
const maintenanceRequestRoute = require('./routes/maintenanceRequest');
const notificationRoute = require('./routes/notification');

// Middleware
app.use(bodyParser.json());

// CORS Configuration
const corsOptions = {
    origin: ["https://faculty-maintenance-system-frontend.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Routes
app.use('/api', userRoute);
app.use('/api', maintenanceRequestRoute);
app.use('/api', notificationRoute);

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
        console.error('DB connection error:', err);
    });

// Error handling for unexpected errors
app.use((err, req, res, next) => {
    console.error('Unexpected error:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Server configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
