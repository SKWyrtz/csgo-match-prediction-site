const database = require('./database');
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

io.on('connection', (socket) => {
  console.log('New Client Connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
