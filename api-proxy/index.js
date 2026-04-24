require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;
const BASE_URL = `https://${RAPIDAPI_HOST}`;

app.use(cors());
app.use(express.json());

// Proxy endpoint: forwards all requests to RapidAPI YouTube v3
// Usage: GET http://localhost:4000/api/youtube/<youtube-endpoint>?<params>
// Example: GET http://localhost:4000/api/youtube/search?part=snippet&q=javascript
app.get('/api/youtube/:ytPath(*)', async (req, res) => {
  try {
    // Extract the YouTube API path after /api/youtube/
    const ytPath = req.params.ytPath;
    // Forward all query params from the frontend
    const queryParams = { ...req.query, maxResults: req.query.maxResults || '50' };

    const { data } = await axios.get(`${BASE_URL}/${ytPath}`, {
      params: queryParams,
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
      },
    });

    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error?.response?.data || error.message);
    res.status(error?.response?.status || 500).json({
      error: 'Failed to fetch from YouTube API',
      details: error?.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`API Proxy server running on http://localhost:${PORT}`);
});
