const database = require('./database');

const express = require('express');
const { json } = require('express');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

database.setupDB();
database.updateDatabase(); // TODO: call function in a interval eg every 5 min

app.get('/api', async (req, res) => {
  try {
    database.getAllMatches((err, matches) => {
      if (err) return console.error(err);
      console.log('/api was requested');
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
