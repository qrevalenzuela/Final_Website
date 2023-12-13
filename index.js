// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { mongoose, connectToDatabase } = require('./db'); // Import both mongoose and connectToDatabase
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const quoteRoutes = require('./routes/quotes');
const path = require('path');

// Connect to the database
connectToDatabase();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/quote', quoteRoutes);

app.use(express.static(path.join(__dirname, './client/build')));

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

