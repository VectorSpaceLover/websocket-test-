var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile('E:/test.html');
});

var users = [];
io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('setUsername', function(data){
        if(users.indexOf(data) < 0){
            users.push(data);
            socket.emit('userSet', {'username': data});
        }else{
            socket.emit('userExists', data + ' username is taken! Try some other username.');
        }
    });

    socket.on('msg', function(data){
        io.sockets.emit('newmsg', data);
    })
})

http.listen(3000, function(){
    console.log('listening on *:3000');
})