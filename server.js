const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');

// Importing routes
const ussdRoutes = require('./Routes/ussd');
const earthdataRoutes = require('./Routes/earthdata'); // Import Earthdata routes

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS (Cross-Origin Resource Sharing) if frontend is served from a different origin
const cors = require('cors');
app.use(cors());

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Use the USSD routes
app.use('/ussd', ussdRoutes); // Mount the USSD routes at the /ussd endpoint

// Use the Earthdata routes
app.use('/earthdata', earthdataRoutes); // Mount the Earthdata routes at the /earthdata endpoint

// Fallback for undefined routes
app.use((req, res, next) => {
    res.status(404).send('Sorry, this route does not exist.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
