const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const MaintenanceRequest = require('../models/maintenanceRequest');
require('dotenv').config();

const storageClient = new Storage({
  credentials: {
    client_email: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n'), 
  },
  projectId: process.env.GCP_PROJECT_ID,
});


const bucket = storageClient.bucket("fmms_image");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

router.post('/maintenanceRequest', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const { department, place, issueType, priority, description } = req.body;

    const blob = bucket.file(Date.now() + path.extname(req.file.originalname));
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err) => {
      console.error('Blob stream error:', err);
      res.status(500).json({ error: 'Error uploading file' });
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;


      const newMaintenanceRequest = new MaintenanceRequest({
        department,
        place,
        issueType,
        priority,
        image: publicUrl, 
        description,
        submittedBy: req.body.submittedBy, 
      });

      const savedMaintenanceRequest = await newMaintenanceRequest.save();

      res.json({ success: 'Maintenance Request Created Successfully', newMaintenanceRequest: savedMaintenanceRequest });
    });

    blobStream.end(req.file.buffer); 
  } catch (error) {
    res.status(400).json({ message: 'Maintenance Request creation unsuccessful', error: error.message });
  }
});


router.get('/maintenanceRequests', async (req, res) => {
  try {
    const maintenanceRequests = await MaintenanceRequest.find().exec();
    res.status(200).json({ success: true, existingMaintenanceRequests: maintenanceRequests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/maintenanceRequest/:id', async (req, res) => {
  try {
    const requestId = req.params.id;
    const maintenanceRequest = await MaintenanceRequest.findById(requestId);

    if (!maintenanceRequest) {
      return res.status(404).json({ success: false, message: 'Maintenance Request not found' });
    }

    const maintenanceRequestWithImageUrl = {
      ...maintenanceRequest.toObject(),
    };

    return res.status(200).json({ success: true, maintenanceRequest: maintenanceRequestWithImageUrl });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});


router.get('/maintenanceRequests/:submittedBy', async (req, res) => {
  try {
    const submittedBy = req.params.submittedBy;
    const maintenanceRequests = await MaintenanceRequest.find({ submittedBy }).exec();
    res.status(200).json({ success: true, existingMaintenanceRequests: maintenanceRequests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/maintenanceRequest/update/:id', async (req, res) => {
  try {
    await MaintenanceRequest.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
    res.status(200).json({ success: 'Maintenance Request Updated Successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/maintenanceRequest/delete/:id', async (req, res) => {
  try {
    const deleteMaintenanceRequest = await MaintenanceRequest.findByIdAndRemove(req.params.id).exec();
    if (!deleteMaintenanceRequest) {
      return res.status(404).json({ message: 'Maintenance Request not found' });
    }
    res.json({ message: 'Delete Successful', deleteMaintenanceRequest });
  } catch (error) {
    res.status(400).json({ message: 'Delete unsuccessful', error: error.message });
  }
});

router.post('/maintenanceRequest/save', async (req, res) => {
  try {
    const newMaintenanceRequest = new MaintenanceRequest(req.body);

    const savedMaintenanceRequest = await newMaintenanceRequest.save();

    res.json({ message: 'Maintenance Request Created Successfully', newMaintenanceRequest: savedMaintenanceRequest });
  } catch (error) {
    res.status(400).json({ message: 'Maintenance Request creation unsuccessful', error: error.message });
  }
});

router.post('/maintenanceRequest/:id/approve', async (req, res) => {
  try {
    const maintenanceRequest = await MaintenanceRequest.findById(req.params.id);

    if (!maintenanceRequest) {
      return res.status(404).json({ success: false, message: 'Maintenance request not found' });
    }

    maintenanceRequest.status = 'In Progress';
    await maintenanceRequest.save();

    res.status(200).json({ success: true, message: 'Maintenance request approved successfully' });
  } catch (error) {
    console.error('Error approving maintenance request:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/maintenanceRequest/:id/completed', async (req, res) => {
  try {
    const maintenanceRequest = await MaintenanceRequest.findById(req.params.id);
    if (!maintenanceRequest) {
      return res.status(404).json({ success: false, message: 'Maintenance request not found' });
    }

    maintenanceRequest.status = 'Completed';
    await maintenanceRequest.save();

    res.status(200).json({ success: true, message: 'Maintenance request approved successfully' });
  } catch (error) {
    console.error('Error approving maintenance request:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/maintenanceRequest/ongoingMaintenance/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const ongoingMaintenance = await MaintenanceRequest.find({ submittedBy: userId, status: 'In Progress' });
    
    res.status(200).json({ ongoingMaintenance });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ongoing maintenance requests' });
  }
});

router.post('/maintenanceRequest/sendNotification', async (req, res) => {
  try {
    const { userId, message } = req.body;
    console.log(`Notification sent to user ${userId}: ${message}`);
    res.json({ success: true, message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: 'Failed to send notification' });
  }
});

router.post('/maintenanceRequest/:id/reject', async (req, res) => {
  const { id } = req.params;

  try {
    const maintenanceRequest = await MaintenanceRequest.findById(id);

    if (!maintenanceRequest) {
      return res.status(404).json({ success: false, message: 'Maintenance request not found' });
    }

    maintenanceRequest.status = 'Rejected';
    await maintenanceRequest.save();

    res.status(200).json({ success: true, message: 'Maintenance request rejected successfully' });
  } catch (error) {
    console.error('Error rejecting maintenance request:', error);
    res.status(500).json({ success: false, message: 'Failed to reject maintenance request' });
  }
});


module.exports = router;
