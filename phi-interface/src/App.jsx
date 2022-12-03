import React, { useEffect, useState } from "react";
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

  const requestTapData = () => {
    socket.emit("requestData");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
      setSocketConnected(true);

      requestTapData();
    });

    socket.on("data", (data) => {
      console.log(data);
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
      <DebugInfo
        socket={socket}
        connected={socketConnected}
        triggers={triggers}
        actions={actions}
      />
      <FloorPlan />
      <RuleInterpreter triggers={triggers} actions={actions} />
    </Wrapper>
  );
};

export default App;
