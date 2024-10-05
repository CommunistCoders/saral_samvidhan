const express = require('express');
const cors = require('cors');
const axios = require('axios');
const env = require('dotenv');
const app = express();

app.use(cors()); // This will allow all origins

env.config();

// Replace 'YOUR_API_KEY' with your actual API key
const NEWS_API_URL = 'https://newsapi.org/v2/everything';
const API_KEY = process.env.NEWSAPI;

app.get('/news', async (req, res) => {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: 'law',
        from: '2024-09-05',
        sortBy: 'publishedAt',
        apiKey: API_KEY,
      },
    });
    console.log(response.data);
    res.json(response.data.articles);
  } catch (error) {
    console.error('Error fetching data from NewsAPI:', error);
    res.status(500).json({ error: 'Error fetching news' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
