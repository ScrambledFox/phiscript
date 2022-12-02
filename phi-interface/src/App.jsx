import React, { createContext, useEffect, useState } from "react";
import env from "react-dotenv";

import styled from "styled-components";

import { io } from "socket.io-client";

import FloorPlan from "./components/floorPlan/FloorPlan";
import RuleInterpreter from "./components/ruleInterpreter/RuleInterpreter";
import DebugInfo from "./components/debug/DebugInfo";

const socket = io(env.SOCKET_URL);

const Wrapper = styled.div`
  color: white;
`;

const App = () => {
  const [socketConnected, setSocketConnected] = useState(false);

  const [triggers, setTriggers] = useState([]);
  const [actions, setActions] = useState([]);

  // const SocketContext = createContext(socket);

  const requestTapData = () => {
    socket.emit("requestTapData");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
      setSocketConnected(true);

      requestTapData();
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setSocketConnected(false);
    });

    socket.on("tapUpdate", (data) => {
      console.log(data);
      setTriggers(data.triggers);
      setActions(data.actions);
    });

    return () => {
      socket.off("connect");
      socket.off("tapUpdate");
      socket.off("disconnect");
    };
  }, []);

  return (
    <Wrapper>
      {/* <SocketContext.Provider> */}
      <DebugInfo
        socket={socket}
        connected={socketConnected}
        triggers={triggers}
        actions={actions}
      />
      <FloorPlan />
      <RuleInterpreter triggers={triggers} actions={actions} />
      {/* </SocketContext.Provider> */}
    </Wrapper>
  );
};

export default App;
