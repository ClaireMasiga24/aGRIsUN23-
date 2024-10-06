const mongoose = require('mongoose');

const EarthdataSchema = new mongoose.Schema({
    // Define your schema based on the structure of Earthdata API responses
    // Example:
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    // Add other relevant fields
    fetchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Earthdata', EarthdataSchema);
