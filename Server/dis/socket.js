"use strict";
console.log('1');
const cors = require("cors");
app.use(cors({
    origin: '*'
}));
const socket = io('http://localhost:3000');
