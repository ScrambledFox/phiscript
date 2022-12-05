import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import env from "react-dotenv";
import { io } from "socket.io-client";

import { Allotment } from "allotment";

import styled from "styled-components";
import TapControl from "./components/tap/TapControl";
import ConnectionStatusPanel from "./components/network/ConnectionStatus";

import networkSlice, { setSocket, setConnected } from "./redux/networkSlice";
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

  const data = useSelector((state) => state.data);
  const isConnected = useSelector((state) => state.network.isConnected);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
      dispatch(setSocket(socket));
      dispatch(setConnected(true));

      socket.emit("requestData");
    });

    socket.on("data", (data) => {
      console.log("Updated data received:", data);
      dispatch(setData({ triggers: data.triggers, actions: data.actions }));
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");

      dispatch(setSocket(null));
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
        <Allotment.Pane minSize={200}>
          <DataPanel>
            <TapControl />
          </DataPanel>
        </Allotment.Pane>
      </Allotment>
    </Wrapper>
  );
};

export default App;
