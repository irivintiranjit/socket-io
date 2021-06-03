const eventEmitter = require("events");
const myEmitter = new eventEmitter();
const express = require("express");
const app = express();
const http = require("http").Server(app);

var io = require("socket.io")(http); //Listening for open connection

http.listen(8080, () => {
  console.log("Server listening on port 8080");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.sockets.on("connection", (socket) => {
  console.log("websocket connection established");
  socket.emit("acknowledged", "Connection established successfully");
  socket.on("send message", (message) => {
    console.log("Message received from Browser", message);

    socket.emit("message ack");
  });
});
