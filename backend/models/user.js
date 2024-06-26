const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  regNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  contactNumber: { type: String },
  role: { type: String, required: true }, 
  department: { type: String },
  status: {type: String, required: true},
  assignedRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MaintenanceRequest' }],
}, { timestamps: true });

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
