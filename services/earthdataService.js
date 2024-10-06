// services/earthdataService.js

const axios = require('axios');
const qs = require('qs');
const dotenv = require('dotenv');

dotenv.config();

const EARTHDATA_API_URL = process.env.EARTHDATA_API_URL;
const EARTHDATA_USERNAME = process.env.EARTHDATA_USERNAME;
const EARTHDATA_PASSWORD = process.env.EARTHDATA_PASSWORD;

// Function to get Earthdata API token
const getEarthdataToken = async () => {
    // Replace with actual authentication mechanism as per Earthdata's documentation
    const tokenResponse = await axios.post(`${EARTHDATA_API_URL}/auth/token`, {
        username: EARTHDATA_USERNAME,
        password: EARTHDATA_PASSWORD,
    });

    return tokenResponse.data.access_token;
};

// Function to fetch data from Earthdata API based on user inputs
const fetchEarthdata = async ({ country, region, question }) => {
    try {
        const token = await getEarthdataToken();

        // Define parameters based on user selection
        let params = {};

        // Example: Adjust parameters based on the question
        switch (question) {
            case 'weather':
                params = {
                    country,
                    region,
                    dataType: 'weather',
                    // Add other necessary parameters
                };
                break;
            case 'soil':
                params = {
                    country,
                    region,
                    dataType: 'soil',
                    // Add other necessary parameters
                };
                break;
            case 'pests':
                params = {
                    country,
                    region,
                    dataType: 'pests',
                    // Add other necessary parameters
                };
                break;
            default:
                throw new Error('Invalid question type');
        }

        const response = await axios.get(`${EARTHDATA_API_URL}/data/endpoint`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: params,
            paramsSerializer: (params) => {
                return qs.stringify(params, { arrayFormat: 'repeat' });
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data from Earthdata API:', error.response ? error.response.data : error.message);
        throw error;
    }
};

module.exports = {
    fetchEarthdata,
};
