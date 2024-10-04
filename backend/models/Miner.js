const mongoose = require('mongoose');

const MinerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  machineType: String,
  hashRate: Number,
  location: {
    type: {
      type: String, // GeoJSON Point
      default: 'Point',
    },
    coordinates: [Number], // [longitude, latitude]
  },
});

MinerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Miner', MinerSchema);
