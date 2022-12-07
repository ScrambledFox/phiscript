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

const EMPTY_TRIGGER_DATA = {
  who: "",
  what: "nothing",
  where: "",
  connectorWord: "and",
};

const EMPTY_ACTION_DATA = {
  who: "",
  what: "nothing",
  where: "",
};

let triggers = [EMPTY_TRIGGER_DATA];
let actions = [EMPTY_ACTION_DATA];
let isDirty = false;

const logData = () => {
  console.log("DATA: ", { triggers, actions, isDirty });
};

const sendDataUpdate = (updateEvent) => {
  io.emit("data", {
    updateEvent,
    triggers: triggers,
    actions: actions,
    isDirty: isDirty,
  });
  console.log(`Sent data update to all clients.`);
};

const sendDirtyFlag = () => {
  io.emit("isDirty", isDirty);
  console.log(`Sent isDirty ${isDirty} flag!`);
};

app.get("/", (req, res) => {
  res.send({ triggers: triggers, actions: actions, isDirty: isDirty });
});

io.on("connection", (socket) => {
  console.log(`a user connected`);

  socket.on("requestData", () => sendDataUpdate("requested"));

  socket.on("updateData", (data) => {
    triggers = data.triggers;
    actions = data.actions;

    console.log("Triggers and Actions updated!", data);
  });

  socket.on("addNewTrigger", () => {
    console.log("Trigger added!");
    triggers = [...triggers, EMPTY_TRIGGER_DATA];

    sendDataUpdate("amountChange");
  });

  socket.on("addNewAction", () => {
    console.log("Action added!");
    actions = [...actions, EMPTY_ACTION_DATA];

    sendDataUpdate("amountChange");
  });

  socket.on("removeTrigger", (index) => {
    console.log(`Trigger ${index} removed!`);
    let copy = [...triggers];
    copy.splice(index, 1);
    triggers = copy;

    sendDataUpdate("amountChange");
  });

  socket.on("removeAction", (index) => {
    console.log(`Action ${index} removed!`);
    let copy = [...actions];
    copy.splice(index, 1);
    actions = copy;

    sendDataUpdate("amountChange");
  });

  socket.on("markDirty", () => {
    console.log("Data is marked dirty!");
    isDirty = true;

    sendDataUpdate("dirtied");
  });

  socket.on("markClean", () => {
    console.log("Data is marked clean!");
    isDirty = false;

    sendDataUpdate("cleaned");
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Listening on *:${PORT}`);
});
