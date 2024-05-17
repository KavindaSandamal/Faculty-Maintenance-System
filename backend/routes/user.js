const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming your user model is named "User"

// Create a new user
router.post('/register/user', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ success: 'User Created Successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get('https://faculty-maintenance-system-api.vercel.app/users', async (req, res) => {
  try {
    const users = await User.find().exec();
    res.status(200).json({ success: true, existingUsers: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific user
router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Update a user
router.put('/user/update/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
    res.status(200).json({ success: 'User Updated Successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user
router.delete('/user/delete/:id', async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndRemove(req.params.id).exec();
    if (!deleteUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Delete Successful', deleteUser });
  } catch (error) {
    res.status(400).json({ message: 'Delete unsuccessful', error: error.message });
  }
});

router.post('/user/save', async (req, res) => {
  try {
    const newUser = new User(req.body);

    const savedUser = await newUser.save();

    res.json({ message: 'User Created Successfully', newUser: savedUser });
  } catch (error) {
    res.status(400).json({ message: 'User creation unsuccessful', error: error.message });
  }
});

router.post('https://faculty-maintenance-system-api.vercel.app/login', async (req, res) => {
  const { regNo, password } = req.body;

  try {
    const user = await User.findOne({ regNo });

    if (user && user.password === password) {
      res.status(200).json({ success: true, message: 'Login successful', user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'An error occurred while processing your request' });
  }
});



module.exports = router;
