// backend/routes/feedback.js

const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Submit Feedback
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const feedback = new Feedback({ name, email, message });
    await feedback.save();
    res.status(200).json({ msg: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('Failed to submit feedback', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
