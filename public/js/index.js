let socket = io();
socket.on('connect', function() {
    console.log('connected to server');
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newEmail', function(email){
    console.log('new email',email);
});

socket.emit('createEmail', {
    from: 'mike@example.com',
    text: 'whats up?'
});

socket.on('newMessage', function(message){
    console.log('new message: ',message);
});