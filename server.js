var app = require('express')();
var server = require('http').Server(app);
var io = require("socket.io")(server);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.sendfile('index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
