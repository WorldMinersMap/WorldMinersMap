// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth'); // Middleware to protect routes
const User = require('../models/User');

// Register User
router.post('/register', async (req, res) => {
  const { name, email, password, userType } = req.body;
  try {
    // Validate required fields
    if (!name || !email || !password || !userType) {
      return res.status(400).json({ msg: 'Please enter all required fields' });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      userType,
    });

    await user.save();

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Use environment variable for secret

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Use environment variable for secret

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get User Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update User Profile
router.put('/profile', auth, async (req, res) => {
  const profileFields = { ...req.body };

  try {
    let user = await User.findById(req.user.userId);

    if (user) {
      user = await User.findByIdAndUpdate(
        req.user.userId,
        { $set: profileFields },
        { new: true }
      ).select('-password');

      return res.json(user);
    } else {
      return res.status(404).json({ msg: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
