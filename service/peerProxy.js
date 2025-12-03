// const { WebSocketServer } = require('ws');

// function peerProxy(httpServer) {
//     const socketServer = new WebSocketServer({ server: httpServer });

//     socketServer.on('connection', (socket) => {

//         socket.isAlive = true;
//         console.log("websocket connected");

//         socket.on('message', function message(data) {
//             const message = data.toString();
//             socketServer.clients.forEach((client) => {
//                 if (client !== socket && client.readyState === WebSocket.OPEN) {
//                     client.send(message);
//                 }
//             });
//             console.log(message);
//         });

//         socket.on('pong', () => {
//             socket.isAlive = true;
//         });
//     });

//     setInterval(() => {
//         socketServer.clients.forEach(function each(client) {
//             if (client.isAlive === false) return client.terminate();

//             client.isAlive = false;
//             client.ping();
//         });
//     }, 10000);
// }

// module.exports = { peerProxy };

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

        broadcast(socketServer, {
          type: "new_user",
          value: socket.username
        });

        return;
      }

      // handle other message types here
    });

    socket.on('close', () => {
      if (socket.username) {
        console.log(`${socket.username} disconnected`);

        broadcast(socketServer, {
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

function broadcast(server, message) {
  const json = JSON.stringify(message);

  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(json);
    }
  });
}

module.exports = { peerProxy };