const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Change this to your frontend deployment URL
    methods: ["GET", "POST"],
  },
});

// In-memory storage for chat messages (Replace with database if needed)
const chatHistory = {};

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Handle joining a room
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);

    // Send past messages to the user
    if (chatHistory[room]) {
      socket.emit("chat_history", chatHistory[room]);
    } else {
      chatHistory[room] = []; // Initialize storage if not present
    }
  });

  // Handle sending messages
  socket.on("send_message", (data) => {
    const messageData = {
      room: data.room,
      sender: data.sender || "User",
      message: data.message,
      timestamp: new Date().toISOString(),
    };

    // Store the message in local in-memory storage
    chatHistory[data.room].push(messageData);

    // 🔥 **Fix: Send the same message back to the sender**
    socket.emit("receive_message", messageData);

    // 🔥 **Fix: Broadcast the message to other users in the room**
    socket.to(data.room).emit("receive_message", messageData);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(3001, () => {
  console.log("SERVER RUNNING on port 3001");
});
