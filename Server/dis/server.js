"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const express = require('express');
const app = express();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: { origin: "*" }
});
io.on("connection", (socket) => {
    // ...
    console.log('a user connected');
    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
    });
});
httpServer.listen(8080, () => console.log('listening on http//localhost:8080'));
