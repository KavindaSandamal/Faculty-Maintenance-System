const mongoose = require('mongoose');

const maintenanceRequestSchema = new mongoose.Schema({
  department: {
    type: String,
    //required: true,
  },
  place: {
    type: String,
    required: true,
  },
  issueType: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer, // Change the type to Buffer to store binary data
    contentType: String, // Store the content type of the image
  },
  description: {
    type: String,
    required: true,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who submitted the request
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed','Rejected'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);

module.exports = MaintenanceRequest;
