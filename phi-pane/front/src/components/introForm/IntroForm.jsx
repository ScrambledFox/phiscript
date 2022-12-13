import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setId } from "../../redux/participantSlice";

import Image from "../../media/Pane Explination white.png";
import { useSnackbar } from "notistack";

const Wrapper = styled.div`
  background: #222;

  border: 2px solid gray;
  border-radius: 25px;

  width: 50vw;

  // Centering
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-align: center;

  h1 {
    display: block;
  }

  div {
    margin: 10px;
  }

  button {
    display: block;
    margin: 20px 20px 20px auto;
  }

  p {
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 20px;
  }
`;

const Line = styled.div`
  span {
    margin-right: 5px;
  }

  input {
    border-radius: 10px;
    padding: 10px;
  }
`;

const IntroForm = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [participantId, setParticipantId] = useState(-1);

  const handleIdChange = (e) => {
    setParticipantId(e.target.valueAsNumber);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      (participantId === -1 || participantId > 99 || participantId < 99) &&
      participantId !== 1337
    ) {
      enqueueSnackbar("Please enter a valid participant number");
      return;
    }

    dispatch(setId(participantId));
  };

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <h1>ΦScript User Study</h1>
        <p>
          You will see a box with a white border. In this box, you will need to
          place one or two points depending on the situation.
        </p>
        <p>
          You can place the points where ever you want. However, there is a
          guideline for you to follow. For this guideline, see the following
          image.
        </p>
        <img src={Image} style={{ width: "30vh" }} />
        <p>
          When ready to continue, please enter your participant id and press
          continue.
        </p>
        <Line>
          <span>Participant id: </span>
          <input type="number" placeholder="id" onChange={handleIdChange} />
        </Line>
        <button className="btn" type="submit">
          Continue
        </button>
      </form>
    </Wrapper>
  );
};

export default IntroForm;
