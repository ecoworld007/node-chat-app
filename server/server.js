const path = require('path');
const express = require('express');
const socketIO =  require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
    console.log('new client connected');
    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(PORT, () => {
    console.log('server listening on '+PORT);
});


