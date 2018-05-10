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
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`)
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    console.log('new message: ',message);
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

socket.emit('createMessage', {
    from: 'straw hat',
    text: 'wanna join the crew'
}, (message) => {
    console.log('got it.', message);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'user',
        text: jQuery('[name=message]').val()
    }, function(){
    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by browser');
    }
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        alert('unable to fetch location');
    });
});