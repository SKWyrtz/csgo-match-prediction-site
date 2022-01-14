const database = require('./database');

const express = require('express');
const { json } = require('express');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

database.setupDB();
database.updateMatches();

app.get('/api', async (req, res) => {
  try {
    database.getAllMatches((err, matches) => {
      if (err) console.log(err);
      console.log('HALLO');
      res.json({ matches });
    });
  } catch (error) {
    console.log(error);
    throw (error);
  }
});

// app.get('/api', async (req, res) => {
//   try {
//     const matches = await webscrape.getUpcomingMatches();
//     //console.log(matches);
//     res.json({ matches });
//   } catch (error) {
//     console.log(error);
//   }
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
