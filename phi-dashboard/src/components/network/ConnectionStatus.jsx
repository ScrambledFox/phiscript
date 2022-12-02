import React from "react";

import { BsFillXCircleFill, BsFillCheckCircleFill } from "react-icons/bs";

const ConnectionLabel = ({ connected }) => {
  return (
    <>
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
    </>
  );
};

const ConnectionStatusPanel = ({ socketConnected }) => {
  return (
    <>
      <ConnectionLabel connected={socketConnected} />
    </>
  );
};

export default ConnectionStatusPanel;
