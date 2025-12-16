require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/messages", require("./routes/message"));

const io = require("socket.io")(server, {
  cors: { origin: "*" }
});

const Message = require("./models/Message");

const userToSocket = new Map(); // username -> socket.id
const socketToUser = new Map(); // socket.id -> username

io.on("connection", socket => {
  socket.on("join", username => {
    if (!username) return;
    userToSocket.set(username, socket.id);
    socketToUser.set(socket.id, username);
  });

  socket.on("sendMessage", async msg => {
    try {
      const m = new Message(msg);
      await m.save();
    } catch (err) {
      console.error("Failed to save message", err);
    }

    const receiverSocketId = userToSocket.get(msg.receiver);
    // emit to receiver if connected
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", msg);
    }
    // also emit to sender socket as ack (in case sender needs update)
    const senderSocketId = userToSocket.get(msg.sender);
    if (senderSocketId && senderSocketId !== receiverSocketId) {
      io.to(senderSocketId).emit("receiveMessage", msg);
    }
  });

  socket.on("disconnect", () => {
    const username = socketToUser.get(socket.id);
    if (username) userToSocket.delete(username);
    socketToUser.delete(socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
