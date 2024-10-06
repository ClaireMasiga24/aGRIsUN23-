const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // Ensure you require mongoose
const dotenv = require('dotenv'); // Require dotenv
const path = require('path'); // Import the path module
const axios = require('axios');
// Importing routes
const ussdRoutes = require('./Routes/ussd');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Use the USSD routes
app.use('/ussd', ussdRoutes); // Mount the USSD routes at the /ussd endpoint

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
