import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import styled from "styled-components";
import GenericPane from "./components/genericPane/GenericPane";
import IntroForm from "./components/introForm/IntroForm";
import ResearchPane from "./components/research/Research";

import { socket } from "./service/socket";

const Wrapper = styled.div`
  height: 100vh;
`;

const App = () => {
  const participant = useSelector((state) => state.participant);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected.");
      socket.emit("hello", "front-end");
    });

    socket.on("disconnect", () => {
      console.log("disconnected from back!");
    });

    socket.on("ping", () => {
      socket.emit("pong", "reponse");
    });

    return () => {
      socket.off("connect");
      socket.off("ping");
      socket.off("disconnect");
    };
  }, []);

  return (
    <Wrapper>
      {participant.id === -1 && <IntroForm />}
      {participant.id !== -1 && <ResearchPane />}
    </Wrapper>
  );
};

export default App;
