import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addPoint, setXSize, setYSize } from "../../redux/researchSlice";

import Xarrow from "react-xarrows";

const Wrapper = styled.div`
  width: 60vw;
  height: 60vh;

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

const Point = ({ showIndex, name, i, x, y }) => {
  return (
    <PointWrapper id={name} x={x} y={y}>
      {showIndex && i + 1}
    </PointWrapper>
  );
};

const GenericPane = () => {
  const dispatch = useDispatch();
  const mainRef = useRef();

  const researchData = useSelector((state) => state.research);

  useEffect(() => {
    dispatch(setXSize(mainRef.current.offsetWidth));
    dispatch(setYSize(mainRef.current.offsetHeight));
  }, []);

  return (
    <Wrapper>
      <div ref={mainRef} style={{ width: "100%", height: "100%" }} />
      {researchData.points.map((entry, _index) => {
        if (entry.data.points.length === 1) {
          const point = entry.data.points[0];

          return (
            <>
              <Point
                key={_index}
                showIndex={researchData.currentPrompt.pointsNeeded > 1}
                i={point.index}
                x={point.x * researchData.xSize}
                y={point.y * researchData.ySize}
              />
            </>
          );
        } else if (entry.data.points.length === 2) {
          const point1 = entry.data.points[0];
          const point2 = entry.data.points[1];

          return (
            <>
              <Point
                key={_index}
                name={`start${_index}`}
                showIndex={researchData.currentPrompt.pointsNeeded > 1}
                i={point1.index}
                x={point1.x * researchData.xSize}
                y={point1.y * researchData.ySize}
              />
              <Point
                key={_index + 1000}
                name={`end${_index}`}
                showIndex={researchData.currentPrompt.pointsNeeded > 1}
                i={point2.index}
                x={point2.x * researchData.xSize}
                y={point2.y * researchData.ySize}
              />
              <Xarrow
                start={`start${_index}`}
                end={`end${_index}`}
                path={"straight"}
              />
            </>
          );
        }
      })}
    </Wrapper>
  );
};

export default GenericPane;
