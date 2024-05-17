const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming you have a User model
const PendingRequest = require('../models/pendingRequest'); // Assuming you have a PendingRequest model

router.post('/admin/approve-request', async (req, res) => {
  try {
    const { id, status } = req.body;

    const pendingRequest = await PendingRequest.findById(id);
    if (!pendingRequest) {
      return res.status(404).json({ success: false, error: 'Pending request not found' });
    }

    if (status === 'approved') {
      const { fullName, email, regNo, role, department, contactNumber, password } = pendingRequest;
      const user = new User({ fullName, email, regNo, role, department, contactNumber, password });
      await user.save();
      await PendingRequest.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: 'Request approved and user created' });
    } else if (status === 'rejected') {
      await PendingRequest.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: 'Request rejected' });
    } else {
      res.status(400).json({ success: false, error: 'Invalid status' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

router.get('/admin/pending-requests', async (req, res) => {
    try {
      const pendingRequests = await PendingRequest.find();
      res.status(200).json({ success: true, pendingRequests });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });

module.exports = router;
