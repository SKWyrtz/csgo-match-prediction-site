const webscrape = require('./webscrape');

const express = require('express');

const PORT = process.env.PORT || 5000;

const app = express();

app.get('/api', async (req, res) => {
  try {
    const matches = await webscrape.getUpcomingMatches();
    console.log(matches);
    res.json({ matches });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
