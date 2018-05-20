let socket = io();

let scrollToBottom = function(){
    let messages = jQuery('#messages');
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');

    let newMessage = messages.children('li:last-child');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if(scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
};

socket.on('connect', function() {
    let params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href='/';
        }else{
            console.log('NO error');
        }
    });
    console.log('connected to server');
});

socket.on('newEmail', function(email){
    console.log('new email',email);
});

socket.on('newMessage', function(message){
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message){
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template,{
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('updateUserList', function(users){
    let ol = jQuery('<ol></ol>');
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    let params = jQuery.deparam(window.location.search);
    let messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: params.name,
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