// backend/routes/map.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/locations', async (req, res) => {
  const { operationType } = req.query;

  try {
    let users;

    if (operationType && operationType !== 'All') {
      users = await User.find({ userType: operationType });
    } else {
      users = await User.find();
    }

    const locations = [];

    for (const user of users) {
      // Collect miner locations
      if (user.miners && user.miners.length > 0) {
        for (const miner of user.miners) {
          if (miner.location && miner.latitude && miner.longitude) {
            locations.push({
              latitude: miner.latitude,
              longitude: miner.longitude,
              name: `Miner of ${user.name}`,
              operationType: user.userType,
              type: 'miner',
              manufacturer: miner.manufacturer,
              variant: miner.variant,
              hashrate: miner.hashrate,
              numberOfDevices: miner.numberOfDevices,
              location: miner.location,
            });
          }
        }
      }

      // Collect facility locations
      if (user.facilities && user.facilities.length > 0) {
        for (const facility of user.facilities) {
          if (facility.location && facility.latitude && facility.longitude) {
            locations.push({
              latitude: facility.latitude,
              longitude: facility.longitude,
              name: `Facility of ${user.name}`,
              operationType: user.userType,
              type: 'facility',
              facilityType: facility.type,
              totalHashrate: facility.totalHashrate,
              totalEnergizedMiners: facility.totalEnergizedMiners,
              totalCapacity: facility.totalCapacity,
              description: facility.description,
              location: facility.location,
            });
          }
        }
      }
    }

    res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
