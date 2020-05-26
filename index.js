let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io').listen(server);

server.listen(4000);

app.get('/', (request, respons) => {
  respons.sendFile(__dirname + '/index.html');
});

connections = [];

io.sockets.on('connection', (socket) => {
  console.log('Connection');
  connections.push(socket);

  socket.on('disconnect', (data) => {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnection');
  });

  socket.on('send mess', (data) => {
    io.sockets.emit('add mess', {
      mess: data.mess,
      name: data.name,
      className: data.className,
    });
  });
});
