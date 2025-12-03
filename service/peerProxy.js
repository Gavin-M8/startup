const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer) {
  const socketServer = new WebSocketServer({ server: httpServer });

  socketServer.on('connection', (socket) => {
    socket.isAlive = true;
    console.log("websocket connected");

    socket.on('message', (data) => {
      const message = JSON.parse(data.toString());

      if (message.type === "new_user") {
        socket.username = message.value;

        broadcastExceptSender(socketServer, socket, {
          type: "new_user",
          value: socket.username
        });

        return;
      }

      if (message.type === "activity") {
        broadcastExceptSender(socketServer, socket, {
          type: "activity",
          value: message.value
        });

        return;
      }
    });

    socket.on('close', () => {
        if (socket.username) {
            console.log(`${socket.username} disconnected`);

            broadcastExceptSender(socketServer, socket, {
            type: "user_left",
            value: socket.username 
            });
        }
        });


    socket.on('pong', () => {
      socket.isAlive = true;
    });

  });

  setInterval(() => {
    socketServer.clients.forEach((client) => {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

function broadcastExceptSender(server, senderSocket, message) {
  const json = JSON.stringify(message);

  server.clients.forEach((client) => {
    if (
      client.readyState === WebSocket.OPEN &&
      client !== senderSocket
    ) {
      client.send(json);
    }
  });
}

module.exports = { peerProxy };
