const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const { Stream } = require('stream');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

let clients = [];

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
  clients.push(socket);

  socket.on('stream', (stream) => {
    console.log('Recebido stream do cliente:', stream);

    // Aqui você pode manipular o stream conforme necessário
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
    clients = clients.filter((client) => client.id !== socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor WebSocket rodando na porta ${PORT}`);
});
