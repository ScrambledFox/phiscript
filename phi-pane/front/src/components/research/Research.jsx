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

    if (researchData.currentPromptIndex + 1 >= ResearchPrompts.prompts.length) {
      dispatch(setResearchDone());
    } else {
      dispatch(nextPrompt());
    }
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
  }, [getInstruction]);

  return (
    <Wrapper>
      {!researchData.researchDone ? (
        <>
          <Prompt>
            {researchData.currentPromptIndex === -1
              ? "Situation will be listed here."
              : `"${researchData.currentPrompt.prompt}"`}
          </Prompt>
          <Instruction>
            {researchData.currentPromptIndex === -1
              ? "Instruction will be listed here. Try placing a few points and click on 'submit' when ready to continue."
              : instruction}
          </Instruction>
          <GenericPane />
          <Buttons>
            <button className="btn" onClick={onResetPoints}>
              Reset Points
            </button>
            <Submit className="btn" onClick={onSubmit}>
              Submit
            </Submit>
          </Buttons>
        </>
      ) : (
        <>
          <h1>🎉Finished!🥳</h1>
          <h2>
            You can now close this page and continue with the questionnaire.
          </h2>
        </>
      )}
    </Wrapper>
  );
};

export default ResearchPane;
