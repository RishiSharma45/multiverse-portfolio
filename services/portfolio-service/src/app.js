const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();



// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);
app.use(express.json());

// Routes
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

const siteContentRoutes = require('./routes/siteContentRoutes');
app.use('/api/site-content', siteContentRoutes);

// const authRoutes = require('./routes/authRoutes');
// app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Portfolio Service Running 🚀');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Atlas Connected ✅');
  })
  .catch((error) => {
    console.error('MongoDB connection error ❌', error.message);
  });

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});