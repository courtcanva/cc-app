import React from "react";
import { HiOutlineZoomIn, HiOutlineZoomOut, HiOutlineInformationCircle } from "react-icons/hi";

import { Switch } from "@chakra-ui/react";

import { Container, Wrapper, Text } from "./styles";

const PriceFooter: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <HiOutlineZoomOut />
        <HiOutlineZoomIn />
      </Wrapper>

      <Wrapper>
        <Wrapper>
          <Text>Ruler On</Text>
          <Switch />
        </Wrapper>
        <HiOutlineInformationCircle />
      </Wrapper>
    </Container>
  );
};

export default PriceFooter;
