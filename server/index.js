const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  socket.on('join', function(room) {
    console.log('stanza'+room);
    socket.join(room);
    socket.on('message', async (message) => {
      io.to(room).emit('message', `${message}`);
      console.log(message);
    });
  });
  console.log("new connection ");
  

  io.to("some room").emit("some event");

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});


httpServer.listen(port, () => console.log(`listening on port ${port}`));