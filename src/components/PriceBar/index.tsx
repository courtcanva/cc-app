import React from "react";

import {
  Container,
  WrapperOuter,
  TextWrapper,
  Text,
  PriceWrapper,
  ColorText,
  BoldText,
  LightText,
  ContainerFooter,
  Wrapper,
  RulerText
} from "./styles";

import { HiOutlineZoomIn, HiOutlineZoomOut, HiOutlineInformationCircle } from "react-icons/hi";

import { Switch } from "@chakra-ui/react";


const PriceBar: React.FC = () => {
  return (
    <>
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

      <ContainerFooter>
        <Wrapper>
          <HiOutlineZoomOut />
          <HiOutlineZoomIn />
        </Wrapper>

        <Wrapper>
          <Wrapper>
            <RulerText>Ruler On</RulerText>
            <Switch />
          </Wrapper>
          <HiOutlineInformationCircle />
        </Wrapper>
      </ContainerFooter>
    </>
  );
};

export default PriceBar;
