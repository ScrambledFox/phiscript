import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import GenericPane from "../genericPane/GenericPane";

import ResearchPrompts from "../../data/researchPrompts.json";
import { getOrdinal } from "../../utils/lang";
import {
  nextPrompt,
  resetPoints,
  setResearchDone,
} from "../../redux/researchSlice";

import { socket } from "../../service/socket";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  text-align: center;
`;

const Prompt = styled.h1``;

const Instruction = styled.h2``;

const Buttons = styled.div`
  width: 100%;
  margin-top: 50px;
`;

const Submit = styled.button`
  margin-left: 600px;
`;

const ResearchPane = () => {
  const dispatch = useDispatch();

  const participantData = useSelector((state) => state.participant);
  const researchData = useSelector((state) => state.research);

  const [instruction, setInstruction] = useState("");

  const onResetPoints = () => {
    dispatch(resetPoints());
  };

  const onSubmit = () => {
    socket.emit("processData", {
      participantId: participantData.id,
      promptIndex: researchData.currentPromptIndex,
      prompt: prompt,
      data: {
        points: researchData.points,
      },
    });

    if (researchData.currentPromptIndex + 1 > ResearchPrompts.prompts.length) {
      dispatch(setResearchDone());
      return;
    }

    dispatch(nextPrompt());
  };

  const getInstruction = () => {
    if (
      researchData.points.length === 0 &&
      researchData.currentPrompt.pointsNeeded === 1
    )
      return "Click in the box where you would place the situation mentioned above.";
    else if (
      researchData.points.length < researchData.currentPrompt.pointsNeeded
    )
      return `Place the ${researchData.points.length + 1}${getOrdinal(
        researchData.points.length + 1
      )} point in the box.`;
    else
      return "Revise your points and submit when you think they are placed correctly.";
  };

  useEffect(() => {
    setInstruction(getInstruction());
  });

  return (
    <Wrapper>
      <Prompt>{ researchData.currentPromptIndex === 0 ? `"${researchData.currentPrompt.prompt}"` : "Situation will be listed here." }</Prompt>
      <Instruction>{ researchData.currentPromptIndex === 0 ? instruction : "Instruction will be listed here. Try placing a few points and click on 'submit' when ready to continue." }</Instruction>
      <GenericPane />
      <Buttons>
        <button className="btn" onClick={onResetPoints}>
          Reset Points
        </button>
        <Submit className="btn" onClick={onSubmit}>
          Submit
        </Submit>
      </Buttons>
    </Wrapper>
  );
};

export default ResearchPane;
