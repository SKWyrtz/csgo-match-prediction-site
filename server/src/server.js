const database = require('./database');
const utility = require('./utility');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server, {
  cors: {
    origin: '*'
  }
});

const PORT = process.env.PORT || 5000;

// server.use(express.json());

database.setupDB();
database.updateDatabase();
// setInterval(() => {
//   database.updateDatabase();
// }, 300000); // 5 min

app.get('/matchesData', async (req, res) => {
  console.log('/api get request');
  try {
    database.getAllMatches((err, matches) => {
      if (err) return console.error(err);
      res.json({ matches });
    });
  } catch (error) {
    console.error(error);
    throw (error);
  }
});

app.get('/predictionData', async (req, res) => {
  console.log('/predictions get request');
  const userID = 1; // TODO: Hardcoded, should be specified in url
  try {
    database.getAllPredictions(userID, (err, predictions) => {
      if (err) return console.error(err);
      const predictionsFormatted = utility.formatPredictionToObject(predictions);
      res.json({ predictionsFormatted });
    });
  } catch (error) {
    console.error(error);
    throw (error);
  }
});

io.on('connection', (socket) => {
  console.log('New Client Connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('prediction', (data) => {
    console.log(data);
    database.insertPrediction(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
