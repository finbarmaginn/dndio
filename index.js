require('./db');

// mongoose.connect('mongodb://finbarmaginn:unsafepassword@ds137464.mlab.com:37464/dndio', {
//   // keepAlive: true,
//   // reconnectTries: Number.MAX_VALUE,
//   useMongoClient: true
// });

var mongoose = require('mongoose');
var Player = mongoose.model('User');
var functions = {};
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  port = (process.env.PORT || 5000),
  people = {},
  sess;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs")

functions.findPlayer = function(req, res, next) {
  var player;
  Player.find({
    username: req.body.username,
    password: req.body.password
  }, {
    username: 1
  }, function(error, players) {
    if (players.length) {
      player = players[0].username;
      res.send({
        path: "/chatter",
        username: player
      });
    }
  })
}

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.post('/login', functions.findPlayer)

app.get('/chatter', function(req, res) {
  res.render('pages/chatter')
});

io.on('connection', function(socket) {
  console.log('user ' + socket.id + ' connected');
  socket.on('disconnect', function() {
    console.log('user ' + socket.id + ' disconnected');
  });
  socket.on('chat message', function(msg) {
    var data = {
      msg: msg,
      usr: socket.id
    }
    io.emit('chat message', data);
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});
