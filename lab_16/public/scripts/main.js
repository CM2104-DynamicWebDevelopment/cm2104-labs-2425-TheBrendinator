var socket = io();

$('#form').submit(function() {
    var message = $('#input').val();
    var username = $('#username').val();

    if (message && username) {
        console.log("message sent");
        socket.emit('chat message', username + ": " + message);
        $("#input").val("");
    }
    return false;
});

socket.on('chat message', function(msg) {
    console.log("recieved a message");
    $('#messages').append("<li>"+msg+"</li>");
    window.scrollTo(0, document.body.scrollHeight);
});