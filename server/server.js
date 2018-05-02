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
    socket.emit('newMessage', {
        from: 'admin',
        text: 'welcome to this awesome chat app',
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'Say hi to the new user',
        createdAt: new Date().getTime()
    });
    socket.on('createMessage', (newMessage) => {
        console.log('new message received: ',newMessage);
        io.emit('newMessage',{
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage',{
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });
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


