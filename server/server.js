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
    socket.emit('newEmail',{
        from: 'mike@example.com',
        text: 'whats up?',
        createdAt: 123
    });
    socket.on('createMessage', (newMessage) => {
        console.log('new message received: ',newMessage);
    });
    socket.emit('newMessage',{
        from: 'mike@example.com',
        text: 'lunch after 2:00PM',
        createdAt: 123
    });
    socket.on('createEmail', (newEmail) => {
        console.log('new email received: ',newEmail);
    });
    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(PORT, () => {
    console.log('server listening on '+PORT);
});


