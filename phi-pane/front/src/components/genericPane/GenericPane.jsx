import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addPoint } from "../../redux/researchSlice";

const Wrapper = styled.div`
  width: 1000px;
  height: 600px;

  position: relative;

  border: 2px solid white;
  overflow: hidden;

  margin: auto;
`;

const PointWrapper = styled.span`
  width: 25px;
  height: 25px;

  position: absolute;
  left: ${(props) => props.x - 12}px;
  top: ${(props) => props.y - 12}px;

  border-radius: 50%;
  border: 1px solid white;

  user-select: none;
`;

const Point = ({ showIndex, i, x, y }) => {
  return (
    <PointWrapper x={x} y={y}>
      {showIndex && i + 1}
    </PointWrapper>
  );
};

const GenericPane = () => {
  const dispatch = useDispatch();

  const participantData = useSelector((state) => state.participant);
  const researchData = useSelector((state) => state.research);

  const onClick = (e) => {
    if (
      researchData.points.length + 1 >
      researchData.currentPrompt.pointsNeeded
    )
      return;

    var rect = e.target.getBoundingClientRect();

    dispatch(
      addPoint({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    );
  };

  return (
    <Wrapper>
      <div style={{ width: "100", height: "100%" }} onClick={onClick} />
      {researchData.points.map((point, _index) => {
        return (
          <Point
            key={point.index}
            showIndex={researchData.currentPrompt.pointsNeeded > 1}
            i={point.index}
            x={point.x}
            y={point.y}
          />
        );
      })}
    </Wrapper>
  );
};

export default GenericPane;
