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

  &:hover {
    font-size: 120%;

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
            {triggers.map((trigger, i) => (
              <>
                {i !== 0 && " and "}
                <Trigger
                  key={i}
                  capatilize={i == 0}
                  who={trigger.who}
                  what={trigger.what}
                  where={trigger.where}
                />
              </>
            ))}{" "}
            {actions.map((action, i) => (
              <>
                {i !== 0 && " and "}
                <Action
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

const Trigger = ({ capatilize, who, what, where }) => {
  return (
    <>
      <Decorator>{capatilize ? "If" : "if"}</Decorator>
      {who !== "" && <Variable> {who}</Variable>}
      {what !== "" && <Variable> {what}</Variable>}
      {where !== "" && <Variable> {where}</Variable>}
    </>
  );
};

const Action = ({ who, what, where }) => {
  return (
    <>
      <Decorator>then</Decorator>
      {who !== "" && <Variable> {who}</Variable>}
      {what !== "" && <Variable> {what}</Variable>}
      {where !== "" && <Variable> {where}</Variable>}
    </>
  );
};

export default RuleInterpreter;
