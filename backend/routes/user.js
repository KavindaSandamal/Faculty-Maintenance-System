const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const bcrypt = require('bcrypt');

// Create a new user
router.post('/register/user', async (req, res) => {
  try {
    const {
      fullName,
      email,
      regNo,
      role,
      department,
      contactNumber,
      password,
      confirmPassword,
      status
    } = req.body;

    // Check if the registration number already exists
    const existingUser = await User.findOne({ regNo });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User exists, please enter a different registration number' });
    }

    // Create a new user with the provided data
    const newUser = new User({
      fullName,
      email,
      regNo,
      role,
      department,
      contactNumber,
      password,
      confirmPassword,
      status
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.json({ success: true, message: 'User created successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});




// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().exec();
    res.status(200).json({ success: true, existingUsers: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/user/approve/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { status: 'active' }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User approved successfully', user });
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
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

router.post('/login', async (req, res) => {
  const { regNo, password } = req.body;

  try {
    const user = await User.findOne({ regNo });

    if (user) {
      if (user.password.startsWith('$2b$')) {
        // Password is already hashed with bcrypt
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
          res.status(200).json({ success: true, message: 'Login successful', user });
        } else {
          res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
      } else {
        // Password is plaintext (for backward compatibility)
        if (user.password === password) {
          // Directly return user for login without updating password
          res.status(200).json({ success: true, message: 'Login successful', user });
        } else {
          res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
      }
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'An error occurred while processing your request' });
  }
});

module.exports = router;
