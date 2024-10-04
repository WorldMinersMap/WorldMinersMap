const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Miner = require('../models/Miner');
const User = require('../models/User');

// Middleware to Authenticate
function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

// Add Miner
router.post('/', auth, async (req, res) => {
  const { machineType, hashRate, coordinates } = req.body;
  try {
    const miner = new Miner({
      user: req.user,
      machineType,
      hashRate,
      location: {
        type: 'Point',
        coordinates,
      },
    });
    await miner.save();
    res.json(miner);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get All Miners
router.get('/', async (req, res) => {
  try {
    const miners = await Miner.find().populate('user', ['name', 'isHostingProvider']);
    res.json(miners);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get Miner by ID
router.get('/:id', async (req, res) => {
  try {
    const miner = await Miner.findById(req.params.id).populate('user', ['name', 'isHostingProvider']);
    if (!miner) return res.status(404).json({ msg: 'Miner not found' });
    res.json(miner);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
