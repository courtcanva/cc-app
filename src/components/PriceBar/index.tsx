import React from "react";

import {
  Container,
  Text,
  WrapperOuter,
  TextWrapper,
  PriceWrapper,
  ColorText,
  BoldText,
  LightText,
} from "./styles";

const PriceBar: React.FC = () => {
  return (
    <Container>
      {/* <OpenCloseButton /> */}
      <WrapperOuter>
        <TextWrapper>
          <ColorText>#83DJ34</ColorText>
          <Text>tile*2</Text>
        </TextWrapper>
        <TextWrapper>
          <ColorText>#83DJ34</ColorText>
          <Text>tile*2</Text>
        </TextWrapper>
        <TextWrapper>
          <ColorText>#83DJ34</ColorText>
          <Text>tile*2</Text>
        </TextWrapper>
        <TextWrapper>
          <ColorText>#83DJ34</ColorText>
          <Text>tile*2</Text>
        </TextWrapper>
        <TextWrapper>
          <ColorText>#83DJ34</ColorText>
          <Text>tile*2</Text>
        </TextWrapper>
        <TextWrapper>
          <ColorText>#83DJ34</ColorText>
          <Text>tile*2</Text>
        </TextWrapper>
      </WrapperOuter>

      <PriceWrapper>
        <BoldText>Estimated Budget: From $ 1647</BoldText>
        <LightText>Please note: Final total price may very from estimated budget.</LightText>
      </PriceWrapper>
    </Container>
  );
};

export default PriceBar;
