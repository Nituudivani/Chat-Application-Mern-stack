const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);

const io = new Server(server, { 
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// realtime message code goes here
 const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {}
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
      users[userId] = socket.id;
      console.log("Hello",users);
  }

  io.emit("getOnline", Object.keys(users))

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
    delete users[userId];
    io.emit("getOnline", Object.keys(users));
  });
});

module.exports = { app, io, server, getReceiverSocketId };
