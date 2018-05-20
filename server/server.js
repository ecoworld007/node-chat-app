const path = require('path');
const express = require('express');
const socketIO =  require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users.js');
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

io.on('connection', (socket) => {
    console.log('new client connected');
    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });
    socket.on('createMessage', (message, callback) => {
        console.log('new message received: ',message);
        let user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(message.from, message.text));
        }
        callback();
    });
    socket.on('createEmail', (newEmail) => {
        console.log('new email received: ',newEmail);
    });
    socket.on('disconnect', () => {
        console.log('client disconnected');
        let user = users.removeUser(socket.id);
        if(user){
            
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the group`));
        }
    });

    socket.on('join', (params, callback) => {
        let name = params.name;
        let room = params.room;
        if(isRealString(name) && isRealString(room)){
            socket.join(room);
            users.removeUser(socket.id);
            users.addUser(socket.id, name, room);
            socket.emit('newMessage', generateMessage('admin', 'welcome to this awesome chat app'));
            socket.broadcast.to(room).emit('newMessage',generateMessage('Admin', `${name} has joined the group`))
            io.to(room).emit('updateUserList', users.getUserList(room));
            callback();
        }else{
            callback('Name and Room are required input');
            console.log('error');
        }
    });
});

app.use(express.static(publicPath));

server.listen(PORT, () => {
    console.log('server listening on '+PORT);
});