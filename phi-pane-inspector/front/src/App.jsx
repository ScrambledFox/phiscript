import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import IntroForm from "./components/introForm/IntroForm";
import ResearchPane from "./components/research/Research";
import { setPoints } from "./redux/researchSlice";

import { socket } from "./service/socket";

const Wrapper = styled.div``;

const App = () => {
  const dispatch = useDispatch();

  const participant = useSelector((state) => state.participant);
  const research = useSelector((state) => state.research);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected.");
      socket.emit("hello", "front-end");
    });

    socket.on("disconnect", () => {
      console.log("disconnected from back!");
    });

    socket.on("data", (data) => {
      console.log(data);
      dispatch(setPoints(data));
    });

    socket.on("ping", () => {
      socket.emit("pong", "reponse");
    });

    return () => {
      socket.off("connect");
      socket.off("ping");
      socket.off("disconnect");
      socket.off("data");
    };
  }, []);

  return (
    <Wrapper>
      <ResearchPane />
    </Wrapper>
  );
};

export default App;
