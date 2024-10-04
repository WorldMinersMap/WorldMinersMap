// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const minerRoutes = require('./routes/miners');
const feedbackRoutes = require('./routes/feedback');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/miners', minerRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/map', require('./routes/map'));
app.use('/api/feedback', feedbackRoutes);

// MongoDB Connection
mongoose
  .connect('mongodb://localhost:27017/bitcoin-miners', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
