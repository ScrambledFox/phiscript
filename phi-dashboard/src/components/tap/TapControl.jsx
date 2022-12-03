import React from "react";
import styled from "styled-components";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";

const Wrapper = styled.div``;

const InputWrapper = styled.div`
  display: block;
`;

const TapInput = ({  }) => {
  return <InputWrapper></InputWrapper>;
};

const TapControl = ({ socket, triggers, actions, setTriggers, setActions }) => {
  const addNewTrigger = () => {
    socket.emit("addNewTrigger");
  };

  const addNewAction = () => {
    socket.emit("addNewAction");
  };

  const removeTrigger = (index) => {
    socket.emit("removeTrigger", index);
  };

  const removeAction = (index) => {
    socket.emit("removeAction", index);
  };

  const handleChange = (event) => {
    let copy = { triggers: [...triggers], actions: [...actions] };

    copy[event.target.dataset.type][event.target.dataset.index][
      event.target.dataset.param
    ] = event.target.value;

    console.log("copy", copy);

    setTriggers(copy.triggers);
    setActions(copy.actions);
  };

  let triggersInputs = [];
  for (let i = 0; i < triggers.length; i++) {
    const trigger = triggers[i];
    triggersInputs.push(
      <TapInput
        type={"triggers"}
        index={i}
        param={"what"}
        value={trigger.what}
      />
    );
  }

  let actionsInputs = [];
  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    actionsInputs.push(
      <TapInput type={"actions"} index={i} param={"what"} value={action.what} />
    );
  }

  return (
    <Wrapper>
      <div>
        Triggers:
        {triggersInputs}
        Actions:
        {actionsInputs}
      </div>

      <div>
        Triggers: {triggers.length}
        Actions: {actions.length}
      </div>
      <div>
        Triggers:
        {triggers.map((trigger, i) => (
          <div key={i}>
            <p>{trigger.who}</p>
            <p>{trigger.what}</p>
            <p>{trigger.where}</p>
          </div>
        ))}
      </div>
      <div>
        Actions:
        {actions.map((action, i) => (
          <div key={i}>
            <p>{action.who}</p>
            <p>{action.what}</p>
            <p>{action.where}</p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default TapControl;
