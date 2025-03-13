var socket = io();

$('#form').submit(function() {
    var message = $('#input').val();

    if (message) {
        console.log("message sent");
        socket.emit('chat message', message);
        $("#input").val("");
    }
    return false;
});

socket.on('chat message', function(msg) {
    console.log("recieved a message");
    $('#messages').append("<li>"+msg+"</li>");
    window.scrollTo(0, document.body.scrollHeight);
});