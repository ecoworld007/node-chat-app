const path = require('path');
const express = require('express');
const socketIO =  require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
io.on('connection', (socket) => {
    console.log('new client connected');
    socket.emit('newEmail',generateMessage('mike@example.com', 'whats up?'));
    socket.emit('newMessage', {
        from: 'admin',
        text: 'welcome to this awesome chat app',
        createdAt: new Date().getTime()
    });
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });
    socket.on('createMessage', (newMessage, callback) => {
        console.log('new message received: ',newMessage);
        io.emit('newMessage',generateMessage(newMessage.from, newMessage.text));
        callback();
        // socket.broadcast.emit('newMessage',generateMessage(newMessage.from, newMessage.text));
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