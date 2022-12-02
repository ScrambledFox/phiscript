import React from "react";
import styled from "styled-components";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";
import { EMPTY_TRIGGER_ACTION_DATA } from "../../App";

const Wrapper = styled.div``;

const TapInput = styled.div`
  display: block;
`;

const TapControl = ({ socket, triggers, actions, setTriggers, setActions }) => {
  const addNewTrigger = () => {
    setTriggers([...triggers, EMPTY_TRIGGER_ACTION_DATA]);
  };

  const addNewAction = () => {
    setActions([...actions, EMPTY_TRIGGER_ACTION_DATA]);
  };

  const removeTrigger = (index) => {
    let copy = [...triggers];
    copy.splice(index, 1);
    setTriggers(copy);
  };

  const removeAction = (index) => {
    let copy = [...actions];
    copy.splice(index, 1);
    setActions(copy);
  };

  return (
    <Wrapper>
      <div>
        Triggers:
        {triggers.map((trigger, i) => (
          <TapInput>
            <input placeholder={trigger.what} />

            {i == triggers.length - 1 ? (
              <BsFillPlusCircleFill
                color="green"
                onClick={() => addNewTrigger()}
              />
            ) : (
              <AiFillMinusCircle color="red" onClick={() => removeTrigger(i)} />
            )}
          </TapInput>
        ))}
      </div>
      <div>
        Actions:
        {actions.map((action, i) => (
          <TapInput>
            <input placeholder={action.what} />

            {i == actions.length - 1 ? (
              <BsFillPlusCircleFill
                color="green"
                onClick={() => addNewAction()}
              />
            ) : (
              <AiFillMinusCircle color="red" onClick={() => removeAction(i)} />
            )}
          </TapInput>
        ))}
      </div>
    </Wrapper>
  );
};

export default TapControl;
