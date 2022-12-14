import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import GenericPane from "../genericPane/GenericPane";

import ResearchPrompts from "../../data/researchPrompts.json";
import { getOrdinal } from "../../utils/lang";
import {
  nextPrompt,
  previousPrompt,
  resetPoints,
  setResearchDone,
} from "../../redux/researchSlice";

import { socket } from "../../service/socket";
import { useSnackbar } from "notistack";

const Wrapper = styled.div`
  text-align: center;
`;

const Prompt = styled.h1``;

const Instruction = styled.h2``;

const Buttons = styled.div`
  width: 100%;

  button {
    margin: 50px;
  }
`;

const Submit = styled.button``;

const ResearchPane = () => {
  const dispatch = useDispatch();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const participantData = useSelector((state) => state.participant);
  const researchData = useSelector((state) => state.research);

  const [instruction, setInstruction] = useState("");

  const onResetPoints = () => {
    dispatch(resetPoints());
  };

  const onSubmit = () => {
    if (
      researchData.currentPromptIndex >= 0 &&
      researchData.points.length !== researchData.currentPrompt.pointsNeeded
    ) {
      enqueueSnackbar(
        `Please place ${researchData.currentPrompt.pointsNeeded} points!`
      );
      return;
    }

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

  const next = () => {
    if (researchData.currentPromptIndex + 1 >= ResearchPrompts.prompts.length) {
    } else {
      dispatch(nextPrompt());
    }
  };
  const previous = () => {
    if (researchData.currentPromptIndex - 1 < 0) {
    } else {
      dispatch(previousPrompt());
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

  useEffect(() => {
    socket.emit("fetchData", researchData.currentPromptIndex);
  }, [researchData.currentPromptIndex]);

  return (
    <Wrapper>
      {!researchData.researchDone ? (
        <>
          <Prompt>
            <button style={{ marginRight: "10px" }} onClick={previous}>
              ◀
            </button>
            {researchData.currentPromptIndex}
            <button style={{ marginLeft: "10px" }} onClick={next}>
              ▶
            </button>
          </Prompt>

          <Instruction>
            {researchData.currentPromptIndex >= 0 &&
              `${researchData.currentPrompt.type}: ${researchData.currentPrompt.prompt}`}
          </Instruction>

          <GenericPane />
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
