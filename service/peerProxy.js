const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
    const socketServer = new WebSocketServer({ server: httpServer });

    socketServer.on('connection', (socket) => {

        socket.isAlive = true;
        console.log("websocket connected");

        socket.on('message', function message(data) {
            const message = data.toString();
            socketServer.clients.forEach((client) => {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
            console.log(message);
        });

        socket.on('pong', () => {
            socket.isAlive = true;
        });
    });

    setInterval(() => {
        socketServer.clients.forEach(function each(client) {
            if (client.isAlive === false) return client.terminate();

            client.isAlive = false;
            client.ping();
        });
    }, 10000);
}

module.exports = { peerProxy };