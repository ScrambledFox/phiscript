import { useState } from "react";
import styled from "styled-components";

import { IoMdSettings } from "react-icons/io";
import { BsFillXCircleFill, BsFillCheckCircleFill } from "react-icons/bs";

const SettingsButton = styled.div`
  position: absolute;

  top: 25px;
  left: 25px;

  opacity: 0.2;
  transition: 0.2s;

  &:hover {
    cursor: pointer;

    opacity: 1;
    transition: 0.2s;
  }
`;

const Wrapper = styled.div`
  position: absolute;

  top: 25px;
  right: 25px;

  width: 25vw;

  border: 2px solid white;
  border-radius: 10px;

  background: black;

  margin: 10px;
  padding: 10px;
`;

const DataWrapper = styled.div`
  margin-top: 20px;
`;

const Data = styled.p`
  margin: 5px 0;
`;

const ConnectionLabel = ({ connected }) => {
  return (
    <Data>
      Socket status:{" "}
      {connected ? (
        <>
          <BsFillCheckCircleFill color="green" /> connected
        </>
      ) : (
        <>
          <BsFillXCircleFill color="red" /> disconnected
        </>
      )}
    </Data>
  );
};

const InterpreterInfo = ({ socket, triggers, actions }) => {
  // let socket = this.context;

  return (
    <DataWrapper>
      <Data>
        <button onClick={() => socket.emit("requestTapUpdate")}>Update</button>
      </Data>
      <Data>Trigger amount: {triggers.length}</Data>
      <Data>Action amount: {actions.length}</Data>
    </DataWrapper>
  );
};

const DebugInfo = ({ socket, connected, triggers, actions }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <SettingsButton>
        <IoMdSettings size={"3em"} onClick={toggleVisibility} />
      </SettingsButton>

      {visible && (
        <Wrapper>
          <ConnectionLabel connected={connected} />
          <InterpreterInfo
            socket={socket}
            triggers={triggers}
            actions={actions}
          />
        </Wrapper>
      )}
    </>
  );
};

export default DebugInfo;
