const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = '';

    // Initial menu
    if (text === '') {
        response = 'CON Welcome to the Rice Farmer Info Service\n';
        response += '1. Uganda\n';
        response += '2. Kenya\n';
        response += '3. Tanzania\n';
    } 
    // Country selection
    else if (text === '1') {
        response = 'CON Select your district:\n';
        response += '1. Mukono\n';
        response += '2. Kampala\n';
        response += '3. Jinja\n';
    } 
    // District selection
    else if (text === '1*1') {
        response = 'CON What information do you need?\n';
        response += '1. Weather Today\n';
        response += '2. Soil Sunshine\n';
        response += '3. Soil Rainfall\n';
        response += '4. Pests and Diseases\n';
    } 
    // Process other inquiries
    else if (text.startsWith('1*1*')) {
        const inquiryType = text.split('*')[2];
        response = 'END Here is the information you requested...\n';
        response += `You selected: ${inquiryType}`; // Here you would integrate with NASA datasets
        // Generate response based on inquiry type
    } 
    // Add other inquiries as needed...

    res.set('Content-Type', 'text/plain');
    res.send(response);
});

module.exports = router;
