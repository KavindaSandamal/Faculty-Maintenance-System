const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  regNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  contactNumber: { type: String },
  role: { type: String, required: true }, // Student, Faculty Staff, Maintenance Staff, Admin, System Administrator
  department: { type: String },
  assignedRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MaintenanceRequest' }],
  // Add more fields as needed
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
