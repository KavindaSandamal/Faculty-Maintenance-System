const mongoose = require('mongoose');

// Define the notification schema
const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection, assuming you have a User model
    required: true
  },
  maintenanceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MaintenanceRequest', // Reference to the User collection, assuming you have a MaintenanceRequest model
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define the Notification model
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
