import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import env from "react-dotenv";
import { io } from "socket.io-client";

import { Allotment } from "allotment";

import styled from "styled-components";
import TapControl from "./components/tap/TapControl";
import ConnectionStatusPanel from "./components/network/ConnectionStatus";
import RuleInterpreter from "./components/ruleInterpreter/RuleInterpreter";

import { setConnected } from "./redux/networkSlice";
import { setData } from "./redux/dataSlice";

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

  const isConnected = useSelector((state) => state.network.isConnected);

  const data = useSelector((state) => state.data);
  const isDirty = useSelector((state) => state.data.isDirty);

  useEffect(() => {
    socket.emit(isDirty ? "markDirty" : "markClean");
  }, [isDirty]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
      dispatch(setConnected(true));

      socket.emit("requestData");
    });

    socket.on("data", (data) => {
      if (data.updateEvent === "dirtied") return;

      console.log("Data update from Server!", data);
      dispatch(setData({ triggers: data.triggers, actions: data.actions }));
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");

      dispatch(setConnected(false));
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
            <ConnectionStatusPanel socketConnected={isConnected} />
          </DataPanel>
        </Allotment.Pane>
        <Allotment.Pane minSize={800} preferredSize={1650}>
          <Allotment vertical={true}>
            <Allotment.Pane preferredSize={750}>
              <DataPanel>
                <TapControl socket={socket} />
              </DataPanel>
            </Allotment.Pane>
            <Allotment.Pane>
              <DataPanel>
                <RuleInterpreter
                  triggers={data.triggers}
                  actions={data.actions}
                  isDirty={isDirty}
                />
              </DataPanel>
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
      </Allotment>
    </Wrapper>
  );
};

export default App;
