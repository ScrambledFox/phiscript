import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import env from "react-dotenv";
import { io } from "socket.io-client";

import { Allotment } from "allotment";

import styled from "styled-components";
import TapControl from "./components/tap/TapControl";
import ConnectionStatusPanel from "./components/network/ConnectionStatus";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  color: white;
`;

const socket = io(env.SOCKET_URL);

const DataPanel = styled.div`
  margin: 25px;
`;

const App = () => {
  const dispatch = useDispatch();

  const updateDataOnEnter = ({ key }) => {
    if (key !== "Enter") return;

    console.log("Updating data!", new Date().getTime(), {
      triggers: triggers,
      actions: actions,
    });

    socket.emit("updateData", { triggers: triggers, actions: actions });
  };

  useEffect(() => {
    document.addEventListener("keydown", updateDataOnEnter);

    return () => {
      document.removeEventListener("keydown", updateDataOnEnter);
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
      setSocketConnected(true);

      socket.emit("requestData");
    });

    socket.on("data", (data) => {
      console.log("Updated data received:", data);
      setTriggers(data.triggers);
      setActions(data.actions);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setSocketConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("data");
      socket.off("disconnect");
    };
  }, []);

  return (
    <Wrapper>
      <Allotment>
        <Allotment.Pane minSize={200}>
          <DataPanel>
            <ConnectionStatusPanel socketConnected={socketConnected} />
          </DataPanel>
        </Allotment.Pane>
        <Allotment.Pane minSize={200}>
          <DataPanel>
            <TapControl
              socket={socket}
              triggers={triggers}
              actions={actions}
              setTriggers={setTriggers}
              setActions={setActions}
            />
          </DataPanel>
        </Allotment.Pane>
      </Allotment>
    </Wrapper>
  );
};

export default App;
