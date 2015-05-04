
module.exports.init = function(io){
  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function chatMessage(msg){
      console.log("A message is coming:", msg);
      io.emit('chat message', msg);
    });
  });
};
