import React from "react";
import styled from "styled-components";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../redux/dataSlice";
import { useState } from "react";
import { useEffect } from "react";

const Wrapper = styled.div``;

const InputWrapper = styled.div`
  display: block;
`;

const AddButton = styled.span`
  margin: 6px;
`;

const RemoveButton = styled.span`
  margin-left: 10px;
`;

const TapInput = ({ type, index, param, value, data, setData, clear }) => {
  const [val, setVal] = useState("");

  useEffect(() => {
    setVal("");
  }, [clear]);

  const handleChange = (e) => {
    setVal(e.target.value);

    setData({
      ...data,
      [type]: data[type].map((item, _index) => {
        if (_index !== index) return item;
        return { ...item, [param]: e.target.value };
      }),
    });
  };

  return (
    <input
      type="text"
      placeholder={value}
      value={val}
      onChange={handleChange}
    />
  );
};

const TapControl = () => {
  const dispatch = useDispatch();

  const network = useSelector((state) => state.network);
  const data = useSelector((state) => state.data);

  const [localData, setLocalData] = useState({ triggers: [], actions: [] });
  const [clearInputs, setClearInputs] = useState(false);

  useEffect(() => {
    setLocalData({ triggers: data.triggers, actions: data.actions });
  }, [data]);

  const addNewTrigger = () => {
    network.socket.emit("addNewTrigger");
  };

  const addNewAction = () => {
    network.socket.emit("addNewAction");
  };

  const removeTrigger = (index) => {
    network.socket.emit("removeTrigger", index);
  };

  const removeAction = (index) => {
    network.socket.emit("removeAction", index);
  };

  const sendDataUpdate = (e) => {
    e.preventDefault();

    console.log("Local", localData);
    console.log("Global", { triggers: data.triggers, actions: data.actions });

    setClearInputs(!clearInputs);

    network.socket.emit("updateData", {
      triggers: localData.triggers,
      actions: localData.actions,
    });
  };

  return (
    <Wrapper>
      <form onSubmit={sendDataUpdate}>
        <div>
          <div>
            Triggers:
            {data.triggers.map((item, _index) => {
              return (
                <InputWrapper>
                  <TapInput
                    type={"triggers"}
                    index={_index}
                    param={"who"}
                    value={item.who}
                    data={localData}
                    setData={setLocalData}
                    clear={clearInputs}
                  />
                  <TapInput
                    type={"triggers"}
                    index={_index}
                    param={"what"}
                    value={item.what}
                    data={localData}
                    setData={setLocalData}
                    clear={clearInputs}
                  />
                  <TapInput
                    type={"triggers"}
                    index={_index}
                    param={"where"}
                    value={item.where}
                    data={localData}
                    setData={setLocalData}
                    clear={clearInputs}
                  />
                  <RemoveButton>
                    <AiFillMinusCircle
                      color="red"
                      onClick={() => removeTrigger(_index)}
                    />
                  </RemoveButton>
                </InputWrapper>
              );
            })}
            <AddButton>
              <BsFillPlusCircleFill color="green" onClick={addNewTrigger} />
            </AddButton>
          </div>
          <div>
            Actions:
            {data.actions.map((item, _index) => {
              return (
                <InputWrapper>
                  <TapInput
                    type={"actions"}
                    index={_index}
                    param={"who"}
                    value={item.who}
                    data={localData}
                    setData={setLocalData}
                    clear={clearInputs}
                  />
                  <TapInput
                    type={"actions"}
                    index={_index}
                    param={"what"}
                    value={item.what}
                    data={localData}
                    setData={setLocalData}
                    clear={clearInputs}
                  />
                  <TapInput
                    type={"actions"}
                    index={_index}
                    param={"where"}
                    value={item.where}
                    data={localData}
                    setData={setLocalData}
                    clear={clearInputs}
                  />
                  <RemoveButton>
                    <AiFillMinusCircle
                      color="red"
                      onClick={() => removeAction(_index)}
                    />
                  </RemoveButton>
                </InputWrapper>
              );
            })}
            <AddButton>
              <BsFillPlusCircleFill color="green" onClick={addNewAction} />
            </AddButton>
          </div>
        </div>

        <button>Send Changes</button>
      </form>

      <div>
        <p>Trigger count: {data.triggers.length}</p>
        <p>Action count: {data.actions.length}</p>
      </div>
      <div>
        <b>Triggers:</b>
        {data.triggers.map((trigger, i) => (
          <div key={i}>
            <p>Who: {trigger.who}</p>
            <p>What: {trigger.what}</p>
            <p>Where: {trigger.where}</p>
          </div>
        ))}
      </div>
      <div>
        <b>Actions:</b>
        {data.actions.map((action, i) => (
          <div key={i}>
            <p>Who: {action.who}</p>
            <p>What: {action.what}</p>
            <p>Where: {action.where}</p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default TapControl;
