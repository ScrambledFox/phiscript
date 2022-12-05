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

const EMPTY_TRIGGER_ACTION_DATA = {
  who: "",
  what: "nothing",
  where: "",
};

let triggers = [EMPTY_TRIGGER_ACTION_DATA];
let actions = [EMPTY_TRIGGER_ACTION_DATA];

let isDirty = false;

const logData = () => {
  console.log("DATA: ", { triggers, actions, isDirty });
};

const sendDataUpdate = () => {
  io.emit("data", { triggers: triggers, actions: actions, isDirty: isDirty });
  console.log(`Sent data update to all clients.`);
};
setInterval(() => logData(), 1000);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

io.on("connection", (socket) => {
  console.log(`a user connected`);

  socket.on("requestData", () => sendDataUpdate());

  socket.on("updateData", (data) => {
    triggers = data.triggers;
    actions = data.actions;

    console.log("Triggers and Actions updated!", data);
    sendDataUpdate();
  });

  socket.on("addNewTrigger", () => {
    console.log("Trigger added!");
    triggers = [...triggers, EMPTY_TRIGGER_ACTION_DATA];

    sendDataUpdate();
  });

  socket.on("addNewAction", () => {
    console.log("Action added!");
    actions = [...actions, EMPTY_TRIGGER_ACTION_DATA];

    sendDataUpdate();
  });

  socket.on("removeTrigger", (index) => {
    console.log(`Trigger ${index} removed!`);
    let copy = [...triggers];
    copy.splice(index, 1);
    triggers = copy;

    sendDataUpdate();
  });

  socket.on("removeAction", (index) => {
    console.log(`Action ${index} removed!`);
    let copy = [...actions];
    copy.splice(index, 1);
    actions = copy;

    sendDataUpdate();
  });

  socket.on("markDirty", () => {
    console.log("Data is marked dirty!");
    isDirty = true;

    sendDataUpdate();
  });

  socket.on("markClean", () => {
    console.log("Data is marked clean!");
    isDirty = false;

    sendDataUpdate();
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Listening on *:${PORT}`);
});
