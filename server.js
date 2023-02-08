const express = require('express');
const WebSocket = require('ws');

const app = express();
const wsServ = new WebSocket.Server({ noServer: true });

app.use(express.static('dist'));

wsServ.on('connection', (ws) => {
  console.log("Client has connected");
  ws.on('message', (data, isBinary) => {
    wsServ.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

const server = app.listen(8000);
server.on('upgrade', (req, ws, head) => {
  wsServ.handleUpgrade(req, ws, head, (ws) => {
    wsServ.emit('connection', ws, req);
  });
});

