import React, { useEffect, useState } from "react";
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

export const EMPTY_TRIGGER_ACTION_DATA = {
  who: "",
  what: "nothing",
  where: "",
};

const DataPanel = styled.div`
  margin: 25px;
`;

const App = () => {
  const [socketConnected, setSocketConnected] = useState(false);

  const [triggers, setTriggers] = useState([EMPTY_TRIGGER_ACTION_DATA]);
  const [actions, setActions] = useState([EMPTY_TRIGGER_ACTION_DATA]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
      setSocketConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setSocketConnected(false);
    });

    socket.on("requestTapData", () => {
      socket.emit("tapUpdate", { triggers: triggers, actions: actions });
    });

    return () => {
      socket.off("connect");

      socket.off("tapUpdate");

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
