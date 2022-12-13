require("dotenv").config();

const path = require("path");

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const { MongoClient, ServerApiVersion } = require("mongodb");
const URI = `mongodb+srv://Joris:${process.env.MONGO_DB_PASSWORD}@user-study-1.xgiuqka.mongodb.net/?retryWrites=true&w=majority`;
const mongo = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.port || 3322;

app.use(express.static(path.resolve(__dirname, "../front/build")));

const connectToDb = async () => {
  console.log("Starting connection to MongoDB database...");
  await mongo.connect();

  await mongo.db("PhiScript-Generics").command({ ping: 1 });
  console.log("Connected to MongoDB database.");
};

const doPing = () => {
  io.emit("ping", "hello clients");
};

io.on("connection", (socket) => {
  console.log("Front connected.");

  socket.on("pong", (msg) => {});

  socket.on("processData", (data) => {
    const db = mongo.db("PhiScript-Generics");
    const pointCollection = db.collection("Points");

    pointCollection.insertOne({
      ...data,
      timestamp: Date.now(),
    });
  });

  socket.on("disconnect", () => {
    console.log("Front disconnected.");
  });

  socket.emit("ping", "hello front");
});

app.get("/health", (req, res) => {
  res.sendStatus(200);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server listening on *:${PORT}`);

  setInterval(doPing, 5000);
});

connectToDb();
