import { useEffect, useState } from "react";
import styled from "styled-components";

import { Puff } from "react-loader-spinner";

// **[IF] (I) (enter) (a room), [THEN] (turn on) (the lights) (in that room).**
//      *[TRIGGER] (Who) (What) (Where), [ACTION] (What) (Which) (Where)*

const BodyWrapper = styled.div`
  position: absolute;

  bottom: 0;
  left: 0;

  height: 25vh;
  width: 100vw;

  background: black;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 75%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const TextWrapper = styled.div`
  text-align: center;
  font-size: 2em;

  margin: 50px 0;
`;

const Line = styled.span``;

const Descriptor = styled.p`
  font-size: 50%;
`;

const Decorator = styled.span``;

const Variable = styled.span`
  transition: 0.5s;

  border-radius: 10px;

  &:hover {
    font-size: 120%;

    border: 1px solid white;
    padding: 5px;
    margin: 5px;

    transition: 0.5s;
  }
`;

const Loading = styled.div`
  width: 80px;
  margin: auto;
`;

const RuleInterpreter = ({ triggers, actions, isDirty }) => {
  return (
    <BodyWrapper>
      <TextWrapper>
        <Descriptor>Current Rule:</Descriptor>
        {isDirty && (
          <Loading>
            <Puff color="white" height={"80"} width={"80"} />
          </Loading>
        )}
        {!isDirty && (
          <Line>
            <Decorator>If</Decorator>
            {triggers.map((trigger, i) => (
              <>
                {i !== 0 && ` ${trigger.connectorWord} `}
                <Statement
                  key={i}
                  who={trigger.who}
                  what={trigger.what}
                  where={trigger.where}
                />
              </>
            ))}{" "}
            <Decorator>then</Decorator>
            {actions.map((action, i) => (
              <>
                {i !== 0 && " and "}
                <Statement
                  key={i}
                  who={action.who}
                  what={action.what}
                  where={action.where}
                />
                {i == actions.length - 1 && "."}
              </>
            ))}
          </Line>
        )}
      </TextWrapper>
    </BodyWrapper>
  );
};

const Statement = ({ who, what, where }) => {
  return (
    <>
      {who !== "" && (
        <>
          <span> </span>
          <Variable>{who}</Variable>
        </>
      )}
      {what !== "" && (
        <>
          <span> </span>
          <Variable>{what}</Variable>
        </>
      )}
      {where !== "" && (
        <>
          <span> </span>
          <Variable>{where}</Variable>
        </>
      )}
    </>
  );
};

export default RuleInterpreter;
