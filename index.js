require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const quoteRoutes = require('./routes/quotes');

const app = express();

// Database connection
connection();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/quote', quoteRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Catch-all route for serving React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});

// Error handling
app.on('error', (error) => {
  console.error('Express server error:', error.message);
  process.exit(1); // Exit the process on error for better visibility
});
