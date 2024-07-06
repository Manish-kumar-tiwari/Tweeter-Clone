const express = require("express");
const http = require("http");

const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const getSocketId = (id) => {
  return userSocketMap[id];
};

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("Server connected", socket.handshake.query.userId);
  const userId = socket.handshake.query.userId;
  if (userId != undefined) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("disconnected");
    delete userSocketMap[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { server, app, io, getSocketId };
