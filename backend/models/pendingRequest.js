const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PendingRequestSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  regNo: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  contactNumber: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('PendingRequest', PendingRequestSchema);
