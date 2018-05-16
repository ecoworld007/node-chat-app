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
    let formattedTime = moment(message.createdAt).format('h:mm a');
    console.log('new message: ',message);
    let li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`)
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    let formattedTime = moment(message.createdAt).format('h:mm a');
    console.log('new message: ',message);
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}  ${formattedTime}: `);
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
    let messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'user',
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val('');
    });
});

let locationButton = jQuery('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('unable to fetch location');
    });
});