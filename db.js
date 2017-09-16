var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: String,
  password: String
});
User.plugin(passportLocalMongoose);

mongoose.Promise = global.Promise;
mongoose.model('User', User)
mongoose.connect('mongodb://finbarmaginn:unsafepassword@ds137464.mlab.com:37464/dndio', {
  // keepAlive: true,
  // reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});


// !useful mongo commands!
//
// use myGame
// db.users.insert({username:"Finbar", password:"Maginn"})
// db.users.find({username:"Finbar"}, {password:1})
// db.users.find({username:"Finbar"})
// db.users.update({username: "Finbar"}, {$set:{password: "fubar"}})
//
// https://github.com/expressjs/session
// sharedsession = require("express-socket.io-session"),
//
