import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setId } from "../../redux/participantSlice";

const Wrapper = styled.div`
  background: #222;

  border: 2px solid gray;
  border-radius: 25px;

  width: 25vw;

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

  const [participantId, setParticipantId] = useState(-1);

  const handleIdChange = (e) => {
    setParticipantId(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(setId(participantId));
  };

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <h1>ΦScript User Study</h1>
        <Line>
          <span>Participant id: </span>
          <input type="text" placeholder="id" onChange={handleIdChange} />
        </Line>
        <button className="btn" type="submit">
          Continue
        </button>
      </form>
    </Wrapper>
  );
};

export default IntroForm;
