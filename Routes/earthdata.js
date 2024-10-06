// Routes/earthdata.js

const express = require('express');
const router = express.Router();
const earthdataService = require('../services/earthdataService');

// Route: POST /earthdata/fetch
router.post('/fetch', async (req, res) => {
    try {
        const { country, region, question } = req.body;

        if (!country || !region || !question) {
            return res.status(400).json({
                success: false,
                message: 'Missing required parameters: country, region, and question.',
            });
        }

        // Fetch data from Earthdata API
        const data = await earthdataService.fetchEarthdata({ country, region, question });

        // Optionally, store the data in MongoDB
        // const Earthdata = require('../models/Earthdata');
        // const newData = new Earthdata({ country, region, question, data });
        // await newData.save();

        // Send the data back to the client
        res.json({
            success: true,
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch data from Earthdata API.',
            error: error.message,
        });
    }
});

module.exports = router;
