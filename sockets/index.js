var socketio = require('socket.io');
var io = undefined;
var chat = require('./chat');

module.exports.io = function(server){
  io = socketio(server);
  chat.init(io);
  return io;
};