import { createServer } from "http";
import { Server } from "socket.io";

const express = require('express');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {origin: "*"}
});

io.on("connection", (socket) => {
  // ...
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)} said ${message}` );
  });
});

httpServer.listen(8080, () => console.log('listening on http//localhost:8080'));