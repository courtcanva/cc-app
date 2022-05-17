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
  OpenCloseButton,
} from "./styles";

import { HiOutlineZoomIn, HiOutlineZoomOut, HiOutlineInformationCircle } from "react-icons/hi";

import { AiOutlineDown } from "react-icons/ai";
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

const TilesInfo: React.FC = () => {
  const tiles = [
    { id: 1, tile: "#83DJ31", quantity: 1 },
    { id: 2, tile: "#83DJ32", quantity: 2 },
    { id: 3, tile: "#83DJ33", quantity: 3 },
    { id: 4, tile: "#83DJ34", quantity: 4 },
    { id: 5, tile: "#83DJ35", quantity: 1 },
    { id: 6, tile: "#83DJ36", quantity: 2 },
  ];

  const listTiles = tiles.map((tile) => {
    return (
      <TextWrapper key={tile.id}>
        <ColorText>{tile.tile}</ColorText>
        <Text>tile*{tile.quantity}</Text>
      </TextWrapper>
    );
  });

  return <WrapperOuter>{listTiles}</WrapperOuter>;
};

const PriceBar: React.FC = () => {
  return (
    <>
      <Container>
        <OpenCloseButton>
          <AiOutlineDown />
        </OpenCloseButton>
        <TilesInfo />

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
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="ruler-on" mb={0}>
              Ruler On
            </FormLabel>
            <Switch id="ruler-on" colorScheme={"blue"} />
          </FormControl>

          <HiOutlineInformationCircle />
        </Wrapper>
      </ContainerFooter>
    </>
  );
};

export default PriceBar;
