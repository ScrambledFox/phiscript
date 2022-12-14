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

  const [isDirty, setIsDirty] = useState(false);

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
      console.log("Got new data from server!");
      setTriggers(data.triggers);
      setActions(data.actions);
      setIsDirty(data.isDirty);
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
      <RuleInterpreter
        triggers={triggers}
        actions={actions}
        isDirty={isDirty}
      />
    </Wrapper>
  );
};

export default App;
