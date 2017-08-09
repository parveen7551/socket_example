var express = require('express');
var app = express();

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

var port = 8000;

var io = require('socket.io').listen(app.listen(port));

io.on('connection', function (socket) {
    socket.emit('message', 'welcome to the chat' );
    socket.on('send', function (data) {
        console.log(data)
        io.sockets.emit('message', data);
    });    
});