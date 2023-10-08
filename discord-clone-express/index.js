import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.sendFile(new URL("./index.html", import.meta.url).pathname);
});

io.on("connection", (socket) => {
  console.log("a user connected with id " + socket.id);

  // manage click event
  socket.on("globalchatsubmithandler", (msg) => {
    console.log(
      "User " +
        msg.userId +
        " sent message " +
        msg.message.text +
        " from socket : " +
        msg.message.socketId
    );

    io.emit("globalchatappend", msg);
  });

  socket.on("disconnect", (msg) => {
    console.log("Disconnedted : message: " + msg);
  });
});

server.listen(3001, () => {
  console.log("server running at http://localhost:3001");
});
