const express = require('express');
const router = express.Router();
const Review = require('../models/review'); 

router.post('/reviews', async (req, res) => {
  try {
    const { userId, notificationId, message } = req.body;

    const newReview = new Review({
      userId,
      notificationId,
      message
    });

    await newReview.save();

    res.status(201).json({ message: 'Review submitted successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting review', error });
  }
});

router.get('/reviews', async (req, res) => {
    const { notificationId, userId } = req.query;
    const filter = {};
    if (notificationId) filter.notificationId = notificationId;
    if (userId) filter.userId = userId;
  
    try {
      const reviews = await Review.find(filter)
        .populate('userId', 'fullName') 
        .populate('notificationId', 'message');
      res.json({ reviews });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
  });
  

module.exports = router;
