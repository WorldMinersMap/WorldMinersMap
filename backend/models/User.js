// backend/models/User.js

const mongoose = require('mongoose');

const MinerSchema = new mongoose.Schema({
  manufacturer: String,
  variant: String,
  hashrate: Number,
  numberOfDevices: Number,
  location: String,
  latitude: Number,
  longitude: Number,
});

const FacilitySchema = new mongoose.Schema({
  type: String,
  location: String,
  description: String,
  totalHashrate: Number,
  totalEnergizedMiners: Number,
  totalCapacity: Number,
  latitude: Number,
  longitude: Number,
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // New field to determine user type
  userType: {
    type: String,
    enum: ['Individual Miner', 'Mining Company', 'Hosting Provider'],
    required: true,
  },

  // Miners and Facilities
  miners: [MinerSchema],
  facilities: [FacilitySchema],

  // Individual Miner fields
  username: String,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  phoneNumber: String,
  company: String,
  jobTitle: String,
  personalLinkedIn: String,
  personalTwitter: String,
  personalTelegram: String,
  dateStartedMining: Date,
  description: String,

  // Mining Company or Hosting Provider fields
  companyName: String,
  companyLogo: String, // Updated from file path to Base64 string
  companyWebsite: String,
  companyAddress: String,
  companyLinkedIn: String,
  companyTwitter: String,
  companyTelegram: String,
});

module.exports = mongoose.model('User', UserSchema);
