const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const MaintenanceRequest = require('../models/maintenanceRequest');

// Configure Google Cloud Storage
const storage = new Storage({
  keyFilename: "./fmms-42381.json",
  projectId: "fmms-423817", // Corrected project ID
});

const coolFilesBucket = storage.bucket("fmms_image"); // Corrected bucket instance

// Configure Multer to use memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // limit files to 5 MB
});

router.post('/maintenanceRequest', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const { department, place, issueType, priority, description } = req.body;

    // Save the file to Google Cloud Storage
    const blob = coolFilesBucket.file(Date.now() + path.extname(req.file.originalname));
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err) => {
      console.error('Blob stream error:', err);
      res.status(500).json({ error: 'Error uploading file' });
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${coolFilesBucket.name}/${blob.name}`;

      // Create a new maintenance request with the file URL
      const newMaintenanceRequest = new MaintenanceRequest({
        department,
        place,
        issueType,
        priority,
        image: publicUrl, // Store the URL in the database
        description,
        submittedBy: req.body.submittedBy, // Add submittedBy field
      });

      const savedMaintenanceRequest = await newMaintenanceRequest.save();

      res.json({ success: 'Maintenance Request Created Successfully', newMaintenanceRequest: savedMaintenanceRequest });
    });

    blobStream.end(req.file.buffer); // Use file buffer instead of file path
  } catch (error) {
    res.status(400).json({ message: 'Maintenance Request creation unsuccessful', error: error.message });
  }
});





// Get all maintenance requests
router.get('/maintenanceRequests', async (req, res) => {
  try {
    const maintenanceRequests = await MaintenanceRequest.find().exec();
    res.status(200).json({ success: true, existingMaintenanceRequests: maintenanceRequests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific maintenance request

router.get('/maintenanceRequest/:id', async (req, res) => {
  try {
    const requestId = req.params.id;
    const maintenanceRequest = await MaintenanceRequest.findById(requestId);

    if (!maintenanceRequest) {
      return res.status(404).json({ success: false, message: 'Maintenance Request not found' });
    }

    // Convert the Buffer to a base64-encoded string
    const imageBase64 = maintenanceRequest.image.toString('base64');

    // Create a new object with the image property set to the base64 string
    const maintenanceRequestWithBase64Image = {
      ...maintenanceRequest.toObject(),
      image: imageBase64,
    };

    return res.status(200).json({ success: true, maintenanceRequest: maintenanceRequestWithBase64Image });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Get all maintenance requests for a specific user
router.get('/maintenanceRequests/:submittedBy', async (req, res) => {
  try {
    const submittedBy = req.params.submittedBy;
    const maintenanceRequests = await MaintenanceRequest.find({ submittedBy }).exec();
    res.status(200).json({ success: true, existingMaintenanceRequests: maintenanceRequests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update a maintenance request
router.put('/maintenanceRequest/update/:id', async (req, res) => {
  try {
    await MaintenanceRequest.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
    res.status(200).json({ success: 'Maintenance Request Updated Successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a maintenance request
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
    // Find the maintenance request by ID
    const maintenanceRequest = await MaintenanceRequest.findById(req.params.id);

    // If maintenance request is not found, return 404
    if (!maintenanceRequest) {
      return res.status(404).json({ success: false, message: 'Maintenance request not found' });
    }

    // Update the status of the maintenance request to "On Going"
    maintenanceRequest.status = 'In Progress';
    await maintenanceRequest.save();

    // Send a success response
    res.status(200).json({ success: true, message: 'Maintenance request approved successfully' });
  } catch (error) {
    // If an error occurs, send a 500 internal server error response
    console.error('Error approving maintenance request:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/maintenanceRequest/:id/completed', async (req, res) => {
  try {
    // Find the maintenance request by ID
    const maintenanceRequest = await MaintenanceRequest.findById(req.params.id);

    // If maintenance request is not found, return 404
    if (!maintenanceRequest) {
      return res.status(404).json({ success: false, message: 'Maintenance request not found' });
    }

    // Update the status of the maintenance request to "On Going"
    maintenanceRequest.status = 'Completed';
    await maintenanceRequest.save();

    // Send a success response
    res.status(200).json({ success: true, message: 'Maintenance request approved successfully' });
  } catch (error) {
    // If an error occurs, send a 500 internal server error response
    console.error('Error approving maintenance request:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.get('/maintenanceRequest/ongoingMaintenance/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch ongoing maintenance requests associated with the provided userId
    const ongoingMaintenance = await MaintenanceRequest.find({ submittedBy: userId, status: 'In Progress' });
    
    res.status(200).json({ ongoingMaintenance });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ongoing maintenance requests' });
  }
});

router.post('/maintenanceRequest/sendNotification', async (req, res) => {
  try {
    const { userId, message } = req.body;

    // Here, you can implement the logic to send the notification to the user with the specified userId
    // This could involve sending an email, a push notification, or any other method of communication

    // For demonstration purposes, we'll simply log the notification details
    console.log(`Notification sent to user ${userId}: ${message}`);

    // Send a success response
    res.json({ success: true, message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: 'Failed to send notification' });
  }
});

router.post('/maintenanceRequest/:id/reject', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the maintenance request by ID
    const maintenanceRequest = await MaintenanceRequest.findById(id);

    if (!maintenanceRequest) {
      // If maintenance request is not found, return an error response
      return res.status(404).json({ success: false, message: 'Maintenance request not found' });
    }

    // Update the status of the maintenance request to "Rejected"
    maintenanceRequest.status = 'Rejected';
    await maintenanceRequest.save();

    // Return a success response
    res.status(200).json({ success: true, message: 'Maintenance request rejected successfully' });
  } catch (error) {
    // If an error occurs, return an error response
    console.error('Error rejecting maintenance request:', error);
    res.status(500).json({ success: false, message: 'Failed to reject maintenance request' });
  }
});


module.exports = router;
