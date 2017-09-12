var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];

Array.prototype.remove = function() {
  var what, a = arguments,
    L = a.length,
    ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  users.push(socket.id);
  io.emit('user connected', users)

  socket.on('disconnect', function() {
    console.log('a user disconnected');
    users.remove(socket.id)
    io.emit('user disconnect', users)
  });

  socket.on('chat message', function(msg) {
    var data = {
      'usr': socket.id,
      'msg': msg
    }
    io.emit('chat message', data)
  })
});

http.listen((process.env.PORT || 5000), function() {
  console.log('listening on *:' + (process.env.PORT || 5000));
});
