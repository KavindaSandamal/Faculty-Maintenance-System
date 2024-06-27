const mongoose = require('mongoose');

const maintenanceRequestSchema = new mongoose.Schema({
  department: {
    type: String,
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
    type: String, 
    contentType: String, 
  },
  description: {
    type: String,
    required: true,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
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
