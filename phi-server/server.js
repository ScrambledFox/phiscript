const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  origin: "any",
  cors: {
    methods: ["GET", "POST"],
  },
});

app.use(cors());

const PORT = 4949;

app.get("/", (req, res) => {
  res.sendStatus(200);
});

io.on("connection", (socket) => {
  console.log(`a user connected`);

  socket.onAny((event, args) => {
    console.log(`Broadcast: ${event}`);
    io.emit(event, args);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on *:${PORT}`);
});
