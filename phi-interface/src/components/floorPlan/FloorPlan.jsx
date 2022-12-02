import styled from "styled-components";

import FloorplanImg from "../../resources/floorplan.png";

const Wrapper = styled.div`
  height: 75vh;
`;

const FloorplanImage = styled.img`
  display: block;

  margin: 25px auto;

  width: 100%;
  height: 100%;

  object-fit: contain;
`;

const FloorPlan = () => {
  return (
    <Wrapper>
      <FloorplanImage src={FloorplanImg} />
    </Wrapper>
  );
};

export default FloorPlan;
