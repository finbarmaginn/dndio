var app = require('express')(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  mongojs = require("mongojs"),
  port = (process.env.PORT || 5000),
  users = [];

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
  users.push(socket.id);
  io.emit('user connected', users);
  console.log('user ' + socket.id + ' connected');

  socket.on("signin", function(data) {
    console.log(data);
    if (data.username === "finbarmaginn" && data.password === "finbarmaginn") {
      socket.emit("signinResponse", {
        success: true
      })
    } else socket.emit("signinResponse", {
      success: false
    })
  })

  socket.on('disconnect', function() {
    users.remove(socket.id)
    io.emit('user disconnect', users)
    console.log('user ' + socket.id + ' disconnected');
  });

  socket.on('chat message', function(msg) {
    var data = {
      'usr': socket.id,
      'msg': msg
    }
    io.emit('chat message', data)
  })
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});
