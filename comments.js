// create web server with express
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
// create web socket server with socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server);
// create redis client
const redis = require('redis');
const redisClient = redis.createClient();

// connect to redis server
redisClient.subscribe('comment-channel');

// listen to redis messages
redisClient.on('message', (channel, message) => {
  console.log('Message received: ' + message);
  io.emit(channel, message);
});

// serve static files from public folder
app.use(express.static('public'));

// start server
server.listen(3001, () => {
  console.log('Server listening on port 3001');
});


